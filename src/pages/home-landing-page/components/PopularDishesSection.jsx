import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PopularDishesSection = () => {
  const navigate = useNavigate();

  const popularDishes = [
    {
      id: 1,
      name: "Traditional Dal Baati Churma",
      caterer: "Meera Devi",
      location: "Jodhpur, Rajasthan",
      price: 299,
      originalPrice: 349,
      rating: 4.8,
      reviewCount: 156,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      category: "Rajasthani",
      isVegetarian: true,
      cookingTime: "45 mins",
      description: "Authentic royal recipe with hand-ground spices and traditional preparation methods"
    },
    {
      id: 2,
      name: "South Indian Thali",
      caterer: "Lakshmi Amma",
      location: "Coimbatore, Tamil Nadu",
      price: 249,
      originalPrice: 299,
      rating: 4.9,
      reviewCount: 203,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      category: "South Indian",
      isVegetarian: true,
      cookingTime: "30 mins",
      description: "Farm-fresh vegetables with coconut-based curries and homemade sambar"
    },
    {
      id: 3,
      name: "Bengali Fish Curry",
      caterer: "Ruma Chakraborty",
      location: "Kolkata, West Bengal",
      price: 329,
      originalPrice: 379,
      rating: 4.7,
      reviewCount: 89,
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      category: "Bengali",
      isVegetarian: false,
      cookingTime: "40 mins",
      description: "Fresh river fish cooked in traditional Bengali spices with mustard oil"
    },
    {
      id: 4,
      name: "Punjabi Butter Chicken",
      caterer: "Harpreet Singh",
      location: "Amritsar, Punjab",
      price: 379,
      originalPrice: 429,
      rating: 4.6,
      reviewCount: 134,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      category: "Punjabi",
      isVegetarian: false,
      cookingTime: "35 mins",
      description: "Creamy tomato-based curry with tender chicken and authentic dhaba spices"
    },
    {
      id: 5,
      name: "Gujarati Thali",
      caterer: "Kiran Ben",
      location: "Ahmedabad, Gujarat",
      price: 199,
      originalPrice: 249,
      rating: 4.8,
      reviewCount: 167,
      image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      category: "Gujarati",
      isVegetarian: true,
      cookingTime: "25 mins",
      description: "Complete vegetarian meal with sweet and savory dishes from Gujarat"
    },
    {
      id: 6,
      name: "Assorted Bengali Sweets",
      caterer: "Ruma Chakraborty",
      location: "Kolkata, West Bengal",
      price: 159,
      originalPrice: 199,
      rating: 4.9,
      reviewCount: 198,
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      category: "Sweet Dishes",
      isVegetarian: true,
      cookingTime: "15 mins",
      description: "Handmade traditional sweets including Sandesh, Rasgulla, and Mishti Doi"
    }
  ];

  const handleDishClick = (dishId) => {
    navigate(`/product-catalog-browse?dish=${dishId}`);
  };

  const handleAddToCart = (dish) => {
    // Simulate adding to cart
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find(item => item.id === dish.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...dish, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Trigger storage event for cart update
    window.dispatchEvent(new Event('storage'));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={12} color="#F59E0B" className="fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={12} color="#F59E0B" className="fill-current opacity-50" />);
    }

    return stars;
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="py-16 lg:py-24 bg-background-50">
      <div className="content-max-width viewport-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Most Loved Dishes
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Discover the most popular authentic dishes loved by our customers across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-surface rounded-cultural cultural-shadow-subtle border cultural-border overflow-hidden cultural-transition cultural-hover-scale cursor-pointer group"
              onClick={() => handleDishClick(dish.id)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 cultural-transition"
                />
                
                {/* Discount Badge */}
                {dish.originalPrice > dish.price && (
                  <div className="absolute top-3 left-3 bg-error text-white px-2 py-1 rounded-full text-xs font-bold">
                    {calculateDiscount(dish.originalPrice, dish.price)}% OFF
                  </div>
                )}

                {/* Vegetarian Badge */}
                <div className="absolute top-3 right-3 w-6 h-6 bg-surface rounded-full flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${dish.isVegetarian ? 'bg-success' : 'bg-error'}`}></div>
                </div>

                {/* Quick Add Button */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 cultural-transition">
                  <Button
                    variant="primary"
                    iconName="Plus"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(dish);
                    }}
                    className="w-10 h-10 rounded-full p-0"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-1 line-clamp-2">
                    {dish.name}
                  </h3>
                  <div className="flex items-center text-text-secondary text-sm mb-1">
                    <Icon name="ChefHat" size={12} className="mr-1" />
                    <span className="mr-2">{dish.caterer}</span>
                    <Icon name="MapPin" size={12} className="mr-1" />
                    <span>{dish.location}</span>
                  </div>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {dish.category}
                  </span>
                </div>

                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {dish.description}
                </p>

                {/* Rating and Cooking Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(dish.rating)}
                    </div>
                    <span className="text-sm font-medium text-text-primary">{dish.rating}</span>
                    <span className="text-xs text-text-secondary">({dish.reviewCount})</span>
                  </div>
                  <div className="flex items-center text-text-secondary text-sm">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {dish.cookingTime}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-text-primary">₹{dish.price}</span>
                    {dish.originalPrice > dish.price && (
                      <span className="text-sm text-text-secondary line-through">₹{dish.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    iconName="ShoppingCart"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(dish);
                    }}
                    className="min-touch-target"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="primary"
            iconName="Grid3X3"
            iconPosition="left"
            size="lg"
            onClick={() => navigate('/product-catalog-browse')}
            className="cultural-hover-scale"
          >
            View All Dishes
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDishesSection;