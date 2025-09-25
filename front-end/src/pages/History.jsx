import React, { useState, useEffect } from "react";
import { reportService } from "../services/reportService";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const result = await reportService.getHistory();
      setHistory(result); // your backend returns an array
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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No history found</p>
      ) : (
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Mobile</th>
              <th className="px-6 py-3 text-left">District</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Risk Score</th>
              <th className="px-6 py-3 text-left">Expand</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((item, index) => (
              <React.Fragment key={index}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.mobile}</td>
                  <td className="px-6 py-4">{item.district}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.riskScore}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleRow(index)}>
                      {expandedRows.includes(index) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(index) && (
                  <tr className="bg-gray-50">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="space-y-2">
                        <p><strong>Age:</strong> {item.age}</p>
                        <p><strong>Marital Status:</strong> {item.maritalStatus}</p>
                        <p><strong>Income:</strong> {item.income}</p>
                        <p><strong>Finance Amount:</strong> {item.financeAmount}</p>
                        <p><strong>Customer Valuation:</strong> {item.customerValuation}</p>
                        <p><strong>Effective Rate:</strong> {item.effectiveRate}</p>
                        <p><strong>Customer Behavior:</strong> {item.customerBehavior}</p>
                        <p><strong>Recommendation:</strong> {item.recommendation}</p>
                        <p><strong>Factors:</strong> {item.factors.join(", ")}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
