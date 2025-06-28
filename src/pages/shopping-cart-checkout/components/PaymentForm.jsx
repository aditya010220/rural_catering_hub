import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentForm = ({ selectedPayment, onPaymentSelect }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: 'Smartphone',
      description: 'Pay using UPI ID or QR code',
      popular: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, RuPay accepted'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: 'Wallet',
      description: 'Paytm, PhonePe, Google Pay'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: 'Building2',
      description: 'All major banks supported'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: 'Banknote',
      description: 'Pay when order is delivered'
    }
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle p-6">
      <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
        <Icon name="CreditCard" size={20} />
        Payment Method
      </h3>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer cultural-transition ${
              selectedPayment === method.id
                ? 'border-primary bg-primary-50' :'cultural-border hover:border-primary-300'
            }`}
            onClick={() => onPaymentSelect(method.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 cultural-transition ${
                selectedPayment === method.id
                  ? 'border-primary bg-primary' :'border-surface-300'
              }`}>
                {selectedPayment === method.id && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              
              <Icon name={method.icon} size={20} className="text-text-secondary" />
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text-primary">{method.name}</span>
                  {method.popular && (
                    <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-text-secondary text-sm">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Details Forms */}
      {selectedPayment === 'upi' && (
        <div className="border-t cultural-border-light pt-4">
          <h4 className="font-heading font-semibold text-text-primary mb-3">
            Enter UPI ID
          </h4>
          <Input
            type="text"
            placeholder="yourname@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="mb-3"
          />
          <div className="bg-accent-50 border cultural-border text-accent-700 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Shield" size={16} />
              <span>Your UPI transaction is secured with bank-level encryption</span>
            </div>
          </div>
        </div>
      )}

      {selectedPayment === 'card' && (
        <div className="border-t cultural-border-light pt-4">
          <h4 className="font-heading font-semibold text-text-primary mb-3">
            Card Details
          </h4>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({
                ...cardDetails,
                number: formatCardNumber(e.target.value)
              })}
              maxLength={19}
            />
            
            <Input
              type="text"
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({
                ...cardDetails,
                name: e.target.value
              })}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({
                  ...cardDetails,
                  expiry: formatExpiry(e.target.value)
                })}
                maxLength={5}
              />
              <Input
                type="text"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({
                  ...cardDetails,
                  cvv: e.target.value.replace(/\D/g, '').substring(0, 3)
                })}
                maxLength={3}
              />
            </div>
          </div>
          
          <div className="bg-success-50 border cultural-border text-success-700 p-3 rounded-lg mt-4">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Lock" size={16} />
              <span>Your card details are encrypted and secure</span>
            </div>
          </div>
        </div>
      )}

      {selectedPayment === 'wallet' && (
        <div className="border-t cultural-border-light pt-4">
          <h4 className="font-heading font-semibold text-text-primary mb-3">
            Select Wallet
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map((wallet) => (
              <Button
                key={wallet}
                variant="outline"
                className="h-12 justify-center"
              >
                {wallet}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedPayment === 'cod' && (
        <div className="border-t cultural-border-light pt-4">
          <div className="bg-warning-50 border cultural-border text-warning-700 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Cash on Delivery</h4>
                <p className="text-sm">
                  Please keep exact change ready. Our delivery partner will collect ₹{/* total amount */} at the time of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;