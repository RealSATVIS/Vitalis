import React from 'react';
import { Activity, BarChart2, Clock, Heart, Smartphone, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Activity className="w-10 h-10 text-primary transition-colors duration-200 group-hover:text-green-600" />,
      title: t("features.crop_health.title"),
      description: t("features.crop_health.description")
    },
    {
      icon: <BarChart2 className="w-10 h-10 text-primary transition-colors duration-200 group-hover:text-green-600" />,
      title: t("features.data_analytics.title"),
      description: t("features.data_analytics.description")
    },
    {
      icon: <Clock className="w-10 h-10 text-primary transition-colors duration-200 group-hover:text-green-600" />,
      title: t("features.realtime_monitoring.title"),
      description: t("features.realtime_monitoring.description")
    },
    {
      icon: <Heart className="w-10 h-10 text-primary transition-colors duration-200 group-hover:text-green-600" />,
      title: t("features.ai_detection.title"),
      description: t("features.ai_detection.description")
    },
    {
      icon: <Smartphone className="w-10 h-10 text-primary transition-colors duration-200 group-hover:text-green-600" />,
      title: t("features.mobile_integration.title"),
      description: t("features.mobile_integration.description")
    },
    {
      icon: <Users className="w-10 h-10 text-primary transition-colors duration-200 group-hover:text-green-600" />,
      title: t("features.community_support.title"),
      description: t("features.community_support.description")
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("features.heading")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("features.subheading")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card p-6 rounded-lg shadow-sm border transition-all duration-200 hover:bg-green-50 hover:border-green-400 hover:shadow-md"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
