import React, { useState } from 'react';
import { ChevronDown, Phone, Smartphone, Menu, X, MapPin, BarChart3, Package, Newspaper, Info, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo6.png';

const PublicHeader = ({ onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu Animation Variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm px-4 md:px-8 py-2.5 shadow-sm border-b border-gray-100 fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer space-x-2">
            <img src={logo} alt="CRZGenie Logo" className="h-8 w-auto" />
            <span className="text-2xl font-black tracking-tight">
              <span className="text-college-dark">CRZ</span>
              <span className="text-college-gold">Genie</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-8">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">

            <div className="flex items-center space-x-0.5 text-sm font-bold text-gray-600 hover:text-college-primary cursor-pointer group transition-colors">
              <span>Counsellings</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </div>

            <div className="flex items-center space-x-0.5 text-sm font-bold text-gray-600 hover:text-college-primary cursor-pointer group transition-colors">
              <span>Explore</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </div>

            <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm font-bold text-gray-600 hover:text-college-primary transition-colors">Videos</a>
            <a href="#" className="text-sm font-bold text-gray-600 hover:text-college-primary transition-colors">Packages</a>
            <a href="#" className="text-sm font-bold text-gray-600 hover:text-college-primary transition-colors">Blogs & News</a>

            <div className="flex items-center space-x-0.5 text-sm font-bold text-gray-600 hover:text-college-primary cursor-pointer group transition-colors">
              <span>About</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </div>
          </nav>

          {/* Contact Info */}
          <div className="hidden xl:flex items-center space-x-2 text-right">
            <div className="bg-gray-50 p-2 rounded-full text-gray-600 hover:bg-college-light/20 hover:text-college-primary transition-colors cursor-pointer">
              <Phone size={16} />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium">Talk to our experts</p>
              <p className="text-sm font-black text-gray-800 hover:text-college-primary transition-colors cursor-pointer">+91 97179 87058</p>
            </div>
          </div>

          {/* App Button (Desktop) */}
          <button className="hidden lg:flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
            <Smartphone size={15} />
            <span>App</span>
          </button>

          <button
            onClick={onLogin}
            className="bg-college-primary text-white px-6 py-2 rounded-full text-sm font-black hover:bg-college-dark transition-all shadow-lg shadow-college-primary/20 hover:shadow-college-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            Login
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-college-primary transition-colors rounded-lg hover:bg-gray-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Advanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-2xl lg:hidden max-h-[90vh] overflow-y-auto flex flex-col"
          >
            <div className="p-6 space-y-6">
              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm text-college-primary group-hover:text-blue-600">
                      <MapPin size={20} />
                    </div>
                    <span className="text-lg font-bold text-gray-800 group-hover:text-college-dark">Counsellings</span>
                  </div>
                  <ChevronDown size={18} className="text-gray-400 group-hover:text-college-primary" />
                </div>

                <div
                  onClick={() => {
                    document.getElementById('videos-section')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm text-college-primary group-hover:text-blue-600">
                      <PlayCircle size={20} />
                    </div>
                    <span className="text-lg font-bold text-gray-800 group-hover:text-college-dark">Videos</span>
                  </div>
                  <ChevronDown size={18} className="text-gray-400 group-hover:text-college-primary" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm text-orange-500 group-hover:text-orange-600">
                      <BarChart3 size={20} />
                    </div>
                    <span className="text-lg font-bold text-gray-800 group-hover:text-college-dark">Explore</span>
                  </div>
                  <ChevronDown size={18} className="text-gray-400 group-hover:text-college-primary" />
                </div>

                <a href="#" className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600 group-hover:bg-white group-hover:shadow-sm group-hover:text-purple-600 transition-all">
                    <Package size={20} />
                  </div>
                  <span className="text-lg font-bold text-gray-700 group-hover:text-gray-900">Packages</span>
                </a>

                <a href="#" className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600 group-hover:bg-white group-hover:shadow-sm group-hover:text-green-600 transition-all">
                    <Newspaper size={20} />
                  </div>
                  <span className="text-lg font-bold text-gray-700 group-hover:text-gray-900">Blogs &amp; News</span>
                </a>

                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600 group-hover:bg-white group-hover:shadow-sm group-hover:text-blue-500 transition-all">
                      <Info size={20} />
                    </div>
                    <span className="text-lg font-bold text-gray-700 group-hover:text-gray-900">About</span>
                  </div>
                  <ChevronDown size={18} className="text-gray-400 group-hover:text-college-primary" />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                {/* Highlighted Mobile App CTA */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 text-white flex items-center justify-between shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                      <Smartphone size={24} className="text-college-gold" />
                    </div>
                    <div>
                      <p className="font-black text-lg">Get the App</p>
                      <p className="text-xs text-gray-400 font-medium">Experience full features on mobile</p>
                    </div>
                  </div>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                    Download
                  </button>
                </div>

                {/* Contact */}
                <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-full text-college-primary shadow-sm">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">Support</p>
                      <p className="text-base font-black text-college-dark">+91 97179 87058</p>
                    </div>
                  </div>
                  <button className="text-sm font-bold text-college-primary hover:underline">
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default PublicHeader;
