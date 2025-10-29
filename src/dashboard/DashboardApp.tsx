import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../modules/dashboard/layout/DashboardLayout';
import Login from '../modules/dashboard/pages/Login';
import Home from '../modules/dashboard/pages/Home';
import Billboards from '../modules/dashboard/pages/Billboards';
import Analytics from '../modules/dashboard/pages/Analytics';
import Bids from '../modules/dashboard/pages/Bids';
import Contracts from '../modules/dashboard/pages/Contracts';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) return <Navigate to="/dashboard/login" replace />;
  return <>{children}</>;
};

const DashboardApp: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="billboards" element={<Billboards />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="bids" element={<Bids />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default DashboardApp;
