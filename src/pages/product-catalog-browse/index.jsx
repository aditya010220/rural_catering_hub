import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import FilterChip from './components/FilterChip';
import DishCard from './components/DishCard';
import FilterPanel from './components/FilterPanel';
import QuickViewModal from './components/QuickViewModal';
import SortDropdown from './components/SortDropdown';
import LoadingSkeleton from './components/LoadingSkeleton';

const ProductCatalogBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentSort, setCurrentSort] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  
  const [filters, setFilters] = useState({
    categories: [],
    dietary: [],
    spiceLevel: [],
    priceRange: { min: 0, max: 2000 },
    rating: 0
  });

  // Mock data
  const mockDishes = [
    {
      id: 1,
      name: "Authentic Hyderabadi Biryani",
      category: "South Indian",
      description: "Aromatic basmati rice layered with tender mutton pieces, slow-cooked with traditional spices and saffron. A royal feast that brings the authentic taste of Hyderabad to your table.",
      price: 450,
      originalPrice: 500,
      image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
      rating: 4.8,
      reviewCount: 156,
      isVeg: false,
      isSpicy: true,
      isPopular: true,
      servingSize: 4,
      preparationTime: 45,
      caterer: {
        name: "Begum\'s Kitchen",
        location: "Hyderabad, Telangana",
        story: "Three generations of royal cooks bringing authentic Nizami flavors to your doorstep. Our recipes have been passed down through generations of palace chefs."
      },
      ingredients: ["Basmati Rice", "Mutton", "Saffron", "Yogurt", "Onions", "Traditional Spices"],
      additionalImages: [
        "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
        "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg"
      ]
    },
    {
      id: 2,
      name: "Traditional Dal Baati Churma",
      category: "Rajasthani",
      description: "Crispy baked wheat balls served with spicy lentil curry and sweet churma. A complete traditional Rajasthani meal that represents the heart of desert cuisine.",
      price: 280,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
      rating: 4.6,
      reviewCount: 89,
      isVeg: true,
      isSpicy: false,
      isPopular: false,
      servingSize: 3,
      preparationTime: 60,
      caterer: {
        name: "Rajasthani Rasoi",
        location: "Jaipur, Rajasthan",
        story: "Preserving the royal culinary traditions of Rajasthan with recipes from the kitchens of maharajas. Every dish tells a story of our rich heritage."
      },
      ingredients: ["Wheat Flour", "Mixed Lentils", "Ghee", "Jaggery", "Traditional Spices"]
    },
    {
      id: 3,
      name: "Bengali Fish Curry with Rice",
      category: "Bengali",
      description: "Fresh river fish cooked in mustard oil with traditional Bengali spices, served with steamed basmati rice. A comfort food that brings the essence of Bengal to your plate.",
      price: 320,
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg",
      rating: 4.7,
      reviewCount: 124,
      isVeg: false,
      isSpicy: true,
      isPopular: true,
      servingSize: 2,
      preparationTime: 35,
      caterer: {
        name: "Ma\'r Ranna",
        location: "Kolkata, West Bengal",
        story: "Bringing the authentic taste of Bengali home cooking with recipes passed down from our grandmothers. Every bite is a journey to Bengal."
      },
      ingredients: ["Fresh Fish", "Mustard Oil", "Turmeric", "Red Chili", "Ginger-Garlic", "Basmati Rice"]
    },
    {
      id: 4,
      name: "Gujarati Thali Special",
      category: "Gujarati",
      description: "Complete traditional Gujarati meal with dal, sabzi, roti, rice, pickle, and sweet. A perfect balance of flavors representing the vegetarian cuisine of Gujarat.",
      price: 350,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      rating: 4.5,
      reviewCount: 98,
      isVeg: true,
      isSpicy: false,
      isPopular: false,
      servingSize: 1,
      preparationTime: 40,
      caterer: {
        name: "Ghar Jaisa Khana",
        location: "Ahmedabad, Gujarat",
        story: "Celebrating the rich vegetarian heritage of Gujarat with traditional recipes that have been cherished for generations in Gujarati households."
      },
      ingredients: ["Mixed Vegetables", "Lentils", "Wheat Flour", "Jaggery", "Ghee", "Traditional Spices"]
    },
    {
      id: 5,
      name: "Punjabi Butter Chicken",
      category: "Punjabi",
      description: "Tender chicken pieces in rich tomato and butter gravy, served with naan bread. A creamy and flavorful dish that represents the heart of Punjabi cuisine.",
      price: 380,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      rating: 4.9,
      reviewCount: 203,
      isVeg: false,
      isSpicy: false,
      isPopular: true,
      servingSize: 3,
      preparationTime: 30,
      caterer: {
        name: "Dhaba Style Kitchen",
        location: "Amritsar, Punjab",
        story: "Bringing the authentic dhaba experience to your home with recipes perfected over decades of serving travelers on the Grand Trunk Road."
      },
      ingredients: ["Chicken", "Tomatoes", "Butter", "Cream", "Garam Masala", "Naan Bread"]
    },
    {
      id: 6,
      name: "South Indian Dosa Platter",
      category: "South Indian",
      description: "Crispy fermented crepe served with coconut chutney, sambar, and potato filling. A healthy and delicious breakfast option from South India.",
      price: 180,
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
      rating: 4.4,
      reviewCount: 167,
      isVeg: true,
      isSpicy: true,
      isPopular: false,
      servingSize: 2,
      preparationTime: 25,
      caterer: {
        name: "Udupi Delights",
        location: "Bangalore, Karnataka",
        story: "Preserving the traditional South Indian breakfast culture with authentic recipes from the temple kitchens of Udupi."
      },
      ingredients: ["Rice", "Urad Dal", "Coconut", "Curry Leaves", "Mustard Seeds", "Potatoes"]
    },
    {
      id: 7,
      name: "Maharashtrian Puran Poli",
      category: "Sweet Dishes",
      description: "Sweet flatbread stuffed with jaggery and lentil filling, served with ghee. A traditional Maharashtrian dessert perfect for festivals and celebrations.",
      price: 220,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      rating: 4.3,
      reviewCount: 76,
      isVeg: true,
      isSpicy: false,
      isPopular: false,
      servingSize: 4,
      preparationTime: 50,
      caterer: {
        name: "Aaji\'s Kitchen",
        location: "Pune, Maharashtra",
        story: "Keeping alive the traditional Maharashtrian sweet-making techniques with recipes that have been in our family for over a century."
      },
      ingredients: ["Wheat Flour", "Chana Dal", "Jaggery", "Ghee", "Cardamom", "Nutmeg"]
    },
    {
      id: 8,
      name: "Kashmiri Wazwan Platter",
      category: "North Indian",
      description: "Traditional Kashmiri feast featuring rogan josh, yakhni, and rice. A royal dining experience that showcases the rich culinary heritage of Kashmir.",
      price: 650,
      originalPrice: 750,
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg",
      rating: 4.8,
      reviewCount: 45,
      isVeg: false,
      isSpicy: true,
      isPopular: true,
      servingSize: 2,
      preparationTime: 90,
      caterer: {
        name: "Kashmir Valley Kitchen",
        location: "Srinagar, Kashmir",
        story: "Bringing the royal Wazwan tradition to your table with authentic recipes from the valley, prepared by master wazas (chefs)."
      },
      ingredients: ["Mutton", "Yogurt", "Saffron", "Dry Fruits", "Kashmiri Spices", "Basmati Rice"]
    }
  ];

  // Initialize data
  useEffect(() => {
    const loadDishes = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDishes(mockDishes);
      setIsLoading(false);
    };

    loadDishes();
  }, []);

  // Filter and sort dishes
  const processedDishes = useMemo(() => {
    let result = [...dishes];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(dish =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(dish =>
        filters.categories.some(category =>
          dish.category.toLowerCase().includes(category.replace('-', ' '))
        )
      );
    }

    // Apply dietary filter
    if (filters.dietary.length > 0) {
      result = result.filter(dish => {
        if (filters.dietary.includes('vegetarian') && dish.isVeg) return true;
        if (filters.dietary.includes('non-vegetarian') && !dish.isVeg) return true;
        if (filters.dietary.includes('vegan') && dish.isVeg) return true;
        return false;
      });
    }

    // Apply spice level filter
    if (filters.spiceLevel.length > 0) {
      result = result.filter(dish => {
        if (filters.spiceLevel.includes('mild') && !dish.isSpicy) return true;
        if (filters.spiceLevel.includes('spicy') && dish.isSpicy) return true;
        return false;
      });
    }

    // Apply price range filter
    result = result.filter(dish =>
      dish.price >= filters.priceRange.min && dish.price <= filters.priceRange.max
    );

    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter(dish => dish.rating >= filters.rating);
    }

    // Apply sorting
    switch (currentSort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default: // popularity
        result.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return b.reviewCount - a.reviewCount;
        });
    }

    return result;
  }, [dishes, searchQuery, filters, currentSort]);

  // Pagination
  const itemsPerPage = 12;
  const displayedDishes = processedDishes.slice(0, currentPage * itemsPerPage);

  useEffect(() => {
    setHasMoreItems(displayedDishes.length < processedDishes.length);
  }, [displayedDishes.length, processedDishes.length]);

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleAddToCart = async (dish) => {
    // Simulate adding to cart
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = existingCart.find(item => item.id === dish.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...dish, quantity: 1 });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Trigger storage event for header update
    window.dispatchEvent(new Event('storage'));
    
    // Show success feedback (you could add a toast notification here)
    console.log(`Added ${dish.name} to cart`);
  };

  const handleQuickView = (dish) => {
    setSelectedDish(dish);
    setIsQuickViewOpen(true);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const getActiveFilterCount = () => {
    return filters.categories.length + 
           filters.dietary.length + 
           filters.spiceLevel.length + 
           (filters.rating > 0 ? 1 : 0) +
           (filters.priceRange.min > 0 || filters.priceRange.max < 2000 ? 1 : 0);
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      dietary: [],
      spiceLevel: [],
      priceRange: { min: 0, max: 2000 },
      rating: 0
    });
    setSearchQuery('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="navigation-offset">
        <div className="content-max-width viewport-padding py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Discover Authentic Regional Cuisine
            </h1>
            <p className="text-text-secondary">
              Explore traditional dishes from across India, prepared by local caterers with authentic recipes
            </p>
          </div>

          {/* Search Bar (Mobile) */}
          <div className="lg:hidden mb-6">
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder="Search dishes, cuisines, caterers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </form>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            {/* Filter Button & Active Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                iconName="Filter"
                iconPosition="left"
                onClick={() => setIsFilterPanelOpen(true)}
                className="min-touch-target"
              >
                Filters
                {getActiveFilterCount() > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>

              {/* Active Filter Chips */}
              <div className="flex items-center gap-2 flex-wrap">
                {filters.categories.map(category => (
                  <FilterChip
                    key={category}
                    label={category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    isActive={true}
                    onRemove={() => setFilters(prev => ({
                      ...prev,
                      categories: prev.categories.filter(c => c !== category)
                    }))}
                  />
                ))}
                
                {filters.dietary.map(dietary => (
                  <FilterChip
                    key={dietary}
                    label={dietary.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    isActive={true}
                    onRemove={() => setFilters(prev => ({
                      ...prev,
                      dietary: prev.dietary.filter(d => d !== dietary)
                    }))}
                  />
                ))}

                {getActiveFilterCount() > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearAllFilters}
                    className="text-sm text-text-secondary hover:text-text-primary"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Sort & Results Count */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-secondary">
                {processedDishes.length} dishes found
              </span>
              <SortDropdown currentSort={currentSort} onSortChange={setCurrentSort} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <LoadingSkeleton count={8} />
              ) : processedDishes.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    No dishes found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                  <Button variant="primary" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {displayedDishes.map(dish => (
                      <DishCard
                        key={dish.id}
                        dish={dish}
                        onAddToCart={handleAddToCart}
                        onQuickView={handleQuickView}
                      />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMoreItems && (
                    <div className="text-center">
                      <Button
                        variant="outline"
                        onClick={handleLoadMore}
                        className="min-touch-target"
                      >
                        Load More Dishes
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        dish={selectedDish}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductCatalogBrowse;