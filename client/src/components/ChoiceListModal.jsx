import React from 'react';
import { X, Search } from 'lucide-react';

const ChoiceListModal = ({ isOpen, onClose, pinnedItems, onCreateList }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">My Choice Lists</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search your Choice Lists" 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
            />
          </div>

          {/* List Items */}
          <div className="space-y-3">
             {pinnedItems.length > 0 ? (
                pinnedItems.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Icon Container */}
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-xl">
                                    🧙‍♂️
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{item}</h3>
                                    <p className="text-xs text-gray-500">0 choice lists</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
             ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                    No pinned counselling yet.
                </div>
             )}
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 pt-2 flex-shrink-0 bg-white border-t border-gray-50">
            <button 
                onClick={onCreateList}
                className="w-full py-3 bg-college-primary hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <span className="text-xl leading-none">+</span> Create Choice List
            </button>
        </div>

      </div>
    </div>
  );
};

export default ChoiceListModal;
