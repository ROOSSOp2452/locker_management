import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import apiClient from '../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLockers: 0,
    availableLockers: 0,
    activeReservations: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [lockersRes, reservationsRes] = await Promise.all([
        apiClient.get('/lockers/'),
        apiClient.get('/reservations/')
      ]);
      
      const lockers = lockersRes.data;
      const reservations = reservationsRes.data;
      
      setStats({
        totalLockers: lockers.length,
        availableLockers: lockers.filter(l => l.status === 'available').length,
        activeReservations: reservations.filter(r => r.is_active).length
      });

      // Get recent activity (last 5 reservations)
      setRecentActivity(reservations.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, gradient, iconBg, trend, trendValue }) => (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-slate-100">{loading ? '...' : value}</p>
            {trend && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}%
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${gradient} rounded-full`} style={{width: `${(value / stats.totalLockers) * 100 || 0}%`}}></div>
      </div>
    </div>
  );

  const ActivityItem = ({ type, locker, time, status }) => (
    <div className="flex items-center gap-4 p-4 hover:bg-slate-700/30 rounded-lg transition-colors">
      <div className={`w-2 h-2 rounded-full ${
        status === 'active' ? 'bg-green-500' : 
        status === 'pending' ? 'bg-yellow-500' : 
        'bg-gray-400'
      }`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200 truncate">{type}</p>
        <p className="text-xs text-slate-500">Locker #{locker}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-slate-500">{time}</p>
        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1 ${
          status === 'active' ? 'bg-green-100 text-green-700' :
          status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );

  const occupancyRate = stats.totalLockers > 0 
    ? Math.round(((stats.totalLockers - stats.availableLockers) / stats.totalLockers) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-slate-700/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-slate-600/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute w-72 h-72 bg-slate-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0.75s'}}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative z-10">
        <Navbar />
      
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
                <p className="text-slate-400 mt-1">Monitor and manage your locker system</p>
              </div>
              <button 
                onClick={fetchStats}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors shadow-sm backdrop-blur-sm"
              >
                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Lockers"
            value={stats.totalLockers}
            gradient="bg-gradient-to-r from-blue-500 to-blue-600"
            iconBg="bg-blue-50"
            icon={
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />

          <StatCard
            title="Available Lockers"
            value={stats.availableLockers}
            gradient="bg-gradient-to-r from-green-500 to-green-600"
            iconBg="bg-green-50"
            trend="up"
            trendValue="12"
            icon={
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />

          <StatCard
            title="Active Reservations"
            value={stats.activeReservations}
            gradient="bg-gradient-to-r from-orange-500 to-orange-600"
            iconBg="bg-orange-50"
            trend="up"
            trendValue="8"
            icon={
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Occupancy Chart */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-100">Occupancy Overview</h2>
                <p className="text-sm text-slate-400 mt-1">Current locker usage statistics</p>
              </div>
              <select className="px-3 py-1.5 border border-slate-600 rounded-lg text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-700 transition-colors">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            <div className="space-y-6">
              {/* Occupancy Rate Circle */}
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#334155"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="url(#gradient)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${occupancyRate * 5.03} 503`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-slate-100">{occupancyRate}%</span>
                    <span className="text-sm text-slate-400 mt-1">Occupied</span>
                  </div>
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-300">Occupied</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-100">{stats.totalLockers - stats.availableLockers}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {stats.totalLockers > 0 ? Math.round(((stats.totalLockers - stats.availableLockers) / stats.totalLockers) * 100) : 0}% of total
                  </p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-300">Available</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-100">{stats.availableLockers}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {stats.totalLockers > 0 ? Math.round((stats.availableLockers / stats.totalLockers) * 100) : 0}% of total
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-100">Recent Activity</h2>
              <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-1">
              {loading ? (
                <div className="text-center py-8 text-slate-400">
                  <div className="animate-spin w-8 h-8 border-4 border-slate-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">Loading activity...</p>
                </div>
              ) : recentActivity.length > 0 ? (
                recentActivity.map((activity, idx) => (
                  <ActivityItem
                    key={idx}
                    type="Locker Reserved"
                    locker={activity.locker || Math.floor(Math.random() * 100)}
                    time={new Date(activity.created_at || Date.now()).toLocaleTimeString()}
                    status={activity.is_active ? 'active' : 'completed'}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <svg className="w-12 h-12 mx-auto mb-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 p-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-600 hover:border-blue-500 hover:bg-slate-700/50 transition-all group">
                <svg className="w-8 h-8 text-slate-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
                <span className="text-sm font-medium text-slate-300 group-hover:text-blue-400">New Locker</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-600 hover:border-green-500 hover:bg-slate-700/50 transition-all group">
                <svg className="w-8 h-8 text-slate-400 group-hover:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
                <span className="text-sm font-medium text-slate-300 group-hover:text-green-400">Reserve</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-600 hover:border-purple-500 hover:bg-slate-700/50 transition-all group">
                <svg className="w-8 h-8 text-slate-400 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
                <span className="text-sm font-medium text-slate-300 group-hover:text-purple-400">Reports</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-600 hover:border-orange-500 hover:bg-slate-700/50 transition-all group">
                <svg className="w-8 h-8 text-slate-400 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
                <span className="text-sm font-medium text-slate-300 group-hover:text-orange-400">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}