import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Globe, 
  Mic, 
  Brain, 
  ArrowRight, 
  CheckCircle,
  Upload,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { t, getCurrentLanguageInfo } = useLanguage();
  const currentLang = getCurrentLanguageInfo();

  const features = [
    {
      icon: Brain,
      title: t('feature1Title'),
      description: t('feature1Desc'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe,
      title: t('feature2Title'),
      description: t('feature2Desc'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mic,
      title: t('feature3Title'),
      description: t('feature3Desc'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: CheckCircle,
      title: t('feature4Title'),
      description: t('feature4Desc'),
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Upload PDF',
      description: 'Upload your government scheme PDF document',
      icon: Upload
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our AI analyzes and extracts key information',
      icon: Brain
    },
    {
      step: '03',
      title: 'Get Results',
      description: 'Receive simplified, easy-to-understand insights',
      icon: BarChart3
    }
  ];



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 ${currentLang.fontClass}`}
            >
              {t('welcomeTitle')}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              {t('welcomeSubtitle')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/upload"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
              >
                <span>{t('getStarted')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/about"
                className="btn-secondary text-lg px-8 py-4"
              >
                {t('learnMore')}
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20"
        ></motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20"
        ></motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">{t('featuresTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how YojanaAI makes government schemes accessible to everyone
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">{t('howItWorksTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple three-step process to understand any government scheme
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2 z-0"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to understand government schemes?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of citizens who are already using YojanaAI to access public welfare programs
            </p>
            <Link
              to="/upload"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <span>Start Analyzing Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
