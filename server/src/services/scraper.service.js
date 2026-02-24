import axios from "axios";
import * as cheerio from "cheerio";
import { CounsellingUpdate } from "../models/update.model.js";
import { SCRAPING_STRATEGIES, counsellingSources } from "../config/counsellingSource.config.js";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

/**
 * Utility to categorize links based on text and URL patterns
 */
const categorizeLink = (text, href) => {
    const lowerText = text.toLowerCase();
    const lowerHref = href.toLowerCase();

    if (lowerText.includes("quota") || lowerText.includes("seat") || lowerText.includes("reservation") || lowerText.includes("matrix")) {
        return "Quotas";
    }
    if (lowerText.includes("prospectus") || lowerText.includes("bulletin") || lowerText.includes("brochure") || lowerText.includes("handbook")) {
        return "Prospectus";
    }
    if (lowerText.includes("apply") || lowerText.includes("registration") || lowerText.includes("login") || lowerText.includes("candidate portal") || lowerText.includes("new registration")) {
        return "Registration";
    }

    return "Announcements & Events";
};

/**
 * Detect specific quota type based on text
 */
const detectQuotaType = (text) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("afms-dnb")) return "AFMS-DNB";
    if (lowerText.includes("afms")) return "AFMS";
    if (lowerText.includes("dnb") && lowerText.includes("post mbbs")) return "DNB Post MBBS";
    if (lowerText.includes("dnb")) return "DNB Post MBBS"; // Default DNB to Post MBBS if not specified
    if (lowerText.includes("nbe diploma") || lowerText.includes("diploma")) return "NBE Diploma";
    if (lowerText.includes("aiq") || lowerText.includes("all india quota")) return "AIQ";
    if (lowerText.includes("mng") || lowerText.includes("management")) return "MNG";
    if (lowerText.includes("muslim minority") || lowerText.includes("mm")) return "MM";
    if (lowerText.includes("jain minority") || lowerText.includes("jm")) return "JM";
    if (lowerText.includes("nri")) return "NRI";
    if (lowerText.includes("du") || lowerText.includes("delhi university")) return "DU";
    if (lowerText.includes("ip") || lowerText.includes("indraprastha")) return "IP";
    if (lowerText.includes("bhu") || lowerText.includes("banaras")) return "BHU";
    if (lowerText.includes("amu") || lowerText.includes("aligarh")) return "AMU";
    if (lowerText.includes("ciq") || lowerText.includes("central institute quota")) return "CIQ";

    return null;
};

export const scrapeSource = async (source) => {
    try {
        const { data } = await axios.get(source.url, {
            headers: { "User-Agent": USER_AGENT },
            timeout: 10000 // 10 second timeout per source
        });

        const $ = cheerio.load(data);
        let updates = [];

        switch (source.strategy) {
            case SCRAPING_STRATEGIES.NIC_PORTAL:
                updates = parseNICPortal($, source);
                break;
            case SCRAPING_STRATEGIES.TAMIL_NADU:
                updates = parseTamilNadu($, source);
                break;
            default:
                updates = parseGenericList($, source);
                break;
        }

        // Upsert updates to DB
        for (const update of updates.slice(0, 10)) {
            await CounsellingUpdate.findOneAndUpdate(
                { externalId: update.externalId, counsellingType: source.name },
                { ...update, counsellingType: source.name },
                { upsert: true, new: true }
            );
        }

        return updates.length;
    } catch (error) {
        console.error(`Scraping failed for ${source.name}:`, error.message);
        return 0;
    }
};

/**
 * Strategy for NIC portals (mcc.nic.in, wbmcc.nic.in, etc)
 */
const parseNICPortal = ($, source) => {
    const updates = [];
    $("a").each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr("href");

        // Robust link detection: look for PDF, Download, or common notice keywords
        if (href && text.length > 5) {
            const isNoticeLink = href.toLowerCase().includes(".pdf") ||
                href.toLowerCase().includes("notic") ||
                text.toLowerCase().includes("notice") ||
                text.toLowerCase().includes("allotment") ||
                text.toLowerCase().includes("schedule");

            if (isNoticeLink && text.length > 10) {
                // Year-agnostic date detection
                const dateMatch = text.match(/(\d{2}[.\/-]\d{2}[.\/-]\d{4})|(\d{1,2}\s+[a-zA-Z]{3,9}\s+\d{4})/);
                const date = dateMatch ? dateMatch[0] : new Date().toLocaleDateString('en-GB');

                updates.push({
                    title: text.replace(/dated\s+.*/i, "").trim(),
                    link: href.startsWith("http") ? href : new URL(href, source.url).href,
                    date: date,
                    type: text.toLowerCase().includes("notice") ? "alert" : "note",
                    externalId: href,
                    hasDownload: href.toLowerCase().endsWith(".pdf"),
                    subCategory: categorizeLink(text, href),
                    quotaType: detectQuotaType(text)
                });
            }
        }
    });
    // Sort by date if possible, but for now just return latest found
    return updates.filter((v, i, a) => a.findIndex(t => t.externalId === v.externalId) === i);
};

/**
 * Strategy for Tamil Nadu site
 */
const parseTamilNadu = ($, source) => {
    const updates = [];
    $("a").each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr("href");
        if (href && text.length > 10 && !href.includes("javascript")) {
            updates.push({
                title: text,
                link: href.startsWith("http") ? href : new URL(href, source.url).href,
                date: new Date().toLocaleDateString('en-GB'),
                type: "alert",
                externalId: href,
                hasDownload: href.endsWith(".pdf"),
                subCategory: categorizeLink(text, href),
                quotaType: detectQuotaType(text)
            });
        }
    });
    return updates;
};

/**
 * Generic Strategy
 */
const parseGenericList = ($, source) => {
    const updates = [];
    $("a").each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr("href");
        if (href && text.length > 15 && (href.includes(".pdf") || href.includes("notic"))) {
            updates.push({
                title: text,
                link: href.startsWith("http") ? href : new URL(href, source.url).href,
                date: new Date().toLocaleDateString('en-GB'),
                type: "note",
                externalId: href,
                hasDownload: href.endsWith(".pdf"),
                subCategory: categorizeLink(text, href),
                quotaType: detectQuotaType(text)
            });
        }
    });
    return updates;
};

export const syncAllSources = async () => {
    let totalSynced = 0;
    for (const source of counsellingSources) {
        const count = await scrapeSource(source);
        totalSynced += count;
    }
    return totalSynced;
};
