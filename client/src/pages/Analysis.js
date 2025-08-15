import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Brain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Analysis = () => {
  const { t, getCurrentLanguageInfo } = useLanguage();
  const currentLang = getCurrentLanguageInfo();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${currentLang.fontClass}`}>
            AI Analysis Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View and manage your PDF analysis results. Get insights about government schemes in your preferred language.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analysis History */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="subsection-title">Analysis History</h2>
            </div>
            
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No analysis results yet</p>
              <p className="text-sm text-gray-400">
                Upload a PDF to get started with AI analysis
              </p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="subsection-title">Quick Actions</h2>
            </div>
            
            <div className="space-y-4">
              <button className="w-full btn-primary">
                Upload New PDF
              </button>
              <button className="w-full btn-secondary">
                View All Schemes
              </button>
              <button className="w-full btn-secondary">
                Export Results
              </button>
            </div>
          </motion.div>
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Advanced Analysis Features Coming Soon
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're working on advanced features including batch processing, 
              comparison tools, and detailed reporting capabilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-primary-600 shadow-sm">
                Batch Processing
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-primary-600 shadow-sm">
                Comparison Tools
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-primary-600 shadow-sm">
                Detailed Reports
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-primary-600 shadow-sm">
                API Access
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analysis;
