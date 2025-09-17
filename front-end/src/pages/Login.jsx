import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { error: showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      showError('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      await login(username, password);
    } catch (err) {
      showError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="p-8 bg-white rounded-lg shadow-bank">
          {/* Logo and Title */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-lg bg-primary">
              <span className="text-3xl font-bold text-accent">B</span>
            </div>
            <h2 className="text-3xl font-bold text-primary">BankTech</h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="username"
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
              className="text-sm transition-colors text-accent hover:text-accent-dark"
            >
              Forgot your password?
            </a>
          </div>
          
          <div className="pt-6 mt-8 text-center border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Secure banking platform • Use username: "ww" and password: "1234" for demo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;