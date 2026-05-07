import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BuyerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-500">Your marketplace overview for today.</p>
        </div>
        <Link to="/buyer/marketplace" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">
          Browse Marketplace
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Market Trend</p>
            <p className="text-xl font-bold">Wheat ↑ 5%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Farmers</p>
            <p className="text-xl font-bold">1,200+</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Saved Items</p>
            <p className="text-xl font-bold">12</p>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recommended Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-bold text-lg">Premium Basmati Rice</h3>
            <p className="text-sm text-gray-500 mb-4">Farmer: Ramesh K. • Pune, MH</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-700">₹3,200/q</span>
              <Link to="/buyer/marketplace" className="text-green-600 font-bold hover:underline">Details</Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="font-bold text-lg">Organic Mustard Seeds</h3>
            <p className="text-sm text-gray-500 mb-4">Farmer: Suresh D. • Nashik, MH</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-700">₹4,100/q</span>
              <Link to="/buyer/marketplace" className="text-green-600 font-bold hover:underline">Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
