import Header from '@/components/DynamicHeader';
import SourcingGrid from '@/components/SourcingGrid';
import ChinaMarketTable from '@/components/ChinaMarketTable';
import { getTrips, getPageBySlug } from '@/lib/wordpress';

export default async function TripsPage() {
    let trips = [];
    let page = null;

    try {
        [trips, page] = await Promise.all([
            getTrips().catch(() => []),
            getPageBySlug('trips').catch(() => null)
        ]);
    } catch (e) {
        console.error("Error loading trips data:", e);
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <div className="pt-32 pb-20 bg-dragon-blue text-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">{page?.title || 'Sourcing from China'}</h1>
                    <div
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: page?.content || "<p>The world's factory is open for business. For Indian entrepreneurs, direct sourcing from China isn't just an option—it's the most strategic path to building a scalable brand with low investment and high margins.</p>" }}
                    />
                </div>
            </div>

            {/* Section 1: Low Investment / High Margin */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-dragon-blue mb-6">Why Start with China?</h2>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <span className="text-dragon-red font-bold text-xl">01</span>
                                    <div>
                                        <strong className="block text-gray-900">Unbeatable MOQs</strong>
                                        <p className="text-sm mt-1">Unlike other markets, Chinese suppliers are flexible. You can verify product quality with small sample orders before committing capital.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-dragon-red font-bold text-xl">02</span>
                                    <div>
                                        <strong className="block text-gray-900">High Profit Margins</strong>
                                        <p className="text-sm mt-1">Sourcing directly eliminates middlemen. Typical import margins range from 300% to 500% compared to buying from local wholesalers.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-dragon-red font-bold text-xl">03</span>
                                    <div>
                                        <strong className="block text-gray-900">Speed to Market</strong>
                                        <p className="text-sm mt-1">The logistics network is lightning fast. From Yiwu to Mumbai, your cargo can arrive in less than 20 days via sea or 5 days via air.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-dragon-blue mb-4">The "Dropshipping" Myth</h3>
                            <p className="text-gray-600 mb-6 text-sm">
                                Many gurus promote dropshipping, but you have no control over quality or branding. <strong>Direct Import</strong> puts you in control. You own the stock, you own the brand, and you keep the profit.
                            </p>
                            <div className="p-4 bg-dragon-blue/5 rounded-lg border-l-4 border-dragon-red">
                                <p className="text-dragon-blue text-sm font-semibold">
                                    "Your competition is buying from local traders. You can beat their price by 40% just by getting on a plane."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Market Map */}
            <ChinaMarketTable />

            {/* Section 3: Brand Building */}
            <section className="py-20 bg-dragon-blue text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-dragon-red/10 skew-x-12 transform translate-x-20"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-8">Build Your Own Brand (OEM/ODM)</h2>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
                        Visiting China isn't just about buying cheap goods. It's about finding a factory that can manufacture <strong>your unique design</strong>.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            <h4 className="text-xl font-bold text-dragon-red mb-2">1. Customization</h4>
                            <p className="text-gray-400 text-sm">Add your logo, change colors, or tweak features. Even small factories in China are willing to do OEM for reasonable quantities.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            <h4 className="text-xl font-bold text-dragon-red mb-2">2. Exclusive Rights</h4>
                            <p className="text-gray-400 text-sm">Negotiate exclusivity for the Indian market. Be the only seller of a specific innovative product layout.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            <h4 className="text-xl font-bold text-dragon-red mb-2">3. Relationship (Guanxi)</h4>
                            <p className="text-gray-400 text-sm">Business in China runs on relationships. Meeting face-to-face unlocks prices and priority service that emails never will.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Upcoming Trips */}
            <SourcingGrid trips={trips} />

        </main>
    );
}
