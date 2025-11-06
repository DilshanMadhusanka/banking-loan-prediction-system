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
import UserManagement from './pages/UserManagement';
import Layout from './components/Layout/Layout';
import AccessDenied from './pages/AccessDenied';

import { roleAccess } from './config/roleAccess';
import './index.css';


// ✅ Protected Route
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const [role, setRole] = React.useState('');

  // ✅ Load role after authentication
  React.useEffect(() => {
    if (isAuthenticated) {
      const storedRole = localStorage.getItem('role');
      if (storedRole) {
        setRole(storedRole.trim().toUpperCase()); // normalize
      }
    }
  }, [isAuthenticated]);

  // ✅ Case-insensitive access check
  const hasAccess = (allowedRoles = []) => {
    if (!role) return false;
    return allowedRoles.map(r => r.toUpperCase()).includes(role);
  };

  console.log('Current role:', role);

  // ✅ Wait for role to load (avoid flickering)
  if (isAuthenticated && !role) {
    return <div className="mt-20 text-center">Loading permissions...</div>;
  }

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Default route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    hasAccess(roleAccess.DASHBOARD)
                      ? <Dashboard />
                      : <AccessDenied />
                  }
                />
                <Route
                  path="/upload"
                  element={
                    hasAccess(roleAccess.UPLOAD)
                      ? <Upload />
                      : <AccessDenied />
                  }
                />
                <Route
                  path="/predict"
                  element={
                    hasAccess(roleAccess.PREDICT)
                      ? <Predict />
                      : <AccessDenied />
                  }
                />
                <Route
                  path="/report"
                  element={
                    hasAccess(roleAccess.REPORT)
                      ? <Report />
                      : <AccessDenied />
                  }
                />
                <Route
                  path="/history"
                  element={
                    hasAccess(roleAccess.HISTORY)
                      ? <History />
                      : <AccessDenied />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    hasAccess(roleAccess.PROFILE)
                      ? <Profile />
                      : <AccessDenied />
                  }
                />
                 <Route
                  path="/UserManagement"
                  element={
                    hasAccess(roleAccess.USERMANAGEMENT)
                      ? <UserManagement />
                      : <AccessDenied />
                  }
                />
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


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { ToastProvider } from './contexts/ToastContext';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Upload from './pages/Upload';
// import Predict from './pages/Predict';
// import Report from './pages/Report';
// import History from './pages/History';
// import Profile from './pages/Profile';
// import Layout from './components/Layout/Layout';
// import './index.css';


// import { roleAccess } from './config/roleAccess';
// import AccessDenied from './pages/AccessDenied';




// // Protected Route Component
// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }

// function AppRoutes() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Routes>
//       <Route 
//         path="/login" 
//         element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
//       />
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       <Route
//         path="/*"
//         element={
//           <ProtectedRoute>
//             <Layout>
//               <Routes>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/upload" element={<Upload />} />
//                 <Route path="/predict" element={<Predict />} />
//                 <Route path="/report" element={<Report />} />
//                 <Route path="/history" element={<History />} />
//                 <Route path="/profile" element={<Profile />} />
//               </Routes>
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <ToastProvider>
//           <div className="min-h-screen bg-gray-50">
//             <AppRoutes />
//           </div>
//         </ToastProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;