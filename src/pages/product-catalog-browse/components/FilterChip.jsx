import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChip = ({ label, count, isActive, onRemove, onToggle }) => {
  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium cultural-transition cursor-pointer ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-surface-100 text-text-secondary hover:bg-surface-200'
      }`}
      onClick={onToggle}
    >
      <span>{label}</span>
      {count && (
        <span className={`text-xs ${isActive ? 'text-primary-foreground' : 'text-text-muted'}`}>
          ({count})
        </span>
      )}
      {isActive && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:bg-primary-600 rounded-full p-0.5 cultural-transition"
        >
          <Icon name="X" size={12} />
        </button>
      )}
    </div>
  );
};

export default FilterChip;