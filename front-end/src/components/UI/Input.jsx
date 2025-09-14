import React from 'react';

function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  className = '',
  ...props 
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
          ${error ? 'border-red-500' : ''}
          ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export default Input;