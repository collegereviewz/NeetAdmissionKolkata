import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, BookOpen, DollarSign, Award, Clock, AlertCircle, Building, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

import { getFeatureConfig } from '../config/examConfig';
import ComingSoon from '../components/shared/ComingSoon';

const InstituteDetails = ({ selectedCourse }) => {
    const currentField = selectedCourse?.field || 'Medicine';
    const config = getFeatureConfig(currentField, 'instituteDetails');

    if (!config.enabled && currentField !== 'Medicine') {
        return (
            <ComingSoon
                title={config.title}
                description={config.description}
                iconName={config.icon}
                backPath="/institutes"
                backText="Back to Institutes"
            />
        );
    }
    const { id } = useParams();
    const navigate = useNavigate();
    const [institute, setInstitute] = useState(null);
    const [loading, setLoading] = useState(true);
    // Remove activeTab state, using refs for scroll
    const [closingRanks, setClosingRanks] = useState([]);
    const [selectedInstituteCourse, setSelectedInstituteCourse] = useState(null);
    const [courseList, setCourseList] = useState([]);

    const overviewRef = useRef(null);
    const closingRanksRef = useRef(null);
    const feeRef = useRef(null);
    const [activeSection, setActiveSection] = useState('overview');


    useEffect(() => {
        const fetchInstituteDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/institutes/${id}`);
                if (response.data.success) {
                    setInstitute(response.data.data);
                    // Fetch closing ranks for this institute
                    // Note: This relies on exact name match. 
                    // ideally we'd use ID if closingRank had instituteId, but schema uses name string.
                    fetchClosingRanks(response.data.data.instituteName);
                }
            } catch (error) {
                console.error("Error fetching institute details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInstituteDetails();
        }
    }, [id]);

    const fetchClosingRanks = async (instituteName) => {
        try {
            // Encode the institute name for the URL query
            const encodedName = encodeURIComponent(instituteName);
            const response = await axios.get(`${API_BASE_URL}/closing-rank?institute=${encodedName}&limit=1000`);
            if (response.data.success) {
                setClosingRanks(response.data.data);

                // Extract unique courses
                const courses = [...new Set(response.data.data.map(item => item.course))].sort();
                setCourseList(courses);
                if (courses.length > 0) {
                    setSelectedInstituteCourse(courses[0]);
                }
            }
        } catch (error) {
            console.error("Error fetching closing ranks:", error);
        }
    };

    const getChartData = () => {
        if (!selectedInstituteCourse || !closingRanks.length) return [];

        const courseData = closingRanks.filter(item => item.course === selectedInstituteCourse);

        // We want to graph Opening/Closing ranks across rounds for different years.
        // Structure: [{ name: 'Round 1', 2023: 1200, 2024: 1100, 2025: 1050 }, ...]

        const chartDataMap = {};
        const rounds = ['1', '2', '3']; // Predefine rounds or extract dynamically

        rounds.forEach(round => {
            chartDataMap[`Round ${round}`] = { name: `Round ${round}` };
        });

        courseData.forEach(item => {
            if (item.closingRanks) {
                item.closingRanks.forEach(rankEntry => {
                    const roundKey = `Round ${rankEntry.round}`;
                    if (chartDataMap[roundKey]) {
                        // Ensure value is a number
                        const val = parseInt(rankEntry.value, 10);
                        if (!isNaN(val)) {
                            chartDataMap[roundKey][rankEntry.year] = val;
                        }
                    }
                });
            }
        });

        return Object.values(chartDataMap);
    };

    const scrollToSection = (sectionRef, sectionName) => {
        setActiveSection(sectionName);
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Intersection observer to update active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200; // Offset for header

            if (feeRef.current && feeRef.current.offsetTop <= scrollPosition) {
                setActiveSection('fee & more');
            } else if (closingRanksRef.current && closingRanksRef.current.offsetTop <= scrollPosition) {
                setActiveSection('closing ranks');
            } else if (overviewRef.current && overviewRef.current.offsetTop <= scrollPosition) {
                setActiveSection('overview');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!institute) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Institute Not Found</h2>
                <button onClick={() => navigate('/institutes')} className="text-blue-600 hover:underline flex items-center gap-1">
                    <ArrowLeft size={16} /> Back to Institutes
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans relative">
            {/* Header - Sticky */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-6 pt-6 pb-0">
                    <button onClick={() => navigate('/institutes')} className="text-gray-500 hover:text-gray-800 text-sm flex items-center gap-1 mb-4">
                        <ArrowLeft size={14} /> Institutes
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="text-gray-800 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-none">{institute.instituteName}</span>
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                        <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                            <Building size={32} className="text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{institute.instituteName}</h1>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <span className="text-orange-500 font-medium">{institute.university}</span>
                                </div>
                                <span className="text-gray-300 hidden md:inline">|</span>
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {institute.state}
                                </div>
                                <span className="text-gray-300 hidden md:inline">|</span>
                                <div className="flex items-center gap-1">
                                    <span className='bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold'>{institute.type || 'Institute'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex gap-8">
                        {['overview', 'closing ranks', 'fee & more'].map(section => (
                            <button
                                key={section}
                                onClick={() => {
                                    if (section === 'overview') scrollToSection(overviewRef, 'overview');
                                    if (section === 'closing ranks') scrollToSection(closingRanksRef, 'closing ranks');
                                    if (section === 'fee & more') scrollToSection(feeRef, 'fee & more');
                                }}
                                className={`pb-3 text-sm font-medium capitalize transition-colors relative ${activeSection === section ? 'text-orange-600' : 'text-gray-500 hover:text-gray-800'
                                    }`}
                            >
                                {section}
                                {activeSection === section && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Content - Single Page Scroll */}
            <div className="max-w-7xl mx-auto p-6 space-y-12 pb-24">

                {/* Overview Section */}
                <div ref={overviewRef} className="scroll-mt-32">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 hidden">Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Award className="text-blue-500" size={20} /> About Institute
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">State</p>
                                    <p className="text-gray-800 font-medium">{institute.state}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Type</p>
                                    <p className="text-gray-800 font-medium">{institute.type}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Management</p>
                                    <p className="text-gray-800 font-medium">{institute.management}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">University</p>
                                    <p className="text-gray-800 font-medium">{institute.university}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Hospital Beds</p>
                                    <p className="text-gray-800 font-medium flex items-center gap-2">
                                        <Bed size={16} className="text-orange-400" />
                                        {institute.beds || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <AlertCircle className="text-orange-500" size={20} /> Quick Stats
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-sm text-gray-600 font-medium">Total Courses</span>
                                    <span className="text-lg font-bold text-blue-600">{courseList.length}</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-sm text-gray-600 font-medium">Est. Bond Details</span>
                                    <span className="text-sm font-bold text-gray-800">Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Closing Ranks Section */}
                <div ref={closingRanksRef} className="scroll-mt-32">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Closing Ranks</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row h-[600px] overflow-hidden">
                        {/* Sidebar Course List */}
                        <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col bg-gray-50 h-1/3 md:h-full">
                            <div className="p-4 border-b border-gray-200 bg-white shadow-sm z-10">
                                <h3 className="font-bold text-gray-800 text-sm">Courses</h3>
                                <div className="relative mt-2">
                                    <input
                                        type="text"
                                        placeholder="Search courses"
                                        className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2.5 top-2 text-gray-400 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="overflow-y-auto flex-1 custom-scrollbar p-2">
                                {courseList.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500 text-sm">No courses found</div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-2 mb-2 px-1 overflow-x-auto pb-1 no-scrollbar">
                                            <button className="px-2 py-1 text-[10px] bg-orange-500 text-white rounded-full whitespace-nowrap">All</button>
                                            <button className="px-2 py-1 text-[10px] bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 whitespace-nowrap">Clinical</button>
                                            <button className="px-2 py-1 text-[10px] bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 whitespace-nowrap">Para</button>
                                        </div>

                                        {courseList.map(course => (
                                            <button
                                                key={course}
                                                onClick={() => setSelectedInstituteCourse(course)}
                                                className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between group ${selectedInstituteCourse === course
                                                    ? 'bg-white shadow-sm text-orange-600 border border-orange-100'
                                                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                                                    }`}
                                            >
                                                <span className="truncate mr-2" title={course}>{course}</span>
                                                {selectedInstituteCourse === course && <ChevronRight size={14} className="shrink-0" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Chart Area */}
                        <div className="flex-1 p-6 flex flex-col h-2/3 md:h-full overflow-y-auto">
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <BookOpen size={20} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">{selectedInstituteCourse}</h2>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            {institute.type} • Degree • 3 years
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-100 p-6 flex-1 min-h-[300px]">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Closing Rank Trends</h3>
                                        <p className="text-sm text-gray-500">{institute.instituteName}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium border border-orange-100">All India Rank</span>
                                    </div>
                                </div>

                                <div className="h-[250px] md:h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                                reversed={true}
                                                label={{ value: 'Closing Rank (lower is better)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF', fontSize: 11 } }}
                                            />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                                            />
                                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                            <Line type="monotone" dataKey="2023" stroke="#EAB308" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="2023" />
                                            <Line type="monotone" dataKey="2024" stroke="#22C55E" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="2024" />
                                            <Line type="monotone" dataKey="2025" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="2025" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fee & More Section */}
                <div ref={feeRef} className="scroll-mt-32">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Fee & More</h2>
                    {/* Filters row */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium">All</span>
                        <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-50">Clinical</span>
                        <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-50">Pre-Clinical</span>
                        <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-50">Para-Clinical</span>
                        <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-50">Non-Clinical</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {courseList.map(courseName => {
                            const courseData = closingRanks.find(item => item.course === courseName) || {};
                            return (
                                <div key={courseName} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="bg-gray-50 p-2.5 rounded-lg text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                                            <BookOpen size={18} />
                                        </div>
                                        <h3 className="font-bold text-gray-800 text-sm leading-snug pt-1">{courseName}</h3>
                                    </div>

                                    <div className="space-y-3 pt-3 border-t border-gray-50">
                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                <DollarSign size={14} className="text-gray-400" />
                                                <span>Fee</span>
                                            </div>
                                            <span className="font-semibold text-gray-700">{courseData.fee || 'N/A'}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                <Clock size={14} className="text-gray-400" />
                                                <span>Bond</span>
                                            </div>
                                            <span className="font-medium text-gray-700">{courseData.bondYears || 0} Years</span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                <AlertCircle size={14} className="text-gray-400" />
                                                <span>Penalty</span>
                                            </div>
                                            <span className="font-medium text-gray-700">{courseData.bondPenalty || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InstituteDetails;
