import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";
import CountUp from "react-countup";
import {
  TrendingUp,
  Users,
  FileText,
  AlertTriangle,
  Activity,
  DollarSign,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

import { dashboardService } from "../services/dashboardService";
import { reportService } from "../services/reportService"; 
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    totalPredictions: 0,
    totalUsers: 0,
    riskAlerts: 23,
    monthlyRevenue: 24,
  });

  const [predictions, setPredictions] = useState([]);
  const [users, setUsers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: "New risk prediction completed", time: "2 minutes ago", type: "prediction" },
    { id: 2, action: "Data upload successful (500 records)", time: "15 minutes ago", type: "upload" },
    { id: 3, action: "Monthly report generated", time: "1 hour ago", type: "report" },
  ]);

  const navigate = useNavigate();
  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await dashboardService.getAllUsers();
        setUsers(userData);
        setStats(prev => ({ ...prev, totalUsers: userData.length }));

        const history = await reportService.getHistory();
        setPredictions(history);
        setStats(prev => ({ ...prev, totalPredictions: history.length }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Prepare chart data
  const categoryCounts = predictions.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.keys(categoryCounts).map(key => ({ name: key, value: categoryCounts[key] }));

  const districtCounts = predictions.reduce((acc, p) => {
    acc[p.district] = (acc[p.district] || 0) + 1;
    return acc;
  }, {});
  const districtData = Object.keys(districtCounts).map(key => ({ district: key, predictions: districtCounts[key] }));

  const avgRiskScore = predictions.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || { sum: 0, count: 0 };
    acc[p.category].sum += p.riskScore;
    acc[p.category].count += 1;
    return acc;
  }, {});
  const riskScoreData = Object.keys(avgRiskScore).map(key => ({
    category: key,
    avgRisk: avgRiskScore[key].sum / avgRiskScore[key].count,
  }));

  const StatCard = ({ title, value, icon: Icon, trend, color = "accent" }) => (
    <Card className="h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            <CountUp end={value} duration={3} separator="," />
          </p>
          {trend && (
            <p className="flex items-center mt-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your predictions.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Predictions" value={stats.totalPredictions} icon={Activity} trend="+12% this month" />
        <StatCard title="All Users" value={stats.totalUsers.toLocaleString()} icon={Users} trend="+5% this month" color="blue-600" />
        <StatCard title="Risk Alerts" value={stats.riskAlerts} icon={AlertTriangle} trend="+8% from last month" color="red-600" />
        <StatCard title="Monthly Revenue" value={stats.monthlyRevenue} icon={DollarSign} trend="+8% from last month" color="green-600" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Predictions by Category">
          <PieChart width={300} height={250}>
            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </Card>

        <Card title="Predictions by District">
          <BarChart width={300} height={250} data={districtData}>
            <XAxis dataKey="district" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="predictions" fill="#82ca9d" />
          </BarChart>
        </Card>

        <Card title="Average Risk Score by Category">
          <BarChart width={300} height={250} data={riskScoreData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgRisk" fill="#ffc658" />
          </BarChart>
        </Card>
      </div>

      {/* Quick Actions + Recent Activity + All Users in one row on large screens */}
     {/* Quick Actions + Recent Activity in one row */}
<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  {/* Quick Actions */}
  <Card title="Quick Actions">
    <div className="space-y-3">
      <button
        onClick={() => navigate("/predict")}
        className="w-full p-3 text-left transition-colors rounded-lg bg-accent bg-opacity-10 hover:bg-opacity-20"
      >
        <div className="flex items-center">
          <FileText className="w-5 h-5 mr-3 text-accent" />
          <div>
            <p className="font-medium text-gray-900">New Prediction</p>
            <p className="text-sm text-gray-600">Start a risk assessment</p>
          </div>
        </div>
      </button>

      <button
        onClick={() => navigate("/upload")}
        className="w-full p-3 text-left transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
      >
        <div className="flex items-center">
          <Users className="w-5 h-5 mr-3 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">Upload Data</p>
            <p className="text-sm text-gray-600">Import customer data</p>
          </div>
        </div>
      </button>
    </div>
  </Card>

  {/* Recent Activity */}
  <Card title="Recent Activity">
    <div className="space-y-4">
      {recentActivity.map((activity) => (
        <div key={activity.id} className="flex items-center p-3 rounded-lg bg-gray-50">
          <div className="w-2 h-2 mr-3 rounded-full bg-accent"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
</div>

{/* All Users in the next row */}
<div className="grid grid-cols-1 gap-6">
  <Card title="All Users" className="shadow-bank">
    <div className="grid grid-cols-1 gap-4 bg-white md:grid-cols-1 lg:grid-cols-3">
      {users.length > 0 ? (
        users.map((user, index) => (
          <div key={index} className="flex items-start p-3 space-x-4 transition bg-gray-400 rounded-lg shadow-sm bg-opacity-10 hover:shadow-md hover:bg-opacity-20">
            <div className="p-3 mt-4 rounded-full bg-accent bg-opacity-10">
              <Users className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-700">Username: {user.username}</p>
              <p className="text-sm text-gray-700">Email: {user.email}</p>
              <p className="mt-1 text-xs text-gray-500">Joined: {new Date(user.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  </Card>
</div>

    </div>
  );
}

export default Dashboard;
