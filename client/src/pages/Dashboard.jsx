import React from 'react';
import { Play, MessageCircle, Send, Phone, Mail, FileDown, AlertTriangle, Pin, Home, Plus, X, Search } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo6.png';
import { counselingOptions } from '../data/counselingData';

const Dashboard = () => {
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([
    'All India Counseling - PG Medical',
    'West Bengal - PG Medical',
    'Assam - PG Medical'
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);

  const confirmDelete = () => {
    if (itemToDelete) {
      if (pinnedItems.includes(itemToDelete)) {
        setPinnedItems(pinnedItems.filter(i => i !== itemToDelete));
      }
      setItemToDelete(null);
    }
  };

  const togglePin = (item) => {
    if (pinnedItems.includes(item)) {
      setPinnedItems(pinnedItems.filter(i => i !== item));
    } else {
      setPinnedItems([...pinnedItems, item]);
    }
  };

  const filteredOptions = counselingOptions.filter(option => 
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 pt-6 md:pt-8 space-y-6 bg-gray-50 min-h-screen relative">
      
      {/* Quick Navigation Tabs */}
      <div className="flex overflow-x-auto space-x-4 pb-2 md:pb-0 scrollbar-hide">
        <button className="flex items-center px-3 py-1.5 bg-white text-college-primary rounded-full text-sm font-semibold shadow-sm border border-blue-100 whitespace-nowrap">
           <Home size={14} className="mr-1.5" />
           Home
        </button>
        
        {pinnedItems.map((item) => (
           <div 
             key={item}
             className="relative group flex items-center px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium transition-all whitespace-nowrap hover:shadow-sm hover:border-red-200 hover:bg-red-50 cursor-default"
           >
              <Pin size={14} className="mr-1.5 fill-gray-600 group-hover:hidden" /> 
              
              <button
                onClick={(e) => {
                    e.stopPropagation();
                    setItemToDelete(item);
                }}
                className="hidden group-hover:flex mr-1.5 w-3.5 h-3.5 items-center justify-center bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors cursor-pointer"
              >
                <X size={10} strokeWidth={3} />
              </button>

              <span className="group-hover:text-red-600 transition-colors">{item}</span>
           </div>
        ))}

         <button 
           className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-500 flex-shrink-0"
           onClick={() => setIsPinModalOpen(true)}
         >
           <Plus size={16} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-[2px] p-4">
            <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm transform scale-100 animate-in fade-in zoom-in duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Are you sure to delete?</h3>
                    <p className="text-sm text-gray-500 mb-6">This action will unpin <span className="font-semibold text-gray-800">"{itemToDelete}"</span> from your dashboard.</p>
                    
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={() => setItemToDelete(null)}
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

      {/* Pin Counselling Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Pin Counselling</h2>
              <button 
                onClick={() => setIsPinModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Search */}
            <div className="p-4 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search Counselling" 
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Modal List */}
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
              {filteredOptions.map((option) => (
                <div 
                  key={option}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors"
                  onClick={() => togglePin(option)}
                >
                  <span className="text-sm font-medium text-gray-700">{option}</span>
                  <div className={`p-1.5 rounded-full transition-all ${pinnedItems.includes(option) ? 'bg-gray-800 text-white' : 'text-gray-300 group-hover:text-gray-400'}`}>
                    <Pin size={14} className={pinnedItems.includes(option) ? 'fill-current' : ''} />
                  </div>
                </div>
              ))}
              {filteredOptions.length === 0 && (
                 <div className="p-8 text-center text-gray-400 text-sm">
                    No counselling found matching "{searchQuery}"
                 </div>
              )}
            </div>

          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Welcome & Info */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="mb-4">
            <h2 className="text-gray-500 text-base font-medium">Hello Anish</h2>
            <h1 className="text-2xl font-bold text-gray-800 mt-1 leading-tight">
              Get all your <br />
              <span className="text-college-primary">NEET PG info here!</span>
            </h1>
          </div>

          {/* Banner */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
             <div className="flex items-center space-x-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-college-primary group-hover:bg-college-primary group-hover:text-white transition-colors">
                   <Play size={20} fill="currentColor" />
                </div>
                <span className="text-lg font-bold text-gray-800">How to CollegeReviewZ</span>
             </div>
             <div className="w-14 h-14 opacity-90">
                <img src={logo} alt="Logo" className="w-full h-full object-contain transform rotate-12" />
             </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2.5 px-3 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5">
               <MessageCircle size={18} />
               <span className="font-semibold text-xs">Whatsapp Community</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-3 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5">
               <Send size={18} />
               <span className="font-semibold text-xs">Telegram Channel</span>
            </button>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
             <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm flex flex-col space-y-1.5 hover:border-blue-300 transition-colors">
                <div className="flex items-center space-x-3 text-college-primary">
                   <div className="p-1.5 bg-blue-50 rounded-full">
                     <Phone size={16} />
                   </div>
                   <div>
                      <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Talk to an expert</p>
                      <p className="font-bold text-base">080-690-36000</p>
                   </div>
                </div>
                <p className="text-[10px] text-gray-400 pl-10">We are available Monday through Saturday, between 10am and 4:30pm.</p>
             </div>

             <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm flex flex-col space-y-1.5 hover:border-blue-300 transition-colors">
                <div className="flex items-center space-x-3 text-college-primary">
                   <div className="p-1.5 bg-blue-50 rounded-full">
                     <Mail size={16} />
                   </div>
                   <div>
                      <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Email us</p>
                      <p className="font-bold text-base">hello@collegereviewz.com</p>
                   </div>
                </div>
                <p className="text-[10px] text-gray-400 pl-10">Write to us, and we'll get back within 24 hours (Monday to Saturday).</p>
             </div>
          </div>

        </div>

        {/* Right Column: Nerd Updates */}
        <div className="lg:col-span-7">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full flex flex-col">
              <h3 className="text-gray-800 font-bold mb-4 flex items-center">
                 College Updates
              </h3>
              
              <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                 {/* Update Card 1 */}
                 <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                       <div className="flex items-center space-x-2">
                          <div className="bg-college-primary text-white p-1 rounded-full">
                             <AlertTriangle size={14} />
                          </div>
                          <span className="text-college-primary font-semibold text-xs bg-white px-2 py-0.5 rounded border border-blue-100">Wed, 11 Feb</span>
                          <span className="text-college-dark font-bold text-xs">All India Counseling - PG Medical</span>
                       </div>
                    </div>
                    <h4 className="text-gray-900 font-bold text-base mb-1 leading-snug">All India R3 Joining vs State R3 Results | Timeline Explained | NEET PG 2025</h4>
                 </div>

                 {/* Update Card 2 */}
                 <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                       <div className="flex items-center space-x-2">
                          <div className="bg-college-primary text-white p-1 rounded-full">
                             <AlertTriangle size={14} />
                          </div>
                          <span className="text-college-primary font-semibold text-xs bg-white px-2 py-0.5 rounded border border-blue-100">Mon, 9 Feb</span>
                          <span className="text-college-dark font-bold text-xs">All India Counseling - PG Medical</span>
                       </div>
                    </div>
                    <h4 className="text-gray-900 font-bold text-base mb-1 leading-snug">All India Round 3 | Joining - To Do - Scenario wise | NEET PG 2025</h4>
                    <p className="text-gray-600 text-xs mb-3">Premium Video for CollegeReviewZ Subscribers</p>
                    <div className="flex space-x-2">
                       <button className="flex items-center px-3 py-1 bg-white border border-gray-200 rounded text-xs text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                          <Play size={12} className="mr-1.5 fill-current" /> English
                       </button>
                       <button className="flex items-center px-3 py-1 bg-white border border-gray-200 rounded text-xs text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                          <Play size={12} className="mr-1.5 fill-current" /> Malayalam
                       </button>
                    </div>
                 </div>

                 {/* Update Card 3 */}
                 <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all relative">
                    <div className="absolute top-4 right-4">
                       <button className="p-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                          <FileDown size={14} />
                       </button>
                    </div>
                    <div className="flex items-start justify-between mb-2">
                       <div className="flex items-center space-x-2">
                          <div className="bg-college-primary text-white p-1 rounded-full">
                             <AlertTriangle size={14} />
                          </div>
                          <span className="text-college-primary font-semibold text-xs bg-white px-2 py-0.5 rounded border border-blue-100">Mon, 2 Feb</span>
                          <span className="text-college-dark font-bold text-xs">All India Counseling - PG Medical</span>
                       </div>
                    </div>
                    <h4 className="text-gray-900 font-bold text-base mb-1 leading-snug">All India Counselling - MCC Round 3 - For Candidates who did not lock choices</h4>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
