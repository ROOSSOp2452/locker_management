import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import apiClient from '../api/axios';

export default function LockerList() {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLockers();
  }, []);

  const fetchLockers = async () => {
    try {
      const response = await apiClient.get('/lockers/');
      setLockers(response.data);
    } catch (error) {
      console.error('Failed to fetch lockers:', error);
    } finally {
      setLoading(false);
    }
  };

  const reserveLocker = async (lockerId) => {
    try {
      await apiClient.post('/reservations/', {
        locker: lockerId,
        reserved_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      });
      fetchLockers();
    } catch (error) {
      console.error('Failed to reserve locker:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-slate-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-slate-400 font-medium">Loading lockers...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-slate-700/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-slate-600/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute w-72 h-72 bg-slate-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0.75s'}}></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-100 mb-2">Available Lockers</h1>
            <p className="text-slate-400">Browse and reserve your locker</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lockers.map(locker => (
              <div key={locker.id} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 hover:bg-slate-800/70 transform hover:scale-105 transition overflow-hidden">
                <div className={`h-2 ${locker.status === 'available' ? 'bg-green-500' : locker.status === 'reserved' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-3 rounded-xl border border-slate-600">
                      <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(locker.status)}`}>
                      {locker.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">Locker #{locker.locker_number}</h3>
                  <div className="flex items-center text-slate-400 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm">{locker.location}</p>
                  </div>
                  {locker.status === 'available' && (
                    <button
                      onClick={() => reserveLocker(locker.id)}
                      className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-2.5 rounded-lg font-semibold hover:from-slate-500 hover:to-slate-600 transform hover:scale-[1.02] transition shadow-lg border border-slate-600"
                    >
                      Reserve Now
                    </button>
                  )}
                  {locker.status === 'reserved' && (
                    <button disabled className="w-full bg-slate-700/30 text-slate-500 py-2.5 rounded-lg font-semibold cursor-not-allowed border border-slate-700">
                      Reserved
                    </button>
                  )}
                  {locker.status === 'maintenance' && (
                    <button disabled className="w-full bg-yellow-900/30 text-yellow-500 py-2.5 rounded-lg font-semibold cursor-not-allowed border border-yellow-800">
                      Under Maintenance
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}