import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PageLayout } from './components/layout/PageLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import CropAnalysis from './pages/CropAnalysis';
import BuyerDashboard from './pages/BuyerDashboard';
import Marketplace from './pages/Marketplace';

// A simple component to protect routes based on login and user role
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // If user is in the wrong place, send them to their correct dashboard
    return <Navigate to={user.role === 'farmer' ? '/farmer/dashboard' : '/buyer/dashboard'} />;
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Farmer Pages */}
            <Route path="/farmer/dashboard" element={
              <ProtectedRoute role="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/farmer/analyze" element={
              <ProtectedRoute role="farmer">
                <CropAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/farmer/marketplace" element={
              <ProtectedRoute role="farmer">
                <Marketplace />
              </ProtectedRoute>
            } />
            
            {/* Buyer Pages */}
            <Route path="/buyer/dashboard" element={
              <ProtectedRoute role="buyer">
                <BuyerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/buyer/marketplace" element={
              <ProtectedRoute role="buyer">
                <Marketplace />
              </ProtectedRoute>
            } />

            {/* Catch all - redirect to landing */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}
