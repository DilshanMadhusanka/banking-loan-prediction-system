const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const reportService = {
  // POST /api/reports/generate
  async generateReport(filters) {
    // TODO: Replace with actual API call
    console.log('API Stub - Generate report:', filters);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      reportId: 'rpt-' + Date.now(),
      data: {
        totalRecords: 1500,
        summary: {
          highRisk: 450,
          mediumRisk: 600,
          lowRisk: 450
        },
        downloadUrl: 'blob:mock-report-url'
      }
    };
  },

  // GET /api/history
   async getHistory() {
    const response = await fetch(`${API_BASE_URL}/ml/all-predictions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      //credentials: "include", // keep cookies/session if backend uses them
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to fetch history");
    }

    return response.json(); // backend returns array of PredictionResultDTO
  },
};