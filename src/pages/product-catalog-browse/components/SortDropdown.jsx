import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'name', label: 'Name: A to Z', icon: 'AlphabeticalOrder' }
  ];

  const currentSortOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        iconName="ArrowUpDown"
        iconPosition="left"
        onClick={() => setIsOpen(!isOpen)}
        className="min-touch-target"
      >
        <span className="hidden sm:inline">Sort by: </span>
        {currentSortOption.label}
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="ml-2" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-surface rounded-lg cultural-shadow-moderate border cultural-border z-50">
            <div className="p-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded cultural-transition text-left ${
                    currentSort === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-surface-100 text-text-primary'
                  }`}
                >
                  <Icon 
                    name={option.icon} 
                    size={16} 
                    className={currentSort === option.value ? 'text-primary-foreground' : 'text-text-secondary'} 
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                  {currentSort === option.value && (
                    <Icon name="Check" size={16} className="ml-auto text-primary-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;