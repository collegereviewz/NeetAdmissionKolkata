import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Users, CheckCircle2, Play,
  MapPin, BarChart3, Grid3X3, Receipt,
  Share2, Search, TrendingUp, Building2,
  ChevronRight, PlayCircle, Star, Phone, ChevronDown, List
} from 'lucide-react';
import PublicHeader from '../components/PublicHeader';
import logo from '../assets/logo6.png';
import VideosSection from '../components/VideosSection';

const LandingPage = ({ onGetStarted, onFeatureClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80", // Medical study
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=900&q=80", // Doctor with notes
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80"  // Medical professional
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bouncy = { type: 'spring', stiffness: 500, damping: 25, mass: 0.5 };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const features = [
    { title: 'Allotments', desc: 'Track multi-year official allotments across rounds, states, and quotas, all in one structured view.', icon: <MapPin className="text-college-primary w-4 h-4" />, route: '/allotments' },
    { title: 'Closing Ranks', desc: 'Explore multi-year cut-off ranks for every round, course and institute, filtered by category, quota, and more.', icon: <BarChart3 className="text-college-primary w-4 h-4" />, route: '/closing-ranks' },
    { title: 'Seat Increase', desc: 'Understand the number of seats increased across multiple colleges & courses this year.', icon: <TrendingUp className="text-college-primary w-4 h-4" />, route: '/seat-increase' },
    { title: 'Seat Matrix', desc: 'Access real-time seat availability for each round across institutes, quotas, and categories to stay ahead.', icon: <Grid3X3 className="text-college-primary w-4 h-4" />, route: '/seat-matrix' },
    { title: 'My Choice List', desc: 'Build, save, and refine multiple choice lists for each counselling with live data and smart filters.', icon: <Star className="text-college-primary w-4 h-4" />, route: '/' },
    { title: 'Fee, Stipend and Bond', desc: 'Compare tuition fees, stipends, bond obligations, and penalties categorized by institute, course and quota.', icon: <Receipt className="text-college-primary w-4 h-4" />, route: '/fee-stipend-bond' },
    { title: 'Institutes', desc: 'Get verified information on 1000+ colleges, from beds in the hospital to facilities and clinical information.', icon: <Building2 className="text-college-primary w-4 h-4" />, route: '/institutes' },
    { title: 'Courses', desc: 'Explore all available courses with duration, recognition, and clinical info.', icon: <PlayCircle className="text-college-primary w-4 h-4" />, route: '/courses' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <PublicHeader onLogin={onGetStarted} />

      {/* Hero Section */}
      <section className="relative px-4 md:px-12 pt-24 pb-10 md:pt-32 md:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="z-10 text-center lg:text-left"
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8 tracking-tighter uppercase italic">
              Level Up <br />
              <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">Your Insights</span> <br />
              <span className="text-white">NEET PG 2026</span>
            </motion.h1>
            <motion.div variants={fadeIn} className="flex items-center justify-center lg:justify-start space-x-2 text-gray-500 font-bold mb-5">
              <Users size={16} className="text-college-primary" />
              <span>75k+ Students Enrolled</span>
            </motion.div>

            <motion.p variants={fadeIn} className="text-sm text-gray-600 mb-6 leading-relaxed max-w-2xl lg:mx-0 mx-auto">
              MD/MS Seat Planning Backed by Real Data, Not Guesswork. Choosing a specialization is a major step and CRZGenie helps you take it with clarity. We align your NEET PG rank with actual seat trends, category-wise eligibility, and college preferences. Explore your options before filling out your choice list. Access last-round cut-offs, seat allotment trends, and intelligent tools designed to keep you informed at every step. Stay ahead of deadlines. Lock in your preferences with purpose.
            </motion.p>


            <motion.button
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="group bg-college-primary hover:bg-college-dark text-white px-6 py-3 rounded-full text-base font-black shadow-xl shadow-college-primary/20 transition-all flex items-center space-x-4 mx-auto lg:mx-0"
            >
              <span>Get started</span>
              <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </div>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-0 max-w-md mx-auto lg:mx-0"
          >
            {/* Corner Accent - Top Right */}
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-blue-100 rounded-[1.5rem] -z-10"></div>
            {/* Corner Accent - Bottom Left */}
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-blue-100 rounded-[1.5rem] -z-10"></div>

            {/* Illustration Card */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl w-full border-4 border-white/80 bg-white">

              {/* The Counselling Illustration SVG */}
              <div className="w-full p-4 pb-0 bg-white">
                <svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  {/* Light blue oval background */}
                  <ellipse cx="200" cy="230" rx="190" ry="165" fill="#dde9f8" />

                  {/* Student - Chair body */}
                  <rect x="60" y="270" width="140" height="100" rx="20" fill="#1a3a6b" />
                  {/* Chair back */}
                  <rect x="60" y="200" width="140" height="90" rx="20" fill="#1a3a6b" />
                  {/* Chair armrests */}
                  <rect x="45" y="250" width="25" height="55" rx="10" fill="#1a3a6b" />
                  <rect x="180" y="250" width="25" height="55" rx="10" fill="#1a3a6b" />
                  {/* Chair legs */}
                  <rect x="80" y="360" width="15" height="30" rx="5" fill="#142d55" />
                  <rect x="155" y="360" width="15" height="30" rx="5" fill="#142d55" />

                  {/* Student body (orange shirt) */}
                  <ellipse cx="165" cy="270" rx="42" ry="50" fill="#f97316" />
                  {/* Student head */}
                  <circle cx="165" cy="195" r="35" fill="#fbbf77" />
                  {/* Student hair */}
                  <ellipse cx="165" cy="170" rx="35" ry="18" fill="#1a1a2e" />
                  {/* Student face features */}
                  <circle cx="155" cy="197" r="4" fill="#92400e" />
                  <circle cx="175" cy="197" r="4" fill="#92400e" />
                  <path d="M158 210 Q165 216 172 210" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Student arm waving */}
                  <ellipse cx="210" cy="248" rx="12" ry="30" fill="#f97316" transform="rotate(-35 210 248)" />
                  {/* Hand */}
                  <circle cx="225" cy="228" r="13" fill="#fbbf77" />
                  {/* Fingers */}
                  <circle cx="222" cy="217" r="5" fill="#fbbf77" />
                  <circle cx="230" cy="215" r="5" fill="#fbbf77" />
                  <circle cx="237" cy="219" r="5" fill="#fbbf77" />
                  <circle cx="238" cy="228" r="5" fill="#fbbf77" />
                  {/* Student legs/pants */}
                  <ellipse cx="150" cy="320" rx="20" ry="40" fill="#374151" transform="rotate(15 150 320)" />
                  <ellipse cx="180" cy="325" rx="20" ry="40" fill="#374151" transform="rotate(-5 180 325)" />
                  {/* Shoes */}
                  <ellipse cx="138" cy="362" rx="18" ry="10" fill="#111827" />
                  <ellipse cx="190" cy="368" rx="18" ry="10" fill="#111827" />

                  {/* Speech bubble */}
                  <ellipse cx="245" cy="175" rx="45" ry="30" fill="white" />
                  <polygon points="220,195 215,215 235,200" fill="white" />

                  {/* Video call screen (right side) */}
                  <rect x="300" y="140" width="185" height="155" rx="12" fill="white" stroke="#cbd5e1" strokeWidth="3" />
                  {/* Screen header bar */}
                  <rect x="300" y="140" width="185" height="28" rx="12" fill="#1e3a5f" />
                  <rect x="300" y="155" width="185" height="13" rx="0" fill="#1e3a5f" />
                  {/* Screen dots */}
                  <circle cx="460" cy="154" r="5" fill="#ef4444" />
                  <circle cx="448" cy="154" r="5" fill="#fbbf24" />
                  <circle cx="436" cy="154" r="5" fill="#22c55e" />

                  {/* Counselor in screen */}
                  {/* Counselor body (jacket) */}
                  <rect x="345" y="245" width="95" height="50" rx="12" fill="#4b5563" />
                  {/* Shirt */}
                  <rect x="371" y="245" width="43" height="50" fill="#1d4ed8" />
                  {/* Counselor head */}
                  <circle cx="393" cy="214" r="30" fill="#fbbf77" />
                  {/* Hair */}
                  <ellipse cx="393" cy="193" rx="30" ry="15" fill="#1a1a2e" />
                  {/* Glasses */}
                  <circle cx="384" cy="215" r="9" fill="none" stroke="#374151" strokeWidth="2" />
                  <circle cx="402" cy="215" r="9" fill="none" stroke="#374151" strokeWidth="2" />
                  <line x1="393" y1="215" x2="393" y2="215" stroke="#374151" strokeWidth="2" />
                  <line x1="375" y1="215" x2="368" y2="213" stroke="#374151" strokeWidth="2" />
                  <line x1="411" y1="215" x2="418" y2="213" stroke="#374151" strokeWidth="2" />
                  {/* Counselor eyes */}
                  <circle cx="384" cy="215" r="4" fill="#92400e" />
                  <circle cx="402" cy="215" r="4" fill="#92400e" />
                  {/* Counselor smile */}
                  <path d="M386 226 Q393 232 400 226" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Red book/folder */}
                  <rect x="408" y="230" width="28" height="38" rx="4" fill="#ef4444" />
                  <line x1="408" y1="248" x2="436" y2="248" stroke="#dc2626" strokeWidth="1.5" />

                  {/* Table */}
                  <ellipse cx="370" cy="348" rx="70" ry="20" fill="#f97316" />
                  <line x1="320" y1="348" x2="310" y2="395" stroke="#ea580c" strokeWidth="8" strokeLinecap="round" />
                  <line x1="420" y1="348" x2="430" y2="395" stroke="#ea580c" strokeWidth="8" strokeLinecap="round" />
                  <line x1="340" y1="395" x2="310" y2="395" stroke="#ea580c" strokeWidth="8" strokeLinecap="round" />
                  <line x1="400" y1="395" x2="430" y2="395" stroke="#ea580c" strokeWidth="8" strokeLinecap="round" />

                  {/* Laptop on table */}
                  <rect x="330" y="312" width="65" height="40" rx="5" fill="#1e3a5f" />
                  <rect x="335" y="316" width="55" height="32" rx="3" fill="#3b82f6" />
                  <rect x="322" y="350" width="80" height="6" rx="3" fill="#374151" />

                  {/* Mug */}
                  <rect x="408" y="328" width="28" height="25" rx="5" fill="#1d4ed8" />
                  <path d="M436 333 Q448 333 448 342 Q448 351 436 351" fill="none" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />

                  {/* Plant */}
                  <rect x="450" y="340" width="20" height="25" rx="4" fill="#1d4ed8" />
                  <ellipse cx="460" cy="330" rx="18" ry="20" fill="#ef4444" />
                  <ellipse cx="448" cy="325" rx="13" ry="16" fill="#ef4444" />
                  <ellipse cx="472" cy="325" rx="13" ry="16" fill="#ef4444" />

                  {/* Floor shadow */}
                  <ellipse cx="130" cy="395" rx="100" ry="12" fill="#c7d9f0" opacity="0.5" />
                </svg>
              </div>

              {/* Stats bar */}
              <div className="bg-[#1e3a5f] px-5 py-3 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-white font-black text-base leading-none">75k+</p>
                  <p className="text-blue-200 text-[9px] font-bold">Students</p>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-white font-black text-base leading-none">1000+</p>
                  <p className="text-blue-200 text-[9px] font-bold">Colleges</p>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-white font-black text-base leading-none">99%</p>
                  <p className="text-blue-200 text-[9px] font-bold">Accurate</p>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="bg-white/15 border border-white/30 text-white text-[9px] font-black px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/25 transition-colors">
                  Explore →
                </div>
              </div>
            </div>
            {/* Rated Badge */}
            <div className="absolute -top-4 right-4 bg-white p-2.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-gray-100 z-20">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={11} className="text-yellow-400 fill-current" />)}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Rated 4.9</p>
                <p className="text-[9px] text-gray-400">across platforms</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore Section - Compacted (~40% smaller visual) */}
      < section className="bg-gray-50 py-12 px-4 md:px-12" >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Left Branding Box - Photo Background */}
          <div className="lg:w-1/3 rounded-[2rem] overflow-hidden relative min-h-[320px] shadow-lg">
            {/* Background Photo */}
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
              alt="Students studying"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#081b33]/80"></div>
            {/* Text on top */}
            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
              <h2 className="text-3xl font-black text-white mb-1">Explore,</h2>
              <h2 className="text-3xl font-black text-white mb-1">Choose,</h2>
              <h2 className="text-3xl font-black text-white">Succeed</h2>
              <p className="text-blue-200 text-xs font-semibold mt-3">Your path to the right medical college starts here.</p>
            </div>
          </div>

          {/* Right Features Grid - Compact */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                onClick={() => onFeatureClick ? onFeatureClick(f.route) : null}
                className="bg-white p-4 rounded-xl border border-gray-100 flex items-start space-x-3 transition-all cursor-pointer group hover:border-college-primary/30 hover:shadow-md"
              >
                <div className="bg-gray-50 p-2 rounded-lg flex-shrink-0 group-hover:bg-college-primary/10 transition-colors">
                  {f.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800 mb-0.5 group-hover:text-college-primary transition-colors">{f.title}</h3>
                  <p className="text-[10px] text-gray-500 leading-snug line-clamp-2">{f.desc}</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-college-primary transition-colors flex-shrink-0 mt-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* Packages Section - Compacted */}
      < section className="py-16 px-4 text-center bg-white" >
        <h2 className="text-3xl font-black mb-2">Pick what's right for you</h2>
        <p className="text-gray-500 mb-10 font-bold text-sm max-w-2xl mx-auto">Tailored plans for every aspirant! Choose the right package and take a step closer to your dream medical college.</p>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {/* Pro Plan */}
          <div className="bg-college-light/10 rounded-2xl p-6 border-2 border-college-light/30 relative hover:shadow-xl transition-shadow duration-300">
            <div className="bg-white text-college-dark text-[9px] font-black px-3 py-1 rounded-full absolute top-4 left-1/2 -translate-x-1/2 border border-college-light/20 shadow-sm">The Counselling Endgame Offer</div>
            <div className="mt-4 flex justify-between items-center text-left mb-6">
              <div>
                <h3 className="text-college-dark font-black text-lg">NEET PG 2025</h3>
                <h4 className="text-3xl font-black">Pro</h4>
              </div>
              <div className="text-right">
                <div className="bg-college-dark text-white text-[9px] font-black px-2 py-1 rounded-md inline-block">All India & State Counsellings</div>
              </div>
            </div>
            <div className="text-left mb-6">
              <span className="text-gray-400 line-through text-sm">₹ 4499</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-black">₹ 499</span>
                <span className="text-gray-400 font-bold text-xs">+ GST</span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-1">Valid till Feb 28, 2026</p>
            </div>
            <button className="w-full bg-college-primary text-white py-3 rounded-lg font-black text-sm shadow-md shadow-college-primary/20 mb-6 hover:bg-college-dark transition-colors">Purchase now</button>
            <div className="border-t border-college-light/20 pt-4 text-left">
              <p className="text-[9px] text-college-dark font-black uppercase mb-3 tracking-wide">Key Features</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-college-light/20 flex items-center justify-center"><Phone size={12} className="text-college-primary" /></div>
                  <span>Priority Call & Email Support</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-college-light/20 flex items-center justify-center"><Play size={12} className="text-college-primary" /></div>
                  <span>Latest Updates through Events</span>
                </div>
              </div>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="bg-[#f2f5ff] rounded-2xl p-6 border-2 border-blue-200 relative hover:shadow-xl transition-shadow duration-300">
            <div className="bg-white text-blue-600 text-[9px] font-black px-3 py-1 rounded-full absolute top-4 left-1/2 -translate-x-1/2 border border-blue-100 shadow-sm">The Counselling Endgame Offer</div>
            <div className="mt-4 flex justify-between items-center text-left mb-6">
              <div>
                <h3 className="text-blue-600 font-black text-lg">NEET PG 2025</h3>
                <h4 className="text-3xl font-black">Standard</h4>
              </div>
              <div className="text-right">
                <div className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-md inline-block">All India Only</div>
              </div>
            </div>
            <div className="text-left mb-6">
              <span className="text-gray-400 line-through text-sm">₹ 4099</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-black">₹ 399</span>
                <span className="text-gray-400 font-bold text-xs">+ GST</span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-1">Valid till Feb 28, 2026</p>
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-black text-sm shadow-md shadow-blue-500/20 mb-6 hover:bg-blue-600 transition-colors">Purchase now</button>
            <div className="border-t border-blue-100 pt-4 text-left">
              <p className="text-[9px] text-blue-600 font-black uppercase mb-3 tracking-wide">Key Features</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"><Phone size={12} className="text-blue-500" /></div>
                  <span>Priority Call & Email Support</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"><Play size={12} className="text-blue-500" /></div>
                  <span>Latest Updates through Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Overview Section */}
      < section className="py-24 px-4 md:px-12 bg-gray-50" >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">NEET PG 2025 Overview</h2>
          <p className="text-gray-500 font-bold mb-16">Everything you need to know about NEET PG 2025 and how it impacts your medical career.</p>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row gap-12 items-center text-left">
            <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=400&auto=format&fit=crop" alt="Medical Student Success" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-800 mb-6 flex items-center">
                A brief explanation of the exam
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                NEET PG is the gateway for postgraduate medical courses like MD, MS, and PG Diploma in India. It's held annually and is essential for any MBBS graduate who wants to pursue a specialization in clinical or non-clinical fields.
              </p>
            </div>
          </div >
        </div >
      </section >

      {/* Videos Section */}
      <VideosSection containerClassName="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100 relative overflow-hidden" />

      {/* Footer (Minimal) */}
      <footer className="bg-gray-900 text-white py-8 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="CRZGenie" className="h-6 w-auto invert" />
            <span className="text-xl font-bold">CRZGenie</span>
          </div>
          <div className="flex space-x-6 text-xs font-bold text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
          <p className="text-gray-500 text-[10px] font-bold">© 2026 CRZ Academic Review Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
