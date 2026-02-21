export const SCRAPING_STRATEGIES = {
    NIC_PORTAL: 'NIC_PORTAL',     // Sites like mcc.nic.in, wbmcc.nic.in
    DME_ASSAM: 'DME_ASSAM',       // Specific structure for Assam DME
    KEA_KARNATAKA: 'KEA_KARNATAKA', // Karnataka KEA
    TAMIL_NADU: 'TAMIL_NADU',     // tnmedicalselection.net
    UP_PORTAL: 'UP_PORTAL',       // upneet.gov.in
    GENERIC_LIST: 'GENERIC_LIST'  // Fallback list of links
};

export const counsellingSources = [
    { name: 'All India Counseling - PG Medical', url: 'https://mcc.nic.in/pg-medical-counselling/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Andaman & Nicobar Islands - PG Medical', url: 'https://mcc.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Andhra Pradesh Government Quota - PG Medical', url: 'https://dme.ap.nic.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Andhra Pradesh Management Quota - PG Medical', url: 'https://dme.ap.nic.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Armed Forces Medical Services - AFMS (through MCC) - PG Medical', url: 'https://mcc.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Arunachal Pradesh - PG Medical', url: 'https://dme.arunachal.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Assam - PG Medical', url: 'https://dme.assam.gov.in/latest', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Bihar - PG Medical', url: 'https://bceceboard.bihar.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Chandigarh - PG Medical', url: 'https://gmch.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Chhattisgarh - PG Medical', url: 'https://cgdme.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Dadra and Nagar Haveli - PG Medical', url: 'https://www.namomeriadmission.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Delhi - PG Medical', url: 'https://mcc.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Goa - PG Medical', url: 'https://dte.goa.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Gujarat - PG Medical', url: 'https://www.medadmgujarat.org/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Haryana - PG Medical', url: 'https://uhsrcounseling.com/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Himachal Pradesh - PG Medical', url: 'https://amruhp.ac.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Jammu and Kashmir - PG Medical', url: 'https://jkbopee.gov.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Jharkhand - PG Medical', url: 'https://jceceb.jharkhand.gov.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Karnataka - PG Medical', url: 'https://kea.kar.nic.in/', strategy: SCRAPING_STRATEGIES.KEA_KARNATAKA },
    { name: 'Kerala - PG Medical', url: 'https://cee.kerala.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Madhya Pradesh - PG Medical', url: 'https://dme.mponline.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Maharashtra - PG Medical', url: 'https://cetcell.mahacet.org/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Manipur-JNIMS - PG Medical', url: 'https://manipurhealthdirectorate.mn.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Manipur-RIMS - PG Medical', url: 'https://manipurhealthdirectorate.mn.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Mizoram - PG Medical', url: 'https://dhte.mizoram.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'NEIGRIHMS - PG Medical', url: 'https://www.neigrihms.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Odisha - PG Medical', url: 'https://dmetodisha.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Open States (Private Institute seats available for all candidates)', url: 'https://mcc.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Pondicherry - PG Medical', url: 'https://centacpuducherry.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Punjab - PG Medical', url: 'https://bfuhs.ac.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Rajasthan - PG Medical', url: 'https://rajneetpg2024.org/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Sikkim - PG Medical', url: 'https://www.dtesikkim.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Tamil Nadu Government Quota - PG Medical', url: 'https://tnmedicalselection.net/', strategy: SCRAPING_STRATEGIES.TAMIL_NADU },
    { name: 'Tamil Nadu Management Quota - PG Medical', url: 'https://tnmedicalselection.net/', strategy: SCRAPING_STRATEGIES.TAMIL_NADU },
    { name: 'Telangana Government Quota - PG Medical', url: 'https://knruhs.telangana.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Telangana Management Quota - PG Medical', url: 'https://knruhs.telangana.gov.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Tripura - PG Medical', url: 'https://trmcc.admissions.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'Uttarakhand - PG Medical', url: 'https://hnbumu.ac.in/', strategy: SCRAPING_STRATEGIES.GENERIC_LIST },
    { name: 'Uttar Pradesh - PG Medical', url: 'https://upneet.gov.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL },
    { name: 'West Bengal - PG Medical', url: 'https://wbmcc.nic.in/', strategy: SCRAPING_STRATEGIES.NIC_PORTAL }
];
