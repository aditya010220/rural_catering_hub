import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const navigate = useNavigate();

  const heroData = {
    title: "Authentic Rural Flavors",
    subtitle: "Delivered to Your Doorstep",
    description: "Discover traditional Indian cuisine crafted by skilled rural caterers. Experience the rich heritage and authentic flavors of regional cooking.",
    backgroundImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ctaButtons: [
      { label: "Explore Caterers", action: () => navigate('/product-catalog-browse'), variant: "primary", icon: "Search" },
      { label: "Sell Your Catering", action: () => navigate('/caterer-admin-dashboard'), variant: "secondary", icon: "ChefHat" },
      { label: "View Menu", action: () => navigate('/product-catalog-browse'), variant: "outline", icon: "Menu" }
    ]
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroData.backgroundImage}
          alt="Traditional Indian dishes spread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-text-primary/80 via-text-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 content-max-width viewport-padding text-center lg:text-left">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface mb-4 cultural-slide-up">
            {heroData.title}
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-secondary mb-6 cultural-slide-up">
            {heroData.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-surface/90 mb-8 leading-relaxed cultural-slide-up">
            {heroData.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start cultural-slide-up">
            {heroData.ctaButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                onClick={button.action}
                iconName={button.icon}
                iconPosition="left"
                size="lg"
                className="min-touch-target cultural-hover-scale"
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-surface rounded-full flex justify-center">
            <div className="w-1 h-3 bg-surface rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;