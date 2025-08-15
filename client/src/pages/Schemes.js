import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, MapPin, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Schemes = () => {
  const { t, getCurrentLanguageInfo } = useLanguage();
  const currentLang = getCurrentLanguageInfo();
  const [selectedScheme, setSelectedScheme] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const allSchemes = [
    {
      id: 1,
      name: 'PM Kisan Samman Nidhi',
      category: 'Agriculture',
      description: 'Direct income support to farmers',
      deadline: '2024-12-31',
      status: 'Active',
      location: 'All India',
      beneficiaries: '12 Crore+'
    },
    {
      id: 2,
      name: 'Ayushman Bharat',
      category: 'Healthcare',
      description: 'National health protection scheme',
      deadline: '2024-12-31',
      status: 'Active',
      location: 'All India',
      beneficiaries: '50 Crore+'
    },
    {
      id: 3,
      name: 'PM Awas Yojana',
      category: 'Housing',
      description: 'Housing for all by 2024',
      deadline: '2024-12-31',
      status: 'Active',
      location: 'All India',
      beneficiaries: '2 Crore+'
    },
    {
      id: 4,
      name: 'PM Fasal Bima Yojana',
      category: 'Agriculture',
      description: 'Crop insurance for farmers',
      deadline: '2024-12-31',
      status: 'Active',
      location: 'All India',
      beneficiaries: '8 Crore+'
    },
    {
      id: 5,
      name: 'PM Ujjwala Yojana',
      category: 'Women Empowerment',
      description: 'Free LPG connections to women',
      deadline: '2024-12-31',
      status: 'Active',
      location: 'All India',
      beneficiaries: '9 Crore+'
    },
    {
      id: 6,
      name: 'PM Jan Dhan Yojana',
      category: 'Financial Inclusion',
      description: 'Banking for all citizens',
      deadline: '2024-12-31',
      status: 'Active',
      location: 'All India',
      beneficiaries: '45 Crore+'
    }
  ];

  const [displayedSchemes, setDisplayedSchemes] = React.useState(allSchemes.slice(0, 3));
  const [currentPage, setCurrentPage] = React.useState(1);
  const schemesPerPage = 3;

  const categories = [
    'All Categories',
    'Agriculture',
    'Healthcare',
    'Housing',
    'Education',
    'Employment',
    'Women Empowerment',
    'Youth Development'
  ];

  const showSchemeDetails = (scheme) => {
    setSelectedScheme(scheme);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedScheme(null);
  };

  const loadMoreSchemes = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * schemesPerPage;
    setDisplayedSchemes(allSchemes.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
  };

  const hasMoreSchemes = displayedSchemes.length < allSchemes.length;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${currentLang.fontClass}`}>
            Government Schemes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore and discover government welfare schemes available for citizens. 
            Find the right scheme for you and your family.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes..."
                className="input-field pl-10"
              />
            </div>
            
            <select className="input-field">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <button className="btn-primary flex items-center justify-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSchemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="card hover:shadow-medium transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  scheme.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {scheme.status}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {scheme.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {scheme.description}
              </p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{scheme.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {scheme.deadline}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{scheme.beneficiaries} beneficiaries</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button 
                  className="w-full btn-primary text-sm"
                  onClick={() => showSchemeDetails(scheme)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {hasMoreSchemes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button 
              onClick={loadMoreSchemes}
              className="btn-secondary px-8 py-3"
            >
              Load More Schemes ({displayedSchemes.length}/{allSchemes.length})
            </button>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-6">
              Government Schemes Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-primary-100 text-sm">Active Schemes</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-primary-100 text-sm">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100Cr+</div>
                <div className="text-primary-100 text-sm">Citizens Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">₹10L+</div>
                <div className="text-primary-100 text-sm">Total Benefits</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scheme Details Modal */}
      {showModal && selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedScheme.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {selectedScheme.status}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{selectedScheme.category}</span>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                {selectedScheme.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedScheme.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-medium">{selectedScheme.deadline}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-500">Beneficiaries</p>
                    <p className="font-medium">{selectedScheme.beneficiaries}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">How to Apply:</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600">
                  <li>Visit the official government portal</li>
                  <li>Fill out the application form</li>
                  <li>Upload required documents</li>
                  <li>Submit and track your application</li>
                </ol>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Required Documents:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Aadhaar Card</li>
                  <li>Income Certificate</li>
                  <li>Caste Certificate (if applicable)</li>
                  <li>Bank Account Details</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button className="btn-primary flex-1">Apply Now</button>
              <button onClick={closeModal} className="btn-secondary flex-1">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Schemes;
