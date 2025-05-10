import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/icon.png';
import { motion, AnimatePresence } from 'framer-motion';

const Username = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const validUsernames = ['Rimi', 'IceHawk', 'Yash', 'vitalis'];
  
  // Language options with short display codes
  const languages = [
    { code: 'en', name: 'English', display: 'EN' },
    { code: 'hi', name: 'हिंदी', display: 'हिं' },  // Hindi
    { code: 'ta', name: 'தமிழ்', display: 'த' },   // Tamil
    { code: 'kn', name: 'ಕನ್ನಡ', display: 'ಕ' },   // Kannada
    { code: 'bn', name: 'বাংলা', display: 'বা' }   // Bengali
  ];

  // Get current language display
  const getCurrentLangDisplay = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];
    return currentLang.code === 'en' ? 'EN/हिं' : `${languages[0].display}/${currentLang.display}`;
  };

  // Function to change language
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim()) {
      if (validUsernames.includes(username)) {
        localStorage.setItem('username', username);
        navigate('/login/passwd');
      } else {
        alert(t('invalid_username'));
      }
    } else if (mobile.trim()) {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (mobileRegex.test(mobile)) {
        localStorage.setItem('mobile', mobile);
        navigate('/login/otp');
      } else {
        alert(t('invalid_mobile'));
      }
    } else {
      alert(t('enter_username_or_mobile'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex flex-col items-center justify-center">
      {/* Language switcher */}
      <div className="absolute top-4 right-4" ref={dropdownRef}>
        <motion.button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center px-3 py-2 bg-white text-green-700 font-semibold rounded shadow-md"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 10px rgba(34, 197, 94, 0.6)"
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {getCurrentLangDisplay()}
        </motion.button>
        
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div 
              className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    i18n.language === lang.code
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-gray-700'
                  }`}
                  whileHover={{ 
                    backgroundColor: i18n.language === lang.code ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)',
                    color: 'rgb(21, 128, 61)'
                  }}
                >
                  {lang.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <motion.img
            src={logo}
            alt="Vitalis Logo"
            onClick={() => navigate('/')}
            className="w-14 h-14 rounded-full border-2 border-green-500 mb-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <h2 className="text-2xl font-bold text-green-700">{t('welcome')}</h2>
          <p className="text-sm text-gray-600 mt-1 text-center">
            {t('prompt')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={t('username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="text-center font-medium text-gray-500">{t('or')}</div>
          <input
            type="text"
            placeholder={t('mobile')}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
          >
            {t('next')}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          {t('no_account')}{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            {t('signup')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Username;