import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutGrid, ChevronLeft, ChevronRight, TrendingUp, Building2, Landmark, GraduationCap,
  ArrowLeft, ExternalLink, Sparkles
} from 'lucide-react';

const smoothSpring = { type: 'spring', stiffness: 200, damping: 25, mass: 1 };
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: smoothSpring }
};

const Resources = () => {
  const navigate = useNavigate();

  const flagshipProducts = [
    { title: 'Career Counselling Tool', path: 'https://collegereview.io', color: 'blue', desc: 'Expert guidance for your medical career path' },
    { title: 'College Predictor', path: 'https://collegereview.io', color: 'purple', desc: 'Predict colleges based on your rank' },
    { title: 'Branch Predictor', path: 'https://collegereview.io', color: 'indigo', desc: 'Find the best clinical branch for you' },
    { title: 'Department Predictor', path: 'https://collegereview.io', color: 'emerald', desc: 'Identify top departments across India' }
  ];


  const colorSettingsMap = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', hoverBg: 'group-hover:bg-blue-600', shadow: 'group-hover:shadow-blue-500/30', border: 'group-hover:border-blue-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', hoverBg: 'group-hover:bg-purple-600', shadow: 'group-hover:shadow-purple-500/30', border: 'group-hover:border-purple-200' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', hoverBg: 'group-hover:bg-indigo-600', shadow: 'group-hover:shadow-indigo-500/30', border: 'group-hover:border-indigo-200' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', hoverBg: 'group-hover:bg-emerald-600', shadow: 'group-hover:shadow-emerald-500/30', border: 'group-hover:border-emerald-200' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', hoverBg: 'group-hover:bg-amber-600', shadow: 'group-hover:shadow-amber-500/30', border: 'group-hover:border-amber-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', hoverBg: 'group-hover:bg-orange-600', shadow: 'group-hover:shadow-orange-500/30', border: 'group-hover:border-orange-200' },
    sky: { bg: 'bg-sky-50', text: 'text-sky-600', hoverBg: 'group-hover:bg-sky-600', shadow: 'group-hover:shadow-sky-500/30', border: 'group-hover:border-sky-200' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', hoverBg: 'group-hover:bg-rose-600', shadow: 'group-hover:shadow-rose-500/30', border: 'group-hover:border-rose-200' }
  };

  const ResourceCard = ({ item, isExternal = false }) => {
    const colors = colorSettingsMap[item.color];
    const handleClick = () => {
      if (isExternal) {
        window.open(item.path, '_blank');
      } else {
        navigate(item.path);
      }
    };

    return (
      <motion.div
        variants={fadeUp}
        whileHover={{ y: -5, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className="group cursor-pointer"
      >
        <div className={`relative h-44 bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center transition-all hover:bg-slate-50 group-hover:shadow-xl ${colors.border} overflow-hidden`}>
          <div className={`absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${colors.bg}`} />

          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all group-hover:rotate-12 shadow-sm ${colors.bg} ${colors.text} group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg`}>
            {item.icon || <Sparkles size={20} />}
          </div>

          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors mb-1">
            {item.title}
          </h3>

          <p className="text-[10px] text-gray-500 font-bold leading-tight transition-colors px-2 mb-4">
            {item.desc}
          </p>

          <div className={`text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm transition-all group-hover:scale-110 bg-blue-600 text-white`}>
            {isExternal ? 'Open Site' : 'Open Tool'} {isExternal && <ExternalLink size={10} />}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen p-4 lg:p-10 space-y-12 bg-ocean-deep/5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors mb-2 group"
          >
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 flex items-center gap-3 tracking-tighter uppercase italic">
            <LayoutGrid size={28} className="text-blue-600" />
            Resources & Tools
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Comprehensive Medical Counseling Database
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-white shadow-xl shadow-blue-900/5 max-w-sm hidden md:block"
        >
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white p-2 rounded-xl">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Expert Tip</p>
              <p className="text-[11px] text-gray-600 leading-relaxed font-bold">
                Compare multi-year trends and secure your dream seat with data-backed decisions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flagship Products Section */}
      <div className="space-y-6">
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1" />
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] flex items-center gap-2">
            <Sparkles size={14} />
            This is our Flagship Product
          </h2>
          <div className="h-px bg-gray-200 flex-1" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {flagshipProducts.map((item) => (
            <ResourceCard key={item.title} item={item} isExternal={true} />
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Resources;
