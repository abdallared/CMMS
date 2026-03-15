import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStore, Role } from '../store/useStore';
import { Activity, User } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('patient');
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8" dir="ltr">
      <div className="bg-white/90 backdrop-blur-sm w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Decorative background pattern (subtle dots) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,var(--color-brand-200)_2px,transparent_2px)] bg-[length:20px_20px] opacity-20 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,var(--color-brand-200)_2px,transparent_2px)] bg-[length:20px_20px] opacity-20 rounded-tr-full pointer-events-none"></div>

        {/* Left Side - Illustration */}
        <div className="md:w-3/5 p-8 flex items-center justify-center bg-gradient-to-br from-brand-50 to-white relative z-10">
          <div className="relative w-full max-w-md aspect-square">
            {/* Placeholder for the illustration - using a stylized circle for now */}
            <div className="absolute inset-0 bg-brand-100 rounded-full opacity-50 transform scale-90"></div>
            <div className="absolute inset-0 flex items-center justify-center text-brand-500">
               <img 
                 src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=2069&auto=format&fit=crop" 
                 alt="Medical Team" 
                 className="w-full h-full object-cover rounded-full shadow-lg border-8 border-white"
                 referrerPolicy="no-referrer"
               />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-white shadow-[-20px_0_30px_-15px_rgba(0,0,0,0.05)]">
          <div className="mx-auto w-full max-w-sm">
            
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 mb-4">
                <Activity className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Lifeline</h1>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-sm text-gray-500">Please enter your details to continue</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} dir="rtl">
              <div>
                <div className="relative rounded-xl shadow-sm overflow-hidden bg-brand-50/50 border border-brand-100 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none border-l border-brand-200 pl-3 bg-brand-50">
                    <User className="h-5 w-5 text-brand-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pr-16 py-4 pl-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 sm:text-sm"
                    placeholder="البريد الإلكتروني"
                  />
                </div>
              </div>

              <div>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="block w-full py-4 px-4 bg-brand-50/50 border border-brand-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm text-gray-700 transition-all"
                >
                  <option value="patient">مريض (Patient)</option>
                  <option value="admin">مدير النظام (Admin)</option>
                  <option value="secretary">سكرتيرة (Secretary)</option>
                  <option value="consultant">دكتور استشاري (Consultant)</option>
                  <option value="therapist">أخصائي علاج طبيعي (Therapist)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors uppercase tracking-wider"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
