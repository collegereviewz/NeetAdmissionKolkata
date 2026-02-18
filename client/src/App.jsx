import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SeatMatrix from './pages/SeatMatrix';
<<<<<<< HEAD
import ChoiceListModal from './components/ChoiceListModal';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api/v1';
axios.defaults.withCredentials = true;
=======
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
>>>>>>> 3dff37dd23b3e0c25ca6a5a5280f8267820db3e2

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isChoiceListModalOpen, setIsChoiceListModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const [pinnedItems, setPinnedItems] = useState([
    'All India Counseling - PG Medical',
    'West Bengal - PG Medical',
    'Assam - PG Medical'
  ]);

  // Check login status on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/users/me');
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUser(response.data.user || { username: 'Anish' });
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          setIsLoggedIn(false);
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
    setShowLogin(true);
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setUser(userData || { username: 'Anish' });
    localStorage.setItem('isLoggedIn', 'true');
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
      <div className="h-screen w-screen flex items-center justify-center bg-college-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-college-blue"></div>
      </div>
    );
  }

  if (!isLoggedIn && !showLogin) {
    return <LandingPage onGetStarted={handleLoginClick} />;
  }

  if (!isLoggedIn && showLogin) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="flex h-screen bg-college-bg font-sans text-gray-900 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-20 md:ml-24 transition-all duration-300 overflow-hidden">
        <Header onOpenChoiceList={openChoiceListModal} onLogout={handleLogout} />
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
                />
              }
            />
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
          </Routes>
        </main>
      </div>

      <ChoiceListModal
        isOpen={isChoiceListModalOpen}
        onClose={closeChoiceListModal}
        pinnedItems={pinnedItems}
        onCreateList={openPinModal}
      />
    </div>
  );
}

export default App;
