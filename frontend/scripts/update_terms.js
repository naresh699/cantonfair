const WP_URL = 'http://cantonfairindiacom.local/wp-json/wp/v2/pages';
const AUTH = Buffer.from('admin:gf7Y CBTc S0Qh UTlT q9uD XKrp').toString('base64');

const newTermsContent = `
<h2>1. Visa Processing & Liability Disclaimer</h2>
<p>While Canton Fair India provides expert assistance in processing visa applications, <strong>the final decision rests solely with the Embassy of China</strong>. We act as a facilitator and guide. We are not responsible for visa rejections, delays, or any financial loss incurred due to embassy decisions. Service fees for visa assistance are non-refundable once the process has been initiated.</p>

<h2>2. Accommodation Policy</h2>
<p>Our standard packages include accommodation on a <strong>shared basis</strong> (twin sharing) in 4-star or equivalent business hotels. Private rooms must be requested in advance and are subject to availability and additional charges. We cannot guarantee room availability in the same hotel for late requests. In such cases, users may need to arrange their own travel/stay, though we will provide guidance and support.</p>

<h2>3. Payment Terms & Currency</h2>
<p><strong>China primarily uses Alipay or WeChat Pay</strong> for all transactions. It is crucial to <strong>configure these apps before your departure from India</strong>.</p>
<p>If not configured beforehand, please allow at least <strong>1 day in China</strong> to set up local payment methods properly. We strongly advise enabling all <strong>international transactions</strong> on your debit or credit cards before leaving India.</p>
<p>For payments to us, we prefer <strong>PhonePe / UPI</strong> for ease of transaction. If digital payment is not possible, we will assist you in withdrawing cash from local ATMs. In certain cases, we may facilitate a prepaid payment card for your convenience in China. All payments must be settled as per the agreed schedule.</p>

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

const updateTermsPage = async () => {
    try {
        // 1. Get the Page ID
        console.log('Fetching Page ID for Terms & Conditions...');
        const searchRes = await fetch(`${WP_URL}?slug=terms-and-conditions`);
        const pages = await searchRes.json();

        if (!pages || pages.length === 0) {
            console.error('Page "Terms & Conditions" not found.');
            return;
        }

        const pageId = pages[0].id;
        console.log(`Found Page ID: ${pageId}`);

        // 2. Update Content
        console.log('Updating content...');
        const updateRes = await fetch(`${WP_URL}/${pageId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${AUTH}`
            },
            body: JSON.stringify({
                content: newTermsContent
            })
        });

        const updatedPage = await updateRes.json();
        if (updateRes.ok) {
            console.log(`Successfully updated "Terms & Conditions" content.`);
        } else {
            console.error('Failed to update page:', updatedPage);
        }

    } catch (error) {
        console.error('Error updating terms:', error);
    }
};

updateTermsPage();
