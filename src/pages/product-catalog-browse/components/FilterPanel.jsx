import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'south-indian', label: 'South Indian', count: 45 },
    { id: 'rajasthani', label: 'Rajasthani', count: 32 },
    { id: 'sweet-dishes', label: 'Sweet Dishes', count: 28 },
    { id: 'north-indian', label: 'North Indian', count: 38 },
    { id: 'bengali', label: 'Bengali', count: 22 },
    { id: 'gujarati', label: 'Gujarati', count: 19 },
    { id: 'punjabi', label: 'Punjabi', count: 25 },
    { id: 'maharashtrian', label: 'Maharashtrian', count: 18 }
  ];

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', count: 120 },
    { id: 'non-vegetarian', label: 'Non-Vegetarian', count: 85 },
    { id: 'vegan', label: 'Vegan', count: 35 },
    { id: 'gluten-free', label: 'Gluten Free', count: 28 },
    { id: 'dairy-free', label: 'Dairy Free', count: 22 }
  ];

  const spiceLevel = [
    { id: 'mild', label: 'Mild', count: 65 },
    { id: 'medium', label: 'Medium', count: 78 },
    { id: 'spicy', label: 'Spicy', count: 45 },
    { id: 'very-spicy', label: 'Very Spicy', count: 22 }
  ];

  const handleCategoryToggle = (categoryId) => {
    const newCategories = localFilters.categories.includes(categoryId)
      ? localFilters.categories.filter(id => id !== categoryId)
      : [...localFilters.categories, categoryId];
    
    setLocalFilters(prev => ({ ...prev, categories: newCategories }));
  };

  const handleDietaryToggle = (dietaryId) => {
    const newDietary = localFilters.dietary.includes(dietaryId)
      ? localFilters.dietary.filter(id => id !== dietaryId)
      : [...localFilters.dietary, dietaryId];
    
    setLocalFilters(prev => ({ ...prev, dietary: newDietary }));
  };

  const handleSpiceToggle = (spiceId) => {
    const newSpice = localFilters.spiceLevel.includes(spiceId)
      ? localFilters.spiceLevel.filter(id => id !== spiceId)
      : [...localFilters.spiceLevel, spiceId];
    
    setLocalFilters(prev => ({ ...prev, spiceLevel: newSpice }));
  };

  const handlePriceChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [field]: parseInt(value) || 0 }
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      categories: [],
      dietary: [],
      spiceLevel: [],
      priceRange: { min: 0, max: 2000 },
      rating: 0
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    return (
      <div className="border-b cultural-border-light pb-4 mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-heading font-semibold text-text-primary">{title}</h3>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-text-secondary" 
          />
        </button>
        {isExpanded && children}
      </div>
    );
  };

  const CheckboxOption = ({ id, label, count, isChecked, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer py-2 hover:bg-surface-50 rounded px-2 cultural-transition">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onChange(id)}
          className="w-4 h-4 text-primary border-surface-300 rounded focus:ring-primary focus:ring-2"
        />
        <span className="text-sm text-text-primary">{label}</span>
      </div>
      <span className="text-xs text-text-muted">({count})</span>
    </label>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-text-primary bg-opacity-50 z-40" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className={`
        fixed lg:static inset-y-0 right-0 z-50 w-80 bg-surface cultural-shadow-prominent lg:shadow-none
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b cultural-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-heading font-bold text-text-primary">Filters</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleClearFilters} className="text-sm">
              Clear All
            </Button>
            <Button variant="ghost" iconName="X" onClick={onClose} className="lg:hidden" />
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4">
          {/* Categories */}
          <FilterSection title="Categories">
            <div className="space-y-1">
              {categories.map(category => (
                <CheckboxOption
                  key={category.id}
                  id={category.id}
                  label={category.label}
                  count={category.count}
                  isChecked={localFilters.categories.includes(category.id)}
                  onChange={handleCategoryToggle}
                />
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-text-secondary mb-1">Min Price</label>
                  <Input
                    type="number"
                    placeholder="₹0"
                    value={localFilters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-text-secondary mb-1">Max Price</label>
                  <Input
                    type="number"
                    placeholder="₹2000"
                    value={localFilters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="text-xs text-text-muted">
                Current range: ₹{localFilters.priceRange.min} - ₹{localFilters.priceRange.max}
              </div>
            </div>
          </FilterSection>

          {/* Dietary Preferences */}
          <FilterSection title="Dietary Preferences">
            <div className="space-y-1">
              {dietaryOptions.map(option => (
                <CheckboxOption
                  key={option.id}
                  id={option.id}
                  label={option.label}
                  count={option.count}
                  isChecked={localFilters.dietary.includes(option.id)}
                  onChange={handleDietaryToggle}
                />
              ))}
            </div>
          </FilterSection>

          {/* Spice Level */}
          <FilterSection title="Spice Level">
            <div className="space-y-1">
              {spiceLevel.map(level => (
                <CheckboxOption
                  key={level.id}
                  id={level.id}
                  label={level.label}
                  count={level.count}
                  isChecked={localFilters.spiceLevel.includes(level.id)}
                  onChange={handleSpiceToggle}
                />
              ))}
            </div>
          </FilterSection>

          {/* Rating */}
          <FilterSection title="Minimum Rating">
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer py-1">
                  <input
                    type="radio"
                    name="rating"
                    checked={localFilters.rating === rating}
                    onChange={() => setLocalFilters(prev => ({ ...prev, rating }))}
                    className="w-4 h-4 text-primary border-surface-300 focus:ring-primary focus:ring-2"
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-secondary fill-current" />
                    ))}
                    <span className="text-sm text-text-primary ml-1">& above</span>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Apply Button */}
        <div className="sticky bottom-0 bg-surface border-t cultural-border p-4">
          <Button
            variant="primary"
            onClick={handleApplyFilters}
            className="w-full min-touch-target"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;