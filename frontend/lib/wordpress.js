const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query, { variables, revalidate = 60 } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate },
  });

  if (!res.ok) {
    console.error(`fetchAPI failed: ${res.status} ${res.statusText} for ${API_URL}`);
    const text = await res.text();
    console.error('Response body:', text);
    return null;
  }
  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    return null;
  }
  return json.data;
}

export async function getTrips() {
  try {
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
    return data?.trips?.nodes || [];
  } catch (error) {
    console.error('getTrips error:', error);
    return [];
  }
}

export async function getTripBySlug(slug) {
  const data = await fetchAPI(`
    query TripBySlug($id: ID!, $idType: TripIdType!) {
      trip(id: $id, idType: $idType) {
        id
        title
        content
        tripFields {
          price
          city
          features
          image
        }
      }
    }
  `, {
    variables: { id: slug, idType: 'SLUG' },
  });
  return data?.trip;
}

export async function getGuidancePages() {
  try {
    const data = await fetchAPI(`
      query GuidancePages {
        pages(where: {parent: "guidance"}) {
          nodes {
            id
            title
            slug
            excerpt
          }
        }
      }
    `);
    return data?.pages?.nodes || [];
  } catch (error) {
    console.error('getGuidancePages error:', error);
    return [];
  }
}

export async function getPageBySlug(slug) {
  try {
    const data = await fetchAPI(`
      query PageBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          id
          title
          content
        }
      }
    `, {
      variables: { id: slug, idType: 'URI' },
    });
    return data?.page;
  } catch (error) {
    console.error('getPageBySlug error:', error);
    return null;
  }
}

export async function getPosts() {
  try {
    const data = await fetchAPI(`
      query AllPosts {
        posts(first: 20) {
          nodes {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `);
    return data?.posts?.nodes || [];
  } catch (error) {
    console.error('getPosts error:', error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const data = await fetchAPI(`
      query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          id
          title
          content
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    `, {
      variables: { id: slug, idType: 'SLUG' },
    });
    return data?.post;
  } catch (error) {
    console.error('getPostBySlug error:', error);
    return null;
  }
}

export async function getMenu(slug = 'header', revalidate = 60) {
  try {
    const data = await fetchAPI(`
      query GetMenu($id: ID!, $idType: MenuNodeIdTypeEnum!) {
        menu(id: $id, idType: $idType) {
          menuItems {
            nodes {
              id
              label
              uri
              path
              order
            }
          }
        }
      }
    `, {
      variables: { id: slug, idType: 'SLUG' },
      revalidate
    });
    return data?.menu?.menuItems?.nodes || [];
  } catch (error) {
    console.error('getMenu error:', error);
    return [];
  }
}

export async function getFAQs() {
  try {
    const data = await fetchAPI(`
      query AllFAQs {
        faqs(first: 20) {
          nodes {
            id
            title
            content
          }
        }
      }
    `);
    return data?.faqs?.nodes || [];
  } catch (error) {
    console.error('getFAQs error:', error);
    return [];
  }
}

export async function getHeroContent() {
  try {
    const data = await fetchAPI(`
      query HeroContent {
        siteContents(where: {name: "hero-section"}) {
          nodes {
            id
            heroHeading
            heroTagline
          }
        }
      }
    `);
    return data?.siteContents?.nodes[0] || null;
  } catch (error) {
    console.error('getHeroContent error:', error);
    return null;
  }
}

export async function getSiteContent(slug) {
  try {
    const data = await fetchAPI(`
      query SiteContent($name: String!) {
        siteContents(where: {name: $name}) {
          nodes {
            id
            title
            content
            contentJson
          }
        }
      }
    `, {
      variables: { name: slug }
    });

    const item = data?.siteContents?.nodes[0] || null;

    if (item && item.contentJson) {
      try {
        item.json = JSON.parse(item.contentJson);
      } catch (e) {
        console.warn(`Failed to parse JSON for site content: ${slug}`);
        item.json = null;
      }
    }

    return item;
  } catch (error) {
    console.error(`getSiteContent error for ${slug}:`, error);
    return null;
  }
}
