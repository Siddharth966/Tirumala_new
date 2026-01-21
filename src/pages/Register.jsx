import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Mail, Lock, UserCircle, ArrowRight, Sprout } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const setRole = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration Successful');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data);
      alert('Registration Failed: ' + (err.response?.data?.msg || 'Error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[url('/images/hero_drone.png')] bg-cover bg-center bg-no-repeat bg-fixed relative">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>

      <div className="max-w-md w-full space-y-8 relative z-10 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
            <UserCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the agricultural revolution
          </p>
        </div>

        {/* Role Toggle */}
        <div className="bg-gray-100 p-1.5 rounded-xl flex items-center mb-8 relative">
          <div className="absolute inset-0 p-1.5 flex">
            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-100 w-1/2 h-full"
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              initial={false}
              animate={{ x: role === 'user' ? '0%' : '100%' }}
            />
          </div>

          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 relative z-10 py-2.5 text-sm font-bold transition-colors duration-200 flex items-center justify-center gap-2 ${role === 'user' ? 'text-green-700' : 'text-gray-500'}`}
          >
            <User className="w-4 h-4" />
            Farmer
          </button>

          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 relative z-10 py-2.5 text-sm font-bold transition-colors duration-200 flex items-center justify-center gap-2 ${role === 'admin' ? 'text-green-700' : 'text-gray-500'}`}
          >
            <ShieldCheck className="w-4 h-4" />
            Admin
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-gray-50/50"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-gray-50/50"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-gray-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-lg mt-6"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
