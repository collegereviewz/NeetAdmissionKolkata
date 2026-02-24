
import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { getFeatureConfig } from '../config/examConfig';
import ComingSoon from '../components/shared/ComingSoon';

const Courses = ({ selectedCourse }) => {
    const navigate = useNavigate();
    const currentField = selectedCourse?.field || 'Medicine';
    const config = getFeatureConfig(currentField, 'courses');

    if (!config.enabled) {
        return (
            <ComingSoon
                title={config.title}
                description={config.description}
                iconName={config.icon}
            />
        );
    }
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        clinicalTypes: [],
        degreeTypes: [],
        durations: []
    });
    const [selectedFilters, setSelectedFilters] = useState({
        clinicalType: '',
        degreeType: '',
        duration: ''
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
        fetchCourses();
    }, [debouncedSearch, selectedFilters]);

    const fetchFilters = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/courses/filters');
            const data = await response.json();
            if (data.success) {
                setFilters(data.filters);
            }
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
    };

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                search: debouncedSearch,
                ...selectedFilters,
                limit: 1000 // Get all for now as per design seems to be a list
            });
            // Remove empty filters
            for (const [key, value] of queryParams.entries()) {
                if (!value) queryParams.delete(key);
            }

            const response = await fetch(`http://localhost:5000/api/v1/courses?${queryParams}`);
            const result = await response.json();
            if (result.success) {
                setCourses(result.data);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
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
                    <h1 className="text-xl font-bold text-gray-900 text-center mb-6">Courses</h1>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-6 relative">
                        <input
                            type="text"
                            placeholder="Search courses"
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
                                onChange={(e) => handleFilterChange('clinicalType', e.target.value)}
                                value={selectedFilters.clinicalType}
                            >
                                <option value="">Clinical Type</option>
                                {filters.clinicalTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        <div className="relative group">
                            <select
                                className="appearance-none bg-white border border-gray-200 text-gray-500 py-1.5 pl-4 pr-10 rounded-full text-xs font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 cursor-pointer"
                                onChange={(e) => handleFilterChange('degreeType', e.target.value)}
                                value={selectedFilters.degreeType}
                            >
                                <option value="">Degree Types</option>
                                {filters.degreeTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        <div className="relative group">
                            <select
                                className="appearance-none bg-white border border-gray-200 text-gray-500 py-1.5 pl-4 pr-10 rounded-full text-xs font-medium focus:outline-none focus:border-gray-400 hover:border-gray-300 cursor-pointer"
                                onChange={(e) => handleFilterChange('duration', e.target.value)}
                                value={selectedFilters.duration}
                            >
                                <option value="">Degree Terms</option>
                                {filters.durations.map(duration => (
                                    <option key={duration} value={duration}>{duration}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="text-center text-xs text-gray-400 font-medium">
                        {loading ? 'Searching...' : `${courses.length} Courses found`}
                    </div>
                </div>

                {/* Courses Grid */}
                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {courses.map((course, index) => (
                                <motion.div
                                    key={course._id || index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.02 }}
                                    className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all cursor-pointer group flex items-start gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-gray-100 transition-colors">
                                        <GraduationCap size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xs font-medium text-gray-800 mb-1 truncate" title={course.courseName}>
                                            {course.courseName}
                                        </h3>
                                        <p className="text-[10px] text-gray-400 flex items-center gap-1.5 truncate">
                                            <span>{course.clinicalType}</span>
                                            <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                                            <span>{course.degreeType}</span>
                                            <span className="w-0.5 h-0.5 bg-gray-300 rounded-full"></span>
                                            <span>{course.duration}</span>
                                        </p>
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

export default Courses;
