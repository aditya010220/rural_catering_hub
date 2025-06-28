import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for different user types
  const mockCredentials = {
    customer: { email: 'customer@ruralcatering.com', password: 'Customer123!' },
    caterer: { email: 'caterer@ruralcatering.com', password: 'Caterer123!' },
    admin: { email: 'admin@ruralcatering.com', password: 'Admin123!' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email or phone number is required';
    } else if (!formData.email.includes('@') && !/^\d{10}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email or 10-digit phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Check against mock credentials
      const userType = Object.keys(mockCredentials).find(type => 
        mockCredentials[type].email === formData.email && 
        mockCredentials[type].password === formData.password
      );
      
      if (userType) {
        // Successful login
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userRole', userType === 'admin' ? 'caterer' : userType);
        localStorage.setItem('userEmail', formData.email);
        
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        setIsLoading(false);
        onSuccess();
        
        // Navigate based on user type
        if (userType === 'caterer' || userType === 'admin') {
          navigate('/caterer-admin-dashboard');
        } else {
          navigate('/user-account-dashboard');
        }
      } else {
        // Failed login
        setErrors({
          general: `Invalid credentials. Try: customer@ruralcatering.com / Customer123! or caterer@ruralcatering.com / Caterer123!`
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    localStorage.setItem('authToken', 'mock-social-token');
    localStorage.setItem('userRole', 'customer');
    localStorage.setItem('userEmail', `user@${provider}.com`);
    onSuccess();
    navigate('/user-account-dashboard');
  };

  const handleForgotPassword = () => {
    navigate('/authentication-login-register?forgot=true');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-start">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" className="mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-error-700">{errors.general}</p>
          </div>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email or Phone Number
        </label>
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="Enter email or 10-digit phone number"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'border-error-300 focus:border-error-500' : ''}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error-600">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className={`pr-12 ${errors.password ? 'border-error-300 focus:border-error-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary cultural-transition"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error-600">{errors.password}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <Input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 mr-2"
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary-600 cultural-transition"
        >
          Forgot password?
        </button>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        className="min-touch-target"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t cultural-border-light"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          iconName="Chrome"
          iconPosition="left"
          className="min-touch-target"
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('facebook')}
          iconName="Facebook"
          iconPosition="left"
          className="min-touch-target"
        >
          Facebook
        </Button>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-text-secondary">
          Demo Credentials: customer@ruralcatering.com / Customer123! or caterer@ruralcatering.com / Caterer123!
        </p>
      </div>
    </form>
  );
};

export default LoginForm;