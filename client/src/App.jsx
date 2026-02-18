import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ChoiceListModal from './components/ChoiceListModal';

import { Routes, Route } from 'react-router-dom';
import SeatMatrix from './pages/SeatMatrix';
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

function App() {
  const [isChoiceListModalOpen, setIsChoiceListModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const [pinnedItems, setPinnedItems] = useState([
    'All India Counseling - PG Medical',
    'West Bengal - PG Medical',
    'Assam - PG Medical'
  ]);

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

  return (
    <div className="flex h-screen bg-college-bg font-sans text-gray-900 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-20 md:ml-24 transition-all duration-300 overflow-hidden">
        <Header onOpenChoiceList={openChoiceListModal} />
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
