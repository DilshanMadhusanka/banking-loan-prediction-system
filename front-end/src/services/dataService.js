

const API_BASE_URL = import.meta.env.VITE_BASE_URL;


export const dataService = {
   async uploadFile(file) {
  // Prepare FormData
  const formData = new FormData();
  formData.append('file', file);

  // Send request with credentials: 'include' to automatically send cookies
  const response = await fetch(`${API_BASE_URL}/data/upload`, {
    method: 'POST',
    //credentials: 'include', // important: send cookie automatically
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'File upload failed');
  }

  // Return backend response
  const data = await response.json();
  return data;
},


  // POST /api/predict
  async makePrediction(formData) {
    // TODO: Replace with actual API call
    console.log('API Stub - Make prediction:', formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock prediction result
    return {
      success: true,
      prediction: {
        riskScore: 0.75,
        category: 'High Risk',
        recommendation: 'Requires additional collateral',
        confidence: 0.89,
        factors: [
          'High debt-to-income ratio',
          'Previous late payments',
          'Low asset valuation'
        ]
      }
    };
  },

  // POST /api/predictions/save
  async savePrediction(predictionData) {
    // TODO: Replace with actual API call
    console.log('API Stub - Save prediction:', predictionData);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      predictionId: 'pred-' + Date.now()
    };
  }
};