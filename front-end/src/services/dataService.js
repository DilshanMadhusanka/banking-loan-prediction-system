// Data Service - API Stubs
// TODO: Replace with actual API endpoints

//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const dataService = {
  // POST /api/data/upload
  async uploadFile(file) {
    // TODO: Replace with actual API call
    console.log('API Stub - Upload file:', file.name, file.size);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response with preview data
    return {
      success: true,
      fileName: file.name,
      rowCount: 1000,
      preview: [
        {
          PRODUCT_CODE: 'PL001',
          PRODUCT_NAME: 'Personal Loan',
          PRODUCT_CATEGORY: 'Loans',
          CONTRACT_NO: 'CT001',
          CONTRACT_STATUS: 'Active'
        },
        {
          PRODUCT_CODE: 'VL002',
          PRODUCT_NAME: 'Vehicle Loan',
          PRODUCT_CATEGORY: 'Auto',
          CONTRACT_NO: 'CT002',
          CONTRACT_STATUS: 'Closed'
        }
      ]
    };
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