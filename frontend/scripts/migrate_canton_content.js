const API_URL = 'http://cantonfairindiacom.local/wp-json/wp/v2/pages';
const AUTH = Buffer.from('admin:gf7Y CBTc S0Qh UTlT q9uD XKrp').toString('base64');

const content = `
<!-- wp:heading {"level":1} -->
<h1>Canton Fair 2025: The Ultimate Guide for Indian Buyers</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The China Import and Export Fair, also known as the Canton Fair, is the pinnacle of global trade events. As an Indian entrepreneur, this is your gateway to direct sourcing from thousands of verified manufacturers.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Exhibition Phases & Dates</h2>
<!-- /wp:heading -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Phase</th><th>Spring Session</th><th>Autumn Session</th><th>Key Industries</th></tr></thead><tbody><tr><td><strong>Phase 1</strong></td><td>April 15–19</td><td>Oct 15–19</td><td>Electronics, Appliances, Vehicles, Machinery, Hardware, Chemical Products</td></tr><tr><td><strong>Phase 2</strong></td><td>April 23–27</td><td>Oct 23–27</td><td>Consumer Goods, Gifts, Home Decorations, Ceramics, Furniture</td></tr><tr><td><strong>Phase 3</strong></td><td>May 1–5</td><td>Oct 31 – Nov 4</td><td>Textiles, Garments, Shoes, Office Supplies, Medicines, Food, Health Products</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading -->
<h2>Venue Location</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><strong>China Import and Export Fair Complex</strong><br>No. 382, Yuejiang Zhong Road, Guangzhou 510335, China</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Invitation Letter & Buyer Badge Process</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column">
<h3>1. E-Invitation Letter</h3>
<p>You must have an official invitation to apply for a visa. You can download this from the <a href="https://buyer.cantonfair.org.cn">BEST (Buyer E-Service Tool)</a> platform after registering.</p>
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<h3>2. Pre-Registration</h3>
<p>Register online in advance to get your Buyer Badge QR code. This saves you the 200 RMB fee charged for on-site registration.</p>
</div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:heading -->
<h2>Badge Collection Points</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li>Guangzhou Baiyun International Airport</li>
<li>Guangzhou South Railway Station</li>
<li>Pazhou Ferry Terminal</li>
<li>Canton Fair Complex Registration Offices</li>
<li>Designated Hotels in Guangzhou</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Required Documents</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li>Original Passport</li>
<li>Business Card (Physical or Electronic)</li>
<li>Buyer Badge Pre-registration Receipt (QR Code)</li>
</ul>
<!-- /wp:list -->
`;

async function createCantonPage() {
    console.log('Creating Canton Fair page in WordPress...');

    // Check if exists first
    const searchRes = await fetch(`${API_URL}?slug=canton-fair`);
    const searchJson = await searchRes.json();

    let pageId;
    let method = 'POST';
    let url = API_URL;

    if (searchJson.length > 0) {
        console.log('Page exists, updating...');
        pageId = searchJson[0].id;
        url = `${API_URL}/${pageId}`;
    }

    const res = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${AUTH}`
        },
        body: JSON.stringify({
            title: 'Canton Fair Guide',
            content: content,
            status: 'publish',
            slug: 'canton-fair'
        })
    });

    if (res.ok) {
        console.log('Successfully migrated Canton Fair content to WordPress.');
    } else {
        console.error('Failed to migrate content:', await res.text());
    }
}

createCantonPage();
