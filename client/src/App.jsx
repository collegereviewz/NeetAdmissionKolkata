import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ChoiceListModal from './components/ChoiceListModal';
import CreateListModal from './components/CreateListModal';

function App() {
  const [isChoiceListModalOpen, setIsChoiceListModalOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  
  // Storing the names of created choice lists
  const [choiceLists, setChoiceLists] = useState([
    'West Bengal - PG Medical' // Initial mock data
  ]);

  const openChoiceListModal = () => setIsChoiceListModalOpen(true);
  const closeChoiceListModal = () => setIsChoiceListModalOpen(false);

  const handleOpenCreateModal = () => {
    setIsChoiceListModalOpen(false);
    setIsCreateListModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateListModalOpen(false);
    setIsChoiceListModalOpen(true); // Return to list view on cancel
  };

  const handleCreateList = (counsellingName) => {
    if (!choiceLists.includes(counsellingName)) {
      setChoiceLists([...choiceLists, counsellingName]);
    }
    setIsCreateListModalOpen(false);
    setIsChoiceListModalOpen(true); // Return to list view after creation
  };

  const handleDeleteList = (list) => {
    setChoiceLists(choiceLists.filter(l => l !== list));
  };

  return (
    <div className="flex min-h-screen bg-college-bg font-sans text-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-20 md:ml-24 transition-all duration-300">
        <Header onOpenChoiceList={openChoiceListModal} />
        <main className="flex-1 overflow-y-auto">
          <Dashboard />
        </main>
      </div>

      <ChoiceListModal 
        isOpen={isChoiceListModalOpen} 
        onClose={closeChoiceListModal}
        choiceLists={choiceLists}
        onCreateList={handleOpenCreateModal}
        onDeleteList={handleDeleteList}
      />

      <CreateListModal 
        isOpen={isCreateListModalOpen} 
        onClose={handleCloseCreateModal}
        onCreate={handleCreateList}
      />
    </div>
  );
}

export default App;
