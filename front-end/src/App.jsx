import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Predict from './pages/Predict';
import Report from './pages/Report';
import History from './pages/History';
import Profile from './pages/Profile';
import Layout from './components/Layout/Layout';
import './index.css';




// Protected Route Component
function ProtectedRoute({ children }) {
  //const { isAuthenticated } = useAuth();
  // Example in AuthContext.js
const [isAuthenticated, setIsAuthenticated] = React.useState(true); // force true for now
  return isAuthenticated ? children : <Navigate to="/login" replace />;

  
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/predict" element={<Predict />} />
                <Route path="/report" element={<Report />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;