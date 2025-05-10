import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, User, LogOut, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/icon.png';
import DashboardFooter from '../../pages/Dashboard_Footer';
import { useTranslation } from 'react-i18next';

const PotatoDetection = () => {
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (!user) {
      navigate('/login');
    } else {
      setUsername(user);
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsAnalyzing(false);
      setAnalysisComplete(false);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setImageCount((prev) => (prev + 1) % 3);
    }, 2000);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const getDiseaseInfo = () => {
    const diseases = [
      {
        severity: t('moderateSeverity'),
        confidence: '75% confidence',
        disease: 'Moderate Blight',
        symptoms: [t('symptom1'), t('symptom2'), t('symptom3'), t('symptom4')],
        cures: [t('cure1'), t('cure2'), t('cure3')],
      },
      {
        severity: t('mediumSeverity'),
        confidence: '85% confidence',
        disease: 'Early Blight',
        symptoms: [t('symptom5'), t('symptom6'), t('symptom7'), t('symptom8')],
        cures: [t('cure4'), t('cure5'), t('cure6')],
      },
      {
        severity: t('highSeverity'),
        confidence: '90% confidence',
        disease: 'Late Blight',
        symptoms: [t('symptom9'), t('symptom10'), t('symptom11'), t('symptom12')],
        cures: [t('cure7'), t('cure8'), t('cure9')],
      },
    ];
    return diseases[imageCount];
  };

  const speakCures = () => {
    try {
      const curesText = getDiseaseInfo().cures.join(', ');
      const language = i18n.language;
      
      // Check if browser supports speech synthesis
      if (!window.speechSynthesis) {
        console.error('Speech synthesis not supported in this browser');
        return;
      }
      
      // Map language codes to BCP 47 language tags that are widely supported
      const languageMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'ta': 'ta-IN',
        'kn': 'kn-IN',
        'bn': 'bn-IN', // Changed from bn-BD to bn-IN for better support
      };

      const speech = new SpeechSynthesisUtterance(curesText);
      speech.lang = languageMap[language] || 'en-US';
      speech.rate = 0.9; // Slightly slower for better clarity
      speech.pitch = 1;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a voice for the specific language
      if (voices.length > 0) {
        // Find voice that supports the language
        const voiceForLanguage = voices.find(voice => 
          voice.lang.startsWith(language) || 
          voice.lang.startsWith(languageMap[language].split('-')[0])
        );
        
        if (voiceForLanguage) {
          speech.voice = voiceForLanguage;
        }
      }
      
      // Cancel any ongoing speech before starting new one
      window.speechSynthesis.cancel();
      
      // Start speaking
      window.speechSynthesis.speak(speech);
      
      // Debugging
      console.log(`Speaking in ${speech.lang} with voice: ${speech.voice?.name || 'default'}`);
    } catch (error) {
      console.error('Error in speech synthesis:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-600 text-gray-800 flex flex-col justify-between">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center border-b border-green-200 relative">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Vitalis Logo"
            className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-green-600 rounded-full p-1 cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={() => navigate('/')}
          />
          <span className="text-lg sm:text-xl font-semibold text-green-700">Vitalis</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switch */}
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded focus:outline-none"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="bn">বাংলা</option>
          </select>

          {/* Profile Dropdown */}
          <div className="flex items-center space-x-2 text-green-700 font-medium relative">
            <span className="hidden sm:inline">{username}</span>
            <button onClick={() => setShowDropdown(!showDropdown)}>
              <MoreVertical size={20} />
            </button>
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-12 mt-2 w-40 bg-white rounded-md shadow-lg border z-50"
              >
                <button
                  onClick={handleProfile}
                  className="flex items-center gap-2 px-4 py-2 w-full text-sm hover:bg-gray-100"
                >
                  <User size={16} /> {t('profile')}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 w-full text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} /> {t('logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 justify-center py-6 px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
            {t('potato_leaf_detection')}
          </h1>

          <div className="flex justify-center mb-6 relative">
            {selectedImage ? (
              <div className="relative w-full max-w-xs">
                <img
                  src={selectedImage}
                  alt="Selected Leaf"
                  className="w-full h-auto rounded-md border border-gray-300 object-contain"
                />
                <button
                  onClick={handleImageRemove}
                  className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-red-100"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full max-w-xs h-56 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md text-gray-400 text-sm">
                {t('noImage')}
              </div>
            )}
          </div>

          <div className="flex justify-center mb-6">
            <label htmlFor="imageUpload">
              <span className="bg-green-600 text-white px-5 py-2 rounded-md font-medium cursor-pointer hover:bg-green-700">
                {t('uploadImage')}
              </span>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {selectedImage && !analysisComplete && !isAnalyzing && (
            <div className="flex justify-center mb-6">
              <button
                onClick={handleAnalyze}
                className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700"
              >
                {t('analyze')}
              </button>
            </div>
          )}

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-blue-600 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <p className="mt-3 text-blue-600 font-medium">{t('analyzing')}</p>
            </div>
          )}

          {analysisComplete && (
            <div className="bg-gray-50 border-l-4 border-red-500 rounded-md p-4 shadow text-sm sm:text-base space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-red-600 font-semibold">{getDiseaseInfo().severity}</span>
                  <span className="text-xs text-gray-500">{getDiseaseInfo().confidence}</span>
                </div>
                <p className="font-semibold text-gray-700">
                  {t('detectedDisease')}{' '}
                  <span className="text-red-600">{getDiseaseInfo().disease}</span>
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">{t('symptoms')}:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {getDiseaseInfo().symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-1">{t('cures')}:</p>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  {getDiseaseInfo().cures.map((cure, idx) => (
                    <li key={idx}>{cure}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={speakCures}
                  className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700"
                >
                  {t('readCures')}
                </button>
                
                {/* Fallback text display for unsupported browsers/languages */}
                <button
                  onClick={() => window.speechSynthesis?.cancel()}
                  className="bg-red-500 text-white px-5 py-2 rounded-md font-medium hover:bg-red-600"
                >
                  {t('stop')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
};

export default PotatoDetection;