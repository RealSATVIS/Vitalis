import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import farmImage from '../assets/farm-dashboard.jpg';
import leafScanImage from '../assets/leaf-scan.jpg';
import costEffectiveImage from '../assets/cost-effective.jpg';
import sustainabilityImage from '../assets/sustainability.jpg';

const About = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const features = [
    {
      id: 1,
      title: t('about.feature1.title'),
      description: t('about.feature1.description'),
      image: farmImage,
    },
    {
      id: 2,
      title: t('about.feature2.title'),
      description: t('about.feature2.description'),
      image: leafScanImage,
    },
    {
      id: 3,
      title: t('about.feature3.title'),
      description: t('about.feature3.description'),
      image: costEffectiveImage,
    },
    {
      id: 4,
      title: t('about.feature4.title'),
      description: t('about.feature4.description'),
      image: sustainabilityImage,
    },
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-700"
          >
            {t('about.title')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-center text-gray-700 mb-12"
          >
            {t('about.description')}
          </motion.p>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="rounded-lg shadow-lg w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/320';
                      e.target.alt = 'Feature placeholder';
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-16 bg-green-100 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-green-800 mb-3">
              {t('about.mission.title')}
            </h3>
            <p className="text-gray-700">
              {t('about.mission.description')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
