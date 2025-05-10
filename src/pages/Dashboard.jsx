// Dashboard.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Thermometer, Droplet, Wind, Sun, Gauge, Leaf, CloudRain, TrendingDown, Cloud,
  MoreVertical, User, LogOut
} from 'lucide-react';
import logo from '../assets/icon.png';
import DashboardFooter from './Dashboard_Footer';
import { useTranslation } from 'react-i18next';

const OpenWeathermap_API = process.env.REACT_APP_OpenWeatherMap_API_KEY;
const Weatherbit_API = process.env.REACT_APP_WeatherbitAg_API_KEY;

const cities = [
  { name: 'Delhi', lat: 28.6667, lon: 77.2167 },
  { name: 'Mumbai', lat: 19.0144, lon: 72.8479 },
  { name: 'Bangalore', lat: 12.9762, lon: 77.6033 },
  { name: 'Kolkata', lat: 22.5697, lon: 88.3697 },
  { name: 'Chennai', lat: 13.0878, lon: 80.2785 }
];

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [soil, setSoil] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
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

    const fetchData = async () => {
      try {
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${OpenWeathermap_API}&units=metric`
        );
        setWeather(weatherRes.data);

        const soilRes = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/agweather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&key=${Weatherbit_API}`
        );
        const soilData = soilRes.data?.data?.[0];
        setSoil(soilData || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCity, navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const getWeatherSummary = () => {
    if (!weather || !soil) {
      return {
        title: t('loading_title'),
        desc: t('loading_desc')
      };
    }

    const temp = weather.main.temp;
    const precip = soil.precip;

    if (temp > 30 && temp < 35 && precip > 1) {
      return {
        title: t('warm_rain_title'),
        desc: t('warm_rain_desc')
      };
    }

    if (temp > 35 && precip > 1) {
      return {
        title: t('very_hot_rainy_title'),
        desc: t('very_hot_rainy_desc')
      };
    }

    if (temp < 30 && precip === 0) {
      return {
        title: t('subtle_clear_title'),
        desc: t('subtle_clear_desc')
      };
    }

    return {
      title: t('variable_title'),
      desc: t('variable_desc')
    };
  };

  const getSoilSummary = () => {
    if (!soil) {
      return {
        title: t('soil_summary.loading_title'),
        desc: t('soil_summary.loading_desc')
      };
    }
    const moisture = soil.soilm_0_10cm;
    const evap = soil.evapotranspiration;
    const precip = soil.precip;

    if (moisture > 20 && evap < 6 && precip > 1) {
      return {
        title: t('soil_summary.optimal_title'),
        desc: t('soil_summary.optimal_desc')
      };
    }
    return {
      title: t('soil_summary.attention_title'),
      desc: t('soil_summary.attention_desc')
    };
  };

  const weatherSummary = getWeatherSummary();
  const soilSummary = getSoilSummary();

  const parameterCards = [
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-red-500 bg-opacity-20 rounded-full">
          <Thermometer className="text-red-600" size={26} strokeWidth={2.5} />
        </div>
      ),
      label: t('temperature'),
      value: `${weather?.main.temp ?? '--'} °C`,
      highlight: true
    },
    {
      icon: (
        <div className="flex items-center justify-center w-10 h-10 bg-blue-500 bg-opacity-20 rounded-full">
          <Leaf className="text-blue-600" size={26} strokeWidth={2.5} />
        </div>
      ),
      label: t('soil_moisture'),
      value: `${soil?.soilm_0_10cm ?? '--'} %`,
      highlight: true
    },
    {
      icon: <Droplet className="text-green-600" size={24} />,
      label: t('humidity'),
      value: `${weather?.main.humidity ?? '--'} %`
    },
    {
      icon: <Wind className="text-green-600" size={24} />,
      label: t('wind'),
      value: `${weather?.wind.speed ?? '--'} m/s`
    },
    {
      icon: <Sun className="text-green-600" size={24} />,
      label: t('condition'),
      value: weather ? `${weather.weather?.[0]?.main ?? ''}` : '--'
    },
    {
      icon: <Gauge className="text-green-600" size={24} />,
      label: t('pressure'),
      value: `${weather?.main.pressure ?? '--'} hPa`
    },
    {
      icon: <TrendingDown className="text-green-600" size={24} />,
      label: t('evapotranspiration'),
      value: `${soil?.evapotranspiration ?? '--'} mm/day`
    },
    {
      icon: <CloudRain className="text-green-600" size={24} />,
      label: t('precipitation'),
      value: `${soil?.precip ?? '--'} mm`
    },
    {
      icon: <Cloud className="text-green-600" size={24} />,
      label: t('deep_percolation'),
      value: soil?.precip && soil?.evapotranspiration
        ? `${(soil.precip - soil.evapotranspiration).toFixed(2)} mm/day`
        : '--'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center border-b border-green-200 relative">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Vitalis Logo"
            className="h-10 w-10 border-2 border-green-600 rounded-full p-1 transition-transform duration-300 hover:scale-110"
          />
          <span className="text-lg sm:text-xl font-semibold text-green-700">Vitalis</span>
        </div>
        <div className="flex items-center space-x-4 text-green-700 font-medium relative">
          <div className="relative">
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-green-600 text-white font-medium text-sm px-3 py-1 rounded-md shadow-sm border-none focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="en" className="text-black bg-white">English</option>
              <option value="hi" className="text-black bg-white">हिन्दी</option>
              <option value="ta" className="text-black bg-white">தமிழ்</option>
              <option value="kn" className="text-black bg-white">ಕನ್ನಡ</option>
              <option value="bn" className="text-black bg-white">বাংলা</option>
            </select>
          </div>
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

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* City Selector */}
        <div className="mb-6 flex justify-center">
          <select
            className="border border-green-300 px-4 py-2 rounded-md shadow-sm w-full sm:w-auto text-green-700 bg-white"
            value={selectedCity.name}
            onChange={(e) =>
              setSelectedCity(cities.find(city => city.name === e.target.value))
            }
          >
            {cities.map(city => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-green-700">{t('dashboard_title')}</h2>
          <p className="text-base sm:text-lg text-green-600">{t('dashboard_subtitle')}</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {parameterCards.map((card, index) => (
            <InfoCard
              key={index}
              icon={card.icon}
              label={card.label}
              value={card.value}
            />
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <SummaryCard
            title={t('weather_analysis')}
            highlight={weatherSummary.title}
            description={weatherSummary.desc}
            icon="🌤️"
          />
          <SummaryCard
            title={t('soil_status')}
            highlight={soilSummary.title}
            description={soilSummary.desc}
            icon="🧪"
          />
        </div>

        {/* Leaf Detection Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
          <button
            onClick={() => navigate('/detection/detection')}
            className="bg-green-600 text-white font-serif font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-green-700"
          >
            {t('tomato_leaf_detection')}
          </button>
          <button
            onClick={() => navigate('/detection/potato')}
            className="bg-green-600 text-white font-serif font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-green-700"
          >
            {t('potato_leaf_detection')}
          </button>
        </div>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

// InfoCard Component
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-green-100 p-4 sm:p-5 rounded-xl shadow-md flex flex-col gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-green-300 hover:bg-green-200 border border-green-300">
    <div className="flex items-center gap-3 text-green-700 text-base sm:text-lg font-semibold">
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-lg sm:text-xl font-bold text-green-800">{value}</p>
  </div>
);

// SummaryCard Component
const SummaryCard = ({ title, highlight, description, icon }) => (
  <div className="bg-green-50 p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-green-300 hover:bg-green-100 border border-green-200">
    <div className="flex items-center gap-3 sm:gap-4 mb-2 text-base sm:text-xl font-semibold text-green-800">
      <span className="text-2xl sm:text-3xl">{icon}</span>
      {title}
    </div>
    <p className="text-green-700 font-bold text-base sm:text-lg">{highlight}</p>
    <p className="text-sm text-gray-700 mt-2">{description}</p>
  </div>
);

export default Dashboard;
