import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

function Toast({ message, type = 'info', onClose }) {
  const Icon = iconMap[type];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`
      flex items-center p-4 border rounded-lg shadow-lg max-w-sm w-full 
      ${colorMap[type]}
      animate-in slide-in-from-right duration-300
    `}>
      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
      
      <div className="flex-1 text-sm font-medium">
        {message}
      </div>
      
      <button
        onClick={onClose}
        className="ml-3 p-1 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Toast;