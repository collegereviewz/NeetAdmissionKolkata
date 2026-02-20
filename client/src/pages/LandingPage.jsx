import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Users, CheckCircle2, Play,
  MapPin, BarChart3, Grid3X3, Receipt,
  Share2, Search, TrendingUp, Building2,
  ChevronRight, PlayCircle, Star, Phone
} from 'lucide-react';
import PublicHeader from '../components/PublicHeader';
import logo from '../assets/logo6.png';

const LandingPage = ({ onGetStarted }) => {
  const bouncy = { type: 'spring', stiffness: 500, damping: 25, mass: 0.5 };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const features = [
    { title: 'Allotments', desc: 'Track multi-year official allotments across rounds, states, and quotas, all in one structured view.', icon: <MapPin className="text-college-primary" /> },
    { title: 'Rank Scan', desc: 'Zoom into any rank and see what options candidates actually landed. A quick snapshot from all allotments across states.', icon: <Search className="text-college-primary" /> },
    { title: 'Closing Ranks', desc: 'Explore multi-year cut-off ranks for every round, course and institute, filtered by category, quota, and more.', icon: <BarChart3 className="text-college-primary" /> },
    { title: 'Seat Increase', desc: 'Understand the number of seats increased across multiple colleges & courses this year.', icon: <TrendingUp className="text-college-primary" /> },
    { title: 'Seat Matrix', desc: 'Access real-time seat availability for each round across institutes, quotas, and categories to stay ahead.', icon: <Grid3X3 className="text-college-primary" /> },
    { title: 'My Choice List', desc: 'Build, save, and refine multiple choice lists for each counselling with live data and smart filters.', icon: <Star className="text-college-primary" /> },
    { title: 'Fee, Stipend and Bond', desc: 'Compare tuition fees, stipends, bond obligations, and penalties categorized by institute, course and quota.', icon: <Receipt className="text-college-primary" /> },
    { title: 'Institutes', desc: 'Get verified information on 1000+ colleges, from beds in the hospital to facilities and clinical information.', icon: <Building2 className="text-college-primary" /> },
    { title: 'Allotment Mapping', desc: 'Track how candidates near your rank are moving across states and rounds, and spot better opportunities instantly.', icon: <Share2 className="text-college-primary" /> },
    { title: 'Courses', desc: 'Explore all available courses with duration, recognition, and clinical info.', icon: <PlayCircle className="text-college-primary" /> },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <PublicHeader onLogin={onGetStarted} />

      {/* Hero Section */}
      <section className="relative px-4 md:px-12 py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="z-10 text-center lg:text-left"
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Get real insights <br />
              before you fill your <br />
              <span className="text-college-primary">NEET PG choice list</span>
            </motion.h1>

            <motion.div variants={fadeIn} className="flex items-center justify-center lg:justify-start space-x-2 text-gray-500 font-bold mb-8">
              <Users size={20} className="text-college-primary" />
              <span>75k+ Students Enrolled</span>
            </motion.div>

            <motion.p variants={fadeIn} className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl lg:mx-0 mx-auto">
              MD/MS Seat Planning Backed by Real Data, Not Guesswork. Choosing a specialization is a major step and CRZ Counselling helps you take it with clarity. We align your NEET PG rank with actual seat trends, category-wise eligibility, and college preferences. Explore your options before filling out your choice list. Access last-round cut-offs, seat allotment trends, and intelligent tools designed to keep you informed at every step. Stay ahead of deadlines. Lock in your preferences with purpose.
            </motion.p>

            <motion.button
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="group bg-college-primary hover:bg-college-dark text-white px-10 py-5 rounded-full text-xl font-black shadow-xl shadow-college-primary/20 transition-all flex items-center space-x-4 mx-auto lg:mx-0"
            >
              <span>Get started</span>
              <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight size={24} />
              </div>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-college-light/20 rounded-[3rem] rotate-3 -z-10 transform scale-110"></div>
            <img
              src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_23-2147818501.jpg?t=st=1710000000~exp=1710003600~hmac=..."
              alt="Expert Doctor"
              className="rounded-[3rem] shadow-2xl w-full h-auto object-cover border-8 border-white"
            />
            {/* Rated Badge */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3 border border-gray-100">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-current" />)}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Rated 4.9</p>
                <p className="text-[10px] text-gray-400">across platforms</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="bg-gray-50 py-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Branding Box */}
          <div className="lg:w-1/3 bg-[#081b33] rounded-[2.5rem] p-10 flex flex-col justify-between text-white overflow-hidden relative">
            <div className="z-10">
              <h2 className="text-5xl font-black mb-4">Explore,</h2>
              <h2 className="text-5xl font-black mb-4">Choose,</h2>
              <h2 className="text-5xl font-black mb-4">Succeed</h2>
            </div>
            <div className="mt-12 transform scale-125 origin-bottom-left">
              <img src="https://img.freepik.com/free-photo/doctor-working-hospital_23-2148139502.jpg?..." alt="Doctor" className="rounded-t-2xl opacity-80" />
            </div>
          </div>

          {/* Right Features Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, shadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start space-x-4 transition-all"
              >
                <div className="bg-gray-50 p-3 rounded-xl flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 px-4 text-center bg-white">
        <h2 className="text-4xl font-black mb-3">Pick what's right for you</h2>
        <p className="text-gray-500 mb-16 font-bold">Tailored plans for every aspirant! Choose the right package and take a step closer to your dream medical college.</p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="bg-college-light/10 rounded-3xl p-8 border-2 border-college-light/30 relative">
            <div className="bg-white text-college-dark text-[10px] font-black px-3 py-1 rounded-full absolute top-4 left-1/2 -translate-x-1/2 border border-college-light/20">The Counselling Endgame Offer</div>
            <div className="mt-6 flex justify-between items-center text-left mb-8">
              <div>
                <h3 className="text-college-dark font-black text-xl">NEET PG 2025</h3>
                <h4 className="text-4xl font-black">Pro</h4>
              </div>
              <div className="text-right">
                <div className="bg-college-dark text-white text-[10px] font-black px-3 py-1 rounded-full inline-block">All India & State Counsellings</div>
              </div>
            </div>
            <div className="text-left mb-8">
              <span className="text-gray-400 line-through text-lg">₹ 4499</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-black">₹ 499</span>
                <span className="text-gray-400 font-bold text-sm">+ GST</span>
              </div>
              <p className="text-xs text-gray-400 font-bold mt-2">Valid till Feb 28, 2026</p>
            </div>
            <button className="w-full bg-college-primary text-white py-4 rounded-xl font-black shadow-lg shadow-college-primary/20 mb-8">Purchase now</button>
            <div className="border-t border-college-light/20 pt-6 text-left">
              <p className="text-[10px] text-college-dark font-black uppercase mb-4">Key Features</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm font-bold text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-college-light/20 flex items-center justify-center"><Phone size={14} className="text-college-primary" /></div>
                  <span>Priority Call & Email Support</span>
                </div>
                <div className="flex items-center space-x-3 text-sm font-bold text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-college-light/20 flex items-center justify-center"><Play size={14} className="text-college-primary" /></div>
                  <span>Latest Updates through Events and Announcements</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f2f5ff] rounded-3xl p-8 border-2 border-blue-200 relative">
            <div className="bg-white text-blue-600 text-[10px] font-black px-3 py-1 rounded-full absolute top-4 left-1/2 -translate-x-1/2 border border-blue-100">The Counselling Endgame Offer</div>
            <div className="mt-6 flex justify-between items-center text-left mb-8">
              <div>
                <h3 className="text-blue-600 font-black text-xl">NEET PG 2025</h3>
                <h4 className="text-4xl font-black">Standard</h4>
              </div>
              <div className="text-right">
                <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full inline-block">All India Only</div>
              </div>
            </div>
            <div className="text-left mb-8">
              <span className="text-gray-400 line-through text-lg">₹ 4099</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-black">₹ 399</span>
                <span className="text-gray-400 font-bold text-sm">+ GST</span>
              </div>
              <p className="text-xs text-gray-400 font-bold mt-2">Valid till Feb 28, 2026</p>
            </div>
            <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-black shadow-lg shadow-blue-500/20 mb-8">Purchase now</button>
            <div className="border-t border-blue-100 pt-6 text-left">
              <p className="text-[10px] text-blue-600 font-black uppercase mb-4">Key Features</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm font-bold text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><Phone size={14} className="text-blue-500" /></div>
                  <span>Priority Call & Email Support</span>
                </div>
                <div className="flex items-center space-x-3 text-sm font-bold text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><Play size={14} className="text-blue-500" /></div>
                  <span>Latest Updates through Events and Announcements</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 px-4 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">NEET PG 2025 Overview</h2>
          <p className="text-gray-500 font-bold mb-16">Everything you need to know about NEET PG 2025 and how it impacts your medical career.</p>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-12 items-center text-left">
            <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
              <img src="https://img.freepik.com/free-vector/gold-trophy-with-graduation-cap-medal_1284-52643.jpg?..." alt="Cap" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-800 mb-6 flex items-center">
                A brief explanation of the exam
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                NEET PG is the gateway for postgraduate medical courses like MD, MS, and PG Diploma in India. It's held annually and is essential for any MBBS graduate who wants to pursue a specialization in clinical or non-clinical fields.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Top Videos for Smarter Counseling Decisions</h2>
          <p className="text-gray-500 font-bold mb-12">Everything you need to know about NEET PG 2025 and how it impacts your medical career.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((v) => (
              <div key={v} className="group cursor-pointer">
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-lg border-2 border-transparent group-hover:border-college-primary transition-all">
                  <img src={`https://img.youtube.com/vi/qY7vE7L8mUI/maxresdefault.jpg`} alt={`Video ${v}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/90 p-4 rounded-full text-college-primary transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <h4 className="font-black text-gray-800 text-lg group-hover:text-college-primary transition-colors line-clamp-2 px-2 text-left leading-snug">
                  Pointers for All India Stray Round Choice Filling | NEET PG - 2025
                </h4>
                <p className="text-gray-400 text-xs font-bold text-left px-2 mt-2">19 hours ago</p>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 text-college-primary font-black border-2 border-college-primary px-8 py-3 rounded-full hover:bg-college-primary hover:text-white transition-all shadow-lg shadow-college-primary/10"
          >
            <span>Explore all videos</span>
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </section>

      {/* Footer (Minimal) */}
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="CRZ Counselling" className="h-8 w-auto invert" />
            <span className="text-2xl font-bold">CRZ Counselling</span>
          </div>
          <div className="flex space-x-8 text-sm font-bold text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
          <p className="text-gray-500 text-xs font-bold">© 2026 CRZ Counselling. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
