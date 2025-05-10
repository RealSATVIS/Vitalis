// src/components/Loader.jsx
import logo from '../assets/icon.png';
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <motion.img
        src={logo}
        alt="Loading..."
        className="w-16 h-16 rounded-full border-2 border-green-500"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default Loader;
