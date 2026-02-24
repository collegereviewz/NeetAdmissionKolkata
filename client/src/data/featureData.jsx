import React from 'react';
import {
    PlayCircle, LayoutGrid, BarChart3, Grid3X3, Receipt,
    GitMerge, Award, TrendingUp, Building2, Landmark, GraduationCap
} from 'lucide-react';

export const featureCardsMap = {
    'Medicine': [
        { title: 'Videos', icon: <PlayCircle size={24} className="text-college-primary" />, years: 'Latest Updates', path: '/videos' },
        { title: 'Allotments', icon: <LayoutGrid size={24} className="text-college-primary" />, years: '2023, 2024, 2025', path: '/allotments' },
        { title: 'Closing Ranks', icon: <BarChart3 size={24} className="text-college-primary" />, years: '2023, 2024, 2025', path: '/closing-ranks' },
        { title: 'Seat Matrix', icon: <Grid3X3 size={24} className="text-college-primary" />, years: '2023, 2024, 2025', path: '/seat-matrix' },
        { title: 'Fee, Stipend & Bond', icon: <Receipt size={24} className="text-college-primary" />, years: '2025, 2023, 2024', path: '/fee-stipend-bond' },
    ],
    'Engineering': [
        { title: 'Videos', icon: <PlayCircle size={24} className="text-college-primary" />, years: 'Latest Updates', path: '/videos' },
        { title: 'Seat Allocation', icon: <LayoutGrid size={24} className="text-college-primary" />, years: '2023, 2024, 2025', path: '/allotments' },
        { title: 'Opening & Closing Ranks', icon: <BarChart3 size={24} className="text-college-primary" />, years: '2023, 2024, 2025', path: '/closing-ranks' },
        { title: 'Seat Matrix', icon: <Grid3X3 size={24} className="text-college-primary" />, years: '2023, 2024, 2025', path: '/seat-matrix' },
        { title: 'Fee Structure', icon: <Receipt size={24} className="text-college-primary" />, years: '2025, 2024', path: '/fee-stipend-bond' },
    ]
};

export const quotasMap = {
    'Medicine': [
        'AIQ', 'DNB Post MBBS', 'NBE Diploma', 'MNG', 'MM', 'JM', 'NRI', 'DU', 'IP', 'BHU', 'AMU', 'CIQ', 'AFMS', 'AFMS-DNB'
    ],
    'Engineering': [
        'All India', 'Home State', 'Other State', 'Female-only', 'EWS', 'OBC-NCL', 'SC', 'ST'
    ]
};

export const defaultQuotas = ['General'];
