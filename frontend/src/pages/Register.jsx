import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, Check, AlertCircle } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const passwordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    return { strength, label: labels[strength], color: colors[strength] };
  };

  const { strength, label, color } = passwordStrength();

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
          <div className="hidden md:block text-white space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">Secure Locker System</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Welcome to the<br />Future of Storage
              </h1>
              <p className="text-xl text-white/90">
                Join thousands of users managing their lockers with ease and security.
              </p>
            </div>
            
            <div className="space-y-4 mt-12">
              {[
                { icon: <Check className="w-5 h-5" />, text: 'Advanced security features' },
                { icon: <Check className="w-5 h-5" />, text: 'Real-time locker monitoring' },
                { icon: <Check className="w-5 h-5" />, text: '24/7 customer support' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <div className="text-green-300">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <UserPlus className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Create Account</h2>
              </div>
              <p className="text-white/90">Get started with your secure locker management</p>
            </div>

            <div className="p-8">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <div className={`relative transition-all ${focusedField === 'first_name' ? 'transform scale-[1.02]' : ''}`}>
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="first_name"
                        placeholder="John"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                        onChange={handleChange}
                        onFocus={() => setFocusedField('first_name')}
                        onBlur={() => setFocusedField('')}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <div className={`relative transition-all ${focusedField === 'last_name' ? 'transform scale-[1.02]' : ''}`}>
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Doe"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                        onChange={handleChange}
                        onFocus={() => setFocusedField('last_name')}
                        onBlur={() => setFocusedField('')}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                  <div className={`relative transition-all ${focusedField === 'username' ? 'transform scale-[1.02]' : ''}`}>
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      placeholder="johndoe"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                      onChange={handleChange}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className={`relative transition-all ${focusedField === 'email' ? 'transform scale-[1.02]' : ''}`}>
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className={`relative transition-all ${focusedField === 'password' ? 'transform scale-[1.02]' : ''}`}>
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                  </div>
                  {formData.password && (
                    <div className="mt-2 space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              i <= strength ? color : 'bg-gray-200'
                            }`}
                          ></div>
                        ))}
                      </div>
                      {label && <p className="text-xs text-gray-600">Password strength: <span className="font-semibold">{label}</span></p>}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                  <div className={`relative transition-all ${focusedField === 'password2' ? 'transform scale-[1.02]' : ''}`}>
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="password2"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password2')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                  </div>
                  {formData.password2 && formData.password === formData.password2 && (
                    <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Passwords match
                    </p>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition shadow-lg hover:shadow-xl mt-6"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition"
                  >
                    Sign In
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}