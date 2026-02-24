export const SCRAPING_STRATEGIES = {
    NIC_PORTAL: 'NIC_PORTAL',     // Sites like mcc.nic.in, wbmcc.nic.in
    DME_ASSAM: 'DME_ASSAM',       // Specific structure for Assam DME
    KEA_KARNATAKA: 'KEA_KARNATAKA', // Karnataka KEA
    TAMIL_NADU: 'TAMIL_NADU',     // tnmedicalselection.net
    UP_PORTAL: 'UP_PORTAL',       // upneet.gov.in
    GENERIC_LIST: 'GENERIC_LIST'  // Fallback list of links
};

export const counsellingSources = [
    // Medicine - UG (Under Graduation)
    { name: 'All India Counseling - UG Medical', url: 'https://mcc.nic.in/ug-medical-counselling/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'UG' },
    { name: 'West Bengal - UG Medical', url: 'https://wbmcc.nic.in/ug-medical-counselling/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'UG' },

    // Medicine - PG (Post Graduation)
    { name: 'All India Counseling - PG Medical', url: 'https://mcc.nic.in/pg-medical-counselling/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'Armed Forces Medical Services - AFMS (through MCC) - PG Medical', url: 'https://mcc.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'DNB - Inservice Seats - PG Medical', url: 'https://natboard.edu.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'DNB - PDCET - PG Medical', url: 'https://natboard.edu.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)', url: 'https://natboard.edu.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Open States (Private Institute seats available for all candidates)', url: 'https://mcc.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },

    // Medicine - PG (State)
    { name: 'Andaman & Nicobar Islands - PG Medical', url: 'https://mcc.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'Andhra Pradesh Government Quota - PG Medical', url: 'https://dme.ap.nic.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Andhra Pradesh Management Quota - PG Medical', url: 'https://dme.ap.nic.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Arunachal Pradesh - PG Medical', url: 'https://dme.arunachal.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Assam - PG Medical', url: 'https://dme.assam.gov.in/latest', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Bihar - PG Medical', url: 'https://bceceboard.bihar.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Chandigarh - PG Medical', url: 'https://gmch.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Chhattisgarh - PG Medical', url: 'https://cgdme.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Dadra and Nagar Haveli - PG Medical', url: 'https://www.namomeriadmission.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'Delhi - PG Medical', url: 'https://mcc.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'Goa - PG Medical', url: 'https://dte.goa.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Gujarat - PG Medical', url: 'https://www.medadmgujarat.org/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Haryana - PG Medical', url: 'https://uhsrcounseling.com/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Himachal Pradesh - PG Medical', url: 'https://amruhp.ac.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Jammu and Kashmir - PG Medical', url: 'https://jkbopee.gov.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'Jharkhand - PG Medical', url: 'https://jceceb.jharkhand.gov.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'Karnataka - PG Medical', url: 'https://kea.kar.nic.in/', strategy: SCRAPING_STRATEGIES.KEA_KARNATAKA, field: 'Medicine', level: 'PG' },
    { name: 'Kerala - PG Medical', url: 'https://cee.kerala.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Madhya Pradesh - PG Medical', url: 'https://dme.mponline.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Maharashtra - PG Medical', url: 'https://cetcell.mahacet.org/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Manipur-JNIMS - PG Medical', url: 'https://manipurhealthdirectorate.mn.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Manipur-RIMS - PG Medical', url: 'https://manipurhealthdirectorate.mn.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Mizoram - PG Medical', url: 'https://dhte.mizoram.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'NEIGRIHMS - PG Medical', url: 'https://www.neigrihms.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Odisha - PG Medical', url: 'https://dmetodisha.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Pondicherry - PG Medical', url: 'https://centacpuducherry.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Punjab - PG Medical', url: 'https://bfuhs.ac.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Rajasthan - PG Medical', url: 'https://rajneetpg2024.org/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Sikkim - PG Medical', url: 'https://www.dtesikkim.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'Tamil Nadu Government Quota - PG Medical', url: 'https://tnmedicalselection.net/', strategy: SCRAPING_STRATEGIES.TAMIL_NADU, field: 'Medicine', level: 'PG' },
    { name: 'Tamil Nadu Management Quota - PG Medical', url: 'https://tnmedicalselection.net/', strategy: SCRAPING_STRATEGIES.TAMIL_NADU, field: 'Medicine', level: 'PG' },
    { name: 'Telangana Government Quota - PG Medical', url: 'https://knruhs.telangana.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Telangana Management Quota - PG Medical', url: 'https://knruhs.telangana.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Tripura - PG Medical', url: 'https://trmcc.admissions.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'Uttarakhand - PG Medical', url: 'https://hnbumu.ac.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Medicine', level: 'PG' },
    { name: 'Uttar Pradesh - PG Medical', url: 'https://upneet.gov.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },
    { name: 'West Bengal - PG Medical', url: 'https://wbmcc.nic.in/pg-medical-counselling/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'PG' },

    // Medicine - SS (Super Speciality)
    { name: 'All India Counseling - SS Medical', url: 'https://mcc.nic.in/ss-medical-counselling/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Medicine', level: 'SS' },

    // Engineering - UG (Joint Entrance)
    { name: 'JoSAA (Joint Seat Allocation Authority)', url: 'https://josaa.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Engineering', level: 'UG' },
    { name: 'CSAB (Central Seat Allocation Board)', url: 'https://csab.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Engineering', level: 'UG' },

    // Engineering - State
    { name: 'JAC Delhi', url: 'https://jacdelhi.admissions.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Engineering', level: 'UG' },
    { name: 'WBJEE Counselling', url: 'https://wbjeeb.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Engineering', level: 'UG' },
    { name: 'COMEDK Counselling', url: 'https://www.comedk.org/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Engineering', level: 'UG' },
    { name: 'MHT CET Counselling', url: 'https://cetcell.mahacet.org/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Engineering', level: 'UG' },
    { name: 'TNEA Counselling', url: 'https://www.tneaonline.org/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Engineering', level: 'UG' },
    { name: 'UPTAC Counselling', url: 'https://uptac.admissions.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL, field: 'Engineering', level: 'UG' },
    { name: 'REAP Rajasthan', url: 'https://reap2024.com/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Engineering', level: 'UG' },
    { name: 'HSTES Haryana', url: 'https://hstes.org.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST, field: 'Engineering', level: 'UG' }
];
