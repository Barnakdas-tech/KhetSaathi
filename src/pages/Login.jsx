import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout } from 'lucide-react';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow digits only and limit to 10 chars
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Call simple synchronous login
    const loggedInUser = login(phone, password);
    
    if (loggedInUser) {
      // Redirect based on user role
      if (loggedInUser.role === 'farmer') navigate('/farmer/dashboard');
      else navigate('/buyer/dashboard');
    } else {
      setError('Invalid phone or password. Try 12345 / 12345');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sprout className="text-green-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-500">Login to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p>Don't have an account? <Link to="/register" className="text-green-600 font-bold">Register</Link></p>
      </div>
      
      <div className="mt-4 p-2 bg-gray-50 rounded text-xs text-center text-gray-500">
        Demo: 12345 / 12345
      </div>
    </div>
  );
}
