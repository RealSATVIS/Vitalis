import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from './ui/dialog';
import { Button } from './ui/button';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' }
];

const LanguageSelectionDialog = () => {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('language-preference');
    if (!hasSelectedLanguage) {
      setOpen(true);
    }
  }, []);

  const selectLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language-preference', langCode);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-[95%] max-w-md mx-auto sm:max-w-md border-4 border-green-500 shadow-lg shadow-green-300/60 p-4 sm:p-6 rounded-xl"
        >
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold text-center">
              Choose Your Language
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Select your preferred language for the best experience
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3">
            {LANGUAGES.map((lang) => (
              <motion.div
                key={lang.code}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-medium h-12 text-base px-4 transition-colors duration-200 hover:bg-green-100 hover:text-green-700"
                  onClick={() => selectLanguage(lang.code)}
                >
                  {lang.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
};

export default LanguageSelectionDialog;
