import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export function PageLayout({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // 1. Landing page should have no extra layout wrapper
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  // 2. Login and Register pages should be centered and have NO sidebar
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  if (isAuthPage || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {children}
      </div>
    );
  }

  // 3. Dashboard pages (when logged in) should have the Sidebar
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-white border-r border-gray-200">
        <Sidebar />
      </div>
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
