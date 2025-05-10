import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import About from './components/About';
import Footer from './components/Footer';
import PageTransitionWrapper from './components/PageTransitionWrapper';

import './i18n/i18n';

import Detection from './pages/detection/Detection';
import PotatoDetection from './pages/detection/PotatoDetection'; // ✅ New import
import Username from './login/Username';
import Passwd from './login/Passwd';
import Dashboard from './pages/Dashboard';
import Signup from './signup/Signup';
import LanguageSelectionDialog from './components/LanguageSelectionDialog';
import Marketplace from './pages/marketplace/Marketplace';

function Home() {
  return (
    <>
      <Header />
      <LanguageSelectionDialog />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
        <About />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageTransitionWrapper><Home /></PageTransitionWrapper>} />
        <Route path="/login/username" element={<PageTransitionWrapper><Username /></PageTransitionWrapper>} />
        <Route path="/login/passwd" element={<PageTransitionWrapper><Passwd /></PageTransitionWrapper>} />
        <Route path="/detection/detection" element={<PageTransitionWrapper><Detection /></PageTransitionWrapper>} />
        <Route path="/detection/potato" element={<PageTransitionWrapper><PotatoDetection /></PageTransitionWrapper>} /> {/* ✅ New route */}
        <Route path="/signup" element={<PageTransitionWrapper><Signup /></PageTransitionWrapper>} />
        <Route path="/dashboard" element={<PageTransitionWrapper><Dashboard /></PageTransitionWrapper>} />
        <Route path="/marketplace" element={<PageTransitionWrapper><Marketplace /></PageTransitionWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
