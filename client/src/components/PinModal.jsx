import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Globe, Pin, ShieldCheck, Landmark } from 'lucide-react';
import { counselingOptions } from '../data/counselingData';
import { counsellingWebsites } from '../data/counselingWebsites';

const bouncy = { type: 'spring', stiffness: 500, damping: 15, mass: 0.8 };

const PinModal = ({ isOpen, onClose, pinnedItems, togglePin, selectedCourse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Central');

  if (!isOpen) return null;

  const currentField = selectedCourse?.field || 'Medicine';
  const optionsObj = counselingOptions[currentField] || { Central: [], State: [] };

  const centralOptions = (optionsObj.Central || []).filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const stateOptions = (optionsObj.State || []).filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentList = activeCategory === 'Central' ? centralOptions : stateOptions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={bouncy}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden border border-white/20"
      >

        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
          <div>
            <h2 className="text-xl font-black text-gray-800">Pin Counselling</h2>
            <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">Select your preferred data streams</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors cursor-pointer"
          >
            <X size={20} />
          </motion.button>
        </div>

        {/* Search & Tabs */}
        <div className="px-5 pt-5 pb-3 bg-gray-50/50">
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by state or type..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex bg-gray-200/50 p-1 rounded-xl">
            {[
              { id: 'Central', icon: <ShieldCheck size={14} />, label: 'Central Level' },
              { id: 'State', icon: <Landmark size={14} />, label: 'State Level' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-black transition-all ${activeCategory === cat.id
                  ? 'bg-white text-college-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar bg-gray-50/50">
          <div className="space-y-1">
            {currentList.map((option) => (
              <motion.div
                key={option}
                whileHover={{ x: 4 }}
                className={`flex items-center justify-between p-3.5 rounded-2xl transition-all group ${pinnedItems.includes(option)
                  ? 'bg-blue-50/80 border border-blue-100'
                  : 'bg-white hover:bg-blue-50/30'
                  }`}
              >
                <div className="flex-1 truncate mr-4">
                  <h4 className={`text-sm font-bold truncate transition-colors ${pinnedItems.includes(option) ? 'text-college-primary' : 'text-gray-700'
                    }`}>
                    {option}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-medium">{selectedCourse?.name || 'NEET PG'} 2025-26</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const url = counsellingWebsites[option] || `https://www.google.com/search?q=${encodeURIComponent(option + ' official website')}`;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="p-2 rounded-full text-gray-400 hover:text-college-primary hover:bg-white transition-all shadow-none hover:shadow-sm"
                    title="Website"
                  >
                    <Globe size={14} />
                  </button>
                  <button
                    onClick={() => togglePin(option)}
                    className={`p-2 rounded-full transition-all flex items-center justify-center ${pinnedItems.includes(option)
                      ? 'bg-college-primary text-white shadow-lg shadow-blue-200'
                      : 'bg-white text-gray-300 border border-gray-100 hover:border-blue-200 hover:text-college-primary'
                      }`}
                  >
                    <Pin size={14} className={pinnedItems.includes(option) ? 'fill-current' : ''} />
                  </button>
                </div>
              </motion.div>
            ))}

            {currentList.length === 0 && (
              <div className="py-12 text-center animate-in fade-in zoom-in">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                  <Search size={24} className="text-gray-300" />
                </div>
                <h3 className="text-sm font-bold text-gray-600">No Data Available</h3>
                <p className="text-[10px] text-gray-400 font-medium max-w-[200px] mx-auto mt-1">
                  We couldn't find any results matching your search in {activeCategory} level.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-white border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {pinnedItems.length} streams currently pinned
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default PinModal;
