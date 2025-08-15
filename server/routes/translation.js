const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// AI Provider Configuration
let aiProvider;
let openai;

if (process.env.AI_PROVIDER === 'ollama') {
  aiProvider = 'ollama';
} else {
  aiProvider = 'openai';
  const OpenAI = require('openai');
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Supported languages
const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  te: 'Telugu',
  ta: 'Tamil',
  bn: 'Bengali',
  mr: 'Marathi',
  gu: 'Gujarati',
  kn: 'Kannada',
  ml: 'Malayalam',
  pa: 'Punjabi'
};

// Validation middleware
const validateTranslation = [
  body('text').isString().trim().notEmpty().isLength({ max: 5000 }),
  body('targetLanguage').isIn(Object.keys(SUPPORTED_LANGUAGES)),
  body('sourceLanguage').optional().isIn(Object.keys(SUPPORTED_LANGUAGES)),
  body('context').optional().isString().trim().isLength({ max: 500 })
];

// Translate text to target language
router.post('/text', validateTranslation, async (req, res) => {
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

    const { text, targetLanguage, sourceLanguage = 'auto', context = 'general' } = req.body;

    // Don't translate if target language is same as source
    if (sourceLanguage !== 'auto' && sourceLanguage === targetLanguage) {
      return res.status(200).json({
        error: false,
        message: 'Text is already in the target language',
        data: {
          originalText: text,
          translatedText: text,
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage,
          confidence: 1.0
        }
      });
    }

    // Prepare translation prompt
    const systemPrompt = `You are an expert translator specializing in government documents and schemes. Translate the given text to ${SUPPORTED_LANGUAGES[targetLanguage]} while maintaining the formal tone and accuracy required for government communications.`;

    const userPrompt = `Please translate the following text to ${SUPPORTED_LANGUAGES[targetLanguage]}:

Context: ${context}
Text to translate: "${text}"

Important guidelines:
1. Maintain the formal and official tone
2. Preserve all numbers, dates, and technical terms accurately
3. Use appropriate government terminology in ${SUPPORTED_LANGUAGES[targetLanguage]}
4. Ensure the translation is clear and understandable for citizens
5. If there are any government scheme names, translate them appropriately

Provide only the translated text without any explanations.`;

    let translatedText;
    
    if (aiProvider === 'ollama') {
      // Call Ollama API for translation
      const ollamaResponse = await fetch(`${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL || 'llama3',
          prompt: `${systemPrompt}\n\n${userPrompt}`,
          stream: false
        })
      });
      
      if (!ollamaResponse.ok) {
        throw new Error(`Ollama API error: ${ollamaResponse.statusText}`);
      }
      
      const ollamaData = await ollamaResponse.json();
      translatedText = ollamaData.response.trim();
    } else {
      // Call OpenAI API for translation
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1000,
        temperature: 0.1 // Low temperature for consistent translations
      });
      
      translatedText = completion.choices[0].message.content.trim();
    }

    // Prepare response
    const translationResult = {
      originalText: text,
      translatedText: translatedText,
      sourceLanguage: sourceLanguage === 'auto' ? 'detected' : sourceLanguage,
      targetLanguage: targetLanguage,
      context: context,
      confidence: 0.95, // Placeholder confidence score
      timestamp: new Date().toISOString()
    };

    console.log(`Translation completed: ${sourceLanguage} -> ${targetLanguage}`);

    res.status(200).json({
      error: false,
      message: 'Translation completed successfully',
      data: translationResult
    });

  } catch (error) {
    console.error('Translation error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        error: true,
        message: 'OpenAI API quota exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      error: true,
      message: 'Failed to translate text',
      details: error.message
    });
  }
});

// Translate government scheme content
router.post('/scheme', validateTranslation, async (req, res) => {
  try {
    const { text, targetLanguage, sourceLanguage = 'en', context = 'government_scheme' } = req.body;

    // Enhanced prompt for government schemes
    const systemPrompt = `You are an expert translator specializing in Indian government schemes and policies. Translate the given government scheme content to ${SUPPORTED_LANGUAGES[targetLanguage]} while maintaining accuracy and using appropriate government terminology.`;

    const userPrompt = `Please translate the following government scheme content to ${SUPPORTED_LANGUAGES[targetLanguage]}:

Context: Government Scheme Document
Text to translate: "${text}"

Translation requirements:
1. Use formal and respectful language appropriate for government communications
2. Maintain all technical terms, numbers, and dates exactly as they appear
3. Translate government scheme names appropriately for ${SUPPORTED_LANGUAGES[targetLanguage]}
4. Use culturally appropriate terminology for ${SUPPORTED_LANGUAGES[targetLanguage]}
5. Ensure the translation is clear and accessible to all citizens
6. Preserve the structure and formatting of the original text

Provide only the translated text.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1500,
      temperature: 0.1
    });

    const translatedText = completion.choices[0].message.content.trim();

    const translationResult = {
      originalText: text,
      translatedText: translatedText,
      sourceLanguage: sourceLanguage,
      targetLanguage: targetLanguage,
      context: 'government_scheme',
      confidence: 0.98,
      timestamp: new Date().toISOString()
    };

    res.status(200).json({
      error: false,
      message: 'Government scheme translation completed successfully',
      data: translationResult
    });

  } catch (error) {
    console.error('Scheme translation error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to translate government scheme content'
    });
  }
});

