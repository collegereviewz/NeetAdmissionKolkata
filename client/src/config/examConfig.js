/**
 * examConfig.js
 * Central configuration to manage feature availability and labels for different exam fields.
 */

export const examConfig = {
    'Medicine': {
        features: {
            allotments: { enabled: true },
            closingRanks: { enabled: true },
            feeStipendBond: { enabled: true, showStipend: true, showBond: true },
            seatIncrease: { enabled: true },
            seatMatrix: { enabled: true },
            institutes: { enabled: true },
            universities: { enabled: true },
            counsellings: { enabled: true },
            courses: { enabled: true }
        },
        labels: {
            feeTab: 'Fee, Stipend & Bond'
        }
    },
    'Engineering': {
        features: {
            allotments: {
                enabled: false,
                title: 'Engineering Allotments',
                description: 'Allotment data for Engineering counselling (JoSAA, CSAB, JAC Delhi, etc.) will be uploaded soon. We are syncing with official results portals.',
                icon: 'GitMerge'
            },
            closingRanks: {
                enabled: false,
                title: 'Engineering Closing Ranks',
                description: 'Closing rank data for Engineering counselling (JoSAA, CSAB, JAC Delhi, etc.) will be uploaded soon. We are processing the latest cutoff ranks for the session.',
                icon: 'Award'
            },
            feeStipendBond: {
                enabled: false,
                showStipend: false,
                showBond: false,
                title: 'Engineering Fees',
                description: 'Fee details for Engineering colleges (IITs, NITs, IIITs, etc.) will be uploaded soon. We are compiling the latest fee structures for the 2025-26 academic session.',
                icon: 'ReceiptIndianRupee'
            },
            seatIncrease: {
                enabled: false,
                title: 'Engineering Seat Increase',
                description: 'Data for Engineering counselling seat increases will be uploaded soon. We are currently processing the official JoSAA and state-level notifications.',
                icon: 'TrendingUp'
            },
            seatMatrix: {
                enabled: false,
                title: 'Engineering Seat Matrix',
                description: 'Seat matrix data for Engineering courses (IITs, NITs, IIITs, etc.) for the 2025-26 session will be uploaded soon. We are processing the latest vacancy and seat allocation data.',
                icon: 'Info'
            },
            institutes: {
                enabled: false,
                title: 'Engineering Institutes',
                description: 'A comprehensive list of Engineering colleges (IITs, NITs, IIITs, GFTIs, etc.) will be available soon. We are compiling college profiles, seat matrix, and fee details for the 2025-26 session.',
                icon: 'Building2'
            },
            universities: {
                enabled: false,
                title: 'Engineering Universities',
                description: 'A detailed database of Engineering Universities and Boards for JEE Main, Advanced, and State Engineering Entrance Exams will be available soon.',
                icon: 'Landmark'
            },
            counsellings: {
                enabled: false,
                title: 'Engineering Counsellings',
                description: 'Information about JoSAA, CSAB, and various state-level Engineering counselling processes (WBJEE, COMEDK, REAP, etc.) will be available soon.',
                icon: 'Scale'
            },
            courses: {
                enabled: false,
                title: 'Engineering Courses',
                description: 'Specifications for Engineering branches (B.Tech, B.E., B.Arch, B.Plan, etc.) and their specializations for the 2025-26 academic session will be uploaded soon.',
                icon: 'GraduationCap'
            },
            instituteDetails: {
                enabled: false,
                title: 'Engineering Institute Details',
                description: 'Detailed information, closing ranks, and fee structures for Engineering colleges for the 2025-26 session will be available soon.',
                icon: 'Building'
            }
        },
        labels: {
            feeTab: 'Fee'
        }
    }
};

/**
 * Helper to get feature configuration safely
 */
export const getFeatureConfig = (field, featureKey) => {
    const config = examConfig[field] || examConfig['Medicine']; // Default to Medicine if unknown
    return config.features[featureKey] || { enabled: false };
};
