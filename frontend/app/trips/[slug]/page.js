import Header from '@/components/DynamicHeader';
import { getTripBySlug } from '@/lib/wordpress';
import { Plane, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function TripPage({ params }) {
    const { slug } = params;
    const trip = await getTripBySlug(slug);

    if (!trip) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-dragon-blue mb-4">Trip not found</h1>
                    <Link href="/trips" className="text-dragon-red hover:underline flex items-center gap-2 justify-center">
                        <ArrowRight className="w-4 h-4" /> Back to Trips
                    </Link>
                </div>
            </div>
        );
    }

    const features = trip.tripFields?.features ? trip.tripFields.features.split(',') : [];

    return (
        <main className="min-h-screen bg-white pb-24">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] flex items-center pt-32">
                <div className="absolute inset-0 z-0">
                    <img
                        src={trip.tripFields?.image || 'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2070&auto=format&fit=crop'}
                        alt={trip.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dragon-blue via-dragon-blue/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-dragon-red text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-lg">
                            <MapPin className="w-4 h-4" />
                            {trip.tripFields?.city || 'China'}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            {trip.title}
                        </h1>
                        <div className="flex items-center gap-6 text-white/90 text-xl font-medium">
                            <span className="flex items-center gap-2">
                                <span className="text-dragon-red">Price:</span> {trip.tripFields?.price || 'Enquire'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-16 -mt-20 relative z-20">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
                            <div className="prose prose-lg max-w-none prose-headings:text-dragon-blue prose-p:text-gray-600 prose-li:text-gray-600"
                                dangerouslySetInnerHTML={{ __html: trip.content }}
                            />
                        </div>

                        {/* What's Included */}
                        <div className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-200">
                            <h2 className="text-3xl font-bold text-dragon-blue mb-8">What's Included</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 bg-dragon-red/10 p-2 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-dragon-red" />
                                        </div>
                                        <div className="font-semibold text-gray-800">{feature.trim()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Sidebar CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-dragon-blue text-white p-8 rounded-3xl shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-dragon-red/10 rounded-full -mr-16 -mt-16"></div>

                            <h3 className="text-2xl font-bold mb-6 relative z-10">Start Your Journey</h3>
                            <p className="text-blue-100 mb-8 relative z-10 leading-relaxed">
                                Join our next delegation and unlock direct access to Chinese manufacturers. Professional guidance, visa support, and logistics handled.
                            </p>

                            <div className="space-y-4 relative z-10 mb-8">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="text-sm text-blue-200 uppercase tracking-wider mb-1">Upcoming Batch</div>
                                    <div className="text-lg font-bold">April 2026 (Canton Fair)</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="text-sm text-blue-200 uppercase tracking-wider mb-1">Starting From</div>
                                    <div className="text-lg font-bold">{trip.tripFields?.price || 'Enquire'}</div>
                                </div>
                            </div>

                            <Link href="/visa">
                                <button className="w-full bg-dragon-red hover:bg-red-600 text-white py-4 rounded-xl font-bold transition-all shadow-xl group flex items-center justify-center gap-3">
                                    Reserve Your Spot <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <p className="text-center text-xs text-blue-200 mt-6 font-medium">
                                * Limited spots available for Indian Entrepreneurs
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
