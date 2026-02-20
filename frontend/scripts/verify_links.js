const fs = require('fs');
const path = require('path');

const WP_URL = 'http://cantonfairindiacom.local/wp-json/wp/v2';
const USER = 'admin';
const PASS = 'gf7Y CBTc S0Qh UTlT q9uD XKrp';
const AUTH = Buffer.from(`${USER}:${PASS}`).toString('base64');

async function checkSlugs(slugs) {
    const results = {};
    for (const slug of slugs) {
        if (slug.startsWith('/') && slug !== '/') {
            const cleanSlug = slug.replace(/^\//, '').replace(/\/$/, '');
            // Check if it's a page
            const pageRes = await fetch(`${WP_URL}/pages?slug=${cleanSlug}`);
            const pages = await pageRes.json();

            // Check if it's a post (for blog links)
            const postRes = await fetch(`${WP_URL}/posts?slug=${cleanSlug}`);
            const posts = await postRes.json();

            results[slug] = (pages.length > 0 || posts.length > 0);
        } else {
            results[slug] = true; // Home or external
        }
    }
    return results;
}

const targetSlugs = [
    '/about-us',
    '/terms-and-conditions',
    '/privacy-policy',
    '/cancellation-policy',
    '/trips',
    '/guidance',
    '/blog',
    '/visa',
    '/canton-fair',
    '/faq'
];

checkSlugs(targetSlugs).then(res => console.log(JSON.stringify(res, null, 2)));
