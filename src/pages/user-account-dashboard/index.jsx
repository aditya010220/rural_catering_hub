import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import OrderCard from './components/OrderCard';
import AddressCard from './components/AddressCard';
import FavoriteCatererCard from './components/FavoriteCatererCard';
import ProfileSection from './components/ProfileSection';
import NotificationSettings from './components/NotificationSettings';

const UserAccountDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [favoriteCaterers, setFavoriteCaterers] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockUser = {
    id: 'user_001',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '9876543210',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-06-15',
    dateOfBirth: '1992-08-15',
    dietaryPreferences: ['Vegetarian', 'No Onion/Garlic'],
    bio: `Food enthusiast who loves exploring authentic regional cuisines. Always excited to try traditional dishes from different parts of India.`,
    totalOrders: 47,
    loyaltyPoints: 1250,
    membershipTier: 'Gold'
  };

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      catererName: 'Rajasthani Rasoi',
      status: 'Delivered',
      total: 850,
      items: [
        {
          name: 'Dal Baati Churma',
          quantity: 2,
          price: 320,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=100&h=100&fit=crop'
        },
        {
          name: 'Gatte ki Sabzi',
          quantity: 1,
          price: 280,
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&h=100&fit=crop'
        },
        {
          name: 'Ker Sangri',
          quantity: 1,
          price: 250,
          image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=100&h=100&fit=crop'
        }
      ],
      deliveryAddress: '123, Green Valley Apartments, Sector 18, Gurgaon, Haryana - 122015'
    },
    {
      id: 'ORD002',
      date: '2024-01-12',
      catererName: 'South Spice Kitchen',
      status: 'On the way',
      total: 650,
      estimatedDelivery: '25 mins',
      items: [
        {
          name: 'Hyderabadi Biryani',
          quantity: 1,
          price: 450,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=100&h=100&fit=crop'
        },
        {
          name: 'Raita',
          quantity: 1,
          price: 100,
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=100&h=100&fit=crop'
        },
        {
          name: 'Shorba',
          quantity: 1,
          price: 100,
          image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100&h=100&fit=crop'
        }
      ],
      deliveryAddress: '123, Green Valley Apartments, Sector 18, Gurgaon, Haryana - 122015'
    },
    {
      id: 'ORD003',
      date: '2024-01-10',
      catererName: 'Bengali Bhoj',
      status: 'Preparing',
      total: 720,
      estimatedDelivery: '45 mins',
      items: [
        {
          name: 'Fish Curry',
          quantity: 1,
          price: 380,
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop'
        },
        {
          name: 'Steamed Rice',
          quantity: 2,
          price: 160,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop'
        },
        {
          name: 'Mishti Doi',
          quantity: 2,
          price: 180,
          image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=100&h=100&fit=crop'
        }
      ],
      deliveryAddress: '123, Green Valley Apartments, Sector 18, Gurgaon, Haryana - 122015'
    }
  ];

  const mockAddresses = [
    {
      id: 'addr_001',
      type: 'home',
      label: 'Home',
      street: '123, Green Valley Apartments, Sector 18',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122015',
      landmark: 'Near City Center Mall',
      phone: '9876543210',
      isDefault: true
    },
    {
      id: 'addr_002',
      type: 'work',
      label: 'Office',
      street: '456, Tech Tower, Cyber City',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122002',
      landmark: 'DLF Phase 2',
      phone: '9876543210',
      isDefault: false
    },
    {
      id: 'addr_003',
      type: 'other',
      label: 'Parents House',
      street: '789, Model Town, Block A',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110009',
      landmark: 'Near Metro Station',
      phone: '9876543211',
      isDefault: false
    }
  ];

  const mockFavoriteCaterers = [
    {
      id: 'cat_001',
      name: 'Rajasthani Rasoi',
      cuisine: 'Rajasthani, North Indian',
      rating: 4.8,
      totalOrders: 1200,
      location: 'Jaipur, Rajasthan',
      deliveryTime: 35,
      deliveryFee: 40,
      isOnline: true,
      coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop',
      specialties: ['Dal Baati Churma', 'Gatte ki Sabzi', 'Ker Sangri', 'Rajasthani Thali']
    },
    {
      id: 'cat_002',
      name: 'South Spice Kitchen',
      cuisine: 'South Indian, Hyderabadi',
      rating: 4.6,
      totalOrders: 850,
      location: 'Hyderabad, Telangana',
      deliveryTime: 40,
      deliveryFee: 35,
      isOnline: true,
      coverImage: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=200&fit=crop',
      specialties: ['Hyderabadi Biryani', 'Dosa', 'Sambar', 'Rasam']
    },
    {
      id: 'cat_003',
      name: 'Bengali Bhoj',
      cuisine: 'Bengali, East Indian',
      rating: 4.7,
      totalOrders: 650,
      location: 'Kolkata, West Bengal',
      deliveryTime: 45,
      deliveryFee: 50,
      isOnline: false,
      coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop',
      specialties: ['Fish Curry', 'Mishti Doi', 'Rosogolla', 'Bengali Thali']
    }
  ];

  const mockNotificationSettings = {
    orderUpdates: { push: true, email: true, sms: true },
    promotions: { push: true, email: false, sms: false },
    newCaterers: { push: false, email: true, sms: false },
    recommendations: { push: true, email: true, sms: false },
    reminders: { push: true, email: false, sms: false },
    reviews: { push: false, email: true, sms: false },
    doNotDisturb: true
  };

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
      setOrders(mockOrders);
      setAddresses(mockAddresses);
      setFavoriteCaterers(mockFavoriteCaterers);
      setNotificationSettings(mockNotificationSettings);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'My Orders', icon: 'Package' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
    { id: 'favorites', label: 'Favorite Caterers', icon: 'Heart' },
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const handleTrackOrder = (orderId) => {
    // Navigate to order tracking page or show tracking modal
    console.log('Track order:', orderId);
  };

  const handleReorder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      // Add items to cart and navigate to cart
      navigate('/shopping-cart-checkout');
    }
  };

  const handleViewOrderDetails = (orderId) => {
    // Navigate to order details page or show details modal
    console.log('View order details:', orderId);
  };

  const handleEditAddress = (addressId) => {
    // Show edit address modal or navigate to edit page
    console.log('Edit address:', addressId);
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const handleViewCatererMenu = (catererId) => {
    navigate(`/product-catalog-browse?caterer=${catererId}`);
  };

  const handleRemoveFavoriteCaterer = (catererId) => {
    setFavoriteCaterers(prev => prev.filter(cat => cat.id !== catererId));
  };

  const handleQuickOrder = (catererId) => {
    navigate(`/product-catalog-browse?caterer=${catererId}&quick=true`);
  };

  const handleUpdateProfile = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
  };

  const handleUploadPhoto = () => {
    // Handle photo upload
    console.log('Upload photo');
  };

  const handleUpdateNotificationSettings = (settings) => {
    setNotificationSettings(settings);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white bg-opacity-20">
            <Image
              src={user?.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-white text-opacity-90">
              {user?.membershipTier} Member • {user?.loyaltyPoints} Points
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-text-primary">
                {user?.totalOrders}
              </p>
              <p className="text-sm text-text-secondary">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={20} color="var(--color-warning)" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-text-primary">
                {user?.loyaltyPoints}
              </p>
              <p className="text-sm text-text-secondary">Loyalty Points</p>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-text-primary">
                {favoriteCaterers.length}
              </p>
              <p className="text-sm text-text-secondary">Favorite Caterers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Recent Orders
          </h2>
          <Button
            variant="ghost"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => setActiveSection('orders')}
          >
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {orders.slice(0, 2).map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onTrackOrder={handleTrackOrder}
              onReorder={handleReorder}
              onViewDetails={handleViewOrderDetails}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="primary"
          iconName="Search"
          iconPosition="left"
          onClick={() => navigate('/product-catalog-browse')}
          className="h-16 text-lg"
        >
          Browse Dishes
        </Button>
        <Button
          variant="outline"
          iconName="Heart"
          iconPosition="left"
          onClick={() => setActiveSection('favorites')}
          className="h-16 text-lg"
        >
          My Favorites
        </Button>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-text-primary">
          My Orders
        </h1>
        <Button
          variant="outline"
          iconName="Filter"
          iconPosition="left"
        >
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            onTrackOrder={handleTrackOrder}
            onReorder={handleReorder}
            onViewDetails={handleViewOrderDetails}
          />
        ))}
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-text-primary">
          Saved Addresses
        </h1>
        <Button
          variant="primary"
          iconName="Plus"
          iconPosition="left"
        >
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map(address => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
            isDefault={address.isDefault}
          />
        ))}
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-text-primary">
          Favorite Caterers
        </h1>
        <Button
          variant="outline"
          iconName="Search"
          iconPosition="left"
          onClick={() => navigate('/product-catalog-browse')}
        >
          Discover More
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteCaterers.map(caterer => (
          <FavoriteCatererCard
            key={caterer.id}
            caterer={caterer}
            onViewMenu={handleViewCatererMenu}
            onRemoveFavorite={handleRemoveFavoriteCaterer}
            onQuickOrder={handleQuickOrder}
          />
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading your account...</p>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'orders':
        return renderOrders();
      case 'addresses':
        return renderAddresses();
      case 'favorites':
        return renderFavorites();
      case 'profile':
        return (
          <ProfileSection
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onUploadPhoto={handleUploadPhoto}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            settings={notificationSettings}
            onUpdateSettings={handleUpdateNotificationSettings}
          />
        );
      case 'settings':
        return (
          <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border p-6">
            <h2 className="text-xl font-heading font-bold text-text-primary mb-4">
              Account Settings
            </h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                iconName="Shield"
                iconPosition="left"
                className="w-full justify-start"
              >
                Privacy & Security
              </Button>
              <Button
                variant="outline"
                iconName="CreditCard"
                iconPosition="left"
                className="w-full justify-start"
              >
                Payment Methods
              </Button>
              <Button
                variant="outline"
                iconName="Globe"
                iconPosition="left"
                className="w-full justify-start"
              >
                Language & Region
              </Button>
              <Button
                variant="outline"
                iconName="HelpCircle"
                iconPosition="left"
                className="w-full justify-start"
              >
                Help & Support
              </Button>
              <Button
                variant="ghost"
                iconName="LogOut"
                iconPosition="left"
                className="w-full justify-start text-error hover:text-error"
              >
                Sign Out
              </Button>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="navigation-offset">
        <div className="content-max-width viewport-padding py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border p-4">
                <nav className="space-y-2">
                  {sidebarItems.map(item => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "primary" : "ghost"}
                      iconName={item.icon}
                      iconPosition="left"
                      onClick={() => setActiveSection(item.id)}
                      className="w-full justify-start min-touch-target"
                    >
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountDashboard;