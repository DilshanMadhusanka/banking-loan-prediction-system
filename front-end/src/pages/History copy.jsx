import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import { reportService } from '../services/reportService';
import { Eye } from 'lucide-react';

function PredictionsTable() {
  const [predictions, setPredictions] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    setLoading(true);
    try {
      const result = await reportService.getHistory();
      setPredictions(result);
    } catch (err) {
      console.error('Failed to load predictions', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (index) => {
    if (expandedRow === index) setExpandedRow(null);
    else setExpandedRow(index);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Predictions</h1>
        <p className="text-gray-600">Click 🔽 icon to see full details</p>
      </div>

      <Card>
        {loading ? (
          <div className="py-12 text-center">
            <div className="w-8 h-8 mx-auto mb-4 border-2 rounded-full border-accent border-t-transparent animate-spin"></div>
            <p className="text-gray-500">Loading predictions...</p>
          </div>
        ) : predictions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Mobile</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">District</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Risk Score</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {predictions.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.mobile}</td>
                      <td className="px-6 py-4">{item.district}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{(item.riskScore * 100).toFixed(2)}%</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleRow(index)}
                          className="p-1 transition-colors rounded-full text-accent hover:text-accent-dark hover:bg-accent hover:bg-opacity-10"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>

                    {/* Expandable row */}
                    {expandedRow === index && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 md:grid-cols-2">
                            <div><strong>Due Frequency:</strong> {item.dueFrequency}</div>
                            <div><strong>Net Rental:</strong> {item.netRental}</div>
                            <div><strong>No Of Rental:</strong> {item.noOfRental}</div>
                            <div><strong>Age:</strong> {item.age}</div>
                            <div><strong>Marital Status:</strong> {item.maritalStatus}</div>
                            <div><strong>Income:</strong> {item.income}</div>
                            <div><strong>Finance Amount:</strong> {item.financeAmount}</div>
                            <div><strong>Customer Valuation:</strong> {item.customerValuation}</div>
                            <div><strong>Effective Rate:</strong> {item.effectiveRate}</div>
                            <div><strong>Customer Behavior:</strong> {item.customerBehavior}</div>
                            <div><strong>Confidence:</strong> {item.confidence}</div>
                            <div><strong>Recommendation:</strong> {item.recommendation}</div>
                            <div>
                              <strong>Factors:</strong>
                              <ul className="list-disc list-inside">
                                {item.factors.map((f, i) => <li key={i}>{f}</li>)}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-6 text-center text-gray-500">No predictions found.</p>
        )}
      </Card>
    </div>
  );
}

export default PredictionsTable;
