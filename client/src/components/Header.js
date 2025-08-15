import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Globe, FileText, Upload, BarChart3, Home, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, currentLanguage, changeLanguage, getAllLanguages } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: t('home'), href: '/', icon: Home },
    { name: t('upload'), href: '/upload', icon: Upload },
    { name: t('analysis'), href: '/analysis', icon: BarChart3 },
    { name: t('schemes'), href: '/schemes', icon: FileText },
    { name: t('about'), href: '/about', icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-soft border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">YojanaAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                onClick={() => {
                  const currentIndex = getAllLanguages().findIndex(lang => lang.code === currentLanguage);
                  const nextIndex = (currentIndex + 1) % getAllLanguages().length;
                  changeLanguage(getAllLanguages()[nextIndex].code);
                }}
              >
                <Globe className="w-4 h-4" />
                <span>{getAllLanguages().find(lang => lang.code === currentLanguage)?.nativeName}</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-100"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          
          {/* Mobile Language Switcher */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Language</span>
              <div className="flex space-x-2">
                {getAllLanguages().map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      changeLanguage(language.code);
                      closeMobileMenu();
                    }}
                    className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                      currentLanguage === language.code
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {language.flag} {language.nativeName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
