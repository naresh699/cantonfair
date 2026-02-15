const API_URL = 'http://cantonfairindiacom.local/graphql';

async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ query, variables })
        });

        if (!res.ok) {
            console.error(`fetchAPI failed: ${res.status}`);
            const text = await res.text();
            console.error(text);
            return null;
        }

        const json = await res.json();
        if (json.errors) {
            console.error('GraphQL Errors:', json.errors);
            return null;
        }
        return json.data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

async function debugTrips() {
    console.log('Fetching trips from:', API_URL);
    const data = await fetchAPI(`
      query AllTrips {
        trips {
          nodes {
            id
            title
            slug
            tripFields {
              price
              city
              features
              image
            }
          }
        }
      }
    `);

    const trips = data?.trips?.nodes || [];
    console.log('Trips fetched:', trips.length);
    if (trips.length > 0) {
        console.log('First trip data:', JSON.stringify(trips[0], null, 2));
    } else {
        console.log('No trips found.');
    }

    console.log('Fetching page content for /trips/ ...');
    const pageData = await fetchAPI(`
      query PageBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          id
          title
          content
        }
      }
    `, { variables: { id: '/trips/', idType: 'URI' } });

    if (pageData?.page) {
        console.log('Page content found:', pageData.page.title);
        // console.log('Content snippet:', pageData.page.content.substring(0, 100));
    } else {
        console.log('Page content NOT found for /trips/');
    }
}

debugTrips();
