import React from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle p-4 mb-4 cultural-transition">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Dish Image */}
        <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-text-primary text-lg mb-1">
                {item.name}
              </h3>
              <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-accent font-medium">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
                <span className="text-text-muted text-sm">per serving</span>
              </div>
              {item.category && (
                <span className="inline-block bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <div className="flex items-center bg-surface-100 rounded-lg border cultural-border">
                <Button
                  variant="ghost"
                  iconName="Minus"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-10 h-10 p-0 rounded-l-lg"
                  disabled={item.quantity <= 1}
                />
                <span className="px-4 py-2 font-data font-medium text-text-primary min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  iconName="Plus"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-10 h-10 p-0 rounded-r-lg"
                />
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                iconName="Trash2"
                onClick={() => onRemove(item.id)}
                className="w-10 h-10 p-0 text-error hover:text-error hover:bg-error-50"
              />
            </div>
          </div>

          {/* Item Total */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t cultural-border-light">
            <span className="text-text-secondary text-sm">
              {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
            </span>
            <span className="font-heading font-bold text-lg text-primary">
              ₹{(item.quantity * item.price).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;