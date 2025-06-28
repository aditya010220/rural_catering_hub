import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Order Alert',
      message: 'You have received a new order for South Indian Feast',
      time: '2 minutes ago',
      type: 'order',
      isRead: false
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Payment of ₹2,500 has been credited to your account',
      time: '1 hour ago',
      type: 'payment',
      isRead: false
    },
    {
      id: 3,
      title: 'Customer Review',
      message: 'Anita Patel left a 5-star review for your Gujarati Thali',
      time: '3 hours ago',
      type: 'review',
      isRead: true
    },
    {
      id: 4,
      title: 'Inventory Alert',
      message: 'Basmati rice stock is running low',
      time: '5 hours ago',
      type: 'inventory',
      isRead: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return 'ShoppingBag';
      case 'payment':
        return 'IndianRupee';
      case 'review':
        return 'Star';
      case 'inventory':
        return 'AlertTriangle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'order':
        return 'text-primary-600';
      case 'payment':
        return 'text-success-600';
      case 'review':
        return 'text-secondary-600';
      case 'inventory':
        return 'text-warning-600';
      default:
        return 'text-text-secondary';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        iconName="Bell"
        onClick={() => setIsOpen(!isOpen)}
        className="min-touch-target relative"
      >
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-data">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg cultural-shadow-moderate border cultural-border z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b cultural-border-light">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-text-primary">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-primary-600 hover:text-primary-700 cultural-transition"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y cultural-border-light">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-background-50 cultural-transition cursor-pointer ${
                        !notification.isRead ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                          <Icon name={getNotificationIcon(notification.type)} size={16} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-text-primary text-sm">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-text-secondary mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-text-muted mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Icon name="Bell" size={48} className="text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">No notifications yet</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t cultural-border-light">
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center"
                >
                  View All Notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;