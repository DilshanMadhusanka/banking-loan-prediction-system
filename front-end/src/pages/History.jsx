import React, { useState, useEffect } from "react";
import { reportService } from "../services/reportService";
import { Calendar, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const result = await reportService.getHistory();
      setHistory(result);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(history.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = history.slice(startIndex, startIndex + recordsPerPage);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Prediction History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No history found</p>
      ) : (
        <>
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">No</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Mobile</th>
                <th className="px-6 py-3 text-left">District</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Risk Score</th>
                <th className="px-6 py-3 text-left">Expand</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((item, index) => (
                <React.Fragment key={startIndex + index}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">{startIndex + index + 1}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded">{item.name}</span>
                    </td>
                    <td className="px-6 py-4">{item.mobile}</td>
                    <td className="px-6 py-4">{item.district}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.category === "High"
                            ? "bg-red-100 text-red-800"
                            : item.category === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">{Number(item.riskScore).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleRow(startIndex + index)}>
                        {expandedRows.includes(startIndex + index) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedRows.includes(startIndex + index) && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="space-y-2">
                          <p>
                            <strong>Age:</strong> {item.age}
                          </p>
                          <p>
                            <strong>Marital Status:</strong> {item.maritalStatus}
                          </p>
                          <p>
                            <strong>Income:</strong> {item.income}
                          </p>
                          <p>
                            <strong>Finance Amount:</strong> {item.financeAmount}
                          </p>
                          <p>
                            <strong>Customer Valuation:</strong> {item.customerValuation}
                          </p>
                          <p>
                            <strong>Effective Rate:</strong> {item.effectiveRate}
                          </p>
                          <p>
                            <strong>Customer Behavior:</strong> {item.customerBehavior}
                          </p>
                          <p>
                            <strong>Recommendation:</strong> {item.recommendation}
                          </p>
                          <p>
                            <strong>Factors:</strong> {item.factors.join(", ")}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-2 border rounded-full disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 border rounded">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 border rounded-full disabled:opacity-50 hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
