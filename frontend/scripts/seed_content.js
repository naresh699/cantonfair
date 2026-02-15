const fetch = require('node-fetch');

async function seedContent() {
    console.log('Seeding content to WordPress...');
    try {
        const res = await fetch('http://cantonfairindiacom.local/wp-json/cfi/v1/seed-content', {
            method: 'POST'
        });

        const data = await res.json();
        console.log('Result:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error seeding content:', e);
    }
}

seedContent();
