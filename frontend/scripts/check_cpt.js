const API_URL = 'http://cantonfairindiacom.local/wp-json/wp/v2/types/visa_lead';

async function checkType() {
    try {
        const res = await fetch(API_URL);
        if (res.ok) {
            const data = await res.json();
            console.log('VISA LEAD TYPE FOUND:', JSON.stringify(data, null, 2));
        } else {
            console.error('VISA LEAD TYPE NOT FOUND:', res.status, await res.text());
        }
    } catch (e) {
        console.error('Fetch Error:', e);
    }
}

checkType();
