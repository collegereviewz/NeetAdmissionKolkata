import axios from 'axios';

/**
 * Service to handle SMS messaging using Fast2SMS.
 * API Key should be in .env as FAST2SMS_API_KEY
 */
class SmsService {
    constructor() {
        this.apiUrl = 'https://www.fast2sms.com/dev/bulkV2';
    }

    async sendSMS(to, body) {
        const apiKey = process.env.FAST2SMS_API_KEY;

        if (!apiKey || apiKey === 'your_fast2sms_auth_key_here') {
            console.warn("FAST2SMS NOT CONFIGURED: Logging SMS to console instead.");
            console.log(`[SMS to ${to}]: ${body}`);
            return true;
        }

        try {
            const phoneNumber = to.replace(/\D/g, '').slice(-10);

            // Fast2SMS API Call
            const response = await axios.get(this.apiUrl, {
                params: {
                    authorization: apiKey,
                    route: 'q',
                    message: body,
                    language: 'english',
                    flash: 0,
                    numbers: phoneNumber
                }
            });

            console.log("Fast2SMS Raw Response Data:", JSON.stringify(response.data, null, 2));

            if (response.data.return === true) {
                console.log(`✅ [FAST2SMS SUCCESS] Request accepted for ${to}. Request ID: ${response.data.request_id || 'N/A'}`);
                return true;
            } else {
                console.error("Fast2SMS Provider Error:", response.data);
                throw new Error(response.data.message || "Fast2SMS delivery rejected");
            }
        } catch (error) {
            console.error("Fast2SMS API Error Details:", error.response?.data || error.message);
            // Non-blocking fallback for dev
            console.warn("Logging SMS as fallback due to provider or network error.");
            console.log(`[FALLBACK SMS to ${to}]: ${body}`);
            return true;
        }
    }
}

export const smsService = new SmsService();
