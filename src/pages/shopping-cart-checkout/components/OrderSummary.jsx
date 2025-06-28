import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems, deliveryCharge, taxRate, isSticky = false }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAmount = subtotal * taxRate;
  const total = subtotal + deliveryCharge + taxAmount;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const containerClasses = isSticky 
    ? "fixed bottom-0 left-0 right-0 bg-surface border-t cultural-border p-4 z-40 lg:relative lg:bg-transparent lg:border-0 lg:p-0 lg:z-auto" :"bg-surface rounded-lg cultural-shadow-subtle p-6";

  return (
    <div className={containerClasses}>
      <div className="content-max-width viewport-padding lg:p-0">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Receipt" size={20} />
          Order Summary
        </h3>

        <div className="space-y-3">
          {/* Items Count */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-secondary">Items ({totalItems})</span>
            <span className="font-data">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          {/* Delivery Charge */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-secondary flex items-center gap-1">
              <Icon name="Truck" size={16} />
              Delivery Charge
            </span>
            <span className="font-data">
              {deliveryCharge === 0 ? (
                <span className="text-success font-medium">FREE</span>
              ) : (
                `₹${deliveryCharge.toLocaleString('en-IN')}`
              )}
            </span>
          </div>

          {/* Tax */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-secondary">GST ({(taxRate * 100).toFixed(1)}%)</span>
            <span className="font-data">₹{taxAmount.toLocaleString('en-IN')}</span>
          </div>

          {/* Divider */}
          <div className="border-t cultural-border-light my-3"></div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="font-heading font-bold text-lg text-text-primary">Total Amount</span>
            <span className="font-heading font-bold text-xl text-primary">
              ₹{total.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Savings Info */}
          {deliveryCharge === 0 && (
            <div className="bg-success-50 border cultural-border text-success-700 p-3 rounded-lg mt-3">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={16} />
                <span className="font-medium">You saved ₹50 on delivery!</span>
              </div>
            </div>
          )}

          {/* Estimated Delivery */}
          <div className="bg-accent-50 border cultural-border text-accent-700 p-3 rounded-lg mt-3">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Clock" size={16} />
              <span>Estimated delivery: 45-60 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;