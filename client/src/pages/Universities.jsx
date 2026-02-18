
import React, { useState, useEffect } from 'react';
import { Search, Landmark, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Universities = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        types: [],
        states: []
    });
    const [selectedFilters, setSelectedFilters] = useState({
        type: '',
        state: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        fetchFilters();
    }, []);

    useEffect(() => {
        fetchUniversities();
    }, [debouncedSearch, selectedFilters]);

    const fetchFilters = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/universities/filters');
            const data = await response.json();
            if (data.success) {
                setFilters(data.filters);
            }
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
    };

    const fetchUniversities = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                search: debouncedSearch,
                ...selectedFilters,
                limit: 1000
            });
            // Remove empty filters
            for (const [key, value] of queryParams.entries()) {
                if (!value) queryParams.delete(key);
            }

            const response = await fetch(`http://localhost:5000/api/v1/universities?${queryParams}`);
            const result = await response.json();
            if (result.success) {
                setUniversities(result.data);
            }
        } catch (error) {
            console.error("Error fetching universities:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setSelectedFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <h1 className="text-xl font-bold text-gray-900 text-center mb-6">Universities</h1>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-6 relative">
                        <input
                            type="text"
                            placeholder="Search universities"
                            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm text-gray-600 bg-gray-50/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                        <div className="relative group">
                            <select
                                className="appearance-none bg-white border border-gray-200 text-gray-500 py-1.5 pl-4 pr-10 rounded-full text-xs font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 cursor-pointer"
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                                value={selectedFilters.type}
                            >
                                <option value="">University Type</option>
                                {filters.types.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        <div className="relative group">
                            <select
                                className="appearance-none bg-white border border-gray-200 text-gray-500 py-1.5 pl-4 pr-10 rounded-full text-xs font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 cursor-pointer"
                                onChange={(e) => handleFilterChange('state', e.target.value)}
                                value={selectedFilters.state}
                            >
                                <option value="">State</option>
                                {filters.states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="text-center text-xs text-gray-400 font-medium">
                        {loading ? 'Searching...' : `${universities.length} Universities found`}
                    </div>
                </div>

                {/* Universities Grid */}
                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {universities.map((university, index) => (
                                <motion.div
                                    key={university._id || index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.02 }}
                                    className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all cursor-pointer group flex items-start gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-gray-100 transition-colors">
                                        <Landmark size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xs font-medium text-gray-800 mb-1 truncate" title={university.universityName}>
                                            {university.universityName}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                            <span className="truncate">{university.state}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="truncate">{university.type}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Universities;
