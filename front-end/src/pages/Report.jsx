import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Button from '../components/UI/Button';
import { reportService } from '../services/reportService';
import { useToast } from '../contexts/ToastContext';
import { Download, FileText } from 'lucide-react';

function Report() {
  const [filters, setFilters] = useState({
    dateRange: {
      from: '',
      to: ''
    },
    riskCategory: '',
    productCategory: '',
    contractStatus: '',
    reportType: 'summary'
  });

  const [report, setReport] = useState(null);
  const [generating, setGenerating] = useState(false);
  const { success, error } = useToast();

  const handleFilterChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFilters(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleGenerateReport = async () => {
    // Basic validation
    if (!filters.dateRange.from || !filters.dateRange.to) {
      error('Please select a date range');
      return;
    }

    if (new Date(filters.dateRange.from) > new Date(filters.dateRange.to)) {
      error('From date cannot be later than to date');
      return;
    }

    setGenerating(true);

    try {
      const result = await reportService.generateReport(filters);
      setReport(result);
      success('Report generated successfully!');
    } catch (err) {
      error('Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = (format) => {
    if (!report) return;
    
    // TODO: Implement actual download functionality
    console.log('Download report in format:', format);
    success(`Report download started (${format.toUpperCase()})`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Report Generation</h1>
        <p className="text-gray-600">Generate comprehensive reports on risk assessments and predictions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Filters */}
        <div className="lg:col-span-2">
          <Card title="Report Configuration">
            <div className="space-y-6">
              {/* Date Range */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Date Range</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="From Date"
                    type="date"
                    value={filters.dateRange.from}
                    onChange={(e) => handleFilterChange('dateRange.from', e.target.value)}
                    required
                  />
                  <Input
                    label="To Date"
                    type="date"
                    value={filters.dateRange.to}
                    onChange={(e) => handleFilterChange('dateRange.to', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Filters */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Filters</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Risk Category"
                    value={filters.riskCategory}
                    onChange={(e) => handleFilterChange('riskCategory', e.target.value)}
                    options={[
                      { value: '', label: 'All Categories' },
                      { value: 'low', label: 'Low Risk' },
                      { value: 'medium', label: 'Medium Risk' },
                      { value: 'high', label: 'High Risk' }
                    ]}
                  />

                  <Select
                    label="Product Category"
                    value={filters.productCategory}
                    onChange={(e) => handleFilterChange('productCategory', e.target.value)}
                    options={[
                      { value: '', label: 'All Products' },
                      { value: 'loans', label: 'Loans' },
                      { value: 'auto', label: 'Auto' },
                      { value: 'personal', label: 'Personal' },
                      { value: 'business', label: 'Business' },
                      { value: 'mortgage', label: 'Mortgage' }
                    ]}
                  />

                  <Select
                    label="Contract Status"
                    value={filters.contractStatus}
                    onChange={(e) => handleFilterChange('contractStatus', e.target.value)}
                    options={[
                      { value: '', label: 'All Statuses' },
                      { value: 'active', label: 'Active' },
                      { value: 'closed', label: 'Closed' },
                      { value: 'suspended', label: 'Suspended' },
                      { value: 'default', label: 'Default' }
                    ]}
                  />

                  <Select
                    label="Report Type"
                    value={filters.reportType}
                    onChange={(e) => handleFilterChange('reportType', e.target.value)}
                    options={[
                      { value: 'summary', label: 'Summary Report' },
                      { value: 'detailed', label: 'Detailed Report' },
                      { value: 'risk-analysis', label: 'Risk Analysis' },
                      { value: 'performance', label: 'Performance Report' }
                    ]}
                    required
                  />
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={handleGenerateReport}
                  loading={generating}
                  disabled={generating}
                  className="w-full md:w-auto"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Report Preview */}
        <div>
          <Card title="Report Preview">
            {report ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Report Generated</h4>
                  <p className="text-sm text-gray-600 mt-1">ID: {report.reportId}</p>
                </div>

                {/* Report Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-3">Summary</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Records:</span>
                      <span className="font-medium">{report.data.totalRecords.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">High Risk:</span>
                      <span className="font-medium text-red-600">{report.data.summary.highRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medium Risk:</span>
                      <span className="font-medium text-yellow-600">{report.data.summary.mediumRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Low Risk:</span>
                      <span className="font-medium text-green-600">{report.data.summary.lowRisk}</span>
                    </div>
                  </div>
                </div>

                {/* Download Options */}
                <div className="space-y-2">
                  <Button
                    onClick={() => handleDownload('pdf')}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={() => handleDownload('csv')}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                  <Button
                    onClick={() => handleDownload('xlsx')}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Excel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">Configure filters and generate report to see preview</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Report Types Info */}
      <Card title="Report Types">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Summary Report</h5>
            <p className="text-sm text-gray-600">High-level overview of risk distribution and key metrics</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Detailed Report</h5>
            <p className="text-sm text-gray-600">Comprehensive breakdown of all predictions and assessments</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Risk Analysis</h5>
            <p className="text-sm text-gray-600">In-depth analysis of risk factors and patterns</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Performance Report</h5>
            <p className="text-sm text-gray-600">Model accuracy and performance metrics over time</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Report;