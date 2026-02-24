
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter, ArrowUpDown, Info, AlertTriangle, ExternalLink, ChevronDown, Heart, RotateCcw, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

import { getFeatureConfig } from '../config/examConfig';
import ComingSoon from '../components/shared/ComingSoon';

const ClosingRankDetails = ({ selectedCourse }) => {
    const navigate = useNavigate();
    const { type } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentField = selectedCourse?.field || 'Medicine';
    const config = getFeatureConfig(currentField, 'closingRanks');

    if (!config.enabled) {
        return (
            <ComingSoon
                title={config.title}
                description={config.description}
                iconName={config.icon}
                backPath="/closing-ranks"
                backText="Back to Closing Ranks"
            />
        );
    }
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 50,
        total: 0,
        pages: 0
    });
    const [selectedCollege, setSelectedCollege] = useState(null);

    // Format type from URL param to readable string
    const formatType = (typeStr) => {
        if (!typeStr) return '';
        return typeStr.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const title = type === 'all-india-pg-medical' ? 'All India Counseling - PG Medical' : formatType(type);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/v1/closing-rank?page=${page}&limit=${pagination.limit}`);
            const result = await response.json();
            if (result.success) {
                setData(result.data);
                setPagination({
                    page: result.page,
                    limit: pagination.limit,
                    total: result.total,
                    pages: result.pages
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.page);
    }, [pagination.page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    const getClosingRankHeaders = () => {
        if (!data || data.length === 0) return [];
        const headers = new Set();
        data.forEach(item => {
            if (item.closingRanks) {
                item.closingRanks.forEach(cr => {
                    headers.add(`CR ${cr.year} ${cr.round}`);
                });
            }
        });
        return Array.from(headers).sort();
    };

    const closingRankHeaders = getClosingRankHeaders();

    const handleRowClick = (college) => {
        setSelectedCollege(college);
    };

    const closeModal = () => {
        setSelectedCollege(null);
    };

    // Helper to generate pagination numbers with ellipsis
    const getPaginationRange = () => {
        const totalPageCount = pagination.pages;
        const currentPage = pagination.page;
        const siblingCount = 1;

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return Array.from({ length: totalPageCount }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, "...", totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPageCount - rightItemCount + i + 1);
            return [firstPageIndex, "...", ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
            return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
        }
    };

    const paginationRange = getPaginationRange();

    return (
        <div className="p-3 md:p-4 h-[calc(100vh-64px)] flex flex-col box-border font-sans bg-gray-50 overflow-hidden">
            {/* Header Section */}
            <div className="flex-none flex flex-col gap-2 mb-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate('/closing-ranks')} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Closing Ranks</h1>
                        <a href="#" className="text-xs text-blue-600 hover:underline">What's this?</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 border border-yellow-200 text-yellow-800 px-2 py-1 rounded-md text-[10px] flex items-center gap-1.5 font-medium">
                            <Info size={12} />
                            Read this before looking at the Closing Ranks
                        </div>
                        <a href="#" className="text-[10px] text-gray-400 hover:text-gray-600 flex items-center gap-1">
                            <AlertTriangle size={10} />
                            Spotted an error?
                        </a>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-orange-500 font-medium hover:bg-gray-50 shadow-sm"
                    >
                        {title}
                        <ChevronDown size={14} className='text-gray-400' />
                    </motion.button>
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 shadow-sm"
                    >
                        Go to counselling
                        <ExternalLink size={12} />
                    </motion.a>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-[11px] text-gray-500 leading-tight">
                        Click on the record for detailed information and factors. (*) Indicates additional remarks available in Details & Factors. Click on Ranks to view the allotment list.
                    </p>
                </div>


                {/* Filter and Controls Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-3 mt-1">
                    <div className="text-xs font-semibold text-gray-500">
                        {pagination.total > 0 ? ((pagination.page - 1) * pagination.limit) + 1 : 0} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} Records
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>Select filter</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <ChevronDown size={14} />
                            </div>
                        </div>

                        <div className="flex items-center bg-white border border-orange-200 rounded-full px-1 py-0.5">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-orange-500 border-r border-orange-200"
                            >
                                <Heart size={12} fill="currentColor" />
                                Choice List
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 text-xs font-medium text-gray-500"
                            >
                                Ask every time
                            </motion.button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-50 shadow-sm"
                        >
                            <ArrowUpDown size={12} />
                            Sort
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-50 shadow-sm"
                        >
                            <Filter size={12} />
                            Filter
                        </motion.button>

                        {/* Pagination Controls (Compact) */}
                        <div className="flex items-center gap-1 ml-2 bg-white border border-gray-300 rounded-md p-0.5 shadow-sm">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1}
                                className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-600"
                            >
                                <ChevronLeft size={14} />
                            </motion.button>
                            {paginationRange && paginationRange.map((pageNum, idx) => {
                                if (pageNum === "...") {
                                    return <span key={idx} className="text-gray-400 px-1 text-[10px]">...</span>;
                                }
                                return (
                                    <motion.button
                                        key={idx}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`min-w-[20px] h-5 flex items-center justify-center text-[10px] font-medium rounded ${pagination.page === pageNum
                                            ? 'bg-blue-50 text-blue-600 font-bold'
                                            : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {pageNum}
                                    </motion.button>
                                );
                            })}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.pages}
                                className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 text-gray-600"
                            >
                                <ChevronRight size={14} />
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.9, rotate: -180 }}
                                className="p-1 rounded hover:bg-gray-100 text-gray-400"
                                onClick={() => fetchData(1)}
                            >
                                <RotateCcw size={12} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-auto relative custom-scrollbar">
                <table className="min-w-full divide-y divide-gray-200 text-[11px] text-left">
                    <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm border-b border-gray-200">
                        <tr>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">#</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Quota</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Category</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">State</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Institute</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Course</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Fee</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Stipend Year 1</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Bond Years</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Bond Penalty</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Beds</th>
                            {closingRankHeaders.map(header => (
                                <th key={header} className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        <AnimatePresence mode='wait'>
                            {loading ? (
                                <tr><td colSpan="100%" className="text-center py-8 text-gray-500">Loading...</td></tr>
                            ) : (
                                data.map((item, index) => (
                                    <motion.tr
                                        key={item._id || index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, delay: index * 0.01 }}
                                        className="hover:bg-blue-50/30 transition-colors cursor-pointer group border-b border-gray-100"
                                        onClick={() => handleRowClick(item)}
                                    >
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-400 font-medium">
                                            {((pagination.page - 1) * pagination.limit) + index + 1}
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700 font-medium">{item.quota}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700 font-medium">{item.category}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700">{item.state}</td>
                                        <td className="px-3 py-2 font-medium text-blue-600 hover:underline" onClick={(e) => { e.stopPropagation(); handleRowClick(item); }}>{item.institute}</td>
                                        <td className="px-3 py-2 text-gray-700 uppercase font-medium">{item.course}</td>
                                        <td className="px-3 py-2 text-gray-700">{item.fee}</td>
                                        <td className="px-3 py-2 text-gray-700">{item.stipendYear1 || '-'}</td>
                                        <td className="px-3 py-2 text-gray-700">{item.bondYears || '-'}</td>
                                        <td className="px-3 py-2 text-gray-700">{item.bondPenalty || '-'}</td>
                                        <td className="px-3 py-2 text-gray-700">{item.beds || '-'}</td>
                                        {closingRankHeaders.map(header => {
                                            const match = header.match(/CR (\d+) (\d+)/);
                                            if (!match) return <td key={header} className="px-4 py-3 text-center text-gray-400">-</td>;
                                            const [_, year, round] = match;
                                            const rankData = item.closingRanks?.find(cr => cr.year === year && cr.round === round);
                                            return (
                                                <td key={header} className="px-3 py-2 whitespace-nowrap text-blue-600 font-medium hover:underline text-center">
                                                    {rankData ? rankData.value : '-'}
                                                </td>
                                            );
                                        })}
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* College Detail Modal */}
            <AnimatePresence>
                {selectedCollege && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-sans"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white z-10">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4 8 4v14" /><path d="M8 21v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                        <span>Location: <span className="text-orange-500 font-medium">{selectedCollege.state}</span></span>
                                        <span className="mx-1">|</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>
                                        <span>Beds: <span className="text-orange-500 font-medium">{selectedCollege.beds || 'N/A'}</span></span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-blue-600">{selectedCollege.institute}</h2>
                                    <p className="text-gray-500 text-sm mt-1">{selectedCollege.course}</p>
                                </div>
                                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                </button>
                            </div>

                            <div className="p-6 bg-orange-50/30">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-white p-4 rounded border border-orange-100 flex items-start gap-3 shadow-sm">
                                        <div className="bg-orange-100 p-2 rounded text-orange-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">COURSE</p>
                                            <p className="text-gray-800 font-medium">{selectedCollege.course}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded border border-orange-100 flex items-start gap-3 shadow-sm">
                                        <div className="bg-orange-100 p-2 rounded text-orange-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">QUOTA</p>
                                            <p className="text-gray-800 font-medium">{selectedCollege.quota}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded border border-orange-100 flex items-start gap-3 shadow-sm">
                                        <div className="bg-orange-100 p-2 rounded text-orange-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 7h10" /><path d="M7 12h10" /><path d="M7 17h10" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">CATEGORY</p>
                                            <p className="text-gray-800 font-medium">{selectedCollege.category}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
                                    <p className="text-sm font-semibold text-blue-600 mb-2">ALL INDIA RANK</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {['2023', '2024', '2025'].map(year => {
                                            // Find ranks for this year
                                            const ranks = selectedCollege.closingRanks?.filter(cr => cr.year === year) || [];
                                            // Ensure we have 3 rounds structure even if empty
                                            const round1 = ranks.find(r => r.round === '1')?.value || '-';
                                            const round2 = ranks.find(r => r.round === '2')?.value || '-';
                                            const round3 = ranks.find(r => r.round === '3')?.value || '-';

                                            return (
                                                <div key={year} className="border rounded bg-white overflow-hidden">
                                                    <div className="bg-blue-600 text-white text-center py-1 text-sm font-bold">{year}</div>
                                                    <div className="flex justify-between p-2 text-xs text-gray-500 border-b">
                                                        <span>Round 1</span><span>Round 2</span><span>Round 3</span>
                                                    </div>
                                                    <div className="flex justify-between p-3 font-medium text-gray-800">
                                                        <span className="text-center w-1/3">{round1}</span>
                                                        <span className="text-center w-1/3">{round2}</span>
                                                        <span className="text-center w-1/3">{round3}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                                        <p className="text-xs font-bold text-gray-700 uppercase mb-4">FEE DETAILS</p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span className="font-semibold text-gray-600">Fee</span><span>: {selectedCollege.fee}</span></div>
                                            <div className="flex justify-between"><span className="font-semibold text-gray-600">Hostel Fee</span><span>: N/A</span></div>
                                            <div className="pt-2 border-t mt-2">
                                                <span className="font-semibold block mb-1 text-gray-700">Remarks</span>
                                                <p className="text-gray-600 text-xs">
                                                    Mode of Payment : DD / Online. Annual fees : {selectedCollege.fee} (Includes Tuition fee + Library fees + Faculty Management fees + University development fund + Other fees). Additional Security Money might apply.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                                        <p className="text-xs font-bold text-gray-700 uppercase mb-4">BOND DETAILS</p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span className="font-semibold text-gray-600">Bond Years</span><span>: {selectedCollege.bondYears || 0}</span></div>
                                            <div className="flex justify-between"><span className="font-semibold text-gray-600">Bond Penalty</span><span>: {selectedCollege.bondPenalty || '0'}</span></div>
                                            <div className="pt-2 border-t mt-2">
                                                <span className="font-semibold block mb-1 text-gray-700">Remarks</span>
                                                <p className="text-gray-600 text-xs">-</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                                        <p className="text-xs font-bold text-gray-700 uppercase mb-4">STIPEND DETAILS</p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span className="font-semibold text-gray-600">Stipend Year 1</span><span>: {selectedCollege.stipendYear1 || 'N/A'}</span></div>
                                            <div className="flex justify-between"><span className="font-semibold text-gray-600">Stipend Year 2</span><span>: N/A</span></div>
                                            <div className="flex justify-between"><span className="font-semibold text-gray-600">Stipend Year 3</span><span>: N/A</span></div>
                                            <div className="pt-2 border-t mt-2">
                                                <span className="font-semibold block mb-1 text-gray-700">Remarks</span>
                                                <p className="text-gray-600 text-xs">Includes HRA. Tax deduction applicable.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                                        <p className="text-xs font-bold text-gray-700 uppercase mb-4">DEDUCTION DETAILS</p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span className="font-semibold text-gray-600 w-1/2">Seat Leaving Penalty (Course discontinuation)</span><span className="w-1/2 text-right">: N/A</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ClosingRankDetails;
