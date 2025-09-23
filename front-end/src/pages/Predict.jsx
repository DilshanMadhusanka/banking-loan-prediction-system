import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Button from '../components/UI/Button';
import { dataService } from '../services/dataService';
import { useToast } from '../contexts/ToastContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

function Predict() {
  const [formData, setFormData] = useState({
   
    // Contract Information
    DUE_FREQUENCY: '',
    NET_RENTAL: '',
    NO_OF_RENTAL: '',
    
    // Customer Information
    AGE: '',
    MARITAL_STATUS: '',
    INCOME: '',
    
    // Financial Information
    FINANCE_AMOUNT: '',
    CUSTOMER_VALUATION: '',
    EFFECTIVE_RATE: '',
    
    // LLM Prompt
    customer_behavior: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    product: true,
    contract: false,
    asset: false,
    customer: false,
    financial: false,
    llm: false
  });

  const { success, error } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


const handlePredict = async () => {
  const requiredFields = [
    "DUE_FREQUENCY", "NET_RENTAL", "NO_OF_RENTAL", 
    "AGE", "MARITAL_STATUS", "INCOME", 
    "FINANCE_AMOUNT", "CUSTOMER_VALUATION", 
    "EFFECTIVE_RATE", "customer_behavior"
  ];
  const missingFields = requiredFields.filter(field => !formData[field]);

  if (missingFields.length > 0) {
    error(`Please fill in required fields: ${missingFields.join(", ")}`);
    return;
  }

  setLoading(true);

  try {
    // Send the exact shape your backend expects
    const payload = {
      loan_data: {
        DUE_FREQUENCY: formData.DUE_FREQUENCY,
        NET_RENTAL: Number(formData.NET_RENTAL),
        NO_OF_RENTAL: Number(formData.NO_OF_RENTAL),
        FINANCE_AMOUNT: Number(formData.FINANCE_AMOUNT),
        CUSTOMER_VALUATION: Number(formData.CUSTOMER_VALUATION),
        EFFECTIVE_RATE: Number(formData.EFFECTIVE_RATE),
        AGE: Number(formData.AGE),
        INCOME: Number(formData.INCOME),
        MARITAL_STATUS: formData.MARITAL_STATUS
      },
      customer_behavior: formData.customer_behavior
    };

    const result = await dataService.makePrediction(payload);

    setPrediction({
      category: result.llm_result.risk_category,
      confidence: result.llm_result.confidence,
      recommendation: result.llm_result.recommendation,
      factors: result.llm_result.factors,
      riskScore: result.ml_result.probability_of_default
    });

    success("Prediction completed successfully!");
  } catch (err) {
    console.error(err);
    error(err.message || "Prediction failed. Please try again.");
  } finally {
    setLoading(false);
  }
};



  

  const handleSavePrediction = async () => {
    if (!prediction) {
      error('No prediction to save');
      return;
    }

    setSaving(true);
    
    try {
      await dataService.savePrediction({ formData, prediction });
      success('Prediction saved successfully!');
    } catch (err) {
      error('Failed to save prediction');
    } finally {
      setSaving(false);
    }
  };

  const SectionHeader = ({ title, section, count }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full p-4 mb-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="ml-2 text-sm text-gray-500">({count} fields)</span>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Risk Prediction</h1>
        <p className="text-gray-600">Enter customer and contract details to generate risk assessment</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Prediction Form */}
        <div className="space-y-6 lg:col-span-2">
          <Card title="Prediction Form">
            
            {/* Contract Information */}
            <div className="space-y-4">
              <SectionHeader title="Contract Information" section="contract" count={11} />
              
              {expandedSections.contract && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 
                  <Select
                    label="Due Frequency"
                    value={formData.DUE_FREQUENCY}
                    onChange={(e) => handleInputChange('DUE_FREQUENCY', e.target.value)}
                    options={['Monthly', 'Quarterly', 'Semi-Annual', 'Annual']}
                  />
                  <Input
                    label="Net Rental"
                    type="number"
                    value={formData.NET_RENTAL}
                    onChange={(e) => handleInputChange('NET_RENTAL', e.target.value)}
                    placeholder="0.00"
                  />
                  <Input
                    label="Number of Rentals"
                    type="number"
                    value={formData.NO_OF_RENTAL}
                    onChange={(e) => handleInputChange('NO_OF_RENTAL', e.target.value)}
                  />
                
                </div>
              )}
            </div>


            {/* Customer Information */}
            <div className="space-y-4">
              <SectionHeader title="Customer Information" section="customer" count={8} />
              
              {expandedSections.customer && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 
                  <Input
                    label="Age"
                    type="number"
                    value={formData.AGE}
                    onChange={(e) => handleInputChange('AGE', e.target.value)}
                  />
                  <Select
                    label="Marital Status"
                    value={formData.MARITAL_STATUS}
                    onChange={(e) => handleInputChange('MARITAL_STATUS', e.target.value)}
                    options={['Single', 'Married', 'Divorced', 'Widowed']}
                  />
                  <Input
                    label="Income"
                    type="number"
                    value={formData.INCOME}
                    onChange={(e) => handleInputChange('INCOME', e.target.value)}
                    placeholder="0.00"
                  />
                 
                </div>
              )}
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <SectionHeader title="Financial Information" section="financial" count={3} />
              
              {expandedSections.financial && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Finance Amount"
                    type="number"
                    value={formData.FINANCE_AMOUNT}
                    onChange={(e) => handleInputChange('FINANCE_AMOUNT', e.target.value)}
                    placeholder="0.00"
                    required
                  />
                  <Input
                    label="Customer Valuation"
                    type="number"
                    value={formData.CUSTOMER_VALUATION}
                    onChange={(e) => handleInputChange('CUSTOMER_VALUATION', e.target.value)}
                    placeholder="0.00"
                  />
                  <Input
                    label="Effective Rate"
                    type="number"
                    step="0.01"
                    value={formData.EFFECTIVE_RATE}
                    onChange={(e) => handleInputChange('EFFECTIVE_RATE', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              )}
            </div>

            {/* LLM Prompt */}
            <div className="space-y-4">
              <SectionHeader title="LLM Analysis Prompt" section="llm" count={1} />
              
              {expandedSections.llm && (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Custom Analysis Prompt
                    </label>
                    <textarea
                      value={formData.customer_behavior}
                      onChange={(e) => handleInputChange('customer_behavior', e.target.value)}
                      placeholder="Enter specific instructions for the AI analysis..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex pt-6 space-x-4 border-t border-gray-200">
              <Button
                onClick={handlePredict}
                loading={loading}
                disabled={loading}
                className="flex-1"
              >
                Generate Prediction
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleSavePrediction}
                loading={saving}
                disabled={saving || !prediction}
              >
                Save Prediction
              </Button>
            </div>
          </Card>
        </div>

        {/* Prediction Result */}
        <div className="space-y-6">
          <Card title="Prediction Result">
            {prediction ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`
                    inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                    ${prediction.category === 'High' ? 'bg-red-100 text-red-800' :
                      prediction.category === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}
                  `}>
                    {prediction.category}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Risk Score</label>
                    <div className="mt-1">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            prediction.riskScore > 0.7 ? 'bg-red-500' :
                            prediction.riskScore > 0.4 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${prediction.riskScore * 100}%` }}
                        />
                      </div>
                      <span className="block mt-1 text-sm text-gray-600">
                        {(prediction.riskScore * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confidence</label>
                    <span className="text-lg font-semibold text-gray-900">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Recommendation</label>
                    <p className="p-3 text-sm text-gray-600 rounded-lg bg-gray-50">
                      {prediction.recommendation}
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Risk Factors</label>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {prediction.factors.map((factor, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 mr-2 rounded-full bg-accent"></span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-gray-500">Fill the form and click "Generate Prediction" to see results</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Predict;