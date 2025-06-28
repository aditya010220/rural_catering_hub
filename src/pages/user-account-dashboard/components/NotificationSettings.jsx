import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSettings = ({ settings, onUpdateSettings }) => {
  const [notificationSettings, setNotificationSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const notificationTypes = [
    {
      id: 'orderUpdates',
      title: 'Order Updates',
      description: 'Get notified about order status changes, delivery updates, and confirmations',
      icon: 'Package'
    },
    {
      id: 'promotions',
      title: 'Promotions & Offers',
      description: 'Receive notifications about special deals, discounts, and new caterer offers',
      icon: 'Tag'
    },
    {
      id: 'newCaterers',
      title: 'New Caterers',
      description: 'Be the first to know when new caterers join in your area',
      icon: 'ChefHat'
    },
    {
      id: 'recommendations',
      title: 'Personalized Recommendations',
      description: 'Get dish and caterer suggestions based on your preferences',
      icon: 'Heart'
    },
    {
      id: 'reminders',
      title: 'Meal Reminders',
      description: 'Helpful reminders for meal times and favorite dish availability',
      icon: 'Clock'
    },
    {
      id: 'reviews',
      title: 'Review Requests',
      description: 'Reminders to review your orders and share feedback',
      icon: 'Star'
    }
  ];

  const deliveryMethods = [
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Instant notifications on your device',
      icon: 'Smartphone'
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Notifications sent to your email address',
      icon: 'Mail'
    },
    {
      id: 'sms',
      title: 'SMS',
      description: 'Text messages for important updates',
      icon: 'MessageSquare'
    }
  ];

  const handleNotificationToggle = (type, method) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [method]: !prev[type][method]
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    onUpdateSettings(notificationSettings);
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    setNotificationSettings(settings);
    setHasChanges(false);
  };

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle border cultural-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Notification Settings
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Customize how and when you receive notifications
          </p>
        </div>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={handleResetSettings}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              iconName="Save"
              iconPosition="left"
              onClick={handleSaveSettings}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Notification Types */}
      <div className="space-y-6">
        {notificationTypes.map((type) => (
          <div key={type.id} className="border-b cultural-border-light pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name={type.icon} size={18} color="var(--color-primary)" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-text-primary mb-1">
                  {type.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {type.description}
                </p>
                
                {/* Delivery Method Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {deliveryMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-3 rounded-lg border cultural-transition cursor-pointer ${
                        notificationSettings[type.id]?.[method.id]
                          ? 'border-primary bg-primary-50' :'border-cultural-border bg-surface-50'
                      }`}
                      onClick={() => handleNotificationToggle(type.id, method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          name={method.icon}
                          size={16}
                          color={
                            notificationSettings[type.id]?.[method.id]
                              ? 'var(--color-primary)'
                              : 'var(--color-text-secondary)'
                          }
                        />
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            notificationSettings[type.id]?.[method.id]
                              ? 'text-primary' :'text-text-primary'
                          }`}>
                            {method.title}
                          </p>
                        </div>
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          notificationSettings[type.id]?.[method.id]
                            ? 'border-primary bg-primary' :'border-surface-300'
                        }`}>
                          {notificationSettings[type.id]?.[method.id] && (
                            <Icon name="Check" size={12} color="white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t cultural-border-light">
        <h3 className="font-heading font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            iconName="Volume2"
            iconPosition="left"
            onClick={() => {
              const allEnabled = {};
              notificationTypes.forEach(type => {
                allEnabled[type.id] = {};
                deliveryMethods.forEach(method => {
                  allEnabled[type.id][method.id] = true;
                });
              });
              setNotificationSettings(allEnabled);
              setHasChanges(true);
            }}
            className="justify-start"
          >
            Enable All Notifications
          </Button>
          <Button
            variant="outline"
            iconName="VolumeX"
            iconPosition="left"
            onClick={() => {
              const allDisabled = {};
              notificationTypes.forEach(type => {
                allDisabled[type.id] = {};
                deliveryMethods.forEach(method => {
                  allDisabled[type.id][method.id] = false;
                });
              });
              setNotificationSettings(allDisabled);
              setHasChanges(true);
            }}
            className="justify-start"
          >
            Disable All Notifications
          </Button>
        </div>
      </div>

      {/* Do Not Disturb */}
      <div className="mt-6 p-4 bg-surface-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Moon" size={20} color="var(--color-text-secondary)" />
          <div className="flex-1">
            <h4 className="font-medium text-text-primary">Do Not Disturb</h4>
            <p className="text-sm text-text-secondary">
              Quiet hours: 10:00 PM - 8:00 AM (No push notifications during this time)
            </p>
          </div>
          <div className={`w-12 h-6 rounded-full border-2 cursor-pointer cultural-transition ${
            notificationSettings.doNotDisturb
              ? 'border-primary bg-primary' :'border-surface-300 bg-surface-200'
          }`}
          onClick={() => handleNotificationToggle('doNotDisturb', 'enabled')}
          >
            <div className={`w-4 h-4 bg-white rounded-full cultural-transition ${
              notificationSettings.doNotDisturb ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;