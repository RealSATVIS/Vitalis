// src/signup/jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/icon.png';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef(null);

  const [form, setForm] = useState({
    role: '',
    username: '',
    mobile: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    return hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(form.mobile)) {
      setError(t('error_mobile'));
      return;
    }

    if (!validatePassword(form.password)) {
      setError(t('error_password'));
      return;
    }

    console.log('User signed up:', form);
    localStorage.setItem('username', form.username);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
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
            className="w-14 h-14 rounded-full border-2 border-green-500 mb-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate('/')}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <h2 className="text-2xl font-bold text-green-700">{t('heading')}</h2>
          <p className="text-sm text-gray-600 mt-1 text-center">{t('subheading')}</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="role" className="text-sm mb-1 block text-green-700">{t('role')}</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-green-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">{t('select_role')}</option>
              <option value="cultivator">{t('cultivator')}</option>
              <option value="agronomist">{t('agronomist')}</option>
              <option value="homesteader">{t('homesteader')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="username" className="text-sm mb-1 block text-green-700">{t('username')}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="text-sm mb-1 block text-green-700">{t('mobile')}</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              maxLength="10"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm mb-1 block text-green-700">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
            {t('button')}
          </Button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-700">
          {t('have_account')}{' '}
          <span
            onClick={() => navigate('/login/username')}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            {t('login')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;