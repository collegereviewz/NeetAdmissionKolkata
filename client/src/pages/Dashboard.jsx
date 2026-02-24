import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, MessageCircle, Send, Phone, Mail, FileDown,
  AlertTriangle, Pin, Home, Plus, X, Search,
  ExternalLink, Calendar, Globe, Users, FileText,
  BookOpen, Bell, LayoutGrid, BarChart3, Grid3X3,
  Receipt, Heart, ChevronRight, ChevronLeft, CheckCircle2, Clock, Circle,
  PlayCircle, RefreshCw, UserPlus, MapPin, List, Info, PlusCircle, MoreHorizontal,
  GitMerge, Award, TrendingUp, Building2, Landmark, GraduationCap
} from 'lucide-react';
import logo from '../assets/logo6.png';
import { counselingOptions } from '../data/counselingData';
import { featureCardsMap, quotasMap, defaultQuotas } from '../data/featureData.jsx';
import { counsellingWebsites, registrationLinks, prospectusLinks } from '../data/counselingWebsites';
import { roadmapDataMap, defaultRoadmap } from '../data/roadmapData';
import VideosSection from '../components/VideosSection';


// Sophisticated & Fluid Transitions (Reduced jitter)
const fluidSpring = { type: 'spring', stiffness: 300, damping: 30, mass: 1 };
const smoothSpring = { type: 'spring', stiffness: 200, damping: 25, mass: 1 };
const bouncy = fluidSpring;
const gentleBounce = smoothSpring;

// Stagger children container
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 }
  }
};
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: smoothSpring }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: bouncy }
};

