import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderConfirmation = ({ orderDetails, onContinueShopping }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const estimatedDelivery = new Date();
  estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + 60);

  return (
    <div className="relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#E76F51', '#F4A261', '#2A9D8F', '#264653'][Math.floor(Math.random() * 4)]
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-surface rounded-lg cultural-shadow-moderate p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>

        {/* Success Message */}
        <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-text-secondary mb-6">
          Thank you for choosing Rural Catering Hub. Your authentic flavors are on the way!
        </p>

        {/* Order Details */}
        <div className="bg-surface-50 rounded-lg p-6 mb-6 text-left">
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
            <Icon name="Receipt" size={20} />
            Order Details
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Order ID</span>
              <span className="font-data font-medium text-primary">
                {orderDetails.orderId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Total Amount</span>
              <span className="font-heading font-bold text-lg text-primary">
                ₹{orderDetails.total.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Payment Method</span>
              <span className="font-medium capitalize">{orderDetails.paymentMethod}</span>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-text-secondary">Delivery Address</span>
              <div className="text-right max-w-xs">
                <p className="font-medium">{orderDetails.address.name}</p>
                <p className="text-sm text-text-secondary">
                  {orderDetails.address.addressLine1}, {orderDetails.address.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-accent-50 border cultural-border text-accent-700 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <Icon name="Truck" size={24} />
            <div className="text-left">
              <h4 className="font-medium">Estimated Delivery</h4>
              <p className="text-sm">
                {estimatedDelivery.toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} at {estimatedDelivery.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            iconName="Package"
            onClick={() => window.open(`/track-order/${orderDetails.orderId}`, '_blank')}
            className="flex-1"
          >
            Track Order
          </Button>
          <Button
            variant="outline"
            iconName="ArrowLeft"
            onClick={onContinueShopping}
            className="flex-1"
          >
            Continue Shopping
          </Button>
        </div>

        {/* Support Information */}
        <div className="mt-6 pt-6 border-t cultural-border-light">
          <p className="text-text-secondary text-sm mb-3">
            Need help with your order?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              iconName="Phone"
              className="text-sm"
            >
              Call Support
            </Button>
            <Button
              variant="ghost"
              iconName="MessageCircle"
              className="text-sm"
            >
              Chat with Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;