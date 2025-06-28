import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MenuManagementModal = ({ isOpen, onClose, dish = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: dish?.name || '',
    description: dish?.description || '',
    price: dish?.price || '',
    category: dish?.category || 'main-course',
    preparationTime: dish?.preparationTime || '',
    servingSize: dish?.servingSize || '',
    isVegetarian: dish?.isVegetarian || true,
    isAvailable: dish?.isAvailable !== undefined ? dish.isAvailable : true,
    ingredients: dish?.ingredients || '',
    allergens: dish?.allergens || '',
    image: dish?.image || ''
  });

  const [imagePreview, setImagePreview] = useState(dish?.image || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'appetizer', label: 'Appetizers' },
    { value: 'main-course', label: 'Main Course' },
    { value: 'rice-bread', label: 'Rice & Bread' },
    { value: 'dessert', label: 'Desserts' },
    { value: 'beverage', label: 'Beverages' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'thali', label: 'Thali/Combo' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        handleInputChange('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dishData = {
        ...formData,
        id: dish?.id || Date.now(),
        price: parseFloat(formData.price),
        preparationTime: parseInt(formData.preparationTime),
        servingSize: parseInt(formData.servingSize)
      };

      onSave(dishData);
      onClose();
    } catch (error) {
      console.error('Error saving dish:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-text-primary bg-opacity-50" onClick={onClose} />
      
      <div className="relative bg-surface rounded-lg cultural-shadow-prominent w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b cultural-border-light">
          <h2 className="text-xl font-semibold text-text-primary">
            {dish ? 'Edit Dish' : 'Add New Dish'}
          </h2>
          <Button
            variant="ghost"
            iconName="X"
            onClick={onClose}
            className="min-touch-target"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Dish Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-surface-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="ImagePlus" size={32} className="text-text-muted" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-2"
                  />
                  <p className="text-xs text-text-secondary">
                    Upload a high-quality image of your dish (JPG, PNG)
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Dish Name *
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Rajasthani Dal Baati"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border cultural-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description *
              </label>
              <textarea
                placeholder="Describe your dish, its origin, and what makes it special..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border cultural-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Price and Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Price (₹) *
                </label>
                <Input
                  type="number"
                  placeholder="250"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Prep Time (mins) *
                </label>
                <Input
                  type="number"
                  placeholder="30"
                  value={formData.preparationTime}
                  onChange={(e) => handleInputChange('preparationTime', e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Serves (people) *
                </label>
                <Input
                  type="number"
                  placeholder="4"
                  value={formData.servingSize}
                  onChange={(e) => handleInputChange('servingSize', e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Ingredients and Allergens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Main Ingredients
                </label>
                <textarea
                  placeholder="Rice, Lentils, Vegetables, Spices..."
                  value={formData.ingredients}
                  onChange={(e) => handleInputChange('ingredients', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border cultural-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Allergens (if any)
                </label>
                <textarea
                  placeholder="Nuts, Dairy, Gluten..."
                  value={formData.allergens}
                  onChange={(e) => handleInputChange('allergens', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border cultural-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={formData.isVegetarian}
                  onChange={(e) => handleInputChange('isVegetarian', e.target.checked)}
                />
                <span className="text-sm text-text-primary">Vegetarian</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => handleInputChange('isAvailable', e.target.checked)}
                />
                <span className="text-sm text-text-primary">Available for orders</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t cultural-border-light bg-background-50">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              iconName="Save"
            >
              {dish ? 'Update Dish' : 'Add Dish'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuManagementModal;