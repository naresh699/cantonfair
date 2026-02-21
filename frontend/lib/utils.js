/**
 * Forces a URL to use HTTPS if it's currently using HTTP.
 * This helps resolve "Mixed Content" warnings in the browser.
 * 
 * @param {string} url - The URL to secure
 * @returns {string} - The secured URL
 */
export function getSecureUrl(url) {
    if (!url || typeof url !== 'string') return url;

    // If it's already https or a relative path, leave it
    if (url.startsWith('https://') || url.startsWith('/')) {
        return url;
    }

    // Replace http with https
    if (url.startsWith('http://')) {
        // Don't replace localhost for development
        if (url.includes('localhost') || url.includes('.local')) {
            return url;
        }
        return url.replace('http://', 'https://');
    }

    return url;
}
