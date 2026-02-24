import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    
    // Check main categories using prefix matching for sub-routes
    if (path === '/videos' || path.startsWith('/videos/')) return 'Videos';
    if (['/allotments', '/closing-ranks', '/seat-matrix', '/fee-stipend-bond', '/seat-increase'].some(p => path === p || path.startsWith(p + '/'))) return 'Insights';
    if (['/universities', '/institutes', '/counsellings', '/courses']. some(p => path === p || path.startsWith(p + '/'))) return 'Explore';
    if (path === '/resources' || path.startsWith('/resources/')) return 'Resources';
    
    return 'Dashboard';
  };

  const activeItem = getActiveItem();
 
  const toggleSubmenu = (itemName) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  // Close dropdown when navigating to a different top-level section
  useEffect(() => {
    if (expandedItem && activeItem !== expandedItem) {
      setExpandedItem(null);
    }
  }, [activeItem]);
 
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Videos', icon: PlayCircle, path: '/videos' },
    {
      name: 'Insights',
      icon: Database,
      hasDropdown: true,
      subItems: [
        { name: 'Allotments', icon: GitMerge, path: '/allotments' },
        { name: 'Closing Ranks', icon: Award, path: '/closing-ranks' },
        { name: 'Seat Matrix', icon: Grid3x3, path: '/seat-matrix' },
        { name: 'Fee, Stipend and Bond', icon: ReceiptIndianRupee, path: '/fee-stipend-bond' },
        { name: 'Seat Increase', icon: TrendingUp, path: '/seat-increase' },
      ]
    },
    {
      name: 'Explore',
      icon: Compass,
      hasDropdown: true,
      subItems: [
        { name: 'Institutes', icon: Building2, path: '/institutes' },
        { name: 'Universities', icon: Landmark, path: '/universities' },
        { name: 'Counsellings', icon: Users, path: '/counsellings' },
        { name: 'Courses', icon: GraduationCap, path: '/courses' },
      ]
    },
    { name: 'Resources', icon: FileText, path: '/resources' },
  ];

  return (
    <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-24 flex-col items-center z-50 bg-white/5 backdrop-blur-2xl shadow-xl border-r border-white/10 rounded-none">
      <div className="w-full h-full flex flex-col items-center py-6">
        {/* Logo Section */}
        <div 
          className="mb-6 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
        </div>

        {/* Navigation Section */}
        <div className="flex-1 w-full space-y-1 px-1 custom-scrollbar overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group flex flex-col items-center py-1">
              <motion.div
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (item.isSoon) return;
                  if (item.hasDropdown) toggleSubmenu(item.name);
                  else if (item.path) navigate(item.path);
                }}
                className={`relative z-10 p-2 rounded-2xl cursor-pointer transition-colors ${
                  activeItem === item.name && !item.hasDropdown
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : activeItem === item.name && item.hasDropdown
                      ? 'text-slate-300 bg-white/10' // Grey/Subtle state for parent when active
                    : item.isSoon
                      ? 'text-slate-700 cursor-not-allowed opacity-40'
                      : 'text-slate-500 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon size={22} strokeWidth={2.5} />
                {activeItem === item.name && !item.hasDropdown && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-500 rounded-full"
                  />
                )}
              </motion.div>

              <span className={`mt-0.5 text-[9px] font-black uppercase tracking-tight text-center px-1 transition-opacity ${
                activeItem === item.name ? 'opacity-80' : 'opacity-40'
              }`}>
                {item.name}
              </span>
              {item.isSoon && (
                <div className="absolute -top-1 -right-1 px-1 py-0.5 bg-blue-500 text-white text-[7px] font-black rounded-sm uppercase tracking-tighter shadow-sm z-20">Soon</div>
              )}

                {item.hasDropdown && expandedItem === item.name && (
                  <div className="w-full mt-2 grid grid-cols-1 gap-1">
                    {item.subItems.map((sub) => (
                      <div
                        key={sub.name}
                        onClick={(e) => { 
                          e.stopPropagation();
                          navigate(sub.path); 
                        }}
                        className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer transition-all duration-300 ${
                          location.pathname === sub.path || location.pathname.startsWith(sub.path + '/')
                            ? 'text-white bg-blue-600 shadow-lg shadow-blue-500/20' 
                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <sub.icon size={18} strokeWidth={2.5} />
                        <span className="text-[7px] font-black uppercase mt-0.5 text-center tracking-tighter leading-none opacity-80">
                          {sub.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
