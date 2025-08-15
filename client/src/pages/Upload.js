import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';

const Upload = () => {
  const { t, getCurrentLanguageInfo } = useLanguage();
  const currentLang = getCurrentLanguageInfo();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [formData, setFormData] = useState({
    schemeName: '',
    description: '',
    language: 'auto'
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'application/pdf') {
        setUploadedFile(file);
        toast.success('PDF file selected successfully!');
      } else {
        toast.error('Please select a valid PDF file');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      toast.error('Please select a PDF file first');
      return;
    }

    setIsUploading(true);
    
    try {
      // First upload the PDF
      const formDataToSend = new FormData();
      formDataToSend.append('pdf', uploadedFile);

      const uploadResponse = await fetch('http://localhost:5000/api/upload/pdf', {
        method: 'POST',
        body: formDataToSend
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }

      const uploadResult = await uploadResponse.json();
      const fileId = uploadResult.data.fileId;

      // Then analyze the PDF
      const analysisResponse = await fetch('http://localhost:5000/api/analyze/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileId: fileId,
          language: formData.language === 'auto' ? 'en' : formData.language,
          analysisType: 'summary'
        })
      });

      if (!analysisResponse.ok) {
        throw new Error('Analysis failed');
      }

      const analysisData = await analysisResponse.json();
      setAnalysisResult(analysisData.data);
      
      toast.success('PDF analyzed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    toast.success('File removed');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${currentLang.fontClass}`}>
            {t('uploadPdf')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your government scheme PDF and let our AI analyze it for you. 
            Get instant insights about eligibility, benefits, and requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <h2 className="subsection-title">Upload PDF Document</h2>
            
            {!uploadedFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
                  isDragActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <UploadIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {isDragActive ? 'Drop the PDF here' : 'Drag & drop PDF here'}
                </p>
                <p className="text-gray-500 mb-4">
                  or click to browse files
                </p>
                <p className="text-sm text-gray-400">
                  Maximum file size: 10MB • Only PDF files accepted
                </p>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-primary-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 flex items-center space-x-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>File ready for upload</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <h2 className="subsection-title">Document Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="schemeName" className="label">
                  {t('schemeName')}
                </label>
                <input
                  type="text"
                  id="schemeName"
                  name="schemeName"
                  value={formData.schemeName}
                  onChange={handleInputChange}
                  placeholder={t('enterSchemeName')}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="label">
                  {t('description')}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('enterDescription')}
                  rows="4"
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label htmlFor="language" className="label">
                  Preferred Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="auto">Auto-detect</option>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="te">Telugu</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Upload Guidelines:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Ensure the PDF is clear and readable</li>
                      <li>• Maximum file size: 10MB</li>
                      <li>• Only government scheme documents</li>
                      <li>• Text-based PDFs work best</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!uploadedFile || isUploading}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  !uploadedFile || isUploading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary hover:scale-105 transform'
                }`}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="spinner w-5 h-5"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <UploadIcon className="w-5 h-5" />
                    <span>Upload & Analyze</span>
                  </div>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Analysis Results Section */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="section-title text-center">AI Analysis Results</h2>
            <div className="card max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {formData.schemeName || 'Government Scheme'}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Analysis Complete
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Analysis Type:</h4>
                  <p className="text-gray-600">{analysisResult.analysisType || 'Summary'}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Language:</h4>
                  <p className="text-gray-600">
                    {formData.language === 'en' ? 'English' : 
                     formData.language === 'hi' ? 'Hindi' : 
                     formData.language === 'te' ? 'Telugu' : 'Auto-detected'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">AI Analysis:</h4>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {analysisResult.analysis}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Document Information:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Pages:</span> {analysisResult.documentInfo?.pages || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Text Length:</span> {analysisResult.documentInfo?.textLength || 'N/A'} characters
                    </div>
                    <div>
                      <span className="font-medium">Analysis Date:</span> {new Date(analysisResult.documentInfo?.analysisDate || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => window.print()}
                    className="btn-secondary flex-1"
                  >
                    Print Results
                  </button>
                  <button
                    onClick={() => setAnalysisResult(null)}
                    className="btn-primary flex-1"
                  >
                    Analyze Another PDF
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="section-title text-center">Why Choose YojanaAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-soft">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
              <p className="text-gray-600 text-sm">
                AI-powered extraction of key information from complex documents
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-soft">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600 text-sm">
                Get comprehensive analysis in seconds, not hours
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-soft">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UploadIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Upload</h3>
              <p className="text-gray-600 text-sm">
                Simple drag-and-drop interface for quick document processing
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Upload;
