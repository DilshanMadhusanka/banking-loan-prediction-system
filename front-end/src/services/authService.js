// Authentication Service - Backend Integration
const API_BASE_URL = 'http://localhost:8080/api/v1';

export const authService = {
  // POST /api/v1/auth/login
  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'Login failed');
      }
      
      return {
        token: data.token,
        message: data.message,
        time: data.time
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // GET /api/v1/user/profile or similar endpoint to get user details using token
  async getUserProfile(token) {
    try {
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
  },

  // POST /api/v1/auth/logout
  async logout() {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      // Even if logout fails on backend, we'll clear local storage
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: true }; // Still return success to clear local state
    }
  },

  // Validate token and get user details
  async validateToken(token) {
    try {
      // Use the same endpoint to get user profile which validates the token
      const userData = await this.getUserProfile(token);
      return userData;
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  }
};