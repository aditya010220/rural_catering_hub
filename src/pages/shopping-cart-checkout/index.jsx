import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import CheckoutProgress from './components/CheckoutProgress';
import DeliveryForm from './components/DeliveryForm';
import PaymentForm from './components/PaymentForm';
import OrderConfirmation from './components/OrderConfirmation';

const ShoppingCartCheckout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Rajasthani Dal Baati Churma",
      description: "Traditional Rajasthani delicacy with lentil curry, wheat balls, and sweet crumble. Served with ghee and authentic spices.",
      price: 299,
      quantity: 2,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      category: "Rajasthani"
    },
    {
      id: 2,
      name: "South Indian Sambar Rice",
      description: "Aromatic rice served with traditional sambar, coconut chutney, and crispy papad. A complete South Indian meal experience.",
      price: 199,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
      category: "South Indian"
    },
    {
      id: 3,
      name: "Bengali Fish Curry Thali",
      description: "Fresh fish curry with steamed rice, aloo posto, and traditional Bengali sweets. Authentic flavors from West Bengal.",
      price: 349,
      quantity: 1,
      image: "https://images.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818_1280.jpg",
      category: "Bengali"
    }
  ];

  const deliveryCharge = 0; // Free delivery
  const taxRate = 0.05; // 5% GST

  useEffect(() => {
    // Load cart items from localStorage or use mock data
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems(mockCartItems);
      localStorage.setItem('cartItems', JSON.stringify(mockCartItems));
    }
  }, []);

  useEffect(() => {
    // Update localStorage when cart changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleAddressAdd = (newAddress) => {
    setSelectedAddress(newAddress);
  };

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && cartItems.length === 0) {
      alert('Your cart is empty. Please add items to continue.');
      return;
    }
    
    if (currentStep === 2 && !selectedAddress) {
      alert('Please select a delivery address to continue.');
      return;
    }
    
    if (currentStep === 3 && !selectedPayment) {
      alert('Please select a payment method to continue.');
      return;
    }

    if (currentStep === 3) {
      handlePlaceOrder();
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotal * taxRate;
    const total = subtotal + deliveryCharge + taxAmount;
    
    const order = {
      orderId: `RCH${Date.now()}`,
      total,
      paymentMethod: selectedPayment,
      address: selectedAddress,
      items: cartItems,
      timestamp: new Date()
    };
    
    setOrderDetails(order);
    setCurrentStep(4);
    setIsLoading(false);
    
    // Clear cart after successful order
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const handleContinueShopping = () => {
    navigate('/product-catalog-browse');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAmount = subtotal * taxRate;
  const total = subtotal + deliveryCharge + taxAmount;

  if (cartItems.length === 0 && currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="navigation-offset">
          <div className="content-max-width viewport-padding py-8">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ShoppingCart" size={48} className="text-text-muted" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-text-primary mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-text-secondary mb-8 max-w-md mx-auto">
                Looks like you haven't added any delicious dishes to your cart yet. 
                Explore our authentic rural cuisine collection!
              </p>
              <Button
                variant="primary"
                iconName="UtensilsCrossed"
                onClick={() => navigate('/product-catalog-browse')}
                className="min-touch-target"
              >
                Browse Dishes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="navigation-offset">
        <div className="content-max-width viewport-padding py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="font-heading font-bold text-3xl text-text-primary mb-2">
              {currentStep === 4 ? 'Order Confirmation' : 'Checkout'}
            </h1>
            <p className="text-text-secondary">
              {currentStep === 4 
                ? 'Your order has been placed successfully!' :'Complete your order for authentic rural cuisine'
              }
            </p>
          </div>

          {/* Progress Indicator */}
          {currentStep < 4 && <CheckoutProgress currentStep={currentStep} />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <div>
                  <h2 className="font-heading font-bold text-xl text-text-primary mb-4 flex items-center gap-2">
                    <Icon name="ShoppingCart" size={24} />
                    Your Cart ({cartItems.length} items)
                  </h2>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <DeliveryForm
                  selectedAddress={selectedAddress}
                  onAddressSelect={handleAddressSelect}
                  onAddressAdd={handleAddressAdd}
                />
              )}

              {currentStep === 3 && (
                <PaymentForm
                  selectedPayment={selectedPayment}
                  onPaymentSelect={handlePaymentSelect}
                />
              )}

              {currentStep === 4 && orderDetails && (
                <OrderConfirmation
                  orderDetails={orderDetails}
                  onContinueShopping={handleContinueShopping}
                />
              )}
            </div>

            {/* Order Summary Sidebar */}
            {currentStep < 4 && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <OrderSummary
                    cartItems={cartItems}
                    deliveryCharge={deliveryCharge}
                    taxRate={taxRate}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
              <Button
                variant="outline"
                iconName="ArrowLeft"
                onClick={currentStep === 1 ? () => navigate('/product-catalog-browse') : handlePrevStep}
                className="min-touch-target"
              >
                {currentStep === 1 ? 'Continue Shopping' : 'Previous Step'}
              </Button>

              <Button
                variant="primary"
                iconName={currentStep === 3 ? "CreditCard" : "ArrowRight"}
                iconPosition="right"
                onClick={handleNextStep}
                loading={isLoading}
                disabled={
                  (currentStep === 1 && cartItems.length === 0) ||
                  (currentStep === 2 && !selectedAddress) ||
                  (currentStep === 3 && !selectedPayment)
                }
                className="min-touch-target"
              >
                {currentStep === 3 ? 'Place Order' : 'Next Step'}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Order Summary */}
        {currentStep < 4 && (
          <OrderSummary
            cartItems={cartItems}
            deliveryCharge={deliveryCharge}
            taxRate={taxRate}
            isSticky={true}
          />
        )}
      </div>
    </div>
  );
};

export default ShoppingCartCheckout;