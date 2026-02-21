import Header from '@/components/DynamicHeader';
import Hero from '@/components/Hero';
import SourcingGrid from '@/components/SourcingGrid';
import Link from 'next/link';
import { getTrips, getPosts, getHeroContent } from '@/lib/wordpress';

export default async function Home() {
  const [tripsData, posts, heroData] = await Promise.all([
    getTrips(),
    getPosts(),
    getHeroContent()
  ]);

  // Deduplicate trips by slug - prioritize those with images
  const tripsMap = {};
  tripsData.forEach(trip => {
    const slug = trip.slug;
    const hasImage = trip.tripFields?.image || trip.featuredImage?.node?.sourceUrl;

    // If we haven't seen this slug OR the current one has no image but the new one does, keep the new one
    const currentHasImage = tripsMap[slug] && (tripsMap[slug].tripFields?.image || tripsMap[slug].featuredImage?.node?.sourceUrl);

    if (!tripsMap[slug] || (!currentHasImage && hasImage)) {
      tripsMap[slug] = trip;
    }
  });
  const trips = Object.values(tripsMap);
  const featuredTrip = trips?.[0];

  return (
    <main className="min-h-screen">
      <Header />
      <Hero featuredTrip={featuredTrip} heroData={heroData} />
      <SourcingGrid trips={trips} />

      {/* Blog Section */}
      {/* <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-dragon-blue">Trade Insights</h2>
              <p className="text-gray-600 mt-2">Latest updates on India-China business trade.</p>
            </div>
            <Link href="/blog" className="text-dragon-red font-bold hover:underline">View All Updates →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <article key={post.id} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                <span className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                <h3 className="text-xl font-bold text-dragon-blue mt-2 mb-4">{post.title}</h3>
                <div className="text-gray-600 text-sm line-clamp-3 mb-6" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                <button className="text-dragon-red font-semibold text-sm">Read Article</button>
              </article>
            ))}
          </div>
        </div>
      </section> */}


      {/* Help & Resources CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-dragon-blue mb-6">Need Assistance?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Whether you need help with your visa application or have questions about the Canton Fair, we're here to guide you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/visa" className="bg-dragon-red text-white px-8 py-4 rounded-full font-bold hover:bg-dragon-blue transition-all shadow-lg flex items-center justify-center gap-2">
              Apply for Visa Assistance
            </Link>
            <Link href="/faq" className="border-2 border-gray-200 text-dragon-blue px-8 py-4 rounded-full font-bold hover:border-dragon-blue hover:bg-dragon-blue hover:text-white transition-all flex items-center justify-center gap-2">
              Read FAQs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
