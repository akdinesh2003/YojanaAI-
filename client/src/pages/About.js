import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Award, Globe, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t, getCurrentLanguageInfo } = useLanguage();
  const currentLang = getCurrentLanguageInfo();

  const values = [
    {
      icon: Heart,
      title: 'Citizen-Centric',
      description: 'We put citizens first, making government services accessible to everyone'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data security and privacy are our top priorities'
    },
    {
      icon: Globe,
      title: 'Inclusive',
      description: 'Supporting multiple languages to serve diverse communities'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI to solve real-world problems'
    }
  ];

  const team = [
    {
      name: 'AI Engineers',
      role: 'Machine Learning & NLP',
      description: 'Building intelligent systems that understand government documents'
    },
    {
      name: 'Language Experts',
      role: 'Regional Languages',
      description: 'Ensuring accurate translations and cultural context'
    },
    {
      name: 'UX Designers',
      role: 'User Experience',
      description: 'Creating intuitive interfaces for all age groups'
    },
    {
      name: 'Policy Analysts',
      role: 'Government Schemes',
      description: 'Understanding and interpreting public welfare programs'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl font-bold text-gray-900 mb-4 ${currentLang.fontClass}`}>
            About YojanaAI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to bridge the gap between government policies and public understanding. 
            Our AI-powered platform makes complex government schemes accessible to every citizen.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-16"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To democratize access to government welfare information by leveraging artificial intelligence 
              and making complex documents understandable in multiple languages for all citizens.
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="section-title text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="text-center p-6 bg-white rounded-lg shadow-soft"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default About;
