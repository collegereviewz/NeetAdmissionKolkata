import React, { useState } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { counselingOptions } from '../data/counselingData';

const CreateListModal = ({ isOpen, onClose, onCreate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  if (!isOpen) return null;

  const filteredOptions = counselingOptions.filter(option => 
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    if (selectedOption) {
        onCreate(selectedOption);
        setSelectedOption(null); // Reset selection
        setSearchQuery(''); // Reset search
    }
  };

  // Icon component (using specific SVG path to match the hat icon if possible, or a Lucide icon)
  // For now using a custom SVG or similar look
  const HatIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Create Choice List</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sub-header */}
        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
            <p className="text-sm text-gray-600 font-medium">Please select a counselling to continue</p>
        </div>

        {/* Search */}
        <div className="p-4 flex-shrink-0">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search Counselling" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
              </div>
        </div>

        {/* List Items */}
        <div className="px-4 pb-4 overflow-y-auto custom-scrollbar flex-1 space-y-2">
            {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                    <div 
                        key={index}
                        onClick={() => setSelectedOption(option)}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedOption === option 
                            ? 'border-gray-800 bg-gray-50 ring-1 ring-gray-800' 
                            : 'border-white hover:bg-gray-50 hover:border-gray-200'
                        }`}
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <HatIcon />
                            <span className="text-sm font-semibold text-gray-800 truncate">{option}</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                    No counselling found.
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 flex gap-3 flex-shrink-0">
            <button 
                onClick={onClose}
                className="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-semibold transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={handleCreate}
                disabled={!selectedOption}
                className={`flex-1 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    selectedOption 
                    ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
                <span className="text-lg leading-none">+</span> Create List
            </button>
        </div>

      </div>
    </div>
  );
};

export default CreateListModal;
