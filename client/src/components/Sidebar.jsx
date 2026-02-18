import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo6.png';
import {
  LayoutDashboard,
  PlayCircle,
  Database,
  Wrench,
  Compass,
  FileText,
  ChevronDown,
  GitMerge,
  Award,
  Grid3x3,
  ReceiptIndianRupee,
  ChevronUp,
  Building2,
  Landmark,
  GraduationCap,
  Users,
  Share2,
  Search,
  TrendingUp
} from 'lucide-react';

const bouncy = { type: 'spring', stiffness: 500, damping: 15, mass: 0.8 };

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleSubmenu = (itemName) => {
    if (expandedItem === itemName) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemName);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, hasDropdown: false },
    { name: 'Videos', icon: PlayCircle, hasDropdown: false },
    {
      name: 'Insights',
      icon: Database,
      hasDropdown: true,
      subItems: [
        { name: 'Allotments', icon: GitMerge },
        { name: 'Closing Ranks', icon: Award },
        { name: 'Seat Matrix', icon: Grid3x3 },
        { name: 'Fee, Stipend and Bond', icon: ReceiptIndianRupee },
        { name: 'Seat Increase', icon: TrendingUp },
      ]
    },
    {
      name: 'Tools',
      icon: Wrench,
      hasDropdown: true,
      subItems: [
        { name: 'Allotment Mapping', icon: Share2 },
        { name: 'Rank Scan', icon: Search, highlight: true },
        { name: 'Seat Increase', icon: TrendingUp },
      ]
    },
    {
      name: 'Explore',
      icon: Compass,
      hasDropdown: true,
      subItems: [
        { name: 'Institutes', icon: Building2 },
        { name: 'Universities', icon: Landmark },
        { name: 'Counsellings', icon: Users },
        { name: 'Courses', icon: GraduationCap, highlight: true },
      ]
    },
    { name: 'Resources', icon: FileText, hasDropdown: false },
  ];

  return (
    <div className="w-20 md:w-24 bg-white h-screen flex flex-col items-center shadow-md border-r border-gray-200 fixed left-0 top-0 z-10">
      {/* Logo - Fixed */}
      <div className="py-6 shrink-0">
        <div className="w-12 h-12 flex items-center justify-center">
          <img src={logo} alt="CollegeReviewZ" className="w-full h-full object-contain drop-shadow-md" />
        </div>
      </div>

      {/* Menu Items - Scrollable */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col space-y-1 px-2 pb-6">
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={bouncy}
              className={`flex flex-col items-center cursor-pointer group relative ${activeItem === item.name ? 'text-college-primary' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => {
                setActiveItem(item.name);
                if (item.hasDropdown) toggleSubmenu(item.name);
                if (item.name === 'Dashboard') navigate('/');
              }}
            >
              <div className={`p-3 rounded-xl transition-all duration-300 ${activeItem === item.name ? 'bg-blue-50 shadow-md' : 'hover:bg-gray-50'}`}>
                <item.icon size={24} strokeWidth={activeItem === item.name ? 2.5 : 2} />
              </div>

              <div className="flex items-center mt-0">
                <span className={`text-xs font-medium ${activeItem === item.name ? 'font-bold' : ''}`}>
                  {item.name}
                </span>
                {item.hasDropdown && (
                  expandedItem === item.name ? <ChevronUp size={12} className="ml-0.5 mt-0.5" /> : <ChevronDown size={12} className="ml-0.5 mt-0.5" />
                )}
              </div>

              {/* Active Indicator Bar */}
              {activeItem === item.name && !expandedItem && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-college-primary rounded-r-full md:hidden"></div>
              )}
            </motion.div>

            {/* Sub-items */}
            {item.hasDropdown && expandedItem === item.name && item.subItems && (
              <div className="flex flex-col items-center w-full bg-gray-50 py-1 space-y-1 border-y border-gray-100 animate-in slide-in-from-top-2 duration-300">
                {item.subItems.map((subItem) => (
                  <motion.div
                    key={subItem.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={bouncy}
                    className="flex flex-col items-center cursor-pointer text-center px-1 group/sub"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (subItem.name === 'Seat Matrix') navigate('/seat-matrix');
                      if (subItem.name === 'Closing Ranks') navigate('/closing-ranks');
                      if (subItem.name === 'Allotments') navigate('/allotments');
                      if (subItem.name === 'Fee, Stipend and Bond') navigate('/fee-stipend-bond');
                      if (subItem.name === 'Seat Increase') navigate('/seat-increase');
                      if (subItem.name === 'Courses') navigate('/courses');
                      if (subItem.name === 'Counsellings') navigate('/counsellings');
                      if (subItem.name === 'Universities') navigate('/universities');
                      if (subItem.name === 'Institutes') navigate('/institutes');
                      // Add other navigations here
                    }}
                  >
                    <div className={`p-2 rounded-full transition-all ${subItem.highlight ? 'bg-transparent text-college-primary group-hover/sub:bg-college-primary group-hover/sub:text-white group-hover/sub:shadow-md' : 'text-gray-500 group-hover/sub:text-college-primary'}`}>
                      <subItem.icon size={20} strokeWidth={2} />
                    </div>
                    <span className={`text-[10px] font-medium mt-0 leading-tight ${subItem.highlight ? 'text-college-primary font-bold' : 'text-gray-500 group-hover/sub:text-college-primary'}`}>
                      {subItem.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
