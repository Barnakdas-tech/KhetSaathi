import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchWeather } from '../services/api';
import { fetchSoilType } from '../services/soil';
import { analyzeAgriData } from '../services/ai';
import { Sparkles, Zap, Loader2, MapPin, Database } from 'lucide-react';

export default function CropAnalysis() {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [soil, setSoil] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  // Automatically load data for user's registered location
  useEffect(() => {
    async function loadData() {
      if (user?.location) {
        setFetchingData(true);
        try {
          const weatherData = await fetchWeather(user.location);
          const soilData = await fetchSoilType(user.location);
          setWeather(weatherData);
          setSoil(soilData);
        } catch (error) {
          console.error("Failed to load initial data");
        } finally {
          setFetchingData(false);
        }
      }
    }
    loadData();
  }, [user]);

  const handleAnalyze = async () => {
    if (!weather || !soil) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const data = await analyzeAgriData(weather, soil);
      setResult(data);
    } catch (error) {
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold flex items-center gap-2">
          <Sparkles className="text-green-600" /> Smart AI Analysis
        </h1>
        <p className="text-gray-500">No input needed. We've detected your farm's environment automatically.</p>
      </div>

      {/* Auto-Detected Info Card */}
      <div className="bg-white p-6 rounded-xl border shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Location</p>
            <p className="font-bold text-gray-700">{user?.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-full text-orange-600">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Current Weather</p>
            <p className="font-bold text-gray-700">
              {fetchingData ? 'Detecting...' : `${weather?.temp}°C, ${weather?.condition}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <Database size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Detected Soil</p>
            <p className="font-bold text-gray-700">
              {fetchingData ? 'Scanning...' : soil?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Action */}
      {!result && !loading && (
        <div className="text-center py-10">
          <button 
            onClick={handleAnalyze}
            disabled={fetchingData}
            className="bg-green-600 text-white px-10 py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-green-700 transition flex items-center gap-3 mx-auto disabled:bg-gray-300"
          >
            <Zap /> Run One-Click AI Analysis
          </button>
          <p className="mt-4 text-gray-500 text-sm italic">
            Gemini AI will analyze your {soil?.name} in {user?.location} for the best results.
          </p>
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Top Recommendation */}
          <div className="bg-green-700 text-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Top AI Recommendation</h2>
            <h3 className="text-5xl font-black mb-4">{result.topRecommendation.crop}</h3>
            <p className="text-lg opacity-90 mb-6">{result.topRecommendation.explanation}</p>
            <div className="inline-block bg-white/20 p-4 rounded-xl border border-white/30 text-center">
              <p className="text-xs uppercase font-bold opacity-80">Estimated Profit</p>
              <p className="text-2xl font-bold">₹{result.topRecommendation.expectedProfit.toLocaleString()} / acre</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profit Scenarios */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h4 className="font-bold text-lg mb-4">Profit Scenarios</h4>
              <div className="space-y-4">
                {result.profitScenarios.map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-gray-500">{s.scenario}</span>
                    <div className="flex-1 bg-gray-100 h-8 rounded-lg overflow-hidden">
                      <div 
                        className={`h-full ${s.scenario === 'Worst Case' ? 'bg-red-500' : s.scenario === 'Best Case' ? 'bg-blue-500' : 'bg-green-500'}`} 
                        style={{ width: `${(s.profit / result.profitScenarios[2].profit) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">₹{s.profit/1000}k</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h4 className="font-bold text-lg mb-4">AI Suggestions</h4>
              <ul className="space-y-2">
                {result.farmingSuggestions.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-green-600 font-bold">•</span> {s}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                <p className="text-xs font-bold text-yellow-800 uppercase mb-1">Weather Warning</p>
                <p className="text-sm text-yellow-900">{result.warnings[0] || 'No immediate weather threats.'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="py-20 text-center">
          <Loader2 className="animate-spin mx-auto text-green-600 mb-4" size={48} />
          <p className="text-xl font-bold">Gemini AI is thinking...</p>
        </div>
      )}
    </div>
  );
}
