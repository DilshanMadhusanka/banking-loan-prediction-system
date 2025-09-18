const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const userService = {
  // POST /api/users
  async createUser(userData) {
    // Only send fields backend expects
    const payload = {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      password: userData.password
    };

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
     
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to create user');
    }

    return response.json(); // returns created user from backend
  },

  // GET /api/users/profile
  async getUserProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'GET',
        credentials: 'include', // send cookies automatically
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user profile');

      const data = await response.json();

      return {
        success: true,
        user: {
          id: data.username || '1',                 
          name: data.name || 'John Doe',
          email: data.email || 'john.doe@bank.com',
          mobile: '+1234567890',                     
          profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'Admin',
          department: 'Risk Management',
          joinDate: data.createdAt || '2023-01-15'  
        }
      };

    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        success: false,
        user: null
      };
    }
  }

};
