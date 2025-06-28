import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FavoriteCatererCard = ({ caterer, onViewMenu, onRemoveFavorite, onQuickOrder }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} color="var(--color-warning)" className="fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="StarHalf" size={14} color="var(--color-warning)" className="fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} color="var(--color-surface-300)" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border overflow-hidden cultural-hover-scale">
      {/* Caterer Image */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={caterer.coverImage}
          alt={caterer.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            iconName="Heart"
            onClick={() => onRemoveFavorite(caterer.id)}
            className="p-2 bg-surface bg-opacity-90 text-error hover:text-error"
          />
        </div>
        {caterer.isOnline && (
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-1 bg-success text-white text-xs rounded-full font-medium flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
              Online
            </span>
          </div>
        )}
      </div>

      {/* Caterer Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-text-primary mb-1">
              {caterer.name}
            </h3>
            <p className="text-sm text-text-secondary">{caterer.cuisine}</p>
          </div>
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(caterer.rating)}
            <span className="text-sm font-medium text-text-primary ml-1">
              {caterer.rating}
            </span>
          </div>
          <span className="text-sm text-text-secondary">
            {caterer.totalOrders}+ orders
          </span>
        </div>

        {/* Location and Delivery */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-text-secondary">
            <Icon name="MapPin" size={14} className="mr-2" />
            {caterer.location}
          </div>
          <div className="flex items-center text-sm text-text-secondary">
            <Icon name="Clock" size={14} className="mr-2" />
            {caterer.deliveryTime} mins • ₹{caterer.deliveryFee} delivery
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <p className="text-xs text-text-secondary mb-2">Popular Dishes:</p>
          <div className="flex flex-wrap gap-1">
            {caterer.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary-50 text-secondary text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
            {caterer.specialties.length > 3 && (
              <span className="px-2 py-1 bg-surface-100 text-text-secondary text-xs rounded-full">
                +{caterer.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            iconName="Menu"
            iconPosition="left"
            onClick={() => onViewMenu(caterer.id)}
            className="flex-1"
          >
            View Menu
          </Button>
          <Button
            variant="primary"
            iconName="ShoppingCart"
            iconPosition="left"
            onClick={() => onQuickOrder(caterer.id)}
            className="flex-1"
          >
            Quick Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCatererCard;