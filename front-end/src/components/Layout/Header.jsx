import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext'; // Ensure the correct path

function Header({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast(); // get toast object

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      if (toast?.success) toast.success('Logged out successfully');
    } catch (err) {
      if (toast?.error) toast.error('Logout failed');
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex items-center ml-2 lg:ml-0">
            <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-primary">
              <span className="text-xl font-bold text-accent">B</span>
            </div>
            <span className="text-xl font-bold text-primary">BankTech</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-9">
          <div className="hidden text-sm text-gray-600 md:block">
            {currentDate}
          </div>
          
          <div className="flex items-center space-x-8">
            <span className="hidden text-sm font-medium text-gray-700 sm:inline">
              {user?.name}
            </span>
            
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 transition-colors rounded-md hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent "
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
