import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Shield, 
  CreditCard, Calendar, ArrowLeft, 
  MapPin, Edit, ExternalLink, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4 md:p-6 lg:p-6 space-y-4 md:space-y-6 lg:space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-500 hover:text-college-primary font-bold transition-all text-[11px] md:text-sm lg:text-[11px] group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      {/* Profile Header Card */}
      <motion.div 
        initial="hidden" animate="visible" variants={fadeUp}
        className="bg-white rounded-[2rem] lg:rounded-[2rem] p-6 md:p-8 lg:p-8 shadow-xl shadow-blue-500/5 relative overflow-hidden border border-blue-50/50"
      >
        <div className="absolute top-0 right-0 w-48 h-48 lg:w-40 lg:h-40 bg-blue-50/30 rounded-full -mr-24 -mt-24 lg:-mr-20 lg:-mt-20 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-6">
          {/* Avatar */}
          <div className="w-16 h-16 md:w-24 md:h-24 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl lg:rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl lg:text-2xl font-black shadow-lg shadow-purple-200">
            {(user.fullName || user.username || 'A').charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-1">
              <h1 className="text-xl md:text-2xl lg:text-xl font-black text-gray-900 tracking-tight">
                {user.fullName || user.username}
              </h1>
              <div className={`self-center md:self-auto px-2 md:px-3 py-0.5 rounded-full text-[8px] md:text-[9px] lg:text-[8px] font-black uppercase tracking-widest border ${
                user.subscriptionType === 'Paid' 
                ? 'bg-amber-50 text-amber-600 border-amber-200' 
                : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                {user.subscriptionType === 'Paid' ? 'Premium Member' : 'Free Member'}
              </div>
            </div>
            <p className="text-slate-400 font-bold text-[10px] md:text-xs lg:text-[10px] flex items-center justify-center md:justify-start gap-1.5 mb-4 lg:mb-4">
              <MapPin size={12} />
              Verified User • INDIA
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-3">
              <div className="flex items-center gap-2.5 p-2 lg:p-2 bg-gray-50 rounded-xl lg:rounded-xl border border-gray-100">
                <div className="w-8 h-8 lg:w-8 lg:h-8 bg-white rounded-lg flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                  <Mail size={16} />
                </div>
                <div className="truncate">
                   <p className="text-[7px] md:text-[8px] lg:text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-0.5">Email</p>
                   <p className="text-[10px] md:text-xs lg:text-[10px] font-bold text-gray-700 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2 lg:p-2 bg-gray-50 rounded-xl lg:rounded-xl border border-gray-100">
                <div className="w-8 h-8 lg:w-8 lg:h-8 bg-white rounded-lg flex items-center justify-center text-green-500 shadow-sm shrink-0">
                  <Phone size={16} />
                </div>
                <div className="truncate">
                   <p className="text-[7px] md:text-[8px] lg:text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-0.5">Phone</p>
                   <p className="text-[10px] md:text-xs lg:text-[10px] font-bold text-gray-700 truncate">+91 {user.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subscription & Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6">
        {/* Plan Details */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}
          className="md:col-span-2 bg-white rounded-[2rem] lg:rounded-[2rem] p-6 md:p-8 lg:p-8 shadow-lg shadow-blue-500/5 border border-blue-50/50"
        >
          <div className="flex items-center justify-between mb-6 lg:mb-6">
            <h2 className="text-base md:text-lg lg:text-base font-black text-gray-900">Subscription Status</h2>
            <CreditCard size={16} className="text-slate-300" />
          </div>

          <div className="space-y-4 lg:space-y-4">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                user.subscriptionType === 'Paid' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
              }`}>
                <Shield size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-[11px] md:text-sm lg:text-[12px]">Plan: {user.subscriptionType}</h3>
                <p className="text-[9px] md:text-[11px] lg:text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                  {user.subscriptionType === 'Paid' 
                    ? "Full access to premium features enabled."
                    : "Free plan active. Upgrade to unlock all expert tools."}
                </p>
              </div>
            </div>

            <div className="pt-4 lg:pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              {user.subscriptionType !== 'Paid' && (
                <button className="flex-1 bg-college-primary text-white py-2 lg:py-3 rounded-xl font-black text-[9px] md:text-[11px] lg:text-[10px] shadow-lg shadow-college-primary/10 hover:scale-[1.02] transition-transform">
                  Upgrade Now
                </button>
              )}
              <button className="flex-1 border-2 border-gray-100 text-gray-700 py-2 lg:py-3 rounded-xl font-black text-[9px] md:text-[11px] lg:text-[10px] hover:bg-gray-50 transition-colors">
                Billing History
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] lg:rounded-[2rem] p-6 md:p-8 lg:p-8 shadow-lg shadow-blue-500/5 border border-blue-50/50"
        >
          <h2 className="text-base md:text-lg lg:text-base font-black text-gray-900 mb-6 lg:mb-6">Account Settings</h2>
          <div className="space-y-2 lg:space-y-2">
            <button className="w-full flex items-center justify-between p-2 lg:p-3 rounded-xl hover:bg-gray-50 transition-all font-bold text-[10px] md:text-xs lg:text-[11px] text-slate-600 text-left group">
               <span className="flex items-center gap-3">
                 <Edit size={16} className="text-slate-400" />
                 Edit Profile
               </span>
               <ChevronDown size={12} className="text-slate-300 -rotate-90 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between p-2 lg:p-3 rounded-xl hover:bg-gray-50 transition-all font-bold text-[10px] md:text-xs lg:text-[11px] text-slate-600 text-left group">
               <span className="flex items-center gap-3">
                 <Calendar size={16} className="text-slate-400" />
                 History
               </span>
               <ChevronDown size={12} className="text-slate-300 -rotate-90 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between p-2 lg:p-3 rounded-xl hover:bg-gray-50 transition-all font-bold text-[10px] md:text-xs lg:text-[11px] text-slate-600 text-left group">
               <span className="flex items-center gap-3">
                 <ExternalLink size={16} className="text-slate-400" />
                 Data
               </span>
               <ChevronDown size={12} className="text-slate-300 -rotate-90 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
