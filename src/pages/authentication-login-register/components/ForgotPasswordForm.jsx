import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordForm = ({ onBack }) => {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'reset'
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    return newErrors;
  };

  const validateOtp = () => {
    const newErrors = {};
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'Please enter a valid 6-digit OTP';
    }
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateEmail();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setOtpTimer(60);
      
      // Start countdown
      const interval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateOtp();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (formData.otp === '123456') {
        setIsLoading(false);
        setStep('reset');
      } else {
        setErrors({ otp: 'Invalid OTP. Use 123456 for demo.' });
        setIsLoading(false);
      }
    }, 1500);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const newErrors = validatePassword();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onBack();
      // Show success message (could be handled by parent component)
    }, 1500);
  };

  const resendOtp = () => {
    setOtpTimer(60);
    const interval = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (step === 'email') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={32} color="var(--color-primary)" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Forgot Password?
          </h2>
          <p className="text-text-secondary">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'border-error-300 focus:border-error-500' : ''}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error-600">{errors.email}</p>
            )}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            className="min-touch-target"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
            className="min-touch-target"
          >
            Back to Sign In
          </Button>
        </form>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Smartphone" size={32} color="var(--color-accent)" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Enter Verification Code
          </h2>
          <p className="text-text-secondary">
            We've sent a 6-digit verification code to{' '}
            <span className="font-medium text-text-primary">{formData.email}</span>
          </p>
        </div>
        
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-text-primary mb-2">
              Verification Code
            </label>
            <Input
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter 6-digit code"
              value={formData.otp}
              onChange={handleInputChange}
              maxLength={6}
              className={`text-center text-lg font-data ${errors.otp ? 'border-error-300 focus:border-error-500' : ''}`}
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-error-600">{errors.otp}</p>
            )}
          </div>
          
          <div className="text-center">
            {otpTimer > 0 ? (
              <p className="text-sm text-text-secondary">
                Resend code in {otpTimer} seconds
              </p>
            ) : (
              <button
                type="button"
                onClick={resendOtp}
                className="text-sm text-primary hover:text-primary-600 cultural-transition"
              >
                Resend verification code
              </button>
            )}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            className="min-touch-target"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={() => setStep('email')}
            iconName="ArrowLeft"
            iconPosition="left"
            className="min-touch-target"
          >
            Change Email Address
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Demo OTP: 123456
          </p>
        </div>
      </div>
    );
  }

  if (step === 'reset') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Lock" size={32} color="var(--color-success)" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Reset Password
          </h2>
          <p className="text-text-secondary">
            Create a new password for your account.
          </p>
        </div>
        
        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-text-primary mb-2">
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`pr-12 ${errors.newPassword ? 'border-error-300 focus:border-error-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary cultural-transition"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-error-600">{errors.newPassword}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
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
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            className="min-touch-target"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    );
  }

  return null;
};

export default ForgotPasswordForm;