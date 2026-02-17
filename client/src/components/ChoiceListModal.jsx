import React from 'react';
import { X, Search, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const ChoiceListModal = ({ isOpen, onClose, choiceLists, onCreateList, onDeleteList }) => {
  const [listToDelete, setListToDelete] = useState(null);

  if (!isOpen) return null;

  const confirmDelete = () => {
    if (listToDelete) {
        onDeleteList(listToDelete);
        setListToDelete(null);
    }
  };

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
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition-all"
            />
          </div>

          {/* List Items */}
          <div className="space-y-3">
             {choiceLists.length > 0 ? (
                choiceLists.map((list, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Icon Container - similar to screenshot style if possible, or just the emoji */}
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-xl">
                                    🧙‍♂️
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{list}</h3>
                                    <p className="text-xs text-gray-500">0 choice lists</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setListToDelete(list);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center bg-[#FFF1F2] text-[#FF3E55] rounded-lg hover:bg-[#FFD1D6] transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
             ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                    No choice lists created yet.
                </div>
             )}
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 pt-2 flex-shrink-0 bg-white border-t border-gray-50">
            <button 
                onClick={onCreateList}
                className="w-full py-3 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <span className="text-xl leading-none">+</span> Create Choice List
            </button>
        </div>

        {/* Delete Confirmation Modal Overlay */}
        {listToDelete && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4 rounded-2xl">
                <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm transform scale-100 animate-in fade-in zoom-in duration-200">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Are you sure to delete?</h3>
                        <p className="text-sm text-gray-500 mb-6">This action will delete <span className="font-semibold text-gray-800">"{listToDelete}"</span> permanently.</p>
                        
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setListToDelete(null)}
                                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                            >
                                No
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-red-500/20"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default ChoiceListModal;
