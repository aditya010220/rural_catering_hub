import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onStatusUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'accepted':
        return 'bg-accent-100 text-accent-800';
      case 'preparing':
        return 'bg-secondary-100 text-secondary-800';
      case 'ready':
        return 'bg-success-100 text-success-800';
      case 'completed':
        return 'bg-surface-200 text-text-secondary';
      case 'cancelled':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-surface-200 text-text-secondary';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high':
        return { icon: 'AlertTriangle', color: 'text-error-600' };
      case 'medium':
        return { icon: 'Clock', color: 'text-warning-600' };
      default:
        return { icon: 'CheckCircle', color: 'text-success-600' };
    }
  };

  const urgencyInfo = getUrgencyIcon(order.urgency);

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle cultural-border p-4 cultural-transition">
      {/* Order Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-text-primary">
              Order #{order.id}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <Icon 
              name={urgencyInfo.icon} 
              size={16} 
              className={urgencyInfo.color}
            />
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="User" size={14} />
              <span>{order.customerName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{order.orderTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="IndianRupee" size={14} />
              <span>{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="min-touch-target"
        />
      </div>

      {/* Order Items Preview */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="UtensilsCrossed" size={16} className="text-text-secondary" />
          <span className="text-sm font-medium text-text-primary">
            {order.items.length} item{order.items.length > 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {order.items.slice(0, 3).map((item, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-background-100 text-text-secondary text-xs rounded"
            >
              {item.name} x{item.quantity}
            </span>
          ))}
          {order.items.length > 3 && (
            <span className="px-2 py-1 bg-background-100 text-text-secondary text-xs rounded">
              +{order.items.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t cultural-border-light pt-4 space-y-4">
          {/* Customer Details */}
          <div>
            <h4 className="font-medium text-text-primary mb-2">Customer Details</h4>
            <div className="space-y-1 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} />
                <span>{order.customerPhone}</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={14} className="mt-0.5" />
                <span>{order.deliveryAddress}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="font-medium text-text-primary mb-2">Delivery Information</h4>
            <div className="space-y-1 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} />
                <span>Delivery Date: {order.deliveryDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} />
                <span>Delivery Time: {order.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={14} />
                <span>Guests: {order.guestCount}</span>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          {order.specialInstructions && (
            <div>
              <h4 className="font-medium text-text-primary mb-2">Special Instructions</h4>
              <p className="text-sm text-text-secondary bg-background-50 p-3 rounded">
                {order.specialInstructions}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {order.status === 'pending' && (
        <div className="flex space-x-2 mt-4 pt-4 border-t cultural-border-light">
          <Button
            variant="success"
            iconName="Check"
            onClick={() => onStatusUpdate(order.id, 'accepted')}
            className="flex-1 min-touch-target-mobile"
          >
            Accept
          </Button>
          <Button
            variant="danger"
            iconName="X"
            onClick={() => onStatusUpdate(order.id, 'cancelled')}
            className="flex-1 min-touch-target-mobile"
          >
            Decline
          </Button>
        </div>
      )}

      {order.status === 'accepted' && (
        <div className="flex space-x-2 mt-4 pt-4 border-t cultural-border-light">
          <Button
            variant="primary"
            iconName="ChefHat"
            onClick={() => onStatusUpdate(order.id, 'preparing')}
            className="flex-1 min-touch-target-mobile"
          >
            Start Preparing
          </Button>
        </div>
      )}

      {order.status === 'preparing' && (
        <div className="flex space-x-2 mt-4 pt-4 border-t cultural-border-light">
          <Button
            variant="success"
            iconName="CheckCircle"
            onClick={() => onStatusUpdate(order.id, 'ready')}
            className="flex-1 min-touch-target-mobile"
          >
            Mark Ready
          </Button>
        </div>
      )}

      {order.status === 'ready' && (
        <div className="flex space-x-2 mt-4 pt-4 border-t cultural-border-light">
          <Button
            variant="success"
            iconName="Truck"
            onClick={() => onStatusUpdate(order.id, 'completed')}
            className="flex-1 min-touch-target-mobile"
          >
            Mark Delivered
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;