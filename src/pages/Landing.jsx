import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple Header */}
      <header className="bg-white border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl text-green-600">
            <Sprout />
            <span>KhetSaathi</span>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium">Login</Link>
            <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Smart Farming with <span className="text-green-600">AI Power</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-10">
            KhetSaathi helps farmers analyze soil, predict profits, and connect directly with buyers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              Start Analysis <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="bg-white border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl font-bold text-lg">
              Explore Market
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 border-y">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-2xl hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">AI Soil Analysis</h3>
              <p className="text-gray-500">Get instant recommendations for the best crops based on your soil and weather.</p>
            </div>
            <div className="p-6 border rounded-2xl hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">Profit Prediction</h3>
              <p className="text-gray-500">Know your expected earnings before you even start planting your seeds.</p>
            </div>
            <div className="p-6 border rounded-2xl hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-3">Direct Marketplace</h3>
              <p className="text-gray-500">Sell your harvest directly to buyers and skip the middleman for better prices.</p>
            </div>
          </div>
        </section>

        {/* Simple CTA */}
        <section className="py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Farming Business?</h2>
          <Link to="/register" className="bg-green-600 text-white px-10 py-4 rounded-xl font-bold text-xl inline-block">
            Join KhetSaathi Now
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t p-8 text-center text-gray-500">
        <p>© {new Date().getFullYear()} KhetSaathi - Student Presentation Project</p>
      </footer>
    </div>
  );
}
