

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

  // POST /ml/predict
  async makePrediction(formData) {
    const response = await fetch(`${API_BASE_URL}/ml/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Prediction API failed');
    }

    const result = await response.json();

    // Map backend response to your frontend prediction structure
    return {
      success: true,
      prediction: {
        riskScore: result.probability_of_default,
        category: result.prediction === 1 ? 'High Risk' : 'Low Risk',
        recommendation: result.prediction === 1 
          ? 'Requires additional collateral' 
          : 'Standard monitoring',
        confidence: result.probability_of_default,
        factors: [] // optional: add if backend provides reasons/factors
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