import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Brain, 
  FileText, 
  History, 
  User,
  X 
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload Data', href: '/upload', icon: Upload },
  { name: 'Predict', href: '/predict', icon: Brain },
  { name: 'Report', href: '/report', icon: FileText },
  { name: 'History', href: '/history', icon: History },
  { name: 'Profile', href: '/profile', icon: User },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 z-30 w-64 h-full bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-200">
          <span className="font-semibold text-gray-900">Navigation</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-accent bg-opacity-10 text-accent-dark border-r-4 border-accent'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;