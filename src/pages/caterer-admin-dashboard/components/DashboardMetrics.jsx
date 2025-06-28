import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardMetrics = () => {
  const metrics = [
    {
      id: 1,
      title: "Today\'s Orders",
      value: "12",
      change: "+3 from yesterday",
      changeType: "positive",
      icon: "ShoppingBag",
      color: "bg-primary-50 text-primary-600"
    },
    {
      id: 2,
      title: "Pending Requests",
      value: "5",
      change: "2 urgent",
      changeType: "warning",
      icon: "Clock",
      color: "bg-warning-50 text-warning-600"
    },
    {
      id: 3,
      title: "Total Earnings",
      value: "₹8,450",
      change: "+₹1,200 this week",
      changeType: "positive",
      icon: "IndianRupee",
      color: "bg-success-50 text-success-600"
    },
    {
      id: 4,
      title: "Customer Rating",
      value: "4.8",
      change: "Based on 45 reviews",
      changeType: "neutral",
      icon: "Star",
      color: "bg-secondary-50 text-secondary-600"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success-600';
      case 'warning':
        return 'text-warning-600';
      case 'negative':
        return 'text-error-600';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-surface rounded-lg p-6 cultural-shadow-subtle cultural-border cultural-transition cultural-hover-scale"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.color}`}>
              <Icon name={metric.icon} size={24} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-text-secondary">
              {metric.title}
            </h3>
            <p className="text-2xl font-bold text-text-primary">
              {metric.value}
            </p>
            <p className={`text-sm ${getChangeColor(metric.changeType)}`}>
              {metric.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;