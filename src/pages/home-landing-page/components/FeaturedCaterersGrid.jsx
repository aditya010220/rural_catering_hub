import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FeaturedCaterersGrid = () => {
  const navigate = useNavigate();

  const featuredCaterers = [
    {
      id: 1,
      name: "Rajasthani Royal Kitchen",
      location: "Jodhpur, Rajasthan",
      specialty: "Traditional Rajasthani Thali",
      rating: 4.8,
      reviewCount: 156,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      priceRange: "₹200-500",
      isVerified: true,
      description: "Authentic royal recipes passed down through generations"
    },
    {
      id: 2,
      name: "South Spice Heritage",
      location: "Coimbatore, Tamil Nadu",
      specialty: "Traditional South Indian Meals",
      rating: 4.9,
      reviewCount: 203,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      priceRange: "₹150-400",
      isVerified: true,
      description: "Farm-fresh ingredients with traditional cooking methods"
    },
    {
      id: 3,
      name: "Bengali Delights",
      location: "Kolkata, West Bengal",
      specialty: "Bengali Sweets & Meals",
      rating: 4.7,
      reviewCount: 89,
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      priceRange: "₹180-450",
      isVerified: true,
      description: "Traditional Bengali flavors with modern presentation"
    },
    {
      id: 4,
      name: "Punjabi Dhaba Express",
      location: "Amritsar, Punjab",
      specialty: "Authentic Punjabi Cuisine",
      rating: 4.6,
      reviewCount: 134,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      priceRange: "₹250-600",
      isVerified: true,
      description: "Rich, hearty meals with traditional Punjabi spices"
    },
    {
      id: 5,
      name: "Gujarati Thali House",
      location: "Ahmedabad, Gujarat",
      specialty: "Complete Gujarati Thali",
      rating: 4.8,
      reviewCount: 167,
      image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      priceRange: "₹180-350",
      isVerified: true,
      description: "Sweet and savory Gujarati delicacies"
    },
    {
      id: 6,
      name: "Kerala Spice Garden",
      location: "Kochi, Kerala",
      specialty: "Traditional Kerala Meals",
      rating: 4.9,
      reviewCount: 198,
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      priceRange: "₹200-480",
      isVerified: true,
      description: "Coconut-based curries with aromatic spices"
    }
  ];

  const handleCatererClick = (catererId) => {
    navigate(`/product-catalog-browse?caterer=${catererId}`);
  };

  const handleQuickOrder = (catererId) => {
    navigate(`/product-catalog-browse?caterer=${catererId}&quick=true`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={14} color="#F59E0B" className="fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={14} color="#F59E0B" className="fill-current opacity-50" />);
    }

    return stars;
  };

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="content-max-width viewport-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Featured Caterers
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Discover authentic regional cuisine from our verified rural caterers across India
          </p>
          <Button
            variant="outline"
            iconName="Search"
            iconPosition="left"
            onClick={() => navigate('/product-catalog-browse')}
            className="cultural-hover-scale"
          >
            View All Caterers
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredCaterers.map((caterer) => (
            <div
              key={caterer.id}
              className="bg-surface rounded-cultural cultural-shadow-subtle border cultural-border overflow-hidden cultural-transition cultural-hover-scale cursor-pointer group"
              onClick={() => handleCatererClick(caterer.id)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={caterer.image}
                  alt={`${caterer.name} specialty dishes`}
                  className="w-full h-full object-cover group-hover:scale-105 cultural-transition"
                />
                {caterer.isVerified && (
                  <div className="absolute top-3 left-3 bg-success text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Icon name="CheckCircle" size={12} color="white" />
                    <span>Verified</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-text-primary">
                  {caterer.priceRange}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-1">
                    {caterer.name}
                  </h3>
                  <div className="flex items-center text-text-secondary text-sm mb-2">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {caterer.location}
                  </div>
                  <p className="text-primary font-medium text-sm">{caterer.specialty}</p>
                </div>

                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {caterer.description}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(caterer.rating)}
                    </div>
                    <span className="text-sm font-medium text-text-primary">{caterer.rating}</span>
                    <span className="text-xs text-text-secondary">({caterer.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCatererClick(caterer.id);
                    }}
                  >
                    View Menu
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ShoppingCart"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickOrder(caterer.id);
                    }}
                    className="min-touch-target"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaterersGrid;