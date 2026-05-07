import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchWeather } from '../services/api';
import { Cloud, Droplets, Thermometer, Wind, Sprout, Store, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Fetch real-time weather data for the user's location
    if (user?.location) {
      fetchWeather(user.location).then(data => setWeather(data));
    }
  }, [user]);

  const chartData = [
    { name: 'Wheat', profit: 45000 },
    { name: 'Mustard', profit: 38000 },
    { name: 'Lentils', profit: 30000 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border">
        <div>
          <h1 className="text-2xl font-bold">Hello, {user?.name}!</h1>
          <p className="text-gray-500 flex items-center gap-1">
            <MapPin size={16} /> {user?.location || 'Location Not Set'}
          </p>
        </div>
        <Link to="/farmer/analyze" className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition">
          New Analysis
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Weather Card */}
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Cloud /> Local Weather
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl font-bold">{weather ? weather.temp : '--'}°C</span>
            <span className="text-xl">{weather ? weather.condition : 'Loading...'}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm border-t border-blue-400 pt-4">
            <div className="flex flex-col items-center">
              <Droplets size={16} />
              <span>{weather ? weather.humidity : '--'}% Humid</span>
            </div>
            <div className="flex flex-col items-center">
              <Wind size={16} />
              <span>{weather ? weather.rainfall : '--'}mm Rain</span>
            </div>
            <div className="flex flex-col items-center">
              <Thermometer size={16} />
              <span>{weather ? weather.temp + 2 : '--'}°C Feels</span>
            </div>
          </div>
        </div>

        {/* Soil Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-700">
            <Sprout /> Soil Status
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Soil Type</span>
              <span className="font-bold">Black Cotton</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Moisture</span>
              <span className="font-bold text-blue-600">42% (Good)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Health Score</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-bold">High Yield</span>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Profit Chart Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold mb-4">Estimated Profits (₹)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="profit" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Simple Table for Marketplace */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Store /> My Recent Listings
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase border-b">
                <th className="pb-2">Crop</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 font-medium">Organic Wheat</td>
                <td className="py-3">₹2,400/q</td>
                <td className="py-3"><span className="text-green-600 font-bold">Active</span></td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Basmati Rice</td>
                <td className="py-3">₹3,200/q</td>
                <td className="py-3"><span className="text-gray-500 font-bold">Draft</span></td>
              </tr>
            </tbody>
          </table>
          <Link to="/buyer/marketplace" className="block text-center mt-4 text-green-600 font-bold hover:underline">
            View All Listings
          </Link>
        </div>

      </div>
    </div>
  );
}
