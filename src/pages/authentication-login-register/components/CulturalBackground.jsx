import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CulturalBackground = () => {
  const culturalElements = [
    {
      icon: 'UtensilsCrossed',
      title: 'Authentic Flavors',
      description: 'Traditional recipes passed down through generations'
    },
    {
      icon: 'Heart',
      title: 'Made with Love',
      description: 'Every dish crafted with care and passion'
    },
    {
      icon: 'Users',
      title: 'Community Driven',
      description: 'Supporting local caterers and rural communities'
    }
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary-300 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-secondary-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 border-2 border-accent-300 rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 border-2 border-primary-300 rounded-full"></div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col justify-center items-center p-12 relative z-10 w-full">
        {/* Hero Image */}
        <div className="mb-8 relative">
          <div className="w-80 h-80 rounded-full overflow-hidden cultural-shadow-moderate">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Traditional Indian cooking with clay pots and spices"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center cultural-shadow-subtle">
            <Icon name="ChefHat" size={28} color="white" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center cultural-shadow-subtle">
            <Icon name="Sparkles" size={28} color="white" />
          </div>
        </div>
        
        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
            Welcome to Rural Catering Hub
          </h1>
          <p className="text-lg text-text-secondary max-w-md">
            Discover authentic regional cuisine from traditional caterers across India. 
            Connect with local flavors and support rural communities.
          </p>
        </div>
        
        {/* Cultural Features */}
        <div className="space-y-6 w-full max-w-md">
          {culturalElements.map((element, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-surface rounded-lg cultural-shadow-subtle">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={element.icon} size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-1">{element.title}</h3>
                <p className="text-sm text-text-secondary">{element.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-8 flex items-center space-x-6 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-text-secondary">Caterers</div>
          </div>
          <div className="w-px h-8 bg-surface-300"></div>
          <div>
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-sm text-text-secondary">Happy Customers</div>
          </div>
          <div className="w-px h-8 bg-surface-300"></div>
          <div>
            <div className="text-2xl font-bold text-primary">25+</div>
            <div className="text-sm text-text-secondary">States Covered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalBackground;