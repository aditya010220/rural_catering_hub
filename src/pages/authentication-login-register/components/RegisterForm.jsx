import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    userType: 'customer',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-error-600' };
      case 2: return { text: 'Weak', color: 'text-warning-600' };
      case 3: return { text: 'Fair', color: 'text-secondary-600' };
      case 4: return { text: 'Good', color: 'text-accent-600' };
      case 5: return { text: 'Strong', color: 'text-success-600' };
      default: return { text: '', color: '' };
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;
    
    // Format phone number for Indian format
    if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(processedValue));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Password must be stronger (at least Fair)';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }
    
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
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
      // Mock successful registration
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userRole', formData.userType);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.name);
      
      setIsLoading(false);
      onSuccess();
      
      // Navigate based on user type
      if (formData.userType === 'caterer') {
        navigate('/caterer-admin-dashboard');
      } else {
        navigate('/user-account-dashboard');
      }
    }, 2000);
  };

  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? 'border-error-300 focus:border-error-500' : ''}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error-600">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'border-error-300 focus:border-error-500' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600">{errors.email}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">+91</span>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleInputChange}
              className={`pl-12 ${errors.phone ? 'border-error-300 focus:border-error-500' : ''}`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-error-600">{errors.phone}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-text-primary mb-2">
            State/Location *
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg cultural-transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
              errors.location ? 'border-error-300 focus:border-error-500' : 'border-surface-300'
            }`}
          >
            <option value="">Select your state</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.location && (
            <p className="mt-1 text-sm text-error-600">{errors.location}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Account Type *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer cultural-transition ${
            formData.userType === 'customer' ?'border-primary-300 bg-primary-50' :'border-surface-300 hover:border-surface-400'
          }`}>
            <Input
              type="radio"
              name="userType"
              value="customer"
              checked={formData.userType === 'customer'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <div>
              <div className="flex items-center mb-1">
                <Icon name="User" size={20} className="mr-2" />
                <span className="font-medium">Customer</span>
              </div>
              <p className="text-sm text-text-secondary">Browse and order authentic dishes</p>
            </div>
          </label>
          
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer cultural-transition ${
            formData.userType === 'caterer' ?'border-primary-300 bg-primary-50' :'border-surface-300 hover:border-surface-400'
          }`}>
            <Input
              type="radio"
              name="userType"
              value="caterer"
              checked={formData.userType === 'caterer'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <div>
              <div className="flex items-center mb-1">
                <Icon name="ChefHat" size={20} className="mr-2" />
                <span className="font-medium">Caterer</span>
              </div>
              <p className="text-sm text-text-secondary">Sell your traditional cuisine</p>
            </div>
          </label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            Password *
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
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
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-surface-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full cultural-transition ${
                      passwordStrength <= 1 ? 'bg-error-500' :
                      passwordStrength <= 2 ? 'bg-warning-500' :
                      passwordStrength <= 3 ? 'bg-secondary-500' :
                      passwordStrength <= 4 ? 'bg-accent-500' : 'bg-success-500'
                    }`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-medium ${strengthInfo.color}`}>
                  {strengthInfo.text}
                </span>
              </div>
            </div>
          )}
          {errors.password && (
            <p className="mt-1 text-sm text-error-600">{errors.password}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`pr-12 ${errors.confirmPassword ? 'border-error-300 focus:border-error-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary cultural-transition"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error-600">{errors.confirmPassword}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <label className="flex items-start">
          <Input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="w-4 h-4 mt-1 mr-3 flex-shrink-0"
          />
          <span className="text-sm text-text-secondary">
            I agree to the{' '}
            <button type="button" className="text-primary hover:text-primary-600 cultural-transition">
              Terms of Service
            </button>
            {' '}and acknowledge that I have read and understood the platform guidelines.
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-sm text-error-600 ml-7">{errors.agreeToTerms}</p>
        )}
        
        <label className="flex items-start">
          <Input
            type="checkbox"
            name="agreeToPrivacy"
            checked={formData.agreeToPrivacy}
            onChange={handleInputChange}
            className="w-4 h-4 mt-1 mr-3 flex-shrink-0"
          />
          <span className="text-sm text-text-secondary">
            I agree to the{' '}
            <button type="button" className="text-primary hover:text-primary-600 cultural-transition">
              Privacy Policy
            </button>
            {' '}and consent to the collection and use of my personal information.
          </span>
        </label>
        {errors.agreeToPrivacy && (
          <p className="text-sm text-error-600 ml-7">{errors.agreeToPrivacy}</p>
        )}
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        className="min-touch-target"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
      
      <div className="text-center">
        <p className="text-sm text-text-secondary">
          Password must contain: 8+ characters, uppercase, lowercase, number, and special character
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;