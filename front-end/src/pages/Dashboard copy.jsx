import React, { useEffect, useState } from 'react';
import Card from '../components/UI/Card';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertTriangle,
  Activity,
  DollarSign
} from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState({
    totalPredictions: 1247,
    activeContracts: 892,
    riskAlerts: 23,
    monthlyRevenue: 2.4
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      action: 'New risk prediction completed',
      time: '2 minutes ago',
      type: 'prediction'
    },
    {
      id: 2,
      action: 'Data upload successful (500 records)',
      time: '15 minutes ago',
      type: 'upload'
    },
    {
      id: 3,
      action: 'Monthly report generated',
      time: '1 hour ago',
      type: 'report'
    }
  ]);

  const StatCard = ({ title, value, icon: Icon, trend, color = 'accent' }) => (
    <Card className="h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center mt-1">
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your banking operations.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Predictions"
          value={stats.totalPredictions.toLocaleString()}
          icon={Activity}
          trend="+12% this month"
        />
        <StatCard
          title="Active Contracts"
          value={stats.activeContracts.toLocaleString()}
          icon={Users}
          trend="+5% this week"
          color="blue-600"
        />
        <StatCard
          title="Risk Alerts"
          value={stats.riskAlerts}
          icon={AlertTriangle}
          color="red-600"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue}M`}
          icon={DollarSign}
          trend="+8% from last month"
          color="green-600"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card title="Recent Activity" className="lg:col-span-2">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-accent bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-accent mr-3" />
                <div>
                  <p className="font-medium text-gray-900">New Prediction</p>
                  <p className="text-sm text-gray-600">Start a risk assessment</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Upload Data</p>
                  <p className="text-sm text-gray-600">Import customer data</p>
                </div>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;