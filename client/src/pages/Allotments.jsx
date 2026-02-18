
import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Allotments = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const counsellings = [
        { id: 1, name: 'All India Counseling - PG Medical', active: true },
        { id: 2, name: 'Armed Forces Medical Services - AFMS (through MCC) - PG Medical', active: false },
        { id: 3, name: 'Open States (Private Institute seats available for all candidates)', active: false },
        { id: 4, name: 'Andhra Pradesh Government Quota - PG Medical', active: false },
        { id: 5, name: 'Andhra Pradesh Management Quota - PG Medical', active: false },
        { id: 6, name: 'Assam - PG Medical', active: false },
        { id: 7, name: 'Bihar - PG Medical', active: false },
        { id: 8, name: 'Chandigarh - PG Medical', active: false },
        { id: 9, name: 'Chhattisgarh - PG Medical', active: false },
        { id: 10, name: 'Dadra and Nagar Haveli - PG Medical', active: false },
        { id: 11, name: 'Delhi - PG Medical', active: false },
        { id: 12, name: 'DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)', active: false },
    ];

    const filteredCounsellings = counsellings.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (counselling) => {
        if (counselling.name === 'All India Counseling - PG Medical') {
            navigate('/allotments/details/all-india-pg-medical');
        } else {
            alert("Data coming soon for " + counselling.name);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
                    <h1 className="text-xl font-bold text-gray-800">Allotments</h1>
                </div>

                <div className="p-4">
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Counselling"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 sm:text-sm transition duration-150 ease-in-out"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        {filteredCounsellings.map((counselling) => (
                            <div
                                key={counselling.id}
                                onClick={() => handleSelect(counselling)}
                                className={`flex items-center justify-between p-4 rounded-lg border border-gray-100 cursor-pointer transition-colors duration-150 relative overflow-hidden group hover:bg-gray-50 hover:border-blue-200 ${counselling.name === 'Chhattisgarh - PG Medical' ? 'bg-gray-100' : 'bg-white'}`}
                            >
                                <span className="text-gray-700 font-medium z-10 relative">{counselling.name}</span>
                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors z-10 relative" />
                                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Allotments;
