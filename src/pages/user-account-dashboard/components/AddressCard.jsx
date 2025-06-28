import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault, isDefault }) => {
  const [showActions, setShowActions] = useState(false);

  const getAddressTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Building2';
      case 'other':
        return 'MapPin';
      default:
        return 'MapPin';
    }
  };

  const getAddressTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'home':
        return 'text-success bg-success-50';
      case 'work':
        return 'text-accent bg-accent-50';
      case 'other':
        return 'text-secondary bg-secondary-50';
      default:
        return 'text-text-secondary bg-surface-100';
    }
  };

  return (
    <div className={`bg-surface rounded-lg cultural-shadow-subtle border p-4 cultural-transition ${isDefault ? 'border-primary cultural-highlight' : 'cultural-border'}`}>
      {/* Address Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getAddressTypeColor(address.type)}`}>
            <Icon name={getAddressTypeIcon(address.type)} size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-heading font-semibold text-text-primary capitalize">
                {address.type}
              </h3>
              {isDefault && (
                <span className="px-2 py-1 bg-primary text-white text-xs rounded-full font-medium">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary">{address.label}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          iconName="MoreVertical"
          onClick={() => setShowActions(!showActions)}
          className="p-2"
        />
      </div>

      {/* Address Details */}
      <div className="space-y-2 mb-4">
        <p className="text-text-primary">{address.street}</p>
        <p className="text-text-secondary">
          {address.city}, {address.state} - {address.pincode}
        </p>
        {address.landmark && (
          <p className="text-sm text-text-secondary">
            <Icon name="MapPin" size={14} className="inline mr-1" />
            Near {address.landmark}
          </p>
        )}
        {address.phone && (
          <p className="text-sm text-text-secondary">
            <Icon name="Phone" size={14} className="inline mr-1" />
            {address.phone}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="border-t cultural-border-light pt-3 space-y-2">
          {!isDefault && (
            <Button
              variant="outline"
              iconName="Star"
              iconPosition="left"
              onClick={() => onSetDefault(address.id)}
              className="w-full justify-start"
            >
              Set as Default
            </Button>
          )}
          <Button
            variant="ghost"
            iconName="Edit"
            iconPosition="left"
            onClick={() => onEdit(address.id)}
            className="w-full justify-start"
          >
            Edit Address
          </Button>
          <Button
            variant="ghost"
            iconName="Trash2"
            iconPosition="left"
            onClick={() => onDelete(address.id)}
            className="w-full justify-start text-error hover:text-error"
          >
            Delete Address
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressCard;