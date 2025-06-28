import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = ({ user, onUpdateProfile, onUploadPhoto }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    dateOfBirth: user.dateOfBirth || '',
    dietaryPreferences: user.dietaryPreferences || [],
    bio: user.bio || ''
  });
  const [errors, setErrors] = useState({});

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
    'Halal',
    'Jain',
    'No Onion/Garlic'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDietaryPreferenceToggle = (preference) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter(p => p !== preference)
        : [...prev.dietaryPreferences, preference]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateProfile(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      dateOfBirth: user.dateOfBirth || '',
      dietaryPreferences: user.dietaryPreferences || [],
      bio: user.bio || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          Profile Information
        </h2>
        {!isEditing ? (
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Profile Photo */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-surface-100">
            <Image
              src={user.profilePhoto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <Button
              variant="primary"
              iconName="Camera"
              onClick={onUploadPhoto}
              className="absolute -bottom-1 -right-1 p-2 rounded-full"
            />
          )}
        </div>
        <div>
          <h3 className="font-heading font-semibold text-text-primary">
            {user.name}
          </h3>
          <p className="text-sm text-text-secondary">
            Member since {new Date(user.joinDate).toLocaleDateString('en-IN', {
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name *
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-error' : ''}
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">{errors.name}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary py-2">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address *
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-error' : ''}
                />
                {errors.email && (
                  <p className="text-error text-xs mt-1">{errors.email}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary py-2">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number *
            </label>
            {isEditing ? (
              <div>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  className={errors.phone ? 'border-error' : ''}
                />
                {errors.phone && (
                  <p className="text-error text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            ) : (
              <p className="text-text-primary py-2">{user.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date of Birth
            </label>
            {isEditing ? (
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            ) : (
              <p className="text-text-primary py-2">
                {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-IN') : 'Not provided'}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            About You
          </label>
          {isEditing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about your food preferences and interests..."
              rows={3}
              className="w-full px-3 py-2 border cultural-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          ) : (
            <p className="text-text-primary py-2">
              {user.bio || 'No bio provided'}
            </p>
          )}
        </div>

        {/* Dietary Preferences */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Dietary Preferences
          </label>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {dietaryOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.dietaryPreferences.includes(option)}
                    onChange={() => handleDietaryPreferenceToggle(option)}
                    className="rounded border-cultural-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.dietaryPreferences && user.dietaryPreferences.length > 0 ? (
                user.dietaryPreferences.map((preference, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent-50 text-accent text-sm rounded-full"
                  >
                    {preference}
                  </span>
                ))
              ) : (
                <p className="text-text-secondary">No dietary preferences specified</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;