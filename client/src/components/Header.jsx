import React from 'react';
import { Search, Bell, Menu, User, ChevronDown, Check, ChevronUp, Circle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('NEET PG');
  const dropdownRef = useRef(null);

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
      <div className="flex items-center space-x-4">
        <div className="relative" ref={dropdownRef}>
            <div 
                className="flex items-center bg-blue-50 text-college-primary px-3 py-1.5 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
            >
                <span className="font-semibold text-sm">{selectedCourse}</span>
                <ChevronDown size={16} className={`ml-1 transition-transform ${isCourseDropdownOpen ? 'rotate-180' : ''}`} />
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
        
        <div className="hidden md:flex items-center text-gray-500 hover:text-college-primary cursor-pointer transition-colors px-2 py-1 rounded-md hover:bg-gray-50">
            <svg className="w-4 h-4 mr-1.5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path></svg>
            <span className="text-sm font-medium">My Choice Lists</span>
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

        <a href="#" className="hidden lg:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Refer & Earn</a>
        
        <a href="#" className="hidden lg:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Packages</a>

        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors text-gray-600 relative">
            <Menu size={18} />
        </div>

        <div className="h-9 w-9 bg-college-dark rounded-full flex items-center justify-center text-white font-semibold shadow-md cursor-pointer hover:bg-opacity-90 transition-colors ring-2 ring-blue-100">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
