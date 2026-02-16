import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="flex min-h-screen bg-college-bg font-sans text-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-20 md:ml-24 transition-all duration-300">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
