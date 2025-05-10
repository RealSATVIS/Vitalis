import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import dashboardPreview from '../assets/Dashboard/front_icon.jpg';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation(); // translation hook

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Content */}
        <div className="max-w-xl">
          <span className="text-sm text-green-600 font-semibold uppercase tracking-wide">
            {t('Launching Soon')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold my-4">
            {t('Vitality for the')} <span className="text-green-600">{t('Digital Age')}</span>
          </h1>
          <p className="text-gray-700 mb-6">
            {t('Hero Description')}
          </p>
          <div className="flex gap-4">
            <Link to="/login/username">
              <Button size="lg">{t('Login')}</Button>
            </Link>
            <Button variant="outline" size="lg">{t('Learn More')}</Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-shrink-0">
          <img
            src={dashboardPreview}
            alt="Vitalis Dashboard"
            className="rounded-xl shadow-xl w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
