// src/components/PageTransitionWrapper.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second loading time

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading ? <Loader /> : children}
    </>
  );
};

export default PageTransitionWrapper;
