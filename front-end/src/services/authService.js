// const API_BASE_URL = 'http://localhost:8080/api/v1';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;


export const authService = {
  // POST /auth/login
  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // important! cookies will be sent/received
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    // The cookie is set automatically; token in response is null
    const data = await response.json();

    // Fetch user profile from backend
    const userResponse = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      credentials: 'include' // send cookie automatically
    });

    if (!userResponse.ok) throw new Error('Failed to fetch user profile');
    const userData = await userResponse.json();

    return {
      user: {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        createdAt: userData.createdAt
      }
    };
  },

  // POST /auth/logout
  async logout() {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return { success: true };
  },

  // GET /user/profile
  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Not authenticated');

    return response.json();
  }
};
