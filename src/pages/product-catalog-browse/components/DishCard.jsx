import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DishCard = ({ dish, onAddToCart, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await onAddToCart(dish);
    setIsLoading(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={14} className="text-secondary fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="StarHalf" size={14} className="text-secondary fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-surface-300" />);
    }

    return stars;
  };

  return (
    <div 
      className="bg-surface rounded-lg cultural-shadow-subtle overflow-hidden cultural-transition cultural-hover-scale group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <Image
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 cultural-transition"
        />
        
        {/* Quick View Overlay */}
        <div className={`absolute inset-0 bg-text-primary bg-opacity-50 flex items-center justify-center cultural-transition ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="surface"
            iconName="Eye"
            onClick={() => onQuickView(dish)}
            className="cultural-shadow-moderate"
          >
            Quick View
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {dish.isVeg && (
            <div className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
              <Icon name="Leaf" size={12} className="inline mr-1" />
              Veg
            </div>
          )}
          {dish.isSpicy && (
            <div className="bg-error text-error-foreground px-2 py-1 rounded text-xs font-medium">
              <Icon name="Flame" size={12} className="inline mr-1" />
              Spicy
            </div>
          )}
          {dish.isPopular && (
            <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
              <Icon name="TrendingUp" size={12} className="inline mr-1" />
              Popular
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-2 right-2 w-8 h-8 bg-surface rounded-full flex items-center justify-center cultural-shadow-subtle cultural-transition hover:bg-surface-100">
          <Icon name="Heart" size={16} className="text-text-secondary" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Dish Name & Category */}
        <div className="mb-2">
          <h3 className="font-heading font-semibold text-text-primary text-lg mb-1 line-clamp-1">
            {dish.name}
          </h3>
          <p className="text-sm text-text-secondary">{dish.category}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {dish.description}
        </p>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(dish.rating)}
          </div>
          <span className="text-sm font-medium text-text-primary">{dish.rating}</span>
          <span className="text-sm text-text-secondary">({dish.reviewCount} reviews)</span>
        </div>

        {/* Caterer Info */}
        <div className="flex items-center gap-2 mb-3 p-2 bg-surface-50 rounded">
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <Icon name="ChefHat" size={12} className="text-accent-foreground" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-primary">{dish.caterer.name}</p>
            <p className="text-xs text-text-secondary">{dish.caterer.location}</p>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">{formatPrice(dish.price)}</span>
            {dish.originalPrice && dish.originalPrice > dish.price && (
              <span className="text-sm text-text-muted line-through ml-2">
                {formatPrice(dish.originalPrice)}
              </span>
            )}
          </div>
          
          <Button
            variant="primary"
            iconName="ShoppingCart"
            iconPosition="left"
            onClick={handleAddToCart}
            loading={isLoading}
            className="min-touch-target"
          >
            Add
          </Button>
        </div>

        {/* Serving Info */}
        <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
          <span>Serves {dish.servingSize}</span>
          <span>{dish.preparationTime} mins</span>
        </div>
      </div>
    </div>
  );
};

export default DishCard;