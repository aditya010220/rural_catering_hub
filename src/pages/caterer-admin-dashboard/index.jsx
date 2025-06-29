import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DashboardMetrics from './components/DashboardMetrics';
import OrderCard from './components/OrderCard';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import NotificationBell from './components/NotificationBell';
import MenuManagementModal from './components/MenuManagementModal';

const CatererAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  // Mock data for orders
  const mockOrders = [
    {
      id: "ORD001",
      customerName: "Priya Sharma",
      customerPhone: "+91 9555631308",
      orderTime: "10:30 AM",
      deliveryDate: "25/12/2024",
      deliveryTime: "6:00 PM",
      deliveryAddress: "123 MG Road, Jaipur, Rajasthan 302001",
      guestCount: 50,
      totalAmount: 12500,
      status: "pending",
      urgency: "high",
      specialInstructions: "Please ensure all dishes are prepared without onions. The event is for a religious ceremony.",
      items: [
        { name: "Rajasthani Thali", quantity: 30, price: 250 },
        { name: "Dal Baati Churma", quantity: 20, price: 200 },
        { name: "Gatte ki Sabzi", quantity: 25, price: 150 }
      ]
    },
    {
      id: "ORD002",
      customerName: "Rajesh Kumar",
      customerPhone: "+91 87654 32109",
      orderTime: "9:15 AM",
      deliveryDate: "26/12/2024",
      deliveryTime: "12:00 PM",
      deliveryAddress: "456 Civil Lines, Udaipur, Rajasthan 313001",
      guestCount: 25,
      totalAmount: 6750,
      status: "accepted",
      urgency: "medium",
      specialInstructions: "Birthday celebration for elderly person. Please make food less spicy.",
      items: [
        { name: "Gujarati Thali", quantity: 25, price: 220 },
        { name: "Kheer", quantity: 25, price: 50 }
      ]
    },
    {
      id: "ORD003",
      customerName: "Anita Patel",
      customerPhone: "+91 76543 21098",
      orderTime: "8:45 AM",
      deliveryDate: "24/12/2024",
      deliveryTime: "7:30 PM",
      deliveryAddress: "789 Satellite Road, Ahmedabad, Gujarat 380015",
      guestCount: 100,
      totalAmount: 25000,
      status: "preparing",
      urgency: "high",
      specialInstructions: "Corporate event. Please arrange for serving staff as well.",
      items: [
        { name: "South Indian Feast", quantity: 100, price: 250 }
      ]
    }
  ];

  // Mock data for menu items
  const mockMenuItems = [
    {
      id: 1,
      name: "Rajasthani Thali",
      description: "Traditional Rajasthani meal with dal baati, gatte ki sabzi, ker sangri, and churma",
      price: 250,
      category: "thali",
      preparationTime: 45,
      servingSize: 1,
      isVegetarian: true,
      isAvailable: true,
      ingredients: "Wheat flour, lentils, vegetables, spices",
      allergens: "Gluten",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
    },
    {
      id: 2,
      name: "Gujarati Thali",
      description: "Complete Gujarati meal with dhokla, khandvi, undhiyu, and gujarati dal",
      price: 220,
      category: "thali",
      preparationTime: 40,
      servingSize: 1,
      isVegetarian: true,
      isAvailable: true,
      ingredients: "Rice, lentils, vegetables, gram flour",
      allergens: "None",
      image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg"
    },
    {
      id: 3,
      name: "South Indian Feast",
      description: "Authentic South Indian spread with sambar, rasam, variety rice, and payasam",
      price: 280,
      category: "thali",
      preparationTime: 50,
      servingSize: 1,
      isVegetarian: true,
      isAvailable: false,
      ingredients: "Rice, lentils, coconut, curry leaves, tamarind",
      allergens: "None",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg"
    }
  ];

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!authToken || userRole !== 'caterer') {
      navigate('/authentication-login-register');
      return;
    }

    // Initialize data
    setOrders(mockOrders);
    setMenuItems(mockMenuItems);
  }, [navigate]);

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'addDish':
        setSelectedDish(null);
        setIsMenuModalOpen(true);
        break;
      case 'manageMenu': setActiveTab('menu');
        break;
      case 'viewAnalytics': setActiveTab('analytics');
        break;
      case 'updateProfile': setActiveTab('profile');
        break;
      default:
        break;
    }
  };

  const handleSaveDish = (dishData) => {
    if (selectedDish) {
      // Update existing dish
      setMenuItems(prev => 
        prev.map(item => 
          item.id === selectedDish.id ? dishData : item
        )
      );
    } else {
      // Add new dish
      setMenuItems(prev => [...prev, dishData]);
    }
  };

  const handleEditDish = (dish) => {
    setSelectedDish(dish);
    setIsMenuModalOpen(true);
  };

  const handleDeleteDish = (dishId) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      setMenuItems(prev => prev.filter(item => item.id !== dishId));
    }
  };

  const toggleDishAvailability = (dishId) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === dishId 
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingBag' },
    { id: 'menu', label: 'Menu', icon: 'UtensilsCrossed' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'profile', label: 'Profile', icon: 'User' }
  ];

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const activeOrders = orders.filter(order => ['accepted', 'preparing', 'ready'].includes(order.status));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="navigation-offset">
        <div className="content-max-width viewport-padding py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Caterer Dashboard
              </h1>
              <p className="text-text-secondary">
                Manage your catering business and track your performance
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <NotificationBell />
              <Button
                variant="primary"
                iconName="Plus"
                onClick={() => handleQuickAction('addDish')}
                className="min-touch-target"
              >
                Add Dish
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b cultural-border-light">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm cultural-transition min-touch-target ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600' :'border-transparent text-text-secondary hover:text-text-primary hover:border-surface-300'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <DashboardMetrics />
              <QuickActions onActionClick={handleQuickAction} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-text-primary">
                      Pending Orders ({pendingOrders.length})
                    </h2>
                    <Button
                      variant="ghost"
                      iconName="ArrowRight"
                      onClick={() => setActiveTab('orders')}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {pendingOrders.slice(0, 3).map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onStatusUpdate={handleStatusUpdate}
                      />
                    ))}
                    
                    {pendingOrders.length === 0 && (
                      <div className="text-center py-8">
                        <Icon name="CheckCircle" size={48} className="text-success-600 mx-auto mb-4" />
                        <p className="text-text-secondary">No pending orders</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <RecentActivity />
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-text-primary mb-4 sm:mb-0">
                  Order Management
                </h2>
                
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-2 border cultural-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusUpdate={handleStatusUpdate}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-text-primary mb-4 sm:mb-0">
                  Menu Management
                </h2>
                
                <Button
                  variant="primary"
                  iconName="Plus"
                  onClick={() => handleQuickAction('addDish')}
                  className="min-touch-target"
                >
                  Add New Dish
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-surface rounded-lg cultural-shadow-subtle cultural-border overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          onClick={() => toggleDishAvailability(dish.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center cultural-transition ${
                            dish.isAvailable
                              ? 'bg-success-600 text-white' :'bg-surface-400 text-white'
                          }`}
                        >
                          <Icon name={dish.isAvailable ? "Eye" : "EyeOff"} size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-text-primary">{dish.name}</h3>
                        <span className="text-lg font-bold text-primary-600">
                          ₹{dish.price}
                        </span>
                      </div>
                      
                      <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                        {dish.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                        <span>{dish.preparationTime} mins</span>
                        <span>Serves {dish.servingSize}</span>
                        <span className={dish.isVegetarian ? 'text-success-600' : 'text-error-600'}>
                          {dish.isVegetarian ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          iconName="Edit"
                          onClick={() => handleEditDish(dish)}
                          className="flex-1"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          iconName="Trash2"
                          onClick={() => handleDeleteDish(dish.id)}
                          className="flex-1"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-text-primary">
                Analytics & Reports
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-lg cultural-shadow-subtle cultural-border p-6">
                  <h3 className="font-semibold text-text-primary mb-4">Earnings Trend</h3>
                  <div className="h-64 flex items-center justify-center text-text-secondary">
                    <div className="text-center">
                      <Icon name="TrendingUp" size={48} className="mx-auto mb-4" />
                      <p>Earnings chart will be displayed here</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface rounded-lg cultural-shadow-subtle cultural-border p-6">
                  <h3 className="font-semibold text-text-primary mb-4">Popular Dishes</h3>
                  <div className="space-y-3">
                    {menuItems.slice(0, 5).map((dish, index) => (
                      <div key={dish.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="text-text-primary">{dish.name}</span>
                        </div>
                        <span className="text-text-secondary">
                          {Math.floor(Math.random() * 50) + 10} orders
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-text-primary">
                Profile Management
              </h2>
              
              <div className="bg-surface rounded-lg cultural-shadow-subtle cultural-border p-6">
                <div className="text-center py-12">
                  <Icon name="User" size={64} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Profile Management
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Update your caterer profile, story, and gallery
                  </p>
                  <Button variant="primary" iconName="Edit">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menu Management Modal */}
      <MenuManagementModal
        isOpen={isMenuModalOpen}
        onClose={() => {
          setIsMenuModalOpen(false);
          setSelectedDish(null);
        }}
        dish={selectedDish}
        onSave={handleSaveDish}
      />
    </div>
  );
};

export default CatererAdminDashboard;