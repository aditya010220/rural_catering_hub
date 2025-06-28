import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(3); // Set to 3 as per requirement
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('customer');
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Home', path: '/home-landing-page', icon: 'Home', description: 'Welcome Home' },
    { label: 'Browse Dishes', path: '/product-catalog-browse', icon: 'UtensilsCrossed', description: 'Discover Local Cuisine' },
    { label: 'Cart', path: '/shopping-cart-checkout', icon: 'ShoppingCart', showBadge: true, description: 'Your Orders' },
    { label: 'Account', path: '/user-account-dashboard', icon: 'User', requiresAuth: false, description: 'Your Profile' },
  ];

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate cart updates
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setCartItemCount(cartItems.length);
      } else {
        setCartItemCount(3); // Default to 3 as per requirement
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
    return true;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-primary/10' 
        : 'bg-white shadow-md border-b border-primary/20'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section with Fork & Spoon Icon */}
          <div 
            className="flex items-center space-x-3 cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => handleNavigation('/home-landing-page')}
          >
            <div className="relative">
              {/* Fork and Spoon Icon Background */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <Icon name="UtensilsCrossed" size={24} color="white" />
              </div>
              {/* Decorative accent */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-text-primary font-heading">
                Rural Catering Hub
              </h1>
              <p className="text-sm text-accent font-medium -mt-1">
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
                    className={`relative transition-all duration-200 hover:scale-105 ${
                      isActiveRoute(item.path) 
                        ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-md' 
                        : 'text-text-primary hover:bg-primary-50 hover:text-primary'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    {item.showBadge && cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-error to-error-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </Button>
                </div>
              )
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Search Icon */}
            <div className="relative hidden md:block">
              {isSearchExpanded ? (
                <form onSubmit={handleSearch} className="flex items-center bg-surface rounded-lg shadow-md border border-primary/20">
                  <Input
                    type="search"
                    placeholder="Search authentic dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 border-0 bg-transparent focus:ring-2 focus:ring-primary/20 rounded-lg"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    iconName="Search"
                    type="submit"
                    className="ml-2 text-primary hover:bg-primary-50"
                  />
                  <Button
                    variant="ghost"
                    iconName="X"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery('');
                    }}
                    className="ml-1 text-text-secondary hover:text-error"
                  />
                </form>
              ) : (
                <Button
                  variant="ghost"
                  iconName="Search"
                  onClick={() => setIsSearchExpanded(true)}
                  className="text-primary hover:bg-primary-50 transition-all duration-200 hover:scale-110"
                />
              )}
            </div>

            {/* Cart Icon (Mobile) */}
            <div className="lg:hidden relative">
              <Button
                variant="ghost"
                iconName="ShoppingCart"
                onClick={() => handleNavigation('/shopping-cart-checkout')}
                className="relative text-primary hover:bg-primary-50 transition-all duration-200 hover:scale-110"
              >
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-error to-error-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Profile Icon */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  iconName="User"
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className={`transition-all duration-200 hover:scale-110 ${
                    isAccountDropdownOpen 
                      ? 'bg-primary text-white' :'text-primary hover:bg-primary-50'
                  }`}
                />
                
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-lg shadow-xl border border-primary/20 z-60 animate-slide-up">
                    <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-t-lg border-b border-primary/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                          <Icon name="User" size={20} color="white" />
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">Welcome back!</p>
                          <p className="text-sm text-accent capitalize font-medium">{userRole} Account</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 space-y-1">
                      <Button
                        variant="ghost"
                        iconName="User"
                        onClick={() => handleNavigation('/user-account-dashboard')}
                        className="w-full justify-start hover:bg-primary-50 text-text-primary transition-all duration-200"
                      >
                        My Account
                      </Button>
                      
                      <div className="border-t border-primary/10 my-2"></div>
                      
                      <Button
                        variant="ghost"
                        iconName="LogOut"
                        onClick={handleLogout}
                        className="w-full justify-start text-error hover:bg-error-50 transition-all duration-200"
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
                className="bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md transition-all duration-200 hover:scale-105"
              >
                <span className="hidden sm:inline font-medium">Sign In</span>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden transition-all duration-200 ${
                isMobileMenuOpen 
                  ? 'bg-primary text-white' :'text-primary hover:bg-primary-50'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl">
            <div className="p-6">
              
              {/* Mobile Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="UtensilsCrossed" size={20} color="white" />
                </div>
                <div>
                  <h2 className="font-bold text-primary font-heading">Rural Catering Hub</h2>
                  <p className="text-xs text-accent font-medium">Authentic Flavors, Delivered</p>
                </div>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search authentic dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary/20 focus:border-primary transition-all duration-200"
                  />
                  <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" />
                </div>
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
                      className={`w-full justify-start relative transition-all duration-200 ${
                        isActiveRoute(item.path) 
                          ? 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-md' 
                          : 'hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 text-text-primary'
                      }`}
                    >
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs opacity-75">{item.description}</div>
                      </div>
                      {item.showBadge && cartItemCount > 0 && (
                        <span className="bg-gradient-to-r from-error to-error-600 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-md">
                          {cartItemCount > 99 ? '99+' : cartItemCount}
                        </span>
                      )}
                    </Button>
                  )
                ))}
              </nav>

              {/* Mobile Auth Actions */}
              {!isAuthenticated && (
                <div className="mt-8 pt-6 border-t border-primary/20">
                  <Button
                    variant="primary"
                    iconName="LogIn"
                    onClick={() => handleNavigation('/authentication-login-register')}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 shadow-md transition-all duration-200"
                  >
                    <span className="font-medium">Sign In / Register</span>
                  </Button>
                </div>
              )}

              {/* Mobile Account Management */}
              {isAuthenticated && (
                <div className="mt-8 pt-6 border-t border-primary/20 space-y-3">
                  <p className="text-sm text-text-secondary mb-4 font-medium">Account Management</p>
                  
                  <Button
                    variant="ghost"
                    iconName="LogOut"
                    onClick={handleLogout}
                    className="w-full justify-start text-error hover:bg-error-50 transition-all duration-200"
                  >
                    <div className="flex-1 text-left">
                      <div className="font-medium">Sign Out</div>
                      <div className="text-xs opacity-75">End your session</div>
                    </div>
                  </Button>
                </div>
              )}

              {/* Decorative elements */}
              <div className="mt-8 flex justify-center space-x-2 opacity-30">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
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