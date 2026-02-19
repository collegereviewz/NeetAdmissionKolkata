import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, User, ChevronDown, Check, ChevronUp, Circle, Package, MessageSquare, LogOut, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onOpenChoiceList, onLogout }) => {
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('NEET PG');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const courseCategories = [
    {
      title: 'Under Graduation - Medicine',
      courses: ['NEET UG']
    },
    {
      title: 'Post Graduation - Medicine',
      courses: ['NEET PG', 'INICET', 'NEET MDS', 'DNB PDCET']
    },
    {
      title: 'Super Speciality - Medicine',
      courses: ['NEET SS']
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCourseDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white px-6 py-3 flex items-center justify-between shadow-sm border-b border-gray-100 sticky top-0 z-20">
      {/* Left Section: Breadcrumbs / Actions */}
      <div className="flex items-center space-x-3">
        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
            <div 
                className="flex items-center bg-[#E5F7FF] text-[#002D62] px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#D6F0FF] transition-colors border border-transparent"
                onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
            >
                <svg className="w-4 h-4 mr-1.5 text-[#0096FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                <span className="font-bold text-xs tracking-wide">{selectedCourse}</span>
                <ChevronDown size={14} className={`ml-1.5 text-[#0096FF] transition-transform ${isCourseDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
            </div>

            {/* Course Dropdown */}
            {isCourseDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-[80vh] overflow-y-auto no-scrollbar p-2">
                    {courseCategories.map((category, idx) => (
                        <div key={idx} className="mb-2 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                             <div className="px-4 py-2 flex justify-between items-center bg-gray-100/50">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{category.title}</span>
                                <ChevronUp size={14} className="text-gray-400" />
                             </div>
                             <div className="p-2 space-y-1 bg-white">
                                {category.courses.map((course) => (
                                    <div 
                                        key={course}
                                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${selectedCourse === course ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                        onClick={() => {
                                            setSelectedCourse(course);
                                            setIsCourseDropdownOpen(false);
                                        }}
                                    >
                                        <span className={`font-bold text-sm ${selectedCourse === course ? 'text-college-primary' : 'text-gray-800'}`}>
                                            {course}
                                        </span>
                                        {selectedCourse === course ? (
                                            <div className="w-5 h-5 rounded-full bg-college-primary flex items-center justify-center">
                                                <Check size={12} className="text-white bg-college-primary" strokeWidth={3} />
                                            </div>
                                        ) : (
                                            <Circle size={20} className="text-gray-200 fill-transparent" />
                                        )}
                                    </div>
                                ))}
                             </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
        {/* My Choice Lists */}
        <div 
            onClick={onOpenChoiceList}
            className="flex items-center bg-[#FFF1F2] text-[#FF3E55] px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#FFD1D6] transition-colors border border-transparent"
        >
            <svg className="w-4 h-4 mr-1.5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span className="font-bold text-xs tracking-wide">My Choice Lists</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-2xl mx-6 hidden md:block group">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-hover:text-college-primary transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl leading-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 sm:text-sm transition-all shadow-sm group-hover:shadow-md"
            placeholder="Search for colleges, exams, updates..."
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
             <div className="border-l border-gray-300 h-6 mx-2"></div>
             <span className="text-gray-500 text-sm cursor-pointer hover:text-gray-800">All</span>
             <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Right Section: Profile & Actions */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <button className="hidden lg:flex items-center px-4 py-1.5 bg-white text-blue-600 rounded-full text-base font-semibold hover:bg-gray-50 transition-colors border border-blue-600 shadow-sm relative group">
          <span className="relative z-10 flex items-center">
            <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
            CRZTales
          </span>
          <div className="absolute -top-3 -right-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full border border-white shadow-sm">New</div>
        </button>

        <a href="#" className="hidden lg:block text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">Blogs & News</a>

        <a href="#" className="hidden lg:block text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">Refer & Earn</a>
        
        <a href="#" className="hidden lg:block text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">Packages</a>

        <div className="relative" ref={profileDropdownRef}>
          <div 
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="h-9 w-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:bg-opacity-90 transition-colors ring-2 ring-purple-100"
          >
            A
          </div>

          {/* Profile Dropdown Menu */}
          {isProfileDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <button className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                <User size={18} className="mr-3" />
                Profile
              </button>
              <button className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                <Package size={18} className="mr-3" />
                My Packages
              </button>
              <button className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                <MessageSquare size={18} className="mr-3" />
                Feedback
              </button>
              <div className="h-px bg-gray-100 my-1 mx-4"></div>
              <button 
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  setIsLogoutModalOpen(true);
                }}
                className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-50 mb-6">
                  <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-2">Confirm Logout</h3>
                <p className="text-gray-500 font-bold mb-8">
                  Are you sure you want to sign out of your account?
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsLogoutModalOpen(false)}
                    className="w-full py-4 text-base font-black text-gray-600 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setIsLogoutModalOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-4 text-base font-black text-white bg-red-500 rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
