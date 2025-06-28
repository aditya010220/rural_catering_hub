import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('customer'); // 'customer' or 'caterer'
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Home', path: '/home-landing-page', icon: 'Home' },
    { label: 'Browse Dishes', path: '/product-catalog-browse', icon: 'UtensilsCrossed' },
    { label: 'Cart', path: '/shopping-cart-checkout', icon: 'ShoppingCart', showBadge: true },
    { label: 'Account', path: '/user-account-dashboard', icon: 'User', requiresAuth: true },
  ];

  const cateringNavItem = {
    label: 'Caterer Hub',
    path: '/caterer-admin-dashboard',
    icon: 'ChefHat',
    requiresAuth: true,
    roleRequired: 'caterer'
  };

  useEffect(() => {
    // Simulate cart updates
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setCartItemCount(cartItems.length);
      }
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  useEffect(() => {
    // Simulate authentication state
    const authToken = localStorage.getItem('authToken');
    const userRoleStored = localStorage.getItem('userRole');
    setIsAuthenticated(!!authToken);
    if (userRoleStored) {
      setUserRole(userRoleStored);
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsAccountDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-catalog-browse?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  const handleRoleSwitch = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
    setIsAccountDropdownOpen(false);
    
    if (newRole === 'caterer') {
      navigate('/caterer-admin-dashboard');
    } else {
      navigate('/user-account-dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole('customer');
    setIsAccountDropdownOpen(false);
    navigate('/home-landing-page');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const shouldShowNavItem = (item) => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.roleRequired && userRole !== item.roleRequired) return false;
    return true;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b cultural-border navigation-height">
      <div className="content-max-width viewport-padding h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer cultural-transition cultural-hover-scale"
            onClick={() => handleNavigation('/home-landing-page')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="UtensilsCrossed" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-primary">
                Rural Catering Hub
              </h1>
              <p className="text-xs font-caption text-text-secondary -mt-1">
                Authentic Flavors, Delivered
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              shouldShowNavItem(item) && (
                <div key={item.path} className="relative">
                  <Button
                    variant={isActiveRoute(item.path) ? "primary" : "ghost"}
                    onClick={() => handleNavigation(item.path)}
                    iconName={item.icon}
                    iconPosition="left"
                    className="min-touch-target relative"
                  >
                    {item.label}
                    {item.showBadge && cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-data">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </Button>
                </div>
              )
            ))}
            
            {shouldShowNavItem(cateringNavItem) && (
              <Button
                variant={isActiveRoute(cateringNavItem.path) ? "primary" : "ghost"}
                onClick={() => handleNavigation(cateringNavItem.path)}
                iconName={cateringNavItem.icon}
                iconPosition="left"
                className="min-touch-target"
              >
                {cateringNavItem.label}
              </Button>
            )}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              {isSearchExpanded ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Search dishes, cuisines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 cultural-transition"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    iconName="X"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery('');
                    }}
                    className="ml-2"
                  />
                </form>
              ) : (
                <Button
                  variant="ghost"
                  iconName="Search"
                  onClick={() => setIsSearchExpanded(true)}
                  className="min-touch-target hidden md:flex"
                />
              )}
            </div>

            {/* Cart Icon (Mobile) */}
            <div className="lg:hidden relative">
              <Button
                variant="ghost"
                iconName="ShoppingCart"
                onClick={() => handleNavigation('/shopping-cart-checkout')}
                className="min-touch-target relative"
              >
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-data">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Account Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  iconName="User"
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="min-touch-target"
                />
                
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-surface rounded-cultural cultural-shadow-moderate border cultural-border z-60">
                    <div className="p-4 border-b cultural-border-light">
                      <p className="font-medium text-text-primary">Welcome back!</p>
                      <p className="text-sm text-text-secondary capitalize">{userRole} Account</p>
                    </div>
                    
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        iconName="User"
                        onClick={() => handleNavigation('/user-account-dashboard')}
                        className="w-full justify-start"
                      >
                        My Account
                      </Button>
                      
                      {userRole === 'customer' ? (
                        <Button
                          variant="ghost"
                          iconName="ChefHat"
                          onClick={() => handleRoleSwitch('caterer')}
                          className="w-full justify-start"
                        >
                          Switch to Caterer
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          iconName="User"
                          onClick={() => handleRoleSwitch('customer')}
                          className="w-full justify-start"
                        >
                          Switch to Customer
                        </Button>
                      )}
                      
                      <div className="border-t cultural-border-light my-2"></div>
                      
                      <Button
                        variant="ghost"
                        iconName="LogOut"
                        onClick={handleLogout}
                        className="w-full justify-start text-error hover:text-error"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="primary"
                iconName="LogIn"
                onClick={() => handleNavigation('/authentication-login-register')}
                className="min-touch-target"
              >
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden min-touch-target"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] z-40">
          <div className="absolute inset-0 bg-text-primary bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-surface cultural-shadow-prominent">
            <div className="p-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <Input
                  type="search"
                  placeholder="Search dishes, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  shouldShowNavItem(item) && (
                    <Button
                      key={item.path}
                      variant={isActiveRoute(item.path) ? "primary" : "ghost"}
                      onClick={() => handleNavigation(item.path)}
                      iconName={item.icon}
                      iconPosition="left"
                      className="w-full justify-start min-touch-target-mobile relative"
                    >
                      {item.label}
                      {item.showBadge && cartItemCount > 0 && (
                        <span className="ml-auto bg-error text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-data">
                          {cartItemCount > 99 ? '99+' : cartItemCount}
                        </span>
                      )}
                    </Button>
                  )
                ))}
                
                {shouldShowNavItem(cateringNavItem) && (
                  <Button
                    variant={isActiveRoute(cateringNavItem.path) ? "primary" : "ghost"}
                    onClick={() => handleNavigation(cateringNavItem.path)}
                    iconName={cateringNavItem.icon}
                    iconPosition="left"
                    className="w-full justify-start min-touch-target-mobile"
                  >
                    {cateringNavItem.label}
                  </Button>
                )}
              </nav>

              {/* Mobile Auth Actions */}
              {!isAuthenticated && (
                <div className="mt-6 pt-6 border-t cultural-border-light">
                  <Button
                    variant="primary"
                    iconName="LogIn"
                    onClick={() => handleNavigation('/authentication-login-register')}
                    className="w-full min-touch-target-mobile"
                  >
                    Sign In / Register
                  </Button>
                </div>
              )}

              {/* Mobile Role Switcher */}
              {isAuthenticated && (
                <div className="mt-6 pt-6 border-t cultural-border-light space-y-2">
                  <p className="text-sm text-text-secondary mb-3">Account Type</p>
                  {userRole === 'customer' ? (
                    <Button
                      variant="outline"
                      iconName="ChefHat"
                      onClick={() => handleRoleSwitch('caterer')}
                      className="w-full justify-start min-touch-target-mobile"
                    >
                      Switch to Caterer Account
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      iconName="User"
                      onClick={() => handleRoleSwitch('customer')}
                      className="w-full justify-start min-touch-target-mobile"
                    >
                      Switch to Customer Account
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    iconName="LogOut"
                    onClick={handleLogout}
                    className="w-full justify-start min-touch-target-mobile text-error hover:text-error"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click outside handler for account dropdown */}
      {isAccountDropdownOpen && (
        <div 
          className="fixed inset-0 z-50" 
          onClick={() => setIsAccountDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;