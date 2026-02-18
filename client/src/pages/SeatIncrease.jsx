
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SeatIncrease = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const counsellingTypes = [
        { title: 'All India Counseling - PG Medical', type: 'all-india-pg-medical', count: 450, active: true },
        { title: 'West Bengal - PG Medical', type: 'west-bengal-pg-medical', count: 120, active: false },
        { title: 'Assam - PG Medical', type: 'assam-pg-medical', count: 85, active: false },
        { title: 'Bihar - PG Medical', type: 'bihar-pg-medical', count: 95, active: false },
    ];

    const filteredTypes = counsellingTypes.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 font-sans text-gray-900 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Seat Increase</h1>
                    <p className="text-gray-500">Select a counselling type to view seat increase details.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search counselling type..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {filteredTypes.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className={`p-4 flex items-center justify-between group transition-colors ${item.active ? 'hover:bg-blue-50 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                                    }`}
                                onClick={() => {
                                    if (item.active) {
                                        navigate(`/seat-increase/details/${item.type}`);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        <span className="font-semibold text-lg">{item.title.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h3 className={`font-medium ${item.active ? 'text-gray-900' : 'text-gray-500'}`}>{item.title}</h3>
                                        <p className="text-xs text-gray-500">{item.count} Institutes</p>
                                    </div>
                                </div>
                                {item.active && (
                                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                                        <ChevronRight size={18} />
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {filteredTypes.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No counselling types found matching "{searchQuery}"
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatIncrease;
