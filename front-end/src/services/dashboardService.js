// dashboardService.js
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const dashboardService = {
  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/user/all-user`, {
      method: 'GET',
      credentials: 'include', // sends HttpOnly cookie
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to fetch users');
    }

    return response.json();
  }
};
