
const WP_URL = 'http://cantonfairindiacom.local/wp-json/wp/v2/pages';
const AUTH = Buffer.from('admin:gf7Y CBTc S0Qh UTlT q9uD XKrp').toString('base64');

const createPage = async (title, content, slug) => {
    try {
        const response = await fetch(WP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${AUTH}`
            },
            body: JSON.stringify({
                title: title,
                content: content,
                slug: slug,
                status: 'publish'
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log(`Successfully created page: ${title} (${data.link})`);
        } else {
            console.error(`Failed to create page: ${title}`, data);
        }
    } catch (error) {
        console.error(`Error creating page ${title}:`, error);
    }
};

const termsContent = `
<h2>1. Visa Processing & Liability Disclaimer</h2>
<p>While Canton Fair India provides expert assistance in processing visa applications, <strong>the final decision rests solely with the Embassy of China</strong>. We act as a facilitator and guide. We are not responsible for visa rejections, delays, or any financial loss incurred due to embassy decisions. Service fees for visa assistance are non-refundable once the process has been initiated.</p>

<h2>2. Accommodation Policy</h2>
<p>Our standard packages include accommodation on a <strong>shared basis</strong> (twin sharing) in 4-star or equivalent business hotels. Private rooms must be requested in advance and are subject to availability and additional charges. We cannot guarantee room availability in the same hotel for late requests. In such cases, users may need to arrange their own travel/stay, though we will provide guidance and support.</p>

<h2>3. Payment Terms & Currency</h2>
<p>We prefer payments via <strong>PhonePe / UPI</strong> for ease of transaction. If digital payment is not possible, we will assist you in withdrawing cash from local ATMs. In certain cases, we may facilitate a prepaid payment card for your convenience in China. All payments must be settled as per the agreed schedule.</p>

<h2>4. Technology & Communication Usage</h2>
<p>Please be aware that <strong>western social media and certain apps (WhatsApp, Facebook, Google, Instagram) are blocked in China</strong>. We strongly recommend arranging an <strong>e-Sim or International Roaming pack</strong> prior to departure. A local Chinese SIM card will typically only provide access to local Chinese apps and basic internet, and will not bypass the Great Firewall.</p>

<h2>5. Code of Conduct & Compliance with Local Laws</h2>
<p>We maintain a zero-tolerance policy towards political, religious, or hate speech, and any form of racism. Once you enter China, you are subject to local laws and customs. <strong>Canton Fair India will not be liable for any legal issues arising from your personal conduct.</strong> We expect all delegates to demonstrate civic sense and respect for the local culture. Disruptive behavior may result in expulsion from the tour without refund.</p>

<h2>6. Dietary Provisions</h2>
<p>Our packages typically include <strong>Indian Vegetarian food</strong>. Non-vegetarian meals can be arranged upon specific request and may incur an extra cost depending on the restaurant and availability.</p>

<h2>7. Canton Fair Access & Coupon Policy</h2>
<p>Delegates attending the Canton Fair will be provided with food coupons for the Indian counter. <strong>Strictly prohibited:</strong> You are not allowed to sell, transfer, or exchange these coupons with others. These are for your personal use only. Unused coupons are non-refundable and cannot be exchanged for cash.</p>

<h2>8. Local Travel & Guide Scope</h2>
<p>Our services cover the official business tour itinerary. Any personal travel or exploration around the city outside the scheduled itinerary is your sole responsibility. However, our team is always available to guide you to local markets and potential sourcing hubs upon request.</p>

<h2>9. User Liability & Illegal Activities</h2>
<p>Any illegal activity performed by the user is their sole responsibility. You are expected to handle any legal cases or disputes arising from your actions independently. Canton Fair India holds no liability for personal misconduct or violation of Chinese law.</p>

<h2>10. Strict Prohibition of Illegal Content & Activities</h2>
<p><strong>Prostitution, pornography, and any paid sexual activities are strictly banned in China.</strong> Engaging in such activities can lead to severe legal consequences including detention and deportation. Furthermore, ensure strict compliance with digital laws; avoid accessing banned or illegal content via VPNs or other means. We advise strictly adhering to the "clean network" policy while in the country.</p>
`;

const privacyContent = `
<h2>1. Information Collection</h2>
<p>We collect personal information necessary for facilitating your business tour, including but not limited to: Name, Passport Details, Contact Information, Business Profile, and Travel Preferences. This data is collected solely for the purpose of visa processing, hotel booking, and fair registration.</p>

<h2>2. Use of Information</h2>
<p>Your information is used to:</p>
<ul>
<li>Process Chinese Visa applications via authorized centers.</li>
<li>Book accommodation and transport in China.</li>
<li>Register you for Canton Fair entry badges.</li>
<li>Communicate important trip updates and sourcing guidance.</li>
</ul>

<h2>3. Data Sharing</h2>
<p>We do not sell your data. We only share necessary details with:</p>
<ul>
<li>The Chinese Embassy/Consulate for visa purposes.</li>
<li>Hotel partners for room allocation.</li>
<li>Canton Fair organizers for badge issuance.</li>
</ul>

<h2>4. Data Security</h2>
<p>We implement strict security measures to protect your documents. Passport copies and sensitive data are deleted from our active systems post-trip, retained only as necessary for legal or accounting records.</p>

<h2>5. User Rights</h2>
<p>You have the right to request a copy of the data we hold or request its deletion after the conclusion of services, subject to legal record-keeping requirements.</p>

<h2>6. Contact Us</h2>
<p>For any privacy concerns, please contact our support team at <strong>legal@cantonfairindia.com</strong>.</p>
`;

(async () => {
    console.log('Publishing Legal Pages to WordPress...');
    await createPage('Terms & Conditions', termsContent, 'terms-and-conditions');
    await createPage('Privacy Policy', privacyContent, 'privacy-policy');
})();
