import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import apiClient from '../api/axios';

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await apiClient.get('/reservations/');
      setReservations(response.data);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (id) => {
    try {
      await apiClient.delete(`/reservations/${id}/`);
      fetchReservations();
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-slate-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-slate-400 font-medium">Loading reservations...</p>
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
            <h1 className="text-4xl font-bold text-slate-100 mb-2">My Reservations</h1>
            <p className="text-slate-400">Manage your active locker reservations</p>
          </div>
          {reservations.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-12 text-center">
              <div className="inline-block p-4 bg-slate-700/50 rounded-full mb-4">
                <svg className="w-16 h-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">No Reservations Yet</h3>
              <p className="text-slate-400 mb-6">You haven't reserved any lockers. Start by browsing available lockers.</p>
              <a href="/lockers" className="inline-block bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-slate-500 hover:to-slate-600 transform hover:scale-105 transition shadow-lg border border-slate-600">
                Browse Lockers
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reservations.map(reservation => (
                <div key={reservation.id} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 hover:bg-slate-800/70 transition overflow-hidden">
                  <div className={`h-2 ${reservation.is_active ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-3 rounded-xl border border-slate-600">
                          <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-100">Locker #{reservation.locker.locker_number}</h3>
                          <div className="flex items-center text-slate-400 mt-1">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-sm">{reservation.locker.location}</p>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reservation.is_active ? 'bg-green-100 text-green-800' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {reservation.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                      <div className="flex items-center text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-xs text-slate-500">Reserved Until</p>
                          <p className="text-sm font-semibold">{new Date(reservation.reserved_until).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    {reservation.is_active && (
                      <button
                        onClick={() => cancelReservation(reservation.id)}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-lg font-semibold hover:from-red-500 hover:to-red-600 transform hover:scale-[1.02] transition shadow-lg border border-red-600"
                      >
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}