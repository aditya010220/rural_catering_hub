import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onTrackOrder, onReorder, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-success bg-success-50';
      case 'preparing':
        return 'text-warning bg-warning-50';
      case 'on the way':
        return 'text-accent bg-accent-50';
      case 'cancelled':
        return 'text-error bg-error-50';
      default:
        return 'text-text-secondary bg-surface-100';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border p-4 mb-4">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name="Package" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              Order #{order.id}
            </h3>
            <p className="text-sm text-text-secondary">
              {formatDate(order.date)} • {order.catererName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          <Button
            variant="ghost"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {order.items.length} item{order.items.length > 1 ? 's' : ''}
          </span>
          <span className="text-text-secondary">•</span>
          <span className="font-semibold text-text-primary">
            {formatCurrency(order.total)}
          </span>
        </div>
        {order.estimatedDelivery && (
          <div className="text-sm text-text-secondary">
            <Icon name="Clock" size={14} className="inline mr-1" />
            Est. {order.estimatedDelivery}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t cultural-border-light pt-4 mt-4">
          {/* Order Items */}
          <div className="space-y-3 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{item.name}</h4>
                  <p className="text-sm text-text-secondary">
                    Qty: {item.quantity} • {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div className="bg-surface-50 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} color="var(--color-text-secondary)" className="mt-1" />
              <div>
                <p className="text-sm font-medium text-text-primary">Delivery Address</p>
                <p className="text-sm text-text-secondary">{order.deliveryAddress}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {order.status.toLowerCase() !== 'delivered' && order.status.toLowerCase() !== 'cancelled' && (
              <Button
                variant="outline"
                iconName="MapPin"
                iconPosition="left"
                onClick={() => onTrackOrder(order.id)}
                className="flex-1 sm:flex-none"
              >
                Track Order
              </Button>
            )}
            <Button
              variant="ghost"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewDetails(order.id)}
              className="flex-1 sm:flex-none"
            >
              View Details
            </Button>
            <Button
              variant="primary"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => onReorder(order.id)}
              className="flex-1 sm:flex-none"
            >
              Reorder
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;