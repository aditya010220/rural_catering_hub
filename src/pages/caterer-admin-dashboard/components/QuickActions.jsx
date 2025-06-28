import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'add-dish',
      title: 'Add New Dish',
      description: 'Add a new item to your menu',
      icon: 'Plus',
      color: 'bg-primary-50 text-primary-600 hover:bg-primary-100',
      action: 'addDish'
    },
    {
      id: 'manage-menu',
      title: 'Manage Menu',
      description: 'Edit existing dishes and prices',
      icon: 'Edit',
      color: 'bg-accent-50 text-accent-600 hover:bg-accent-100',
      action: 'manageMenu'
    },
    {
      id: 'view-analytics',
      title: 'View Analytics',
      description: 'Check your performance metrics',
      icon: 'BarChart3',
      color: 'bg-secondary-50 text-secondary-600 hover:bg-secondary-100',
      action: 'viewAnalytics'
    },
    {
      id: 'update-profile',
      title: 'Update Profile',
      description: 'Edit your story and gallery',
      icon: 'User',
      color: 'bg-success-50 text-success-600 hover:bg-success-100',
      action: 'updateProfile'
    }
  ];

  return (
    <div className="bg-surface rounded-lg cultural-shadow-subtle cultural-border p-6 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Zap" size={20} className="text-primary-600" />
        <h2 className="text-lg font-semibold text-text-primary">Quick Actions</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.action)}
            className={`p-4 rounded-lg cultural-transition cultural-hover-scale text-left ${action.color}`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Icon name={action.icon} size={20} />
              </div>
            </div>
            
            <h3 className="font-medium mb-1">{action.title}</h3>
            <p className="text-sm opacity-80">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;