// User Service - API Stubs
const API_BASE_URL = 'http://localhost:8080/api/v1';

export const userService = {
  // POST /api/users
  async createUser(userData) {
    // TODO: Replace with actual API call
    console.log('API Stub - Create user:', userData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      user: {
        id: 'user-' + Date.now(),
        ...userData,
        createdAt: new Date().toISOString()
      }
    };
  },

  // GET /api/v1/user/profile
  async getUserProfile() {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
    
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  }
};