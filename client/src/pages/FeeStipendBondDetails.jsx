
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter, ArrowUpDown, Info, AlertTriangle, ExternalLink, ChevronDown, Heart, RotateCcw, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const FeeStipendBondDetails = () => {
    const navigate = useNavigate();
    const { type } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 50,
        total: 0,
        pages: 0
    });
    const [selectedCollege, setSelectedCollege] = useState(null);

    const openModal = (college) => {
        setSelectedCollege(college);
    };

    const closeModal = () => {
        setSelectedCollege(null);
    };

    // Format type from URL param to readable string
    const formatType = (typeStr) => {
        if (!typeStr) return '';
        return typeStr.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const title = type === 'all-india-pg-medical' ? 'All India Counseling - PG Medical' : formatType(type);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/v1/fee-stipend-bond?page=${page}&limit=${pagination.limit}`);
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
                        <button onClick={() => navigate('/fee-stipend-bond')} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Fee, Stipend and Bond</h1>
                        <a href="#" className="text-xs text-blue-600 hover:underline">What's this?</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 border border-yellow-200 text-yellow-800 px-2 py-1 rounded-md text-[10px] flex items-center gap-1.5 font-medium">
                            <Info size={12} />
                            Read this before looking at the Fee, Stipend and Bond
                        </div>
                        <a href="#" className="text-[10px] text-gray-400 hover:text-gray-600 flex items-center gap-1">
                            <AlertTriangle size={10} />
                            Spotted an error? Let us know
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
                        Click on the record for detailed information and factors.
                        <br />
                        (*) Indicates additional remarks available in Details & Factors.
                    </p>
                </div>


                {/* Filter and Controls Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-3 mt-1">
                    <div className="text-xs font-semibold text-gray-500">
                        {pagination.total > 0 ? ((pagination.page - 1) * pagination.limit) + 1 : 0} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} Records in 2025 session
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
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">State</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Institute</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Course</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Quota</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Fee</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Stipend Year 1</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Bond Years</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Bond Penalty</th>
                            <th className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wider whitespace-nowrap bg-gray-100 sticky top-0">Beds</th>
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
                                        onClick={() => openModal(item)} // Added onClick to open modal
                                    >
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700">{item.state}</td>
                                        <td className="px-3 py-2 font-medium text-blue-600 hover:underline">{item.institute}</td>
                                        <td className="px-3 py-2 text-gray-700 uppercase font-medium">{item.course}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-gray-700 font-medium">{item.quota}</td>
                                        <td className="px-3 py-2 text-gray-700 font-bold">{item.fee}</td>
                                        <td className="px-3 py-2 text-gray-700">{item.stipendYear1 || '-'}</td>
                                        <td className="px-3 py-2 text-gray-700">{item.bondYears || '-'}</td>
                                        <td className="px-3 py-2 text-gray-700">{item.bondPenalty || '-'}</td>
                                        <td className="px-3 py-2 text-gray-700">{item.beds || '-'}</td>
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
                            className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-xl sticky top-0 z-10">
                                <h2 className="text-lg font-bold text-gray-800">Factors & Details</h2>
                                <div className="flex items-center gap-4">
                                    <a href="#" className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                                        <AlertTriangle size={12} />
                                        Spotted an error? Let us know
                                    </a>
                                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                {/* Institute Info Section */}
                                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4 8 4v14" /><path d="M8 21v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{selectedCollege.institute}</h1>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                    Location: <span className="text-orange-500 font-medium">{selectedCollege.state}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>
                                                    Beds: <span className="text-orange-500 font-medium">{selectedCollege.beds || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-orange-200 text-orange-500 px-3 py-1 rounded text-xs font-medium">
                                        Session 2025
                                    </div>
                                </div>

                                {/* Course & Quota Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white border border-red-100 rounded-lg p-4 flex items-center gap-4">
                                        <div className="bg-red-50 p-2 rounded text-orange-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">COURSE</p>
                                            <p className="text-gray-900 font-medium">{selectedCollege.course}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white border border-red-100 rounded-lg p-4 flex items-center gap-4">
                                        <div className="bg-red-50 p-2 rounded text-orange-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0-.73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">QUOTA</p>
                                            <p className="text-gray-900 font-medium">{selectedCollege.quota}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Fee Details */}
                                    <div className="bg-white border text-left border-red-100 rounded-lg p-5 shadow-sm">
                                        <p className="text-[10px] font-bold text-gray-900 uppercase mb-4 tracking-wider">FEE DETAILS</p>
                                        <div className="space-y-3 text-sm">
                                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                                <span className="font-semibold text-gray-900">Fee</span>
                                                <span className="text-gray-900 font-medium">: {selectedCollege.fee}</span>
                                            </div>
                                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                                <span className="font-semibold text-gray-900">Hostel Fee</span>
                                                <span className="text-gray-900 font-medium">: -</span>
                                            </div>
                                            <div className="pt-3 border-t border-gray-100 mt-3">
                                                <span className="font-bold block mb-1 text-gray-900 text-xs">Remarks</span>
                                                <p className="text-gray-600 text-[11px] leading-relaxed">
                                                    -
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bond Details */}
                                    <div className="bg-white border text-left border-red-100 rounded-lg p-5 shadow-sm">
                                        <p className="text-[10px] font-bold text-gray-900 uppercase mb-4 tracking-wider">BOND DETAILS</p>
                                        <div className="space-y-3 text-sm">
                                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                                <span className="font-semibold text-gray-900">Bond Years</span>
                                                <span className="text-gray-900 font-medium">: {selectedCollege.bondYears || '-'}</span>
                                            </div>
                                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                                <span className="font-semibold text-gray-900">Bond Penalty</span>
                                                <span className="text-gray-900 font-medium">: {selectedCollege.bondPenalty || '-'}</span>
                                            </div>
                                            <div className="pt-3 border-t border-gray-100 mt-3">
                                                <span className="font-bold block mb-1 text-gray-900 text-xs">Remarks</span>
                                                <p className="text-gray-600 text-[11px] leading-relaxed">
                                                    -
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stipend Details */}
                                    <div className="bg-white border text-left border-red-100 rounded-lg p-5 shadow-sm">
                                        <p className="text-[10px] font-bold text-gray-900 uppercase mb-4 tracking-wider">STIPEND DETAILS</p>
                                        <div className="space-y-3 text-sm">
                                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                                <span className="font-semibold text-gray-900">Stipend Year 1</span>
                                                <span className="text-gray-900 font-medium">: {selectedCollege.stipendYear1 || '-'}</span>
                                            </div>
                                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                                <span className="font-semibold text-gray-900">Stipend Year 2</span>
                                                <span className="text-gray-900 font-medium">: -</span>
                                            </div>
                                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                                <span className="font-semibold text-gray-900">Stipend Year 3</span>
                                                <span className="text-gray-900 font-medium">: -</span>
                                            </div>
                                            <div className="pt-3 border-t border-gray-100 mt-3">
                                                <span className="font-bold block mb-1 text-gray-900 text-xs">Remarks</span>
                                                <p className="text-gray-600 text-[11px] leading-relaxed">-</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Deduction Details */}
                                    <div className="bg-white border text-left border-red-100 rounded-lg p-5 shadow-sm">
                                        <p className="text-[10px] font-bold text-gray-900 uppercase mb-4 tracking-wider">DEDUCTION DETAILS</p>
                                        <div className="space-y-3 text-sm">
                                            <div className="grid grid-cols-[100px_1fr] gap-2">
                                                <span className="font-semibold text-gray-900">Seat Leaving Penalty (Course discontinuation)</span>
                                                <span className="text-gray-900 font-medium">: -</span>
                                            </div>
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

export default FeeStipendBondDetails;
