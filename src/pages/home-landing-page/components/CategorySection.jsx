import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "South Indian",
      description: "Authentic dosas, idlis, and traditional curries",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Leaf",
      dishCount: 45,
      popularDishes: ["Masala Dosa", "Sambar", "Coconut Chutney"]
    },
    {
      id: 2,
      name: "Rajasthani",
      description: "Royal flavors and traditional desert cuisine",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Crown",
      dishCount: 38,
      popularDishes: ["Dal Baati", "Gatte ki Sabzi", "Ker Sangri"]
    },
    {
      id: 3,
      name: "Sweet Dishes",
      description: "Traditional Indian desserts and mithai",
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Heart",
      dishCount: 52,
      popularDishes: ["Gulab Jamun", "Rasgulla", "Jalebi"]
    },
    {
      id: 4,
      name: "Punjabi",
      description: "Rich and hearty North Indian cuisine",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Wheat",
      dishCount: 41,
      popularDishes: ["Butter Chicken", "Naan", "Lassi"]
    },
    {
      id: 5,
      name: "Bengali",
      description: "Fish curries and traditional Bengali sweets",
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Fish",
      dishCount: 33,
      popularDishes: ["Fish Curry", "Mishti Doi", "Sandesh"]
    },
    {
      id: 6,
      name: "Gujarati",
      description: "Sweet and savory vegetarian delicacies",
      image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      icon: "Salad",
      dishCount: 39,
      popularDishes: ["Dhokla", "Thepla", "Undhiyu"]
    }
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/product-catalog-browse?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-16 lg:py-24 bg-background-50">
      <div className="content-max-width viewport-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Explore Regional Cuisines
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Discover the rich diversity of Indian regional cooking traditions
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer cultural-transition cultural-hover-scale"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="bg-surface rounded-cultural cultural-shadow-subtle border cultural-border overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={`${category.name} cuisine`}
                    className="w-full h-full object-cover group-hover:scale-105 cultural-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 to-transparent"></div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon name={category.icon} size={24} color="var(--color-primary)" />
                  </div>

                  {/* Dish Count */}
                  <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-text-primary">{category.dishCount} dishes</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    {category.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Popular Dishes */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-text-secondary mb-2">Popular dishes:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.popularDishes.map((dish, index) => (
                        <span
                          key={index}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="w-full group-hover:bg-primary group-hover:text-white cultural-transition"
                  >
                    Explore {category.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-72 cursor-pointer cultural-transition cultural-hover-scale"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="bg-surface rounded-cultural cultural-shadow-subtle border cultural-border overflow-hidden">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={`${category.name} cuisine`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-3 right-3 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name={category.icon} size={20} color="var(--color-primary)" />
                    </div>

                    {/* Dish Count */}
                    <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-xs font-medium text-text-primary">{category.dishCount} dishes</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
                      {category.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3">
                      {category.description}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="w-full"
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            Browse All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;