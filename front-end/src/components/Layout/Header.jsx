import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

function Header({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="flex items-center ml-2 lg:ml-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-accent font-bold text-xl">B</span>
            </div>
            <span className="font-bold text-xl text-primary">BankTech</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-sm text-gray-600">
            {currentDate}
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline text-sm font-medium text-gray-700">
              {user?.name}
            </span>
            
            <img
              src={user?.profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            
            <button
              onClick={handleLogout}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;