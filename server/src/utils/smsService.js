import twilio from 'twilio';

/**
 * Service to handle SMS and WhatsApp messaging using Twilio.
 * Placeholders for Account SID and Auth Token should be in .env
 */
class SmsService {
    constructor() {
        this._client = null;
    }

    get client() {
        if (this._client) return this._client;

        if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
            this._client = twilio(
                process.env.TWILIO_ACCOUNT_SID,
                process.env.TWILIO_AUTH_TOKEN
            );
        }
        return this._client;
    }

    async sendSMS(to, body) {
        if (!this.client) {
            console.warn("TWILIO NOT CONFIGURED: Logging SMS to console instead.");
            console.log(`[SMS to ${to}]: ${body}`);
            return true;
        }

        try {
            await this.client.messages.create({
                body: body,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: `+91${to.replace(/\D/g, '')}`
            });
            return true;
        } catch (error) {
            // Handle unverified number error (Twilio Trial Account)
            if (error.code === 21608) {
                console.warn(`TWILIO RESTRICTION (Code 21608): Destination ${to} is not verified.`);
                console.warn("Logging SMS to console instead to allow flow to continue.");
                console.log(`[MOCKED SMS to ${to}]: ${body}`);
                return true;
            }
            console.error("Twilio SMS Error:", error);
            throw error;
        }
    }

    async sendWhatsApp(to, body) {
        if (!this.client) {
            console.warn("TWILIO NOT CONFIGURED: Logging WhatsApp to console instead.");
            console.log(`[WhatsApp to ${to}]: ${body}`);
            return true;
        }

        try {
            await this.client.messages.create({
                from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
                body: body,
                to: `whatsapp:+91${to.replace(/\D/g, '')}`
            });
            return true;
        } catch (error) {
            console.error("Twilio WhatsApp Error:", error);
            throw error;
        }
    }
}

export const smsService = new SmsService();
