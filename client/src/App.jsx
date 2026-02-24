import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Videos from './pages/Videos';
import SeatMatrix from './pages/SeatMatrix';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ChoiceListModal from './components/ChoiceListModal';
import PinModal from './components/PinModal';
import Profile from './pages/Profile';
import axios from 'axios';
import AuroraBackground from './components/AuroraBackground';
import { 
  Menu, X, LayoutDashboard, PlayCircle, Database, Compass, User, Share2, 
  ChevronDown, GitMerge, Award, Grid3x3, ReceiptIndianRupee, TrendingUp, 
  Building2, Landmark, Users, GraduationCap, Gift, Newspaper, Package
} from 'lucide-react';
import logo from './assets/logo6.png';


// Configure axios defaults
axios.defaults.baseURL = '/api/v1';
axios.defaults.withCredentials = true;


import ClosingRanks from './pages/ClosingRanks';
import ClosingRankDetails from './pages/ClosingRankDetails';
import Allotments from './pages/Allotments';
import AllotmentDetails from './pages/AllotmentDetails';
import FeeStipendBond from './pages/FeeStipendBond';
import FeeStipendBondDetails from './pages/FeeStipendBondDetails';
import SeatIncrease from './pages/SeatIncrease';
import SeatIncreaseDetails from './pages/SeatIncreaseDetails';
import Courses from './pages/Courses';
import Counsellings from './pages/Counsellings';
import Universities from './pages/Universities';
import Institutes from './pages/Institutes';
import InstituteDetails from './pages/InstituteDetails';
import Resources from './pages/Resources';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isChoiceListModalOpen, setIsChoiceListModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState(null);
  const navigate = useNavigate();

  const [pinnedItems, setPinnedItems] = useState([
    'All India Counseling - PG Medical',
    'West Bengal - PG Medical',
    'Assam - PG Medical'
  ]);

  const mobileMenuItems = [
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
    {
      name: 'Promotions',
      icon: Gift,
      hasDropdown: true,
      subItems: [
        { name: 'Blogs & News', icon: Newspaper, path: '/blogs', isSoon: true },
        { name: 'Refer & Earn', icon: Share2, path: '/refer', isSoon: true },
        { name: 'Packages', icon: Package, path: '/packages', isSoon: true },
      ]
    },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  // Check login status on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/users/me');
        if (response.status === 200) {
          const userData = response.data.user;
          setUser(userData);
          if (userData.isProfileComplete) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
          } else {
            // Authenticated but profile incomplete
            setIsLoggedIn(false);
            setShowLogin(true);
            localStorage.removeItem('isLoggedIn');
          }
        } else {
          setIsLoggedIn(false);
          setShowLogin(false);
          localStorage.removeItem('isLoggedIn');
        }
      } catch (error) {
        console.error("Session check failed:", error);
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const openChoiceListModal = () => setIsChoiceListModalOpen(true);
  const closeChoiceListModal = () => setIsChoiceListModalOpen(false);

  const openPinModal = () => {
    setIsChoiceListModalOpen(false);
    setIsPinModalOpen(true);
  };

  const closePinModal = () => setIsPinModalOpen(false);

  const togglePin = (item) => {
    if (pinnedItems.includes(item)) {
      setPinnedItems(pinnedItems.filter(i => i !== item));
    } else {
      setPinnedItems([...pinnedItems, item]);
    }
  };

  const handleLoginClick = () => {
    setPendingPath('/');
    setShowLogin(true);
  };

  const handleFeatureClick = (path) => {
    setPendingPath(path || '/');
    setShowLogin(true);
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    setTimeout(() => navigate(pendingPath), 50);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/users/logout');
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('isLoggedIn');
    } catch (error) {
      console.error("Logout failed:", error);
      // Still log out locally
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-ocean-deep">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>

      </div>
    );
  }

  if (!isLoggedIn && !showLogin) {
    return <LandingPage onGetStarted={handleLoginClick} onFeatureClick={handleFeatureClick} />;
  }

  if (!isLoggedIn && showLogin) {
    return <LoginPage user={user} onLoginSuccess={handleLoginSuccess} onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="flex h-screen relative overflow-hidden bg-ocean-deep">
      <AuroraBackground />
      <Sidebar />

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-ocean-deep/60 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl z-[70] p-8 flex flex-col md:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 space-y-2">
                {mobileMenuItems.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div 
                      onClick={() => { 
                        if (item.hasDropdown) {
                          setMobileExpandedItem(mobileExpandedItem === item.name ? null : item.name);
                        } else {
                          navigate(item.path); 
                          setIsMobileMenuOpen(false); 
                        }
                      }}
                      className="flex items-center justify-between p-4 rounded-2xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer transition-all font-bold"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={22} />
                        {item.name}
                      </div>
                      {item.hasDropdown && (
                        <ChevronDown size={18} className={`transition-transform duration-300 ${mobileExpandedItem === item.name ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {item.hasDropdown && mobileExpandedItem === item.name && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden pl-12 space-y-1"
                         >
                           {item.subItems.map((sub) => (
                             <div
                               key={sub.name}
                               onClick={() => {
                                 if (!sub.isSoon) {
                                   navigate(sub.path);
                                   setIsMobileMenuOpen(false);
                                   setMobileExpandedItem(null);
                                 }
                               }}
                               className={`flex items-center justify-between p-3 rounded-xl transition-all text-sm font-semibold ${
                                 sub.isSoon 
                                   ? 'text-slate-400 cursor-not-allowed opacity-60' 
                                   : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50 cursor-pointer'
                               }`}
                             >
                               <div className="flex items-center gap-3">
                                 <sub.icon size={16} />
                                 {sub.name}
                               </div>
                               {sub.isSoon && (
                                 <span className="bg-blue-50 text-blue-500 text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Soon</span>
                               )}
                             </div>
                           ))}
                         </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col ml-0 md:ml-24 transition-all duration-500 z-10 w-full overflow-hidden">
        <Header 
          onOpenChoiceList={openChoiceListModal} 
          onLogout={handleLogout} 
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          user={user}
        />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  isPinModalOpen={isPinModalOpen}
                  setIsPinModalOpen={setIsPinModalOpen}
                  pinnedItems={pinnedItems}
                  togglePin={togglePin}
                  user={user}
                />
              }
            />
            <Route
              path="/resources"
              element={<Resources />}
            />
            <Route path="/videos" element={<Videos />} />
            <Route path="/seat-matrix" element={<SeatMatrix />} />
            <Route path="/closing-ranks" element={<ClosingRanks />} />
            <Route path="/closing-ranks/details/:type" element={<ClosingRankDetails />} />
            <Route path="/allotments" element={<Allotments />} />
            <Route path="/allotments/details/:type" element={<AllotmentDetails />} />
            <Route path="/fee-stipend-bond" element={<FeeStipendBond />} />
            <Route path="/fee-stipend-bond/details/:type" element={<FeeStipendBondDetails />} />
            <Route path="/seat-increase" element={<SeatIncreaseDetails />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/counsellings" element={<Counsellings />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/institutes" element={<Institutes />} />
            <Route path="/institutes/:id" element={<InstituteDetails />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>
      </div>

      <ChoiceListModal
        isOpen={isChoiceListModalOpen}
        onClose={closeChoiceListModal}
        pinnedItems={pinnedItems}
        onCreateList={openPinModal}
      />

      <PinModal 
        isOpen={isPinModalOpen} 
        onClose={closePinModal} 
        pinnedItems={pinnedItems} 
        togglePin={togglePin} 
      />
    </div>
  );
}

export default App;
