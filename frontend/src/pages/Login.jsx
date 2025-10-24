import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-slate-700/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-slate-600/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute w-72 h-72 bg-slate-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0.75s'}}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="hidden md:block text-white space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-slate-200">Smart Locker Management</span>
              </div>
              
              <h1 className="text-5xl font-bold leading-tight text-slate-100">
                Secure Access.<br />
                <span className="text-slate-400">Simple Control.</span>
              </h1>
              
              <p className="text-xl text-slate-300">
                Enterprise-grade security meets intuitive design for seamless locker management.
              </p>
            </div>

            <div className="space-y-4 mt-12">
              {[
                { number: '01', title: 'Military-Grade Encryption', desc: 'Your data is protected with AES-256 encryption' },
                { number: '02', title: 'Real-Time Monitoring', desc: 'Track locker activity and access in real-time' },
                { number: '03', title: 'Smart Notifications', desc: 'Get instant alerts for all locker operations' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-white/5 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="text-3xl font-bold text-slate-600 group-hover:text-slate-400 transition-colors">{item.number}</div>
                  <div>
                    <h3 className="font-semibold text-slate-200 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-8 border-b border-slate-600/50">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-slate-600/30 rounded-xl backdrop-blur-sm border border-slate-500/30">
                  <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-100">Welcome Back</h2>
                  <p className="text-slate-400 mt-1">Sign in to access your dashboard</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 mb-6 rounded-xl flex items-start gap-3 backdrop-blur-sm">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-300 text-sm font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Username</label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'username' ? 'transform scale-[1.01]' : ''}`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg className={`w-5 h-5 transition-colors ${focusedField === 'username' ? 'text-slate-400' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-700/50 border-2 border-slate-600 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition outline-none"
                      onChange={(e) => {
                        setCredentials({...credentials, username: e.target.value});
                        if (error) setError('');
                      }}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'password' ? 'transform scale-[1.01]' : ''}`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <svg className={`w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-slate-400' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3.5 bg-slate-700/50 border-2 border-slate-600 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition outline-none"
                      onChange={(e) => {
                        setCredentials({...credentials, password: e.target.value});
                        if (error) setError('');
                      }}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700/50 text-slate-500 focus:ring-2 focus:ring-slate-500" />
                    <span className="text-slate-400 group-hover:text-slate-300 transition">Remember me</span>
                  </label>
                  <a href="#" className="text-slate-400 hover:text-slate-300 transition font-medium">Forgot password?</a>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white py-3.5 rounded-xl font-semibold transform hover:scale-[1.02] active:scale-[0.98] transition shadow-lg hover:shadow-xl border border-slate-600"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
                <p className="text-slate-400">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-slate-300 font-semibold hover:text-white transition hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">
                  Protected by enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}