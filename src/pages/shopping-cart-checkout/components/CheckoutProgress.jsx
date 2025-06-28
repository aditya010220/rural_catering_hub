import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Cart Review', icon: 'ShoppingCart' },
    { id: 2, label: 'Delivery Details', icon: 'MapPin' },
    { id: 3, label: 'Payment', icon: 'CreditCard' },
    { id: 4, label: 'Confirmation', icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle p-4 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center cultural-transition ${
                step.id <= currentStep 
                  ? 'bg-primary text-white' :'bg-surface-200 text-text-muted'
              }`}>
                <Icon 
                  name={step.id < currentStep ? 'Check' : step.icon} 
                  size={20} 
                />
              </div>
              <span className={`text-xs mt-2 font-medium hidden sm:block ${
                step.id <= currentStep ? 'text-primary' : 'text-text-muted'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 cultural-transition ${
                step.id < currentStep ? 'bg-primary' : 'bg-surface-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;