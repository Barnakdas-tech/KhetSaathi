import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, BarChart2, ShoppingBag, Sprout, LogOut } from 'lucide-react';

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  // Define links based on user role
  const links = user.role === 'farmer' ? [
    { to: '/farmer/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/farmer/analyze', icon: BarChart2, label: 'Crop Analysis' },
    { to: '/farmer/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  ] : [
    { to: '/buyer/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/buyer/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* App Logo */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-2">
        <Sprout className="text-green-600" size={28} />
        <span className="text-xl font-bold">KhetSaathi</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 p-3 rounded-lg font-medium transition ${
                isActive ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <link.icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <div className="mb-4 px-3">
          <p className="text-sm font-bold">{user.name}</p>
          <p className="text-xs text-gray-500 uppercase">{user.role}</p>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 text-red-600 font-medium hover:bg-red-50 rounded-lg"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
