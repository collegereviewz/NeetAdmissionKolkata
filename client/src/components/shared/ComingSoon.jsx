import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const ComingSoon = ({
    title = "Data Coming Soon",
    description = "We are currently processing official notifications and data for this section. It will be available shortly.",
    iconName = "Clock",
    backPath = "/",
    backText = "Return to Dashboard"
}) => {
    const navigate = useNavigate();
    const Icon = LucideIcons[iconName] || LucideIcons.Clock;

    return (
        <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 text-center max-w-lg"
            >
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon size={40} className="text-blue-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    {description}
                </p>
                <button
                    onClick={() => navigate(backPath)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 mx-auto"
                >
                    {backText}
                </button>
            </motion.div>
        </div>
    );
};

export default ComingSoon;
