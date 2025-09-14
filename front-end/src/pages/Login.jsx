import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { error: showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      await login(email, password);
    } catch (err) {
      showError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="bg-white rounded-lg shadow-bank p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-accent font-bold text-3xl">B</span>
            </div>
            <h2 className="text-3xl font-bold text-primary">BankTech</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Sign In
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <a 
              href="#" 
              className="text-sm text-accent hover:text-accent-dark transition-colors"
            >
              Forgot your password?
            </a>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Secure banking platform • Protected by enterprise security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;