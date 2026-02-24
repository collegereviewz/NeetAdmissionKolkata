import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo6.png';
import {
  Search,
  Bell,
  Menu,
  User,
  ChevronDown,
  Check,
  ChevronUp,
  Circle,
  Package,
  MessageSquare,
  LogOut,
  X,
  AlertTriangle,
  Star,
  Settings,
  CircleUserRound
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onOpenChoiceList, onLogout, onOpenMobileMenu, selectedCourse, setSelectedCourse, user }) => {
  const navigate = useNavigate();
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const courseCategories = [
    {
      title: 'Under Graduation - Medicine',
      courses: ['NEET UG'],
      field: 'Medicine',
      level: 'UG'
    },
    {
      title: 'Post Graduation - Medicine',
      courses: ['NEET PG', 'INICET', 'NEET MDS', 'DNB PDCET'],
      field: 'Medicine',
      level: 'PG'
    },
    {
      title: 'Super Speciality - Medicine',
      courses: ['NEET SS'],
      field: 'Medicine',
      level: 'SS'
    },
    {
      title: 'Under Graduation - Engineering',
      courses: ['JEE Mains', 'JEE Advanced'],
      field: 'Engineering',
      level: 'UG'
    }
  ];

  const handleCourseSelect = (course, field, level) => {
    setSelectedCourse({ name: course, field, level });
    setIsCourseDropdownOpen(false);
  };

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
    <>
      <header className="header-gradient mx-4 md:mx-6 mb-4 md:mb-4 mt-4 md:mt-3 rounded-3xl px-4 md:px-8 py-3 md:py-2 flex items-center sticky top-4 md:top-3 z-40 gap-2 md:gap-4 lg:gap-6">
        {/* 1. Mobile Logo */}
        <img
          src={logo}
          alt="Logo"
          className="md:hidden w-8 h-8 object-contain cursor-pointer flex-shrink-0"
          onClick={() => navigate('/')}
        />

        {/* 2. Course Selector (NEET PG) */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center bg-blue-500/10 text-blue-400 px-3 md:px-4 py-2 rounded-2xl cursor-pointer hover:bg-blue-500/20 transition-all border border-blue-500/20 whitespace-nowrap"
            onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
          >
            <svg className="w-4 h-4 mr-1.5 text-[#0096FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            <span className="font-black text-[10px] md:text-xs tracking-wider uppercase">{selectedCourse?.name || selectedCourse}</span>
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
                    {category.courses.map((course) => {
                      const isSelected = (selectedCourse?.name || selectedCourse) === course;
                      return (
                        <button
                          key={course}
                          onClick={() => {
                            handleCourseSelect(course, category.field, category.level);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between group ${isSelected
                            ? 'bg-blue-50 text-college-primary font-bold'
                            : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                          <div className="flex items-center">
                            <div className="flex flex-col">
                              <span className={`font-bold text-sm ${isSelected ? 'text-college-primary' : 'text-gray-800'}`}>
                                {course}
                              </span>
                            </div>
                          </div>
                          {isSelected ? (
                            <div className="bg-blue-100 text-college-primary p-1 rounded-full">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          ) : (
                            <Circle
                              size={8}
                              className={`mr-3 transition-all ${isSelected
                                ? 'fill-college-primary text-college-primary scale-125'
                                : 'text-gray-300 group-hover:text-gray-400'
                                }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. My Choice Lists */}
        <div
          onClick={onOpenChoiceList}
          className="flex items-center bg-[#FFF1F2] text-[#FF3E55] px-2 md:px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#FFD1D6] transition-colors border border-transparent whitespace-nowrap shrink-0"
        >
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-1.5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          <span className="font-bold text-[10px] md:text-xs tracking-wide">
            <span className="md:inline hidden">My Choice Lists</span>
            <span className="md:hidden">My Choice</span>

          </span>
        </div>

        {/* 4. Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs xl:max-w-md relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 rounded-2xl py-2 pl-10 pr-4 text-xs font-medium transition-all outline-none text-white placeholder:text-slate-500"
          />
        </div>

        {/* 5. CRZTales */}
        <button className="hidden lg:flex items-center px-4 py-1.5 bg-white text-blue-600 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors border border-blue-600 shadow-sm relative shrink-0">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
            CRZTales
          </span>
          <div className="absolute -top-2 -right-1 px-1.5 py-0.5 bg-blue-600 text-white text-[8px] font-black rounded-full border border-white shadow-sm">New</div>
        </button>


        {/* 6. Promotional Links */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <div className="relative group opacity-60 cursor-not-allowed">
            <span className="text-[10px] font-bold text-gray-900">Blogs & News</span>
            <div className="absolute -top-3 -right-2 px-1 py-0.5 bg-blue-100 text-blue-600 text-[6px] font-black rounded uppercase tracking-tighter border border-blue-200">Soon</div>
          </div>

          <div className="relative group opacity-60 cursor-not-allowed">
            <span className="text-[10px] font-bold text-gray-900">Refer & Earn</span>
            <div className="absolute -top-3 -right-2 px-1 py-0.5 bg-blue-100 text-blue-600 text-[6px] font-black rounded uppercase tracking-tighter border border-blue-200">Soon</div>
          </div>

          <div className="relative group opacity-60 cursor-not-allowed">
            <span className="text-[10px] font-bold text-gray-900">Packages</span>
            <div className="absolute -top-3 -right-2 px-1 py-0.5 bg-blue-100 text-blue-600 text-[6px] font-black rounded uppercase tracking-tighter border border-blue-200">Soon</div>
          </div>
        </div>

        {/* 7. Profile Section */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto shrink-0">
          <div className="relative" ref={profileDropdownRef}>
            <div
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="h-8 w-8 md:h-9 md:w-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:bg-opacity-90 transition-colors ring-2 ring-purple-100"
            >
              {(user?.fullName || user?.username || 'A').charAt(0).toUpperCase()}
            </div>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-5 py-3 mb-1 border-b border-gray-50">
                  <p className="text-sm font-black text-gray-900 truncate">Welcome, {user?.fullName?.split(' ')[0] || user?.username}</p>
                </div>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={18} className="mr-3" />
                  Profile Details
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

          {/* 8. Mobile Menu Toggle */}
          <div
            className="md:hidden p-1.5 hover:bg-white/10 rounded-xl cursor-pointer text-slate-400"
            onClick={onOpenMobileMenu}
          >
            <Menu size={20} />
          </div>
        </div>

      </header>

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
    </>
  );
};

export default Header;
