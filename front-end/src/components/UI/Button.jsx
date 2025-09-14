import React from 'react';

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-accent hover:bg-accent-dark text-white focus:ring-accent',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-300',
    outline: 'border border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const disabledClasses = disabled || loading 
    ? 'opacity-50 cursor-not-allowed' 
    : '';

  return (
    <button
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${disabledClasses}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;