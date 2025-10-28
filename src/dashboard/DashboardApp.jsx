import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './dashboardcomponents/dashboardlayout.jsx';
import Dashboard from './dashboardpages/Dashboard';
import Login from './dashboardpages/Login';
import Profile from './dashboardpages/Profile';
import Tables from './dashboardpages/Tables';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }
  
  return children;
};

const DashboardApp = () => {
  console.log('DashboardApp rendering...');
  
  return (
    <Routes>
      {/* Login Route (No Layout) */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Dashboard Routes (With Layout) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="tables" element={<Tables />} />
      </Route>
      
      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default DashboardApp;
