const API_URL = 'http://cantonfairindiacom.local/wp-json/wp/v2/pages';
// We need to find the ID of the 'Terms & Conditions' page.
// First we will fetch it to get the ID.

const AUTH = Buffer.from('admin:gf7Y CBTc S0Qh UTlT q9uD XKrp').toString('base64');

async function updateTerms() {
    // 1. Get the Page ID
    console.log('Fetching Terms page...');
    const searchRes = await fetch(`${API_URL}?slug=terms-and-conditions`);
    const searchJson = await searchRes.json();

    if (!searchJson.length) {
        console.error('Terms page not found!');
        return;
    }

    const pageId = searchJson[0].id;
    console.log(`Found Terms page ID: ${pageId}`);

    // 2. The New "Polite" Content
    const content = `
<!-- wp:paragraph -->
<p>Welcome to Canton Fair India. We are committed to ensuring your sourcing trip is successful, safe, and compliant with all regulations. Please review the following guidelines, which are designed to protect your interests and adhere to international travel policies.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>1. Visa & Entry Requirements</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>To ensure a smooth entry into China, all guests are required to adhere to the visa policies set by the Department of Immigration. A valid business visa (Category M) is strictly mandated for all trade-related visits. Please note that while we provide comprehensive assistance with your application, the final approval rests solely with the consulate.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>2. Payment & Currency Policy</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Due to banking regulations in mainland China, standard international credit cards (Visa/Mastercard) are not widely accepted at wholesale markets or local establishments. To facilitate your transactions, we kindly request that you:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><strong>Enable WeChat Pay / Alipay:</strong> These are the standard digital payment methods. We recommend linking your international card to these apps prior to departure.</li>
<li><strong>Currency:</strong> Carrying a small amount of RMB cash is advisable for incidental expenses.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>3. Group Conduct & Safety</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>To maintain the safety and punctuality of our delegation, we respectfully ask all members to adhere to the group itinerary. Please be aware that local regulations regarding group travel may require specific reporting of our location. Your cooperation helps us ensure a seamless experience for everyone.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>4. Import Compliance</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Please be advised that all goods purchased for import must comply with Indian Customs regulations. It is the responsibility of the importer to ensure that items sourced do not violate any restrictions (e.g., BIS standards, prohibited lists). Our team provides guidance, but compliance remains a personal obligation.</p>
<!-- /wp:paragraph -->
`;

    // 3. Update the Page
    console.log('Updating content...');
    const updateRes = await fetch(`${API_URL}/${pageId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${AUTH}`
        },
        body: JSON.stringify({
            content: content
        })
    });

    if (updateRes.ok) {
        console.log('Successfully updated Terms & Conditions with polite language.');
    } else {
        console.error('Failed to update:', await updateRes.text());
    }
}

updateTerms();
