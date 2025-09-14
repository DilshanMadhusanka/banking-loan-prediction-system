import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Contact Support
            </a>
          </div>
          
          <div className="text-sm text-gray-500">
            © 2025 BankTech. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;