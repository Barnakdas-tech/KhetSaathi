import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout } from 'lucide-react';
import locationsData from '../data/locations.json';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [role, setRole] = useState('farmer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [error, setError] = useState('');

  // Get list of states
  const states = Object.keys(locationsData);
  // Get districts for the selected state
  const districts = selectedState ? locationsData[selectedState] : [];

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow digits and limit to 10 characters
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone number length
    if (phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    // Call simple synchronous register with district as the location
    const newUser = register(name, phone, password, role, selectedDistrict);
    
    if (newUser) {
      if (newUser.role === 'farmer') navigate('/farmer/dashboard');
      else navigate('/buyer/dashboard');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md my-10">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sprout className="text-green-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-gray-500">Join KhetSaathi today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">I am a:</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input 
            type="text" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input 
            type="text" 
            className={`w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 ${error ? 'border-red-500' : ''}`}
            placeholder="Enter 10-digit phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <select 
              value={selectedState} 
              onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 bg-white"
              required
            >
              <option value="">Select State</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 bg-white disabled:bg-gray-100"
              required
              disabled={!selectedState}
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password" 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p>Already have an account? <Link to="/login" className="text-green-600 font-bold">Login</Link></p>
      </div>
    </div>
  );
}
