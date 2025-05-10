import React from 'react';
import logo from '../assets/icon.png'; // Adjust the path if necessary

const DashboardFooter = () => {
  return (
    <footer className="bg-green-50 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
        {/* Brand + Description + Social Icons */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={logo}
              alt="Vitalis Logo"
              className="h-10 w-10 rounded-full border border-green-600 p-1"
            />
            <span className="text-xl font-semibold text-green-700">Vitalis</span>
          </div>
          <p className="text-sm mb-4 max-w-sm">
            Smart Real-time Crop Health Monitoring, Disease Detection and Management Hub
          </p>
          
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © 2025 Vitalis. All rights reserved.
      </div>
    </footer>
  );
};

export default DashboardFooter;
