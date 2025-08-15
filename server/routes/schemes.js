const express = require('express');
const { query, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Validation middleware
const validateQuery = [
  query('language').optional().isIn(['en', 'hi', 'te']),
  query('category').optional().isString().trim(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 })
];

// Get all schemes (placeholder - would typically query database)
router.get('/', validateQuery, async (req, res) => {
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

    const { language = 'en', category, limit = 10, page = 1 } = req.query;

    // This would typically query a database
    // For now, return sample data
    const sampleSchemes = [
      {
        id: 'scheme-001',
        name: 'PM Kisan Samman Nidhi',
        nameHindi: 'पीएम किसान सम्मान निधि',
        nameTelugu: 'పీఎం కిసాన్ సమ్మాన్ నిధి',
        category: 'Agriculture',
        description: 'Direct income support to farmers',
        descriptionHindi: 'किसानों को सीधी आय सहायता',
        descriptionTelugu: 'రైతులకు నేరుగా ఆదాయ సహాయం',
        eligibility: 'Small and marginal farmers',
        benefits: '₹6,000 per year in three installments',
        deadline: '2024-12-31',
        status: 'active',
        language: language,
        createdAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'scheme-002',
        name: 'Ayushman Bharat',
        nameHindi: 'आयुष्मान भारत',
        nameTelugu: 'ఆయుష్మాన్ భారత్',
        category: 'Healthcare',
        description: 'National health protection scheme',
        descriptionHindi: 'राष्ट्रीय स्वास्थ्य सुरक्षा योजना',
        descriptionTelugu: 'జాతీయ ఆరోగ్య రక్షణ పథకం',
        eligibility: 'Economically weaker sections',
        benefits: 'Up to ₹5 lakhs per family per year',
        deadline: '2024-12-31',
        status: 'active',
        language: language,
        createdAt: '2024-01-01T00:00:00.000Z'
      },
      {
        id: 'scheme-003',
        name: 'PM Awas Yojana',
        nameHindi: 'पीएम आवास योजना',
        nameTelugu: 'పీఎం ఆవాస్ యోజన',
        category: 'Housing',
        description: 'Housing for all by 2024',
        descriptionHindi: '2024 तक सभी के लिए आवास',
        descriptionTelugu: '2024 నాటికి అందరికీ గృహనిర్మాణం',
        eligibility: 'Economically weaker sections',
        benefits: 'Financial assistance for house construction',
        deadline: '2024-12-31',
        status: 'active',
        language: language,
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    ];

    // Filter by category if specified
    let filteredSchemes = sampleSchemes;
    if (category) {
      filteredSchemes = sampleSchemes.filter(scheme => 
        scheme.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedSchemes = filteredSchemes.slice(startIndex, endIndex);

    // Get localized names based on language
    const localizedSchemes = paginatedSchemes.map(scheme => {
      const localized = { ...scheme };
      
      if (language === 'hi') {
        localized.name = scheme.nameHindi;
        localized.description = scheme.descriptionHindi;
      } else if (language === 'te') {
        localized.name = scheme.nameTelugu;
        localized.description = scheme.descriptionTelugu;
      }
      
      return localized;
    });

    res.status(200).json({
      error: false,
      message: 'Schemes retrieved successfully',
      data: {
        schemes: localizedSchemes,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredSchemes.length / limit),
          totalSchemes: filteredSchemes.length,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get schemes error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to retrieve schemes'
    });
  }
});

// Get scheme by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { language = 'en' } = req.query;

    // This would typically query a database
    // For now, return sample data
    const sampleScheme = {
      id: id,
      name: 'PM Kisan Samman Nidhi',
      nameHindi: 'पीएम किसान सम्मान निधि',
      nameTelugu: 'పీఎం కిసాన్ సమ్మాన్ నిధి',
      category: 'Agriculture',
      description: 'Direct income support to farmers',
      descriptionHindi: 'किसानों को सीधी आय सहायता',
      descriptionTelugu: 'రైతులకు నేరుగా ఆదాయ సహాయం',
      eligibility: 'Small and marginal farmers',
      benefits: '₹6,000 per year in three installments',
      deadline: '2024-12-31',
      status: 'active',
      language: language,
      detailedInfo: {
        objective: 'To provide direct income support to farmers',
        targetBeneficiaries: 'Small and marginal farmers',
        implementation: 'Through Direct Benefit Transfer',
        documents: ['Aadhaar Card', 'Land Records', 'Bank Account'],
        contactInfo: 'PM Kisan Portal or nearest agriculture office'
      },
      createdAt: '2024-01-01T00:00:00.000Z'
    };

    // Get localized content
    if (language === 'hi') {
      sampleScheme.name = sampleScheme.nameHindi;
      sampleScheme.description = sampleScheme.descriptionHindi;
    } else if (language === 'te') {
      sampleScheme.name = sampleScheme.nameTelugu;
      sampleScheme.description = sampleScheme.descriptionTelugu;
    }

    res.status(200).json({
      error: false,
      message: 'Scheme retrieved successfully',
      data: sampleScheme
    });

  } catch (error) {
    console.error('Get scheme error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to retrieve scheme'
    });
  }
});

// Get scheme categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = [
      { id: 'agriculture', name: 'Agriculture', nameHindi: 'कृषि', nameTelugu: 'వ్యవసాయం' },
      { id: 'healthcare', name: 'Healthcare', nameHindi: 'स्वास्थ्य देखभाल', nameTelugu: 'ఆరోగ్య సంరక్షణ' },
      { id: 'housing', name: 'Housing', nameHindi: 'आवास', nameTelugu: 'గృహనిర్మాణం' },
      { id: 'education', name: 'Education', nameHindi: 'शिक्षा', nameTelugu: 'విద్య' },
      { id: 'employment', name: 'Employment', nameHindi: 'रोजगार', nameTelugu: 'ఉపాధి' },
      { id: 'women', name: 'Women Empowerment', nameHindi: 'महिला सशक्तिकरण', nameTelugu: 'మహిళా సాధికారత' },
      { id: 'youth', name: 'Youth Development', nameHindi: 'युवा विकास', nameTelugu: 'యువజన అభివృద్ధి' },
      { id: 'senior', name: 'Senior Citizens', nameHindi: 'वरिष्ठ नागरिक', nameTelugu: 'ముసలి పౌరులు' }
    ];

    res.status(200).json({
      error: false,
      message: 'Categories retrieved successfully',
      data: categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to retrieve categories'
    });
  }
});

// Search schemes
router.get('/search/query', async (req, res) => {
  try {
    const { q, language = 'en', limit = 10 } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        error: true,
        message: 'Search query is required'
      });
    }

    // This would typically search a database
    // For now, return sample search results
    const searchResults = [
      {
        id: 'scheme-001',
        name: 'PM Kisan Samman Nidhi',
        nameHindi: 'पीएम किसान सम्मान निधि',
        nameTelugu: 'పీఎం కిసాన్ సమ్మాన్ నిధి',
        category: 'Agriculture',
        description: 'Direct income support to farmers',
        relevance: 0.95
      }
    ];

    // Get localized content
    const localizedResults = searchResults.map(scheme => {
      const localized = { ...scheme };
      
      if (language === 'hi') {
        localized.name = scheme.nameHindi;
      } else if (language === 'te') {
        localized.name = scheme.nameTelugu;
      }
      
      return localized;
    });

    res.status(200).json({
      error: false,
      message: 'Search completed successfully',
      data: {
        query: q,
        results: localizedResults.slice(0, parseInt(limit)),
        totalResults: localizedResults.length
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: true,
      message: 'Search failed'
    });
  }
});

module.exports = router;
