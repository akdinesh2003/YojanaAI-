const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const router = express.Router();

// AI Provider Configuration
let aiProvider;
let openai;

if (process.env.AI_PROVIDER === 'ollama') {
  aiProvider = 'ollama';
} else {
  aiProvider = 'openai';
  const OpenAI = require('openai');
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

// Validation middleware
const validateAnalysis = [
  body('fileId').isString().trim().notEmpty(),
  body('language').optional().isIn(['en', 'hi', 'te']),
  body('analysisType').optional().isIn(['summary', 'detailed', 'eligibility', 'benefits'])
];

// Analyze PDF content with AI
router.post('/pdf', validateAnalysis, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: true,
        message: 'Validation failed',
        details: errors.array()
      });
    }

    const { fileId, language = 'en', analysisType = 'summary' } = req.body;

    // Check if file exists
    const filePath = path.join(__dirname, '../uploads', fileId);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: true,
        message: 'PDF file not found'
      });
    }

    // Read and parse PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    
    if (!pdfData.text || pdfData.text.trim().length === 0) {
      return res.status(400).json({
        error: true,
        message: 'Could not extract text from PDF. The file might be scanned or corrupted.'
      });
    }

    // Prepare text for analysis (limit to avoid token limits)
    const textContent = pdfData.text.substring(0, 8000); // Limit to 8000 characters

    // Generate AI analysis based on type
    let analysisPrompt = '';
    let systemPrompt = '';

    switch (analysisType) {
      case 'summary':
        systemPrompt = `You are an expert government scheme analyst. Analyze the provided government scheme document and provide a clear, concise summary in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}. Focus on the key points that citizens need to know.`;
        analysisPrompt = `Please provide a comprehensive summary of this government scheme document in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}:

Document Text:
${textContent}

Please structure your response with:
1. Scheme Name and Purpose
2. Key Benefits
3. Eligibility Criteria
4. Important Deadlines
5. How to Apply
6. Required Documents

Keep the language simple and citizen-friendly.`;
        break;

      case 'eligibility':
        systemPrompt = `You are an expert in government scheme eligibility criteria. Analyze the provided document and extract all eligibility requirements in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}.`;
        analysisPrompt = `Extract and explain all eligibility criteria from this government scheme document in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}:

Document Text:
${textContent}

Please provide:
1. Age requirements
2. Income criteria
3. Educational qualifications
4. Geographic restrictions
5. Other specific requirements
6. Exclusions (if any)

Make it easy for citizens to understand if they qualify.`;
        break;

      case 'benefits':
        systemPrompt = `You are an expert in government scheme benefits analysis. Extract and explain all benefits from the provided document in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}.`;
        analysisPrompt = `Extract and explain all benefits from this government scheme document in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}:

Document Text:
${textContent}

Please provide:
1. Financial benefits
2. Non-financial benefits
3. Duration of benefits
4. Conditions for receiving benefits
5. Maximum benefit amounts
6. How benefits are distributed

Explain in simple terms that citizens can understand.`;
        break;

      default:
        systemPrompt = `You are an expert government scheme analyst. Provide a detailed analysis of the provided document in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}.`;
        analysisPrompt = `Provide a detailed analysis of this government scheme document in ${language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}:

Document Text:
${textContent}

Please provide a comprehensive analysis covering:
1. Scheme Overview
2. Objectives and Goals
3. Target Beneficiaries
4. Implementation Process
5. Key Features
6. Important Dates
7. Application Process
8. Required Documents
9. Contact Information
10. Additional Notes

Make it comprehensive yet easy to understand.`;
    }

    let analysis;
    
    if (aiProvider === 'ollama') {
      // Call Ollama API
      const ollamaResponse = await fetch(`${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL || 'llama3',
          prompt: `${systemPrompt}\n\n${analysisPrompt}`,
          stream: false
        })
      });
      
      if (!ollamaResponse.ok) {
        throw new Error(`Ollama API error: ${ollamaResponse.statusText}`);
      }
      
      const ollamaData = await ollamaResponse.json();
      analysis = ollamaData.response;
    } else {
      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: analysisPrompt }
        ],
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 2000,
        temperature: 0.3
      });
      
      analysis = completion.choices[0].message.content;
    }

    // Prepare response
    const analysisResult = {
      fileId,
      analysisType,
      language,
      analysis,
      documentInfo: {
        pages: pdfData.numpages,
        textLength: pdfData.text.length,
        analysisDate: new Date().toISOString()
      }
    };

    console.log(`Analysis completed for file: ${fileId}, type: ${analysisType}`);

    res.status(200).json({
      error: false,
      message: 'PDF analysis completed successfully',
      data: analysisResult
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        error: true,
        message: 'OpenAI API quota exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      error: true,
      message: 'Failed to analyze PDF',
      details: error.message
    });
  }
});

// Get analysis history (if implemented with database)
router.get('/history', async (req, res) => {
  try {
    // This would typically query a database
    // For now, return a placeholder response
    res.status(200).json({
      error: false,
      message: 'Analysis history endpoint',
      data: {
        message: 'Database integration required for analysis history'
      }
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to get analysis history'
    });
  }
});

// Health check for analysis service
router.get('/health', async (req, res) => {
  try {
    let aiStatus = 'not_configured';
    
    if (aiProvider === 'ollama') {
      // Check Ollama connection
      try {
        const response = await fetch(`${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/api/tags`);
        aiStatus = response.ok ? 'connected' : 'not_responding';
      } catch (error) {
        aiStatus = 'not_available';
      }
    } else {
      // Check OpenAI API connection
      aiStatus = !!process.env.OPENAI_API_KEY ? 'connected' : 'not_configured';
    }
    
    res.status(200).json({
      error: false,
      message: 'Analysis service is healthy',
      data: {
        provider: aiProvider,
        status: aiStatus,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Analysis service health check failed'
    });
  }
});

module.exports = router;
