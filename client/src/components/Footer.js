import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t, currentLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: t('home'), href: '/' },
      { name: t('upload'), href: '/upload' },
      { name: t('analysis'), href: '/analysis' },
      { name: t('schemes'), href: '/schemes' },
    ],
    support: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Support', href: '/contact' },
    ],
    company: [
      { name: t('about'), href: '/about' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Careers', href: '/careers' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/akdinesh2003', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ak-dinesh-997946292', icon: Linkedin },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">YojanaAI</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Making government schemes accessible through AI technology
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>


        </div>



        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} YojanaAI. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Made with ❤️ for India</span>
              <span>•</span>
              <span>Version 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
