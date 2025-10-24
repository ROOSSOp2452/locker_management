import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Smart Lockers</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/dashboard" className={`px-4 py-2 rounded-lg font-medium transition ${isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              Dashboard
            </Link>
            <Link to="/lockers" className={`px-4 py-2 rounded-lg font-medium transition ${isActive('/lockers') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              Lockers
            </Link>
            <Link to="/reservations" className={`px-4 py-2 rounded-lg font-medium transition ${isActive('/reservations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              Reservations
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{user?.username?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-gray-700 font-medium">{user?.username}</span>
            </div>
            <button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition shadow-md">
              Logout
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg font-medium transition ${isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              Dashboard
            </Link>
            <Link to="/lockers" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg font-medium transition ${isActive('/lockers') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              Lockers
            </Link>
            <Link to="/reservations" onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-2 rounded-lg font-medium transition ${isActive('/reservations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
              Reservations
            </Link>
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{user?.username?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-gray-700 font-medium">{user?.username}</span>
            </div>
            <button onClick={handleLogout} className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition shadow-md">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}