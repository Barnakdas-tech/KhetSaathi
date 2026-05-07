import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, Plus, X } from 'lucide-react';

const initialListings = [
  { id: 1, crop: 'Organic Wheat', farmer: 'Ramesh Kumar', phone: '9876543210', state: 'Punjab', price: 2400, qty: 200, unit: 'Quintal', details: 'High quality organic wheat.' },
  { id: 2, crop: 'Basmati Rice', farmer: 'Anil Patil', phone: '9123456789', state: 'Maharashtra', price: 3200, qty: 50, unit: 'Quintal', details: 'Long grain aged rice.' },
  { id: 3, crop: 'Fresh Tomatoes', farmer: 'Vijay Singh', phone: '8877665544', state: 'Karnataka', price: 1500, qty: 500, unit: 'Kg', details: 'Farm fresh red tomatoes.' },
];

export default function Marketplace() {
  const { user } = useAuth();
  const [listings, setListings] = useState(initialListings);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  // State for Contact Modal
  const [contactFarmer, setContactFarmer] = useState(null);

  // New Listing State
  const [newCrop, setNewCrop] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQty, setNewQty] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      crop: newCrop,
      price: Number(newPrice),
      qty: Number(newQty),
      unit: 'Quintal',
      farmer: user?.name || 'Unknown',
      phone: user?.phone || '0000000000',
      state: user?.location || 'Maharashtra',
      details: 'Fresh harvest.'
    };
    setListings([item, ...listings]);
    setShowModal(false);
    setNewCrop(''); setNewPrice(''); setNewQty('');
  };

  const filtered = listings.filter(l => l.crop.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        {user?.role === 'farmer' && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
          >
            <Plus size={20} /> List My Crop
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search for crops..." 
          className="w-full p-3 pl-10 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(l => (
          <div key={l.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl">{l.crop}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded font-bold uppercase">{l.state}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">{l.details}</p>
              <div className="flex justify-between items-end border-t pt-4">
                <div>
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="text-xl font-bold text-green-700">₹{l.price}/{l.unit}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Quantity</p>
                  <p className="font-bold">{l.qty} {l.unit}</p>
                </div>
              </div>
              
              <button 
                onClick={() => setContactFarmer(l)}
                className="w-full mt-4 bg-green-50 text-green-700 p-2 rounded-lg font-bold hover:bg-green-100 transition"
              >
                Contact Farmer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Listing Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add New Listing</h2>
              <X className="cursor-pointer" onClick={() => setShowModal(false)} />
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <input 
                required type="text" placeholder="Crop Name" 
                className="w-full p-3 border rounded-lg"
                value={newCrop} onChange={e => setNewCrop(e.target.value)}
              />
              <input 
                required type="number" placeholder="Price per Quintal" 
                className="w-full p-3 border rounded-lg"
                value={newPrice} onChange={e => setNewPrice(e.target.value)}
              />
              <input 
                required type="number" placeholder="Available Quantity" 
                className="w-full p-3 border rounded-lg"
                value={newQty} onChange={e => setNewQty(e.target.value)}
              />
              <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold">
                Publish
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Farmer Contact Modal */}
      {contactFarmer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <Plus size={32} className="rotate-45" onClick={() => setContactFarmer(null)} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Farmer Details</h2>
            <p className="text-gray-500 mb-6">You can reach the farmer directly for negotiation.</p>
            
            <div className="bg-gray-50 p-4 rounded-xl space-y-3 text-left border mb-6">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Farmer Name</p>
                <p className="font-bold text-lg">{contactFarmer.farmer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Contact Number</p>
                <p className="font-bold text-lg text-green-700">+91 {contactFarmer.phone}</p>
              </div>
            </div>

            <button 
              onClick={() => setContactFarmer(null)}
              className="w-full bg-green-600 text-white p-3 rounded-lg font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