// Get supported languages
router.get('/languages', async (req, res) => {
  try {
    const languages = Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => ({
      code,
      name,
      nativeName: getNativeName(code)
    }));

    res.status(200).json({
      error: false,
      message: 'Supported languages retrieved successfully',
      data: {
        languages,
        total: languages.length
      }
    });

  } catch (error) {
    console.error('Get languages error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to retrieve supported languages'
    });
  }
});

// Detect language of text
router.post('/detect', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        error: true,
        message: 'Text is required for language detection'
      });
    }

    // Simple language detection based on character sets
    const detectedLanguage = detectLanguageSimple(text);

    res.status(200).json({
      error: false,
      message: 'Language detected successfully',
      data: {
        detectedLanguage,
        confidence: 0.85,
        text: text.substring(0, 100) + (text.length > 100 ? '...' : '')
      }
    });

  } catch (error) {
    console.error('Language detection error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to detect language'
    });
  }
});

// Helper function to get native names
function getNativeName(code) {
  const nativeNames = {
    en: 'English',
    hi: 'हिंदी',
    te: 'తెలుగు',
    ta: 'தமிழ்',
    bn: 'বাংলা',
    mr: 'मराठी',
    gu: 'ગુજરાતી',
    kn: 'ಕನ್ನಡ',
    ml: 'മലയാളം',
    pa: 'ਪੰਜਾਬੀ'
  };
  return nativeNames[code] || SUPPORTED_LANGUAGES[code];
}

// Simple language detection function
function detectLanguageSimple(text) {
  // Check for Devanagari script (Hindi, Marathi)
  if (/[\u0900-\u097F]/.test(text)) {
    return 'hi';
  }
  
  // Check for Telugu script
  if (/[\u0C00-\u0C7F]/.test(text)) {
    return 'te';
  }
  
  // Check for Tamil script
  if (/[\u0B80-\u0BFF]/.test(text)) {
    return 'ta';
  }
  
  // Check for Bengali script
  if (/[\u0980-\u09FF]/.test(text)) {
    return 'bn';
  }
  
  // Check for Gujarati script
  if (/[\u0A80-\u0AFF]/.test(text)) {
    return 'gu';
  }
  
  // Check for Kannada script
  if (/[\u0C80-\u0CFF]/.test(text)) {
    return 'kn';
  }
  
  // Check for Malayalam script
  if (/[\u0D00-\u0D7F]/.test(text)) {
    return 'ml';
  }
  
  // Check for Punjabi script (Gurmukhi)
  if (/[\u0A00-\u0A7F]/.test(text)) {
    return 'pa';
  }
  
  // Default to English
  return 'en';
}

module.exports = router;
