import React from 'react';

const AuthToggle = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-surface-100 rounded-lg p-1 mb-8">
      <button
        onClick={() => onTabChange('login')}
        className={`flex-1 py-3 px-6 rounded-md text-sm font-medium cultural-transition ${
          activeTab === 'login' ?'bg-primary text-white cultural-shadow-subtle' :'text-text-secondary hover:text-text-primary'
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => onTabChange('register')}
        className={`flex-1 py-3 px-6 rounded-md text-sm font-medium cultural-transition ${
          activeTab === 'register' ?'bg-primary text-white cultural-shadow-subtle' :'text-text-secondary hover:text-text-primary'
        }`}
      >
        Create Account
      </button>
    </div>
  );
};

export default AuthToggle;