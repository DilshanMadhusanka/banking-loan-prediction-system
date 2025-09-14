import React, { useState, useEffect } from 'react';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Button from '../components/UI/Button';
import { reportService } from '../services/reportService';
import { useToast } from '../contexts/ToastContext';
import { 
  Search, 
  Eye, 
  Download, 
  RefreshCw,
  Calendar,
  Filter
} from 'lucide-react';

function History() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { success, error } = useToast();

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    filterHistoryData();
  }, [history, searchTerm, filterType, filterStatus]);

  const loadHistory = async () => {
    try {
      const result = await reportService.getHistory();
      setHistory(result.data);
    } catch (err) {
      error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const filterHistoryData = () => {
    let filtered = [...history];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.operation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType) {
      filtered = filtered.filter(item => 
        item.operation.toLowerCase() === filterType.toLowerCase()
      );
    }

    // Status filter
    if (filterStatus) {
      filtered = filtered.filter(item => 
        item.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    setFilteredHistory(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleAction = async (action, item) => {
    console.log(`Action: ${action} on item:`, item);
    
    switch (action) {
      case 'view':
        success(`Viewing ${item.operation} details`);
        break;
      case 'download':
        success(`Downloading ${item.operation} data`);
        break;
      case 'rerun':
        success(`Re-running ${item.operation}`);
        break;
      default:
        break;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'completed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800',
      'in progress': 'bg-yellow-100 text-yellow-800',
      'pending': 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusStyles[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    );
  };

  const getOperationIcon = (operation) => {
    switch (operation.toLowerCase()) {
      case 'prediction':
        return '🎯';
      case 'upload':
        return '📤';
      case 'report':
        return '📊';
      default:
        return '📋';
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredHistory.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">History</h1>
        <p className="text-gray-600">View and manage your past predictions, uploads, and reports</p>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search operations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>

          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { value: '', label: 'All Operations' },
              { value: 'prediction', label: 'Predictions' },
              { value: 'upload', label: 'Uploads' },
              { value: 'report', label: 'Reports' }
            ]}
            className="mb-0"
          />

          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'completed', label: 'Completed' },
              { value: 'failed', label: 'Failed' },
              { value: 'in progress', label: 'In Progress' },
              { value: 'pending', label: 'Pending' }
            ]}
            className="mb-0"
          />

          <Button
            onClick={loadHistory}
            variant="outline"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </Card>

      {/* History Table */}
      <Card title={`History (${filteredHistory.length} items)`}>
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading history...</p>
          </div>
        ) : currentItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Summary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{getOperationIcon(item.operation)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.operation}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {item.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {item.summary}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(item.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAction('view', item)}
                          className="text-accent hover:text-accent-dark p-1 rounded-full hover:bg-accent hover:bg-opacity-10 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('download', item)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction('rerun', item)}
                          className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition-colors"
                          title="Re-run"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-gray-500">No history items found</p>
            {(searchTerm || filterType || filterStatus) && (
              <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filters</p>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredHistory.length)} of {filteredHistory.length} results
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              
              <span className="flex items-center px-3 py-1 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default History;