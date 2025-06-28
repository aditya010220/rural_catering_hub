import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickViewModal = ({ dish, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !dish) return null;

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
      stars.push(<Icon key={i} name="Star" size={16} className="text-secondary fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="StarHalf" size={16} className="text-secondary fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={16} className="text-surface-300" />);
    }

    return stars;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-text-primary bg-opacity-75" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-surface rounded-lg cultural-shadow-prominent max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-surface rounded-full flex items-center justify-center cultural-shadow-subtle hover:bg-surface-100 cultural-transition"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <Image
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional Images */}
            {dish.additionalImages && dish.additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {dish.additionalImages.slice(0, 4).map((img, index) => (
                  <div key={index} className="aspect-square rounded overflow-hidden">
                    <Image
                      src={img}
                      alt={`${dish.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 cultural-transition cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-heading font-bold text-text-primary">{dish.name}</h2>
                <button className="w-10 h-10 bg-surface-100 rounded-full flex items-center justify-center hover:bg-surface-200 cultural-transition">
                  <Icon name="Heart" size={20} className="text-text-secondary" />
                </button>
              </div>
              
              <p className="text-text-secondary mb-3">{dish.category}</p>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {dish.isVeg && (
                  <span className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                    <Icon name="Leaf" size={14} className="inline mr-1" />
                    Vegetarian
                  </span>
                )}
                {dish.isSpicy && (
                  <span className="bg-error text-error-foreground px-3 py-1 rounded-full text-sm font-medium">
                    <Icon name="Flame" size={14} className="inline mr-1" />
                    Spicy
                  </span>
                )}
                {dish.isPopular && (
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    <Icon name="TrendingUp" size={14} className="inline mr-1" />
                    Popular Choice
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(dish.rating)}
                </div>
                <span className="font-semibold text-text-primary">{dish.rating}</span>
                <span className="text-text-secondary">({dish.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-2">Description</h3>
              <p className="text-text-secondary leading-relaxed">{dish.description}</p>
            </div>

            {/* Caterer Story */}
            <div className="bg-surface-50 rounded-lg p-4">
              <h3 className="font-heading font-semibold text-text-primary mb-3">About the Caterer</h3>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="ChefHat" size={20} className="text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{dish.caterer.name}</h4>
                  <p className="text-sm text-text-secondary mb-2">{dish.caterer.location}</p>
                  <p className="text-sm text-text-secondary">{dish.caterer.story}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Users" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-text-primary">Serving Size</span>
                </div>
                <p className="text-text-secondary">{dish.servingSize} people</p>
              </div>
              
              <div className="bg-surface-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Clock" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-text-primary">Prep Time</span>
                </div>
                <p className="text-text-secondary">{dish.preparationTime} minutes</p>
              </div>
            </div>

            {/* Ingredients */}
            {dish.ingredients && (
              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="bg-surface-100 text-text-secondary px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Actions */}
            <div className="border-t cultural-border-light pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-primary">{formatPrice(dish.price)}</span>
                  {dish.originalPrice && dish.originalPrice > dish.price && (
                    <span className="text-lg text-text-muted line-through ml-3">
                      {formatPrice(dish.originalPrice)}
                    </span>
                  )}
                </div>
                
                {dish.originalPrice && dish.originalPrice > dish.price && (
                  <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Save {formatPrice(dish.originalPrice - dish.price)}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  iconName="ShoppingCart"
                  iconPosition="left"
                  onClick={() => {
                    onAddToCart(dish);
                    onClose();
                  }}
                  className="flex-1 min-touch-target"
                >
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  iconName="Heart"
                  className="min-touch-target"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;