const Dashboard = ({ isPinModalOpen, setIsPinModalOpen, pinnedItems, togglePin, selectedCourse, user }) => {
  const navigate = useNavigate();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [activeSubTab, setActiveSubTab] = useState('Website');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [collegeUpdates, setCollegeUpdates] = useState([]); // Global updates
  const [announcements, setAnnouncements] = useState([]); // Specific counselling updates
  const [isLoadingUpdates, setIsLoadingUpdates] = useState(true);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [selectedQuota, setSelectedQuota] = useState('AIQ');
  const scrollRef = useRef(null);

  const quotas = quotasMap[selectedCourse?.field] || quotasMap['Medicine'];

  const fetchUpdates = async () => {
    setIsLoadingUpdates(true);
    try {
      const { name, field, level } = selectedCourse;
      const response = await fetch(`http://localhost:5000/api/v1/updates?field=${field}&level=${level}`);
      const data = await response.json();
      if (data.success) {
        setCollegeUpdates(data.data);
      }
    } catch (error) {
      console.error("Error fetching updates:", error);
    } finally {
      setIsLoadingUpdates(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, [selectedCourse]);

  useEffect(() => {
    if (activeTab !== 'home') {
      // Auto-redirect for Registration and Prospectus
      if (activeSubTab === 'Registration' && registrationLinks[activeTab]) {
        window.open(registrationLinks[activeTab], '_blank', 'noopener,noreferrer');
        setActiveSubTab('Website'); // Reset to website or stay on registration but show minimal
        return;
      }
      if (activeSubTab === 'Prospectus' && prospectusLinks[activeTab]) {
        window.open(prospectusLinks[activeTab], '_blank', 'noopener,noreferrer');
        setActiveSubTab('Website');
        return;
      }

      const fetchAnnouncements = async () => {
        setIsLoadingAnnouncements(true);
        try {
          // Map local sub-tab labels to backend subCategory names
          const subCategoryMap = {
            'Announcements & Events': 'Announcements & Events',
            'Quotas': 'Quotas',
            'Registration': 'Registration',
            'Prospectus': 'Prospectus'
          };

          const subCategory = subCategoryMap[activeSubTab] || 'Announcements & Events';
          let url = `http://localhost:5000/api/v1/updates?type=${encodeURIComponent(activeTab)}&subCategory=${encodeURIComponent(subCategory)}`;

          if (activeSubTab === 'Quotas' && selectedQuota !== 'ALL') {
            url += `&quotaType=${encodeURIComponent(selectedQuota)}`;
          }

          const response = await fetch(url);
          const data = await response.json();
          if (data.success) {
            setAnnouncements(data.data);
          }
        } catch (error) {
          console.error(`Error fetching data for ${activeTab}/${activeSubTab}:`, error);
        } finally {
          setIsLoadingAnnouncements(false);
        }
      };
      fetchAnnouncements();
    }
  }, [activeTab, activeSubTab, selectedQuota]);

  const openUpdateLink = (link) => {
    if (link) window.open(link, '_blank', 'noopener,noreferrer');
  };

  const roadmapData = roadmapDataMap[selectedCourse?.name] || defaultRoadmap;

  useEffect(() => {
    // Reset selected round when course changes
    const rounds = Object.keys(roadmapData);
    if (rounds.length > 0) {
      setSelectedRound(rounds[0]);
    }

    // Reset selected quota when course changes
    const currentQuotas = quotasMap[selectedCourse?.field] || quotasMap['Medicine'];
    if (currentQuotas.length > 0) {
      setSelectedQuota(currentQuotas[0]);
    }
  }, [selectedCourse]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      checkScroll();
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, [pinnedItems]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      if (pinnedItems.includes(itemToDelete)) {
        togglePin(itemToDelete);
      }
      setItemToDelete(null);
    }
  };


  return (
    <div className="min-h-screen p-4 lg:p-4 space-y-2 relative overflow-x-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      {/* Educational Professional Grid (Graph Paper Style) - STATIC (Immediate visibility) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Secondary Fine Grid - STATIC */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.015) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.015) 1px, transparent 1px)
        `,
        backgroundSize: '10px 10px'
      }}></div>

      {/* Content Animation (Only the UI elements fade in) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-0 lg:space-y-2 space-y-4"
      >
        {/* Quick Navigation Tabs */}
        <div className="relative group/nav lg:mb-2 mb-6">
          {/* Scroll Buttons */}
          {showLeftArrow && (
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#f0f7ff' }}
              whileTap={{ scale: 0.9 }}
              transition={bouncy}
              onClick={() => scroll('left')}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-400 hover:text-college-primary hover:border-blue-100 transition-all opacity-0 group-hover/nav:opacity-100 hidden md:flex cursor-pointer"
            >
              <ChevronLeft size={16} />
            </motion.button>
          )}

          <motion.div
            ref={scrollRef}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex overflow-x-auto space-x-4 py-3 md:py-4 lg:py-2 scrollbar-hide scroll-smooth no-scrollbar"
          >
            <style dangerouslySetInnerHTML={{
              __html: `

            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />
            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('home')}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm border whitespace-nowrap transition-all cursor-pointer ${activeTab === 'home'
                ? 'bg-white text-college-primary border-blue-100'
                : 'bg-white text-gray-500 border-gray-200 hover:text-college-primary hover:border-blue-100 shadow-none hover:shadow-sm'
                }`}
            >
              <Home size={14} className="mr-1.5" />
              Home
            </motion.button>

            {pinnedItems.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group flex items-center px-4 py-2 border rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${activeTab === item
                  ? 'bg-college-primary text-white border-college-primary shadow-md'
                  : 'bg-white border-gray-200 text-gray-600 hover:shadow-sm hover:border-blue-200 hover:bg-blue-50'
                  }`}
                onClick={() => { setActiveTab(item); setActiveSubTab('Website'); }}
              >
                {/* Icon/Button Section: Shows Pin by default, Switches to Buttons on Hover */}
                <div className="flex items-center h-4 transition-all duration-200">
                  {/* Pin Icon (Shows when NOT hovering) */}
                  <div className="flex group-hover:hidden items-center mr-2">
                    <Pin
                      size={14}
                      className={`${activeTab === item ? 'fill-white' : 'fill-gray-600'}`}
                    />
                  </div>

                  {/* Action Buttons (Shows only ON hover) */}
                  <div className="hidden group-hover:flex items-center space-x-2 mr-2">
                    {/* Website Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const url = counsellingWebsites[item] || `https://www.google.com/search?q=${encodeURIComponent(item + ' official website')}`;
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }}
                      className={`w-4 h-4 flex items-center justify-center rounded-full transition-colors cursor-pointer ${activeTab === item ? 'bg-white/20 text-white hover:bg-white/40' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                        }`}
                      title="Official Website"
                    >
                      <Globe size={10} />
                    </button>

                    {/* Delete Toggle - Hidden on Active Tab */}
                    {activeTab !== item && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setItemToDelete(item);
                        }}
                        className="w-4 h-4 flex items-center justify-center bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-500 rounded-full transition-colors cursor-pointer"
                        title="Unpin"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </div>

                <span className={activeTab === item ? 'text-white' : 'group-hover:text-college-primary transition-colors'}>{item}</span>
              </motion.div>
            ))}

            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-500 flex-shrink-0"
              onClick={() => setIsPinModalOpen(true)}
            >
              <Plus size={16} />
            </motion.button>
          </motion.div>

          {showRightArrow && (
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#f0f7ff' }}
              whileTap={{ scale: 0.9 }}
              transition={bouncy}
              onClick={() => scroll('right')}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-400 hover:text-college-primary hover:border-blue-100 transition-all opacity-0 group-hover/nav:opacity-100 hidden md:flex cursor-pointer"
            >
              <ChevronRight size={16} />
            </motion.button>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {itemToDelete && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={bouncy}
              className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Are you sure to delete?</h3>
                <p className="text-sm text-gray-500 mb-6">This action will unpin <span className="font-semibold text-gray-800">"{itemToDelete}"</span> from your dashboard.</p>

                <div className="flex gap-3 w-full">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setItemToDelete(null)}
                    className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors cursor-pointer"
                  >
                    No
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmDelete}
                    className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-red-500/20 cursor-pointer"
                  >
                    Yes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}



        {/* Animate View Transitions */}
        <AnimatePresence mode="wait">
          {/* ===== COUNSELLING DETAIL VIEW ===== */}
          {activeTab !== 'home' && (
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {/* Header Section */}
              <motion.div variants={fadeUp} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-college-dark">{activeTab}</h2>
                  <div className="bg-college-primary text-white p-1.5 rounded-full">
                    <FileDown size={16} />
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium tracking-wider">
                  {selectedCourse?.field === 'Engineering' ? 'CENTRAL • JOINT ENTRANCE' : 'CENTRAL • ALL INDIA'}
                </p>

                {/* Sub Navigation Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                  {[
                    { label: 'Website', icon: <Globe size={14} /> },
                    { label: 'Quotas', icon: <Users size={14} /> },
                    { label: 'Registration', icon: <FileText size={14} /> },
                    { label: 'Prospectus', icon: <BookOpen size={14} /> },
                    { label: 'Announcements & Events', icon: <Bell size={14} /> },
                  ].map((tab) => (
                    <motion.button
                      key={tab.label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={bouncy}
                      onClick={() => {
                        if (tab.label === 'Website') {
                          const url = counsellingWebsites[activeTab] || `https://www.google.com/search?q=${encodeURIComponent(activeTab + ' official website')}`;
                          window.open(url, '_blank', 'noopener,noreferrer');
                        } else {
                          setActiveSubTab(tab.label);
                        }
                      }}
                      className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${activeSubTab === tab.label
                        ? 'bg-college-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      <span className="mr-1.5">{tab.icon}</span>
                      {tab.label}
                      {tab.label === 'Announcements & Events' && (
                        <ChevronRight size={14} className="ml-1" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Sub-tab Content Switcher */}
              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {activeSubTab === 'Website' && (
                    <motion.div
                      key="website-view"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5, transition: { duration: 0.2 } }}
                    >
                      {/* Feature Cards Grid (Default view for Website tab) */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {(featureCardsMap[selectedCourse?.field] || featureCardsMap['Medicine']).map((card) => (
                          <motion.div
                            key={card.title}
                            variants={scaleIn}
                            whileHover={{ scale: 1.04, transition: bouncy }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => card.path && navigate(card.path)}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer group"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center transition-colors"
                              >
                                {card.icon}
                              </motion.div>
                              <ChevronRight size={16} className="text-gray-300 group-hover:text-college-primary transition-colors" />
                            </div>
                            <h4 className="font-bold text-gray-800 text-sm mb-1">{card.title}</h4>
                            <p className="text-xs text-college-primary font-medium">{card.years}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeSubTab !== 'Website' && (
                    <motion.div
                      key="announcements-view"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5, transition: { duration: 0.2 } }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                          <Bell className="mr-2 text-college-primary" size={20} />
                          {activeSubTab}
                        </h3>
                        {activeSubTab !== 'Quotas' && (
                          <button
                            onClick={async () => {
                              setIsLoadingAnnouncements(true);
                              try {
                                await fetch(`http://localhost:5000/api/v1/updates/sync?type=${encodeURIComponent(activeTab)}`, { method: 'POST' });
                                // Refetch logic is handled by dependency on announcements or manual trigger
                                // but easiest is to just call the fetchAnnouncements logic again
                                const subCategoryMap = {
                                  'Announcements & Events': 'Announcements & Events',
                                  'Quotas': 'Quotas',
                                  'Registration': 'Registration',
                                  'Prospectus': 'Prospectus'
                                };
                                const subCategory = subCategoryMap[activeSubTab] || 'Announcements & Events';
                                let url = `http://localhost:5000/api/v1/updates?type=${encodeURIComponent(activeTab)}&subCategory=${encodeURIComponent(subCategory)}`;
                                if (activeSubTab === 'Quotas') url += `&quotaType=${encodeURIComponent(selectedQuota)}`;
                                const response = await fetch(url);
                                const data = await response.json();
                                if (data.success) setAnnouncements(data.data);
                              } catch (e) {
                                console.error("Sync failed:", e);
                              } finally {
                                setIsLoadingAnnouncements(false);
                              }
                            }}
                            className="text-xs font-semibold text-college-primary hover:underline flex items-center"
                          >
                            <RefreshCw size={12} className={`mr-1 ${isLoadingAnnouncements ? 'animate-spin' : ''}`} />
                            Refresh Data
                          </button>
                        )}
                      </div>

                      {/* Quota Filter Chips */}
                      {activeSubTab === 'Quotas' && activeTab === 'All India Counseling - PG Medical' && (
                        <div className="flex overflow-x-auto space-x-2 pb-6 no-scrollbar">
                          {quotas.map((quota) => (
                            <motion.button
                              key={quota}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedQuota(quota)}
                              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${selectedQuota === quota
                                ? 'bg-college-primary text-white border-college-primary shadow-sm'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200 hover:text-college-primary'
                                }`}
                            >
                              {quota}
                            </motion.button>
                          ))}
                        </div>
                      )}

                      {/* Registration / Prospectus Redirect UI (Safe fallback) */}
                      {(activeSubTab === 'Registration' || activeSubTab === 'Prospectus') && (
                        <div className="py-20 text-center bg-blue-50/30 rounded-3xl border border-blue-100/50">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                            <RefreshCw size={32} className="text-college-primary animate-spin" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">Redirecting to Official Portal...</h4>
                          <p className="text-gray-500 mb-8 max-w-sm mx-auto">We are taking you directly to the {activeSubTab.toLowerCase()} page for {activeTab}.</p>
                          <button
                            onClick={() => {
                              const link = activeSubTab === 'Registration' ? registrationLinks[activeTab] : prospectusLinks[activeTab];
                              if (link) window.open(link, '_blank', 'noopener,noreferrer');
                            }}
                            className="px-8 py-3 bg-college-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center mx-auto"
                          >
                            Click here if not redirected
                            <ExternalLink size={18} className="ml-2" />
                          </button>
                        </div>
                      )}

                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar text-left">
                        {isLoadingAnnouncements ? (
                          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <div className="w-10 h-10 border-4 border-blue-50 border-t-college-primary rounded-full animate-spin mb-4"></div>
                            <p className="text-sm">Fetching real-time updates for {activeTab}...</p>
                          </div>
                        ) : (activeSubTab !== 'Registration' && activeSubTab !== 'Prospectus' && announcements.length > 0) ? (
                          announcements.map((item, idx) => (
                            <motion.div
                              key={item._id || idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              onClick={() => openUpdateLink(item.link)}
                              className="group p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer relative"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded uppercase tracking-wider">
                                      {item.date}
                                    </span>
                                    {item.type === 'alert' && (
                                      <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded uppercase tracking-wider">
                                        URGENT
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="font-bold text-gray-900 group-hover:text-college-primary transition-colors">
                                    {item.title}
                                  </h4>
                                </div>
                                <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 group-hover:text-college-primary transition-all ml-4 flex-shrink-0" />
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          activeSubTab !== 'Quotas' && activeSubTab !== 'Registration' && activeSubTab !== 'Prospectus' && (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                              <Bell size={40} className="mx-auto text-gray-300 mb-4 opacity-50" />
                              <p className="text-gray-500 font-medium">No recent {activeSubTab.toLowerCase()} found for {activeTab}.</p>
                              <p className="text-xs text-gray-400 mt-1">Updates will appear here as soon as they are released officialy.</p>
                            </div>
                          )
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveSubTab('Website')}
                        className="mt-8 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-sm font-bold transition-all"
                      >
                        Back to Dashboard
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Counselling Roadmap & Choice Lists */}
              <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Counselling Roadmap */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Calendar size={18} className="text-college-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Counselling Roadmap</h3>
                        <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">Academic Journey Tracker</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 border border-gray-200 rounded-full px-3 py-1">SESSION 2025-26</span>
                  </div>

                  {/* Roadmap Visual - Serpentine Design */}
                  <div className="relative px-2 py-6 h-[200px] flex items-center justify-center">
                    {/* SVG Winding Road - Starts at R1, Ends at SV */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      <path
                        d="M 40 85 C 90 85, 90 155, 146 155 C 200 155, 200 85, 253 85 C 310 85, 310 120, 360 120"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-sm opacity-20"
                      />
                      <path
                        d="M 40 85 C 90 85, 90 155, 146 155 C 200 155, 200 85, 253 85 C 310 85, 310 120, 360 120"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="8 8"
                      />
                    </svg>

                    {[
                      { num: '1', label: 'ROUND 1', milestones: '19 MILESTONES', color: '#ff3b9a', x: '10%', y: '85px' },
                      { num: '2', label: 'ROUND 2', milestones: '14 MILESTONES', color: '#00c9a7', x: '36.5%', y: '155px' },
                      { num: '3', label: 'ROUND 3', milestones: '12 MILESTONES', color: '#845ef7', x: '63.2%', y: '85px' },
                      { num: 'SV', label: 'STRAY ROUND', milestones: '9 MILESTONES', color: '#ff962d', x: '90%', y: '120px' },
                    ].map((round, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ ...bouncy, delay: 0.3 + i * 0.12 }}
                        whileHover={{ scale: 1.05, cursor: 'pointer' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedRound(round.label);
                          setShowRoadmapModal(true);
                        }}
                        className="absolute flex flex-col items-center group z-10 translate-x-[-50%] translate-y-[-50%]"
                        style={{
                          left: round.x,
                          top: round.y,
                          marginTop: round.y === '85px' ? '-38px' : '38px'
                        }}
                      >
                        {/* Teardrop Pin Shape */}
                        <div className="relative flex flex-col items-center">
                          {round.y === '85px' ? (
                            <>
                              <div className="mb-2 text-center">
                                <h4
                                  style={{ color: round.color }}
                                  className="text-[10px] font-black leading-tight uppercase tracking-tighter"
                                >
                                  {round.label}
                                </h4>
                                <p className="text-[9px] text-gray-400 font-bold whitespace-nowrap">{round.milestones}</p>
                              </div>
                              <div className="relative z-10 flex flex-col items-center">
                                <div
                                  style={{ backgroundColor: round.color }}
                                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg border-2 border-white ring-4 ring-white/20 transition-transform group-hover:scale-110"
                                >
                                  {round.num}
                                </div>
                                <div
                                  style={{ borderTopColor: round.color }}
                                  className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] -mt-1 shadow-sm"
                                ></div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="relative z-10 flex flex-col items-center flex-col-reverse">
                                <div
                                  style={{ backgroundColor: round.color }}
                                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg border-2 border-white ring-4 ring-white/20 transition-transform group-hover:scale-110"
                                >
                                  {round.num}
                                </div>
                                <div
                                  style={{ borderBottomColor: round.color }}
                                  className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] -mb-1 shadow-sm"
                                ></div>
                              </div>
                              <div className="mt-3 text-center">
                                <h4
                                  style={{ color: round.color }}
                                  className="text-[10px] font-black leading-tight uppercase tracking-tighter"
                                >
                                  {round.label}
                                </h4>
                                <p className="text-[9px] text-gray-400 font-bold whitespace-nowrap">{round.milestones}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Your Choice Lists */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart size={20} className="text-pink-500 fill-pink-500" />
                    <div>
                      <h3 className="font-bold text-gray-800">Your Choice Lists</h3>
                      <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">0 COLLECTIONS SAVED</p>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <Plus size={24} className="text-college-primary" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Plan Your Future</h4>
                    <p className="text-xs text-gray-500 mb-5 max-w-[250px] leading-relaxed">
                      Create personalized preference lists to manage your dream colleges and track possibilities.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05, borderColor: '#dee2e6' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsPinModalOpen(true)}
                      className="flex items-center px-5 py-2.5 bg-white border border-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-college-primary hover:text-college-primary transition-all shadow-sm cursor-pointer"
                    >
                      <Plus size={16} className="mr-2" />
                      Create New List
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ===== HOME DASHBOARD VIEW ===== */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              variants={staggerContainer}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Column: Info & Banner */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Profile Message */}
                  <motion.div variants={fadeUp} className="mb-2">
                    <h2 className="text-sm lg:text-xs font-bold flex items-center gap-1.5">
                      <span className="text-slate-400 uppercase tracking-widest">Hello</span>
                      <span className="bg-gradient-to-r from-blue-600 to-blue-200 bg-clip-text text-transparent font-black uppercase tracking-tight">
                        {user?.fullName || user?.username || 'Anish'}
                      </span>
                    </h2>
                    <h1 className="text-2xl lg:text-xl font-bold text-gray-800 lg:mt-0 mt-1 leading-tight">
                      Get all your <br />
                      <span className="text-college-primary font-extrabold">Counselling Updates</span> <br />
                      at one place!
                    </h1>
                  </motion.div>
                  {/* Banner */}
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.02, transition: bouncy }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group"
                  >
                    <div className="flex items-center space-x-3 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-college-primary group-hover:bg-college-primary group-hover:text-white transition-colors">
                        <Play size={20} fill="currentColor" />
                      </div>
                      <span className="text-lg font-bold text-gray-800">How to CollegeReviewZ</span>
                    </div>
                    <div className="w-14 h-14 opacity-90">
                      <img src={logo} alt="Logo" className="w-full h-full object-contain transform rotate-12" />
                    </div>
                  </motion.div>

                  {/* Social Buttons */}
                  <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={bouncy}
                      className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2.5 px-3 rounded-lg shadow-md transition-all"
                    >
                      <MessageCircle size={18} />
                      <span className="font-semibold text-xs">Whatsapp Community</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={bouncy}
                      className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-3 rounded-lg shadow-md transition-all"
                    >
                      <Send size={18} />
                      <span className="font-semibold text-xs">Telegram Channel</span>
                    </motion.button>
                  </motion.div>

                  {/* Contact Details */}
                  <motion.div variants={fadeUp} className="space-y-3">
                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm flex flex-col space-y-1.5 hover:border-blue-300 transition-colors">
                      <div className="flex items-center space-x-3 text-college-primary">
                        <div className="p-1.5 bg-blue-50 rounded-full">
                          <Phone size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Talk to an expert</p>
                          <p className="font-bold text-base">+91 97179 87058</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 pl-10">We are available Monday through Saturday, between 10am and 7pm.</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm flex flex-col space-y-1.5 hover:border-blue-300 transition-colors">
                      <div className="flex items-center space-x-3 text-college-primary">
                        <div className="p-1.5 bg-blue-50 rounded-full">
                          <Mail size={16} />
                        </div>
                        <div>
                          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Email us</p>
                          <p className="font-bold text-base">admin@collegereviewz.com</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 pl-10">Write to us, and we'll get back within 24 hours (Monday to Saturday).</p>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column: College Updates */}
                <motion.div variants={fadeUp} className="lg:col-span-7">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full flex flex-col max-h-[480px]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-800 font-bold flex items-center">
                        College Updates
                      </h3>
                      <button
                        onClick={fetchUpdates}
                        disabled={isLoadingUpdates}
                        className="p-1.5 text-gray-400 hover:text-college-primary hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50"
                        title="Refresh Updates"
                      >
                        <RefreshCw size={16} className={isLoadingUpdates ? "animate-spin" : ""} />
                      </button>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      {isLoadingUpdates ? (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                          <div className="w-8 h-8 border-4 border-blue-100 border-t-college-primary rounded-full animate-spin mb-3"></div>
                          <p className="text-xs font-medium">Fetching latest updates...</p>
                        </div>
                      ) : collegeUpdates.length > 0 ? (
                        <motion.div
                          key={`updates-${collegeUpdates.length}`}
                          initial="hidden"
                          animate="visible"
                          variants={staggerContainer}
                          className="space-y-3"
                        >
                          {collegeUpdates.map((update, index) => {
                            const colorMap = {
                              alert: {
                                bg: 'bg-red-50',
                                border: 'border-red-200',
                                iconBg: 'bg-red-500',
                                text: 'text-red-600',
                                dateBorder: 'border-red-200',
                                icon: <AlertTriangle size={14} />,
                              },
                              note: {
                                bg: 'bg-yellow-50',
                                border: 'border-yellow-200',
                                iconBg: 'bg-yellow-600',
                                text: 'text-yellow-700',
                                dateBorder: 'border-yellow-200',
                                icon: <Calendar size={14} />,
                              },
                            };
                            const c = colorMap[update.type] || colorMap.alert;

                            return (
                              <motion.div
                                key={update._id || index}
                                variants={fadeUp}
                                whileHover={{ x: 5 }}
                                onClick={() => openUpdateLink(update.link)}
                                className={`${c.bg} rounded-xl p-4 border ${c.border} hover:shadow-md transition-all cursor-pointer ${update.hasDownload ? 'relative' : ''}`}
                              >
                                {update.hasDownload && (
                                  <div className="absolute top-4 right-4">
                                    <button className="p-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                                      <FileDown size={14} />
                                    </button>
                                  </div>
                                )}
                                <div className={`flex items-start justify-between mb-2 ${update.hasDownload ? 'pr-8' : ''}`}>
                                  <div className="flex items-center space-x-2 flex-wrap">
                                    <div className={`${c.iconBg} text-white p-1 rounded-full`}>
                                      {c.icon}
                                    </div>
                                    <span className={`${c.text} font-semibold text-xs bg-white px-2 py-0.5 rounded border ${c.dateBorder}`}>
                                      {update.date}
                                    </span>
                                    <span className={`${c.text} font-bold text-xs`}>
                                      {update.category}
                                    </span>
                                  </div>
                                </div>
                                <h4 className="text-gray-900 font-bold text-base mb-1 leading-snug">{update.title}</h4>
                                {update.subtitle && (
                                  <p className={`${update.type === 'note' ? c.text + ' font-medium' : 'text-gray-600'} text-xs mb-3`}>
                                    {update.subtitle}
                                  </p>
                                )}
                                {update.hasVideo && (
                                  <div className="flex space-x-2">
                                    <button className="flex items-center px-3 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                      <Play size={12} className="mr-1.5 fill-current" /> English
                                    </button>
                                    <button className="flex items-center px-3 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                      <Play size={12} className="mr-1.5 fill-current" /> Malayalam
                                    </button>
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      ) : (
                        <div className="text-center p-8 border-2 border-dashed border-gray-100 rounded-xl">
                          <p className="text-gray-400 text-sm">No recent updates found.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* CRZTales Banner */}
              <motion.div variants={fadeUp} className="bg-gradient-to-r from-college-dark via-blue-800 to-college-dark rounded-xl shadow-lg overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-700/30 to-transparent"></div>
                <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 relative z-10">
                  <div className="flex items-center space-x-6 mb-4 md:mb-0">
                    <div className="bg-white rounded-xl p-3 shadow-md flex-shrink-0">
                      <img src={logo} alt="CRZTales" className="w-12 h-12 object-contain" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold mb-1">Where Academic Journeys Come Together</h3>
                      <p className="text-blue-200 text-sm max-w-lg">
                        Built for conversations that matter at every stage of medicine, CRZTales is a place to think out loud, learn from others and share what you know.
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-white text-college-dark rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors shadow-md whitespace-nowrap flex-shrink-0"
                  >
                    Explore CRZTales
                  </motion.button>
                </div>
              </motion.div>

              {/* Announcements Section */}
              <motion.div variants={fadeUp} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Announcements</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 bg-college-primary hover:bg-blue-600 text-white rounded-full text-sm font-semibold transition-colors cursor-pointer"
                  >
                    View all
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(selectedCourse.name.includes('JEE') ? [
                    { color: 'blue', cat: 'Registration', title: 'JEE Mains 2026', desc: 'Session 1 Registration Starts from November 2025' },
                    { color: 'orange', cat: 'Exam Date', title: 'JEE Advanced 2026', desc: 'Official Exam Date Announced: May 17, 2026' },
                    { color: 'green', cat: 'Admit Card', title: 'JEE Mains Session 2', desc: 'Admit Card is now available for download' },
                    { color: 'purple', cat: 'Syllabus', title: 'JEE Advanced', desc: 'No major changes in syllabus for 2026 session' },
                  ] : [
                    { color: 'orange', cat: 'Allotment', title: 'Telangana Management Quota - PG Medical', desc: 'Mop Up Round Allotment (Joining till 19.02.2026 (2 PM))' },
                    { color: 'blue', cat: 'Web Options', title: 'Andhra Pradesh Government Quota - PG Medical', desc: 'DNB Phase 1 Web Options For Inservice Candidates (Web Options Starts from 18th Feb...)' },
                    { color: 'orange', cat: 'Allotment', title: 'Tripura - PG Medical', desc: 'Round 3 Provisional Allotment, Round 3 Joining Starts from 17.02.2026 (05:00 PM)' },
                    { color: 'orange', cat: 'Allotment', title: 'Haryana - PG Medical', desc: 'Round 3 Allotment' },
                    { color: 'purple', cat: 'In-service DNB Seats', title: 'Karnataka - PG Medical', desc: 'Inservice Candidates currently serving in ESIC, BEMP' },
                    { color: 'red', cat: 'Result Delayed', title: 'Bihar - PG Medical', desc: 'Due to Unavoidable Reasons, the Round 3 Result has been Delayed' },
                    { color: 'green', cat: 'Document Verification', title: 'Haryana - PG Medical', desc: 'Round 3 Physical Document Verification Schedule, Fee Deposition is Extended till 19.02.2026 (8:00 PM)' },
                    { color: 'blue', cat: 'Provisional Selection List', title: 'Jharkhand - PG Medical', desc: 'Round 3 Provisional Selection List' },
                  ]).map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={scaleIn}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.02 }}
                      className={`bg-${item.color}-50 border border-${item.color}-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`text-${item.color}-600 font-bold text-xs text-center leading-tight whitespace-pre-line min-w-[35px]`}>
                          {selectedCourse.name.includes('JEE') ? 'FEB\n24' : 'FEB\n17'}
                        </div>
                        <div className="flex-1">
                          <div className={`text-xs font-semibold text-${item.color}-600 mb-1`}>{item.cat}</div>
                          <h4 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.desc}</p>
                          <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className={`text-xs text-${item.color}-600 font-semibold hover:underline flex items-center cursor-pointer`}
                          >
                            View <ExternalLink size={12} className="ml-1" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Events Section */}
              <motion.div variants={fadeUp} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Events</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 bg-college-primary hover:bg-blue-600 text-white rounded-full text-sm font-semibold transition-colors cursor-pointer"
                  >
                    View all
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(selectedCourse.name.includes('JEE') ? [
                    { color: 'blue', date: 'FEB 24 — MAR 05', cat: 'Session 2 Registration', title: 'JEE Mains 2026' },
                    { color: 'orange', date: 'APR 15 — APR 20', cat: 'Correction Window', title: 'JEE Mains 2026' },
                    { color: 'green', date: 'MAY 17', cat: 'Examination', title: 'JEE Advanced 2026' },
                  ] : [
                    { color: 'orange', date: 'FEB 06 — FEB 17', cat: 'Joining & Document Verification', title: 'Manipur-JNIMS - PG Medical' },
                    { color: 'blue', date: 'FEB 18 — FEB 19', cat: 'Reporting', title: 'Andhra Pradesh Government Quota - PG Medical' },
                    { color: 'green', date: 'FEB 18 — FEB 19', cat: 'Online Payment', title: 'Chhattisgarh - PG Medical' },
                    { color: 'red', date: 'FEB 19 — FEB 19', cat: 'Admission Cancelled', title: 'Maharashtra - PG Medical' },
                    { color: 'blue', date: 'FEB 06 — FEB 17', cat: 'Reporting', title: 'Sikkim - PG Medical' },
                    { color: 'purple', date: 'FEB 18 — FEB 19', cat: 'Scrutiny', title: 'Chhattisgarh - PG Medical' },
                  ]).map((event, idx) => (
                    <motion.div
                      key={idx}
                      variants={scaleIn}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.02 }}
                      className={`border-l-4 border-l-${event.color}-500 bg-${event.color}-50 rounded-r-lg p-4 hover:shadow-md transition-all cursor-pointer`}
                    >
                      <div className={`text-xs font-bold text-${event.color}-600 mb-2`}>{event.date}</div>
                      <div className="text-xs font-semibold text-blue-700 mb-1">{event.cat}</div>
                      <h4 className="font-bold text-gray-900 text-sm mb-2">{event.title}</h4>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs text-college-primary font-semibold hover:underline flex items-center cursor-pointer"
                      >
                        Details <ExternalLink size={12} className="ml-1" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Videos Section */}
              <VideosSection
                id="videos-section"
                variant="dashboard"
                containerClassName="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Roadmap Activity Modal */}
        <AnimatePresence>
          {showRoadmapModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-hidden"
              onClick={() => setShowRoadmapModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={bouncy}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/30">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center space-x-3 self-start">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{selectedRound} Activity</h2>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">COUNSELLING TIMELINE</p>
                      </div>
                    </div>

                    {/* Centralized Round Switcher */}
                    <div className="flex bg-gray-100/80 p-1 rounded-xl items-center shadow-inner border border-gray-200">
                      {['ROUND 1', 'ROUND 2', 'ROUND 3', 'STRAY ROUND'].map((round) => (
                        <motion.button
                          key={round}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedRound(round)}
                          className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-tighter ${selectedRound === round
                            ? 'bg-white text-college-primary shadow-sm border border-blue-50/50'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                          {round}
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex items-center space-x-4 self-end md:self-center">
                      <div className="hidden lg:flex items-center space-x-4 text-[10px] font-black tracking-tighter uppercase px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>COMPLETED</div>
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span>IN PROGRESS</div>
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-gray-200 mr-2 shadow-inner"></span>UPCOMING</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowRoadmapModal(false)}
                        className="p-2 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-gray-800 shadow-sm transition-all"
                      >
                        <X size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Timeline Content - Centralized */}
                <div className="p-10 md:p-16 overflow-x-auto no-scrollbar bg-white">
                  <div
                    className={`flex items-start min-w-max relative pb-12 mx-auto ${roadmapData[selectedRound]?.length <= 4 ? 'max-w-4xl justify-around' : 'justify-start space-x-0'
                      }`}
                  >
                    {/* Background Line with Progress */}
                    <div
                      className="absolute bg-gray-100 rounded-full h-1 transition-all duration-500 ease-in-out"
                      style={{
                        top: '124px', // Precisely centered with the 48px (h-12) circles
                        left: `${100 / (roadmapData[selectedRound]?.length || 1) / 2}%`,
                        right: `${100 / (roadmapData[selectedRound]?.length || 1) / 2}%`,
                      }}
                    >
                      <motion.div
                        key={selectedRound}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.max(0, (roadmapData[selectedRound]?.filter(m => m.status !== 'UPCOMING').length - 1) / (roadmapData[selectedRound]?.length - 1) * 100)}%`
                        }}
                        className="h-full bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-1000 ease-out"
                      />
                    </div>

                    {roadmapData[selectedRound]?.map((milestone, idx) => {
                      const isCompleted = milestone.status === 'COMPLETED';
                      const isInProgress = milestone.status === 'IN PROGRESS';
                      const isUpcoming = milestone.status === 'UPCOMING';

                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          key={`${selectedRound}-${idx}`}
                          className="relative flex flex-col items-center w-56 text-center group shrink-0"
                        >
                          {/* Status Label (Top) */}
                          <div className={`mb-8 text-[9px] font-black tracking-[0.2em] uppercase py-1.5 px-4 rounded-full transition-all border shadow-sm flex-shrink-0 whitespace-nowrap z-20 ${isCompleted ? 'bg-green-50/50 text-green-600 border-green-100' :
                            isInProgress ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              'bg-gray-50 text-gray-400 border-transparent shadow-none'
                            }`}>
                            {milestone.status}
                          </div>

                          {/* Date */}
                          <div className={`mb-5 text-[10px] md:text-sm font-black transition-all px-2 py-1 rounded-md h-6 flex items-center justify-center z-20 ${isCompleted ? 'text-gray-500' :
                            isInProgress ? 'text-college-dark bg-amber-50/50' :
                              'text-gray-300'
                            }`}>
                            {milestone.date}
                          </div>

                          {/* Node */}
                          <div className="relative z-20 flex items-center justify-center mb-8 h-12 w-12 bg-white rounded-full">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 + idx * 0.05, ...bouncy }}
                              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-all duration-500 ${isCompleted ? 'bg-green-500 text-white shadow-green-100' :
                                isInProgress ? 'bg-amber-400 text-white shadow-amber-100 ring-4 ring-amber-50 animate-bounce-slow' :
                                  'bg-white text-gray-200 border-gray-100 shadow-none'
                                }`}
                            >
                              {isCompleted ? <CheckCircle2 size={26} /> :
                                isInProgress ? <Clock size={24} /> :
                                  <Circle size={14} fill="currentColor" />}
                            </motion.div>
                          </div>

                          {/* Milestone Description */}
                          <div className={`px-4 text-[13px] font-extrabold leading-snug max-w-[180px] transition-colors duration-300 z-20 ${isCompleted ? 'text-gray-700' :
                            isInProgress ? 'text-college-dark' :
                              'text-gray-300 font-bold'
                            }`}>
                            {milestone.title}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Dashboard;
