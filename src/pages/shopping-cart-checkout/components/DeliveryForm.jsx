import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DeliveryForm = ({ selectedAddress, onAddressSelect, onAddressAdd }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  const savedAddresses = [
    {
      id: 1,
      type: 'home',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      addressLine1: '123, Green Valley Apartments',
      addressLine2: 'Sector 15, Dwarka',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110075',
      landmark: 'Near Metro Station'
    },
    {
      id: 2,
      type: 'work',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      addressLine1: 'Tech Park, Building A-5',
      addressLine2: 'Cyber City, Phase 2',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122002',
      landmark: 'Opposite DLF Mall'
    }
  ];

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const addressToAdd = {
      ...newAddress,
      id: Date.now()
    };
    onAddressAdd(addressToAdd);
    setNewAddress({
      type: 'home',
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    });
    setShowAddForm(false);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home': return 'Home';
      case 'work': return 'Building';
      default: return 'MapPin';
    }
  };

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle p-6">
      <h3 className="font-heading font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
        <Icon name="MapPin" size={20} />
        Delivery Address
      </h3>

      {/* Saved Addresses */}
      <div className="space-y-3 mb-4">
        {savedAddresses.map((address) => (
          <div
            key={address.id}
            className={`border rounded-lg p-4 cursor-pointer cultural-transition ${
              selectedAddress?.id === address.id
                ? 'border-primary bg-primary-50' :'cultural-border hover:border-primary-300'
            }`}
            onClick={() => onAddressSelect(address)}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 mt-1 cultural-transition ${
                selectedAddress?.id === address.id
                  ? 'border-primary bg-primary' :'border-surface-300'
              }`}>
                {selectedAddress?.id === address.id && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={getAddressIcon(address.type)} size={16} />
                  <span className="font-medium text-text-primary capitalize">
                    {address.type}
                  </span>
                  <span className="text-text-secondary">•</span>
                  <span className="text-text-secondary">{address.name}</span>
                </div>
                
                <p className="text-text-secondary text-sm leading-relaxed">
                  {address.addressLine1}, {address.addressLine2}<br />
                  {address.city}, {address.state} - {address.pincode}<br />
                  {address.landmark && `Landmark: ${address.landmark}`}
                </p>
                
                <p className="text-text-muted text-sm mt-1">
                  Phone: {address.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address Button */}
      {!showAddForm && (
        <Button
          variant="outline"
          iconName="Plus"
          onClick={() => setShowAddForm(true)}
          className="w-full"
        >
          Add New Address
        </Button>
      )}

      {/* Add New Address Form */}
      {showAddForm && (
        <div className="border-t cultural-border-light pt-4 mt-4">
          <h4 className="font-heading font-semibold text-text-primary mb-4">
            Add New Address
          </h4>
          
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            {/* Address Type */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Address Type
              </label>
              <div className="flex gap-2">
                {['home', 'work', 'other'].map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={newAddress.type === type ? 'primary' : 'outline'}
                    onClick={() => setNewAddress({ ...newAddress, type })}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                required
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                required
              />
            </div>

            {/* Address Details */}
            <Input
              type="text"
              placeholder="House/Flat/Building No."
              value={newAddress.addressLine1}
              onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
              required
            />
            
            <Input
              type="text"
              placeholder="Area/Sector/Locality"
              value={newAddress.addressLine2}
              onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                required
              />
            </div>

            <Input
              type="text"
              placeholder="Landmark (Optional)"
              value={newAddress.landmark}
              onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
            />

            {/* Form Actions */}
            <div className="flex gap-3">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Save Address
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;