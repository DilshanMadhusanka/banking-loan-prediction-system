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
    // Product Information
    PRODUCT_CODE: '',
    PRODUCT_NAME: '',
    PRODUCT_CATEGORY: '',
    
    // Contract Information
    CONTRACT_NO: '',
    CONTRACT_STATUS: '',
    CONTRACT_DATE: '',
    RECOVERY_STATUS: '',
    LAST_PAYMENT_DATE: '',
    RE_PROCESS_DATE: '',
    RESCHEDULE: '',
    DUE_FREQUENCY: '',
    NET_RENTAL: '',
    NO_OF_RENTAL: '',
    PAID_RENTALS: '',
    CB_ARREARS_AGE: '',
    
    // Asset Information
    ASSET_TYPE_NAME: '',
    YOM: '',
    MAKE: '',
    MODEL_NAME: '',
    REGISTRATION: '',
    REGISTRATION_NO: '',
    
    // Customer Information
    GENDER: '',
    CITY: '',
    DISTRICT_NAME: '',
    PROVINCE_NAME: '',
    AGE: '',
    MARITAL_STATUS: '',
    INCOME: '',
    EXPENSE: '',
    
    // Financial Information
    FINANCE_AMOUNT: '',
    CUSTOMER_VALUATION: '',
    EFFECTIVE_RATE: '',
    
    // LLM Prompt
    llmPrompt: ''
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
    // Basic validation
    const requiredFields = ['PRODUCT_CODE', 'CONTRACT_NO', 'FINANCE_AMOUNT'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      error(`Please fill in required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    
    try {
      const result = await dataService.makePrediction(formData);
      setPrediction(result.prediction);
      success('Prediction completed successfully!');
    } catch (err) {
      error('Prediction failed. Please try again.');
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
      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg mb-4"
    >
      <div className="flex items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="ml-2 text-sm text-gray-500">({count} fields)</span>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Risk Prediction</h1>
        <p className="text-gray-600">Enter customer and contract details to generate risk assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prediction Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Prediction Form">
            {/* Product Information */}
            <div className="space-y-4">
              <SectionHeader title="Product Information" section="product" count={3} />
              
              {expandedSections.product && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Product Code"
                    value={formData.PRODUCT_CODE}
                    onChange={(e) => handleInputChange('PRODUCT_CODE', e.target.value)}
                    placeholder="e.g., PL001"
                    required
                  />
                  <Input
                    label="Product Name"
                    value={formData.PRODUCT_NAME}
                    onChange={(e) => handleInputChange('PRODUCT_NAME', e.target.value)}
                    placeholder="e.g., Personal Loan"
                  />
                  <Select
                    label="Product Category"
                    value={formData.PRODUCT_CATEGORY}
                    onChange={(e) => handleInputChange('PRODUCT_CATEGORY', e.target.value)}
                    options={['Loans', 'Auto', 'Personal', 'Business', 'Mortgage']}
                  />
                </div>
              )}
            </div>

            {/* Contract Information */}
            <div className="space-y-4">
              <SectionHeader title="Contract Information" section="contract" count={11} />
              
              {expandedSections.contract && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Contract Number"
                    value={formData.CONTRACT_NO}
                    onChange={(e) => handleInputChange('CONTRACT_NO', e.target.value)}
                    placeholder="e.g., CT001"
                    required
                  />
                  <Select
                    label="Contract Status"
                    value={formData.CONTRACT_STATUS}
                    onChange={(e) => handleInputChange('CONTRACT_STATUS', e.target.value)}
                    options={['Active', 'Closed', 'Suspended', 'Default']}
                  />
                  <Input
                    label="Contract Date"
                    type="date"
                    value={formData.CONTRACT_DATE}
                    onChange={(e) => handleInputChange('CONTRACT_DATE', e.target.value)}
                  />
                  <Select
                    label="Recovery Status"
                    value={formData.RECOVERY_STATUS}
                    onChange={(e) => handleInputChange('RECOVERY_STATUS', e.target.value)}
                    options={['None', 'In Progress', 'Completed', 'Failed']}
                  />
                  <Input
                    label="Last Payment Date"
                    type="date"
                    value={formData.LAST_PAYMENT_DATE}
                    onChange={(e) => handleInputChange('LAST_PAYMENT_DATE', e.target.value)}
                  />
                  <Input
                    label="Re-process Date"
                    type="date"
                    value={formData.RE_PROCESS_DATE}
                    onChange={(e) => handleInputChange('RE_PROCESS_DATE', e.target.value)}
                  />
                  <Select
                    label="Reschedule"
                    value={formData.RESCHEDULE}
                    onChange={(e) => handleInputChange('RESCHEDULE', e.target.value)}
                    options={['Yes', 'No']}
                  />
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
                  <Input
                    label="Paid Rentals"
                    type="number"
                    value={formData.PAID_RENTALS}
                    onChange={(e) => handleInputChange('PAID_RENTALS', e.target.value)}
                  />
                  <Input
                    label="CB Arrears Age"
                    type="number"
                    value={formData.CB_ARREARS_AGE}
                    onChange={(e) => handleInputChange('CB_ARREARS_AGE', e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Asset Information */}
            <div className="space-y-4">
              <SectionHeader title="Asset Information" section="asset" count={5} />
              
              {expandedSections.asset && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Asset Type Name"
                    value={formData.ASSET_TYPE_NAME}
                    onChange={(e) => handleInputChange('ASSET_TYPE_NAME', e.target.value)}
                    placeholder="e.g., Vehicle"
                  />
                  <Input
                    label="Year of Manufacture"
                    type="number"
                    value={formData.YOM}
                    onChange={(e) => handleInputChange('YOM', e.target.value)}
                    placeholder="e.g., 2020"
                  />
                  <Input
                    label="Make"
                    value={formData.MAKE}
                    onChange={(e) => handleInputChange('MAKE', e.target.value)}
                    placeholder="e.g., Toyota"
                  />
                  <Input
                    label="Model Name"
                    value={formData.MODEL_NAME}
                    onChange={(e) => handleInputChange('MODEL_NAME', e.target.value)}
                    placeholder="e.g., Camry"
                  />
                  <Input
                    label="Registration"
                    value={formData.REGISTRATION}
                    onChange={(e) => handleInputChange('REGISTRATION', e.target.value)}
                  />
                  <Input
                    label="Registration Number"
                    value={formData.REGISTRATION_NO}
                    onChange={(e) => handleInputChange('REGISTRATION_NO', e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <SectionHeader title="Customer Information" section="customer" count={8} />
              
              {expandedSections.customer && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Gender"
                    value={formData.GENDER}
                    onChange={(e) => handleInputChange('GENDER', e.target.value)}
                    options={['Male', 'Female', 'Other']}
                  />
                  <Input
                    label="City"
                    value={formData.CITY}
                    onChange={(e) => handleInputChange('CITY', e.target.value)}
                  />
                  <Input
                    label="District Name"
                    value={formData.DISTRICT_NAME}
                    onChange={(e) => handleInputChange('DISTRICT_NAME', e.target.value)}
                  />
                  <Input
                    label="Province Name"
                    value={formData.PROVINCE_NAME}
                    onChange={(e) => handleInputChange('PROVINCE_NAME', e.target.value)}
                  />
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
                  <Input
                    label="Expense"
                    type="number"
                    value={formData.EXPENSE}
                    onChange={(e) => handleInputChange('EXPENSE', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              )}
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <SectionHeader title="Financial Information" section="financial" count={3} />
              
              {expandedSections.financial && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Analysis Prompt
                    </label>
                    <textarea
                      value={formData.llmPrompt}
                      onChange={(e) => handleInputChange('llmPrompt', e.target.value)}
                      placeholder="Enter specific instructions for the AI analysis..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
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
                    ${prediction.category === 'High Risk' ? 'bg-red-100 text-red-800' :
                      prediction.category === 'Medium Risk' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}
                  `}>
                    {prediction.category}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Risk Score</label>
                    <div className="mt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            prediction.riskScore > 0.7 ? 'bg-red-500' :
                            prediction.riskScore > 0.4 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${prediction.riskScore * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 mt-1 block">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recommendation</label>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {prediction.recommendation}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Risk Factors</label>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {prediction.factors.map((factor, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
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