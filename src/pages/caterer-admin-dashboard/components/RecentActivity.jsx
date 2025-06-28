import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'New order received',
      description: 'Order #1234 from Priya Sharma for wedding catering',
      time: '5 minutes ago',
      icon: 'ShoppingBag',
      color: 'text-primary-600'
    },
    {
      id: 2,
      type: 'review',
      title: 'New review received',
      description: 'Rajesh Kumar gave you 5 stars for Rajasthani Thali',
      time: '1 hour ago',
      icon: 'Star',
      color: 'text-secondary-600'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment received',
      description: 'Payment of ₹3,500 for Order #1230 has been credited',
      time: '2 hours ago',
      icon: 'IndianRupee',
      color: 'text-success-600'
    },
    {
      id: 4,
      type: 'menu',
      title: 'Menu item updated',
      description: 'Updated price for Gujarati Thali to ₹250',
      time: '3 hours ago',
      icon: 'Edit',
      color: 'text-accent-600'
    },
    {
      id: 5,
      type: 'inventory',
      title: 'Low stock alert',
      description: 'Masala Chai ingredients running low',
      time: '4 hours ago',
      icon: 'AlertTriangle',
      color: 'text-warning-600'
    }
  ];

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle cultural-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary-600" />
          <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 cultural-transition">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-background-50 cultural-transition"
          >
            <div className={`w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center ${activity.color}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary text-sm">
                {activity.title}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {activity.description}
              </p>
              <p className="text-xs text-text-muted mt-2">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;