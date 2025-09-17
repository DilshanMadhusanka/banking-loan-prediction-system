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
      
      return {
        token: data.token || data.accessToken,
        user: {
          id: data.user?.id || data.id,
          name: data.user?.name || data.name || username,
          email: data.user?.email || data.email,
          mobile: data.user?.mobile || data.mobile,
          profileImage: data.user?.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
        }
      };
    } catch (error) {
      console.error('Login error:', error);
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

  // GET /api/v1/auth/validate-token or similar endpoint
  async validateToken(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Token validation failed');
      }

      const data = await response.json();
      
      return {
        id: data.user?.id || data.id,
        name: data.user?.name || data.name,
        email: data.user?.email || data.email,
        mobile: data.user?.mobile || data.mobile,
        profileImage: data.user?.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
      };
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  }
};