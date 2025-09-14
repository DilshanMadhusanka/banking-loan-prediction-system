// Authentication Service - API Stubs
// TODO: Replace with actual API endpoints

//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const authService = {
  // POST /api/auth/login
  async login(email, password) {
    // TODO: Replace with actual API call
    console.log('API Stub - Login attempt:', { email, password });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful login
    if (email && password) {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '1',
          name: 'John Doe',
          email: email,
          mobile: '+1234567890',
          profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  // POST /api/auth/logout
  async logout() {
    // TODO: Replace with actual API call
    console.log('API Stub - Logout');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  },

  // GET /api/auth/validate-token
  async validateToken(token) {
    // TODO: Replace with actual API call
    console.log('API Stub - Validate token:', token);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock user data
    return {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@bank.com',
      mobile: '+1234567890',
      profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    };
  }
};