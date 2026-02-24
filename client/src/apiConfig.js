const getApiBaseUrl = () => {
    // If user provided a specific URL via environment variable
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

    // Production environment
    if (import.meta.env.PROD) {
        // Your backend on port 7000 is speaking HTTP, not HTTPS.
        // Accessing it via https://...:7000 causes the ERR_SSL_PROTOCOL_ERROR.
        // We switch to http:// for this specific port.
        return `http://${window.location.hostname}:7000/api/v1`;
    }

    // Local development fallback
    return 'http://localhost:5000/api/v1';
};

export const API_BASE_URL = getApiBaseUrl();
