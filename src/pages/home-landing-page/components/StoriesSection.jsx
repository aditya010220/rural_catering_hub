import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const StoriesSection = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState(null);

  const stories = [
    {
      id: 1,
      catererName: "Meera Devi",
      location: "Jodhpur, Rajasthan",
      title: "Three Generations of Royal Recipes",
      preview: "From my grandmother\'s kitchen to yours...",
      fullStory: `My grandmother served in the royal kitchens of Jodhpur, where she learned the secret recipes that have been passed down through our family for three generations.\n\nEvery morning, I wake up at 4 AM to prepare the same spice blends she taught me, using traditional stone grinders and age-old techniques. The aroma of roasted spices fills our kitchen, just as it did in the palace kitchens decades ago.\n\nWhen you taste our Dal Baati Churma, you're not just eating a meal – you're experiencing a piece of Rajasthani royal heritage that has been lovingly preserved and shared with the world.`,
      image: "https://images.pexels.com/photos/8629141/pexels-photo-8629141.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      specialty: "Royal Rajasthani Cuisine",
      experience: "25 years",
      signature: "Dal Baati Churma"
    },
    {
      id: 2,
      catererName: "Lakshmi Amma",
      location: "Coimbatore, Tamil Nadu",
      title: "Farm to Table Tradition",
      preview: "Fresh from our family farm...",
      fullStory: `Our family has been farming in the fertile lands of Coimbatore for over 50 years. Every ingredient in our meals comes directly from our own fields – from the rice that forms the base of our meals to the coconuts we harvest fresh each morning.\n\nI learned cooking from my mother-in-law, who taught me that the secret to authentic South Indian cuisine lies not just in the spices, but in the love and respect we show to our ingredients.\n\nWhen you order from us, you're supporting sustainable farming practices and tasting vegetables that were growing in our fields just hours before they reach your plate.`,
      image: "https://images.pexels.com/photos/8629139/pexels-photo-8629139.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      specialty: "Organic South Indian Meals",
      experience: "30 years",
      signature: "Farm-fresh Sambar"
    },
    {
      id: 3,
      catererName: "Ruma Chakraborty",
      location: "Kolkata, West Bengal",
      title: "Sweet Memories of Durga Puja",
      preview: "Festival flavors all year round...",
      fullStory: `Growing up in the narrow lanes of North Kolkata, I spent every Durga Puja helping my mother prepare sweets for our entire neighborhood. The joy on people's faces when they tasted our homemade Sandesh and Mishti Doi inspired me to turn our family recipes into a business.\n\nEach sweet I make carries the essence of Bengali festivals – the excitement of Durga Puja, the warmth of Kali Puja, and the joy of Poila Boishakh. I use only the finest ingredients: fresh milk from local dairies, pure ghee, and cardamom that I grind myself.\n\nMy mission is to bring the authentic taste of Bengali festivals to your home, no matter what time of year it is.`,
      image: "https://images.pexels.com/photos/8629143/pexels-photo-8629143.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      specialty: "Traditional Bengali Sweets",
      experience: "20 years",
      signature: "Homemade Sandesh"
    },
    {
      id: 4,
      catererName: "Harpreet Singh",
      location: "Amritsar, Punjab",
      title: "Dhaba Flavors with Love",
      preview: "Authentic Punjabi hospitality...",
      fullStory: `My father ran a small dhaba on the Grand Trunk Road, where travelers from all over India would stop for a hearty meal. I grew up watching him serve food with such love and warmth that people would return just to experience his hospitality.\n\nAfter his passing, I decided to continue his legacy by bringing the same authentic dhaba flavors and Punjabi hospitality to people's homes. Every dish I prepare is made with the same generous spirit – extra ghee, extra love, and the belief that food should nourish both body and soul.\n\nWhen you taste our Butter Chicken or fresh Naan, you're experiencing the true essence of Punjabi culture – where every guest is treated like family.`,
      image: "https://images.pexels.com/photos/8629140/pexels-photo-8629140.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",
      specialty: "Authentic Punjabi Dhaba Food",
      experience: "15 years",
      signature: "Butter Chicken & Fresh Naan"
    }
  ];

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
  };

  const handleOrderFromCaterer = (catererName) => {
    navigate(`/product-catalog-browse?caterer=${encodeURIComponent(catererName)}`);
    setSelectedStory(null);
  };

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="content-max-width viewport-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Stories Behind the Flavors
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Meet the passionate cooks who preserve authentic regional traditions and bring their family recipes to your table
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group cursor-pointer cultural-transition cultural-hover-scale"
              onClick={() => handleStoryClick(story)}
            >
              <div className="bg-surface rounded-cultural cultural-shadow-subtle border cultural-border overflow-hidden">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={`${story.catererName} cooking traditional dishes`}
                    className="w-full h-full object-cover group-hover:scale-105 cultural-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-transparent to-transparent"></div>
                  
                  {/* Story Indicator */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="BookOpen" size={16} color="white" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-heading font-semibold text-lg mb-1">
                      {story.catererName}
                    </h3>
                    <div className="flex items-center text-sm opacity-90 mb-2">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {story.location}
                    </div>
                    <p className="text-sm opacity-90 line-clamp-2">
                      {story.preview}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h4 className="font-heading font-medium text-text-primary mb-2 line-clamp-2">
                    {story.title}
                  </h4>
                  
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center">
                      <Icon name="ChefHat" size={14} className="mr-2" />
                      <span>{story.specialty}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-2" />
                      <span>{story.experience} experience</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-white cultural-transition"
                  >
                    Read Story
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Stories Button */}
        <div className="text-center mt-12">
          <Button
            variant="primary"
            iconName="Users"
            iconPosition="left"
            size="lg"
            onClick={() => navigate('/product-catalog-browse')}
            className="cultural-hover-scale"
          >
            Meet All Our Caterers
          </Button>
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-text-primary/80 backdrop-blur-sm" onClick={closeStoryModal}></div>
          
          <div className="relative bg-surface rounded-cultural cultural-shadow-prominent max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={selectedStory.image}
                alt={`${selectedStory.catererName} cooking`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 to-transparent"></div>
              
              {/* Close Button */}
              <Button
                variant="ghost"
                iconName="X"
                onClick={closeStoryModal}
                className="absolute top-4 right-4 bg-surface/20 backdrop-blur-sm text-white hover:bg-surface/30"
              />

              {/* Header Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-heading font-bold mb-2">
                  {selectedStory.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Icon name="User" size={14} className="mr-1" />
                    {selectedStory.catererName}
                  </div>
                  <div className="flex items-center">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {selectedStory.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Story Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-background-50 rounded-cultural">
                <div className="text-center">
                  <Icon name="ChefHat" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
                  <p className="text-sm font-medium text-text-primary">{selectedStory.specialty}</p>
                </div>
                <div className="text-center">
                  <Icon name="Clock" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
                  <p className="text-sm font-medium text-text-primary">{selectedStory.experience}</p>
                </div>
                <div className="text-center">
                  <Icon name="Star" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
                  <p className="text-sm font-medium text-text-primary">{selectedStory.signature}</p>
                </div>
              </div>

              {/* Story Text */}
              <div className="prose prose-lg max-w-none mb-6">
                {selectedStory.fullStory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-text-primary leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  iconName="ShoppingCart"
                  iconPosition="left"
                  onClick={() => handleOrderFromCaterer(selectedStory.catererName)}
                  className="flex-1"
                >
                  Order from {selectedStory.catererName}
                </Button>
                <Button
                  variant="outline"
                  iconName="Share2"
                  iconPosition="left"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: selectedStory.title,
                        text: selectedStory.preview,
                        url: window.location.href
                      });
                    }
                  }}
                >
                  Share Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StoriesSection;