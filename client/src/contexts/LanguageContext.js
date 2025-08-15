import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  // Supported languages with their display names
  const supportedLanguages = {
    en: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      fontClass: 'font-sans'
    },
    hi: {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      flag: '🇮🇳',
      fontClass: 'font-hindi'
    },
    te: {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      flag: '🇮🇳',
      fontClass: 'font-telugu'
    }
  };

  // Language-specific content
  const translations = {
    en: {
      // Navigation
      home: 'Home',
      upload: 'Upload PDF',
      analysis: 'Analysis',
      schemes: 'Schemes',
      about: 'About',
      
      // Common
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      
      // Actions
      uploadPdf: 'Upload PDF',
      analyzeDocument: 'Analyze Document',
      viewSchemes: 'View Schemes',
      downloadReport: 'Download Report',
      shareResults: 'Share Results',
      
      // Status
      processing: 'Processing...',
      completed: 'Completed',
      failed: 'Failed',
      pending: 'Pending',
      
      // Messages
      uploadSuccess: 'PDF uploaded successfully!',
      uploadError: 'Failed to upload PDF. Please try again.',
      analysisSuccess: 'Analysis completed successfully!',
      analysisError: 'Analysis failed. Please try again.',
      
      // Form labels
      schemeName: 'Scheme Name',
      description: 'Description',
      eligibility: 'Eligibility',
      benefits: 'Benefits',
      deadline: 'Deadline',
      documents: 'Required Documents',
      
      // Placeholders
      enterSchemeName: 'Enter scheme name...',
      enterDescription: 'Enter description...',
      searchSchemes: 'Search for schemes...',
      
      // Buttons
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      submit: 'Submit',
      reset: 'Reset',
      
      // Headers
      welcomeTitle: 'Welcome to YojanaAI',
      welcomeSubtitle: 'AI-powered government scheme analyzer',
      featuresTitle: 'Features',
      howItWorksTitle: 'How It Works',
      
      // Features
      feature1Title: 'Smart PDF Analysis',
      feature1Desc: 'Upload government scheme PDFs and get instant AI-powered insights',
      feature2Title: 'Multilingual Support',
      feature2Desc: 'Available in English, Hindi, Telugu and more languages',
      feature3Title: 'Voice Interaction',
      feature3Desc: 'Use voice commands for hands-free operation',
      feature4Title: 'Easy Understanding',
      feature4Desc: 'Complex government documents simplified for citizens'
    },
    
    hi: {
      // Navigation
      home: 'होम',
      upload: 'पीडीएफ अपलोड करें',
      analysis: 'विश्लेषण',
      schemes: 'योजनाएं',
      about: 'हमारे बारे में',
      
      // Common
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफल',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      view: 'देखें',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'क्रमबद्ध करें',
      
      // Actions
      uploadPdf: 'पीडीएफ अपलोड करें',
      analyzeDocument: 'दस्तावेज़ का विश्लेषण करें',
      viewSchemes: 'योजनाएं देखें',
      downloadReport: 'रिपोर्ट डाउनलोड करें',
      shareResults: 'परिणाम साझा करें',
      
      // Status
      processing: 'प्रोसेसिंग...',
      completed: 'पूर्ण',
      failed: 'विफल',
      pending: 'लंबित',
      
      // Messages
      uploadSuccess: 'पीडीएफ सफलतापूर्वक अपलोड हो गया!',
      uploadError: 'पीडीएफ अपलोड करने में विफल। कृपया पुनः प्रयास करें।',
      analysisSuccess: 'विश्लेषण सफलतापूर्वक पूर्ण हुआ!',
      analysisError: 'विश्लेषण विफल। कृपया पुनः प्रयास करें।',
      
      // Form labels
      schemeName: 'योजना का नाम',
      description: 'विवरण',
      eligibility: 'पात्रता',
      benefits: 'लाभ',
      deadline: 'अंतिम तिथि',
      documents: 'आवश्यक दस्तावेज़',
      
      // Placeholders
      enterSchemeName: 'योजना का नाम दर्ज करें...',
      enterDescription: 'विवरण दर्ज करें...',
      searchSchemes: 'योजनाओं की खोज करें...',
      
      // Buttons
      getStarted: 'शुरू करें',
      learnMore: 'और जानें',
      contactUs: 'संपर्क करें',
      submit: 'जमा करें',
      reset: 'रीसेट करें',
      
      // Headers
      welcomeTitle: 'योजनाआई में आपका स्वागत है',
      welcomeSubtitle: 'एआई-संचालित सरकारी योजना विश्लेषक',
      featuresTitle: 'विशेषताएं',
      howItWorksTitle: 'यह कैसे काम करता है',
      
      // Features
      feature1Title: 'स्मार्ट पीडीएफ विश्लेषण',
      feature1Desc: 'सरकारी योजना पीडीएफ अपलोड करें और तुरंत एआई-संचालित अंतर्दृष्टि प्राप्त करें',
      feature2Title: 'बहुभाषी समर्थन',
      feature2Desc: 'अंग्रेजी, हिंदी, तेलुगु और अन्य भाषाओं में उपलब्ध',
      feature3Title: 'आवाज इंटरैक्शन',
      feature3Desc: 'हाथ-मुक्त संचालन के लिए आवाज कमांड का उपयोग करें',
      feature4Title: 'आसान समझ',
      feature4Desc: 'नागरिकों के लिए जटिल सरकारी दस्तावेज़ सरल बनाए गए'
    },
    
    te: {
      // Navigation
      home: 'హోమ్',
      upload: 'పీడీఎఫ్ అప్‌లోడ్',
      analysis: 'విశ్లేషణ',
      schemes: 'పథకాలు',
      about: 'మా గురించి',
      
      // Common
      loading: 'లోడ్ అవుతోంది...',
      error: 'లోపం',
      success: 'విజయవంతం',
      cancel: 'రద్దు చేయండి',
      save: 'సేవ్ చేయండి',
      delete: 'తొలగించండి',
      edit: 'సవరించండి',
      view: 'చూడండి',
      search: 'వెతకండి',
      filter: 'ఫిల్టర్',
      sort: 'క్రమబద్ధం చేయండి',
      
      // Actions
      uploadPdf: 'పీడీఎఫ్ అప్‌లోడ్ చేయండి',
      analyzeDocument: 'పత్రాన్ని విశ్లేషించండి',
      viewSchemes: 'పథకాలను చూడండి',
      downloadReport: 'రిపోర్ట్ డౌన్‌లోడ్ చేయండి',
      shareResults: 'ఫలితాలను పంచుకోండి',
      
      // Status
      processing: 'ప్రాసెస్ చేస్తోంది...',
      completed: 'పూర్తయింది',
      failed: 'విఫలం',
      pending: 'పెండింగ్',
      
      // Messages
      uploadSuccess: 'పీడీఎఫ్ విజయవంతంగా అప్‌లోడ్ అయింది!',
      uploadError: 'పీడీఎఫ్ అప్‌లోడ్ చేయడంలో విఫలం. దయచేసి మళ్లీ ప్రయత్నించండి.',
      analysisSuccess: 'విశ్లేషణ విజయవంతంగా పూర్తయింది!',
      analysisError: 'విశ్లేషణ విఫలం. దయచేసి మళ్లీ ప్రయత్నించండి.',
      
      // Form labels
      schemeName: 'పథకం పేరు',
      description: 'వివరణ',
      eligibility: 'అర్హత',
      benefits: 'లాభాలు',
      deadline: 'చివరి తేదీ',
      documents: 'అవసరమైన పత్రాలు',
      
      // Placeholders
      enterSchemeName: 'పథకం పేరు నమోదు చేయండి...',
      enterDescription: 'వివరణ నమోదు చేయండి...',
      searchSchemes: 'పథకాల కోసం వెతకండి...',
      
      // Buttons
      getStarted: 'ప్రారంభించండి',
      learnMore: 'మరింత తెలుసుకోండి',
      contactUs: 'మమ్మల్ని సంప్రదించండి',
      submit: 'సమర్పించండి',
      reset: 'రీసెట్ చేయండి',
      
      // Headers
      welcomeTitle: 'యోజనాఆయ్‌కి స్వాగతం',
      welcomeSubtitle: 'ఎఐ-ఆధారిత ప్రభుత్వ పథక విశ్లేషకుడు',
      featuresTitle: 'లక్షణాలు',
      howItWorksTitle: 'ఇది ఎలా పని చేస్తుంది',
      
      // Features
      feature1Title: 'స్మార్ట్ పీడీఎఫ్ విశ్లేషణ',
      feature1Desc: 'ప్రభుత్వ పథక పీడీఎఫ్‌లను అప్‌లోడ్ చేయండి మరియు తక్షణ ఎఐ-ఆధారిత అంతర్దృష్టులను పొందండి',
      feature2Title: 'బహుభాషా మద్దతు',
      feature2Desc: 'ఆంగ్లం, హిందీ, తెలుగు మరియు ఇతర భాషలలో అందుబాటులో ఉంది',
      feature3Title: 'వాయిస్ ఇంటరాక్షన్',
      feature3Desc: 'చేతులు లేని ఆపరేషన్ కోసం వాయిస్ కమాండ్‌లను ఉపయోగించండి',
      feature4Title: 'సులభమైన అవగాహన',
      feature4Desc: 'పౌరుల కోసం సంక్లిష్టమైన ప్రభుత్వ పత్రాలు సరళీకృతం చేయబడ్డాయి'
    }
  };

  // Get translation for current key
  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  // Change language
  const changeLanguage = (languageCode) => {
    if (supportedLanguages[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('yojanaai-language', languageCode);
    }
  };

  // Get current language info
  const getCurrentLanguageInfo = () => {
    return supportedLanguages[currentLanguage];
  };

  // Get all supported languages
  const getAllLanguages = () => {
    return Object.values(supportedLanguages);
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('yojanaai-language');
    if (savedLanguage && supportedLanguages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getCurrentLanguageInfo,
    getAllLanguages,
    supportedLanguages,
    isLoading,
    setIsLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
