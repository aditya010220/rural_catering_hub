import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import CulturalBackground from './components/CulturalBackground';
import Icon from '../../components/AppIcon';

const AuthenticationPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'caterer') {
        navigate('/caterer-admin-dashboard');
      } else {
        navigate('/user-account-dashboard');
      }
    }

    // Check URL parameters for forgot password
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('forgot') === 'true') {
      setShowForgotPassword(true);
    }
  }, [navigate, location]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    // Navigation is handled within the forms
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowForgotPassword(false);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setActiveTab('login');
    // Update URL to remove forgot parameter
    navigate('/authentication-login-register', { replace: true });
  };

  // Don't render if already authenticated (prevents flash)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="navigation-offset min-h-screen flex">
        {/* Cultural Background - Desktop Only */}
        <CulturalBackground />
        
        {/* Authentication Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name="UtensilsCrossed" size={32} color="white" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-primary mb-2">
                Rural Catering Hub
              </h1>
              <p className="text-sm text-text-secondary">
                Authentic Flavors, Delivered
              </p>
            </div>
            
            {/* Authentication Card */}
            <div className="bg-surface rounded-2xl cultural-shadow-moderate p-8">
              {showForgotPassword ? (
                <ForgotPasswordForm onBack={handleBackToLogin} />
              ) : (
                <>
                  {/* Tab Toggle */}
                  <AuthToggle activeTab={activeTab} onTabChange={handleTabChange} />
                  
                  {/* Form Content */}
                  <div className="cultural-slide-up visible">
                    {activeTab === 'login' ? (
                      <LoginForm onSuccess={handleAuthSuccess} />
                    ) : (
                      <RegisterForm onSuccess={handleAuthSuccess} />
                    )}
                  </div>
                  
                  {/* Switch Form Link */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-text-secondary">
                      {activeTab === 'login' ? "Don't have an account?" : 'Already have an account?'}
                      {' '}
                      <button
                        onClick={() => handleTabChange(activeTab === 'login' ? 'register' : 'login')}
                        className="text-primary hover:text-primary-600 font-medium cultural-transition"
                      >
                        {activeTab === 'login' ? 'Create one' : 'Sign in'}
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
            
            {/* Trust Indicators - Mobile */}
            <div className="lg:hidden mt-8 flex justify-center space-x-8 text-center">
              <div>
                <div className="text-lg font-bold text-primary">500+</div>
                <div className="text-xs text-text-secondary">Caterers</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">10K+</div>
                <div className="text-xs text-text-secondary">Customers</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">25+</div>
                <div className="text-xs text-text-secondary">States</div>
              </div>
            </div>
            
            {/* Footer Links */}
            <div className="mt-8 text-center space-y-2">
              <div className="flex justify-center space-x-6 text-sm">
                <button className="text-text-secondary hover:text-text-primary cultural-transition">
                  Privacy Policy
                </button>
                <button className="text-text-secondary hover:text-text-primary cultural-transition">
                  Terms of Service
                </button>
                <button className="text-text-secondary hover:text-text-primary cultural-transition">
                  Help Center
                </button>
              </div>
              <p className="text-xs text-text-muted">
                © {new Date().getFullYear()} Rural Catering Hub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;