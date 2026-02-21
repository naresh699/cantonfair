"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getSecureUrl } from '@/lib/utils';

export default function SourcingGrid({ trips }) {
    if (!trips || trips.length === 0) {
        return (
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500">No active sourcing trips found. Check back soon.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="trips" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-dragon-blue mb-4 uppercase tracking-tight italic">Sourcing Trips</h2>
                    <div className="w-24 h-2 bg-dragon-red mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trips.map((trip, index) => {
                        const tripImage = getSecureUrl(
                            trip.tripFields?.image ||
                            trip.featuredImage?.node?.sourceUrl ||
                            'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2070&auto=format&fit=crop'
                        );

                        return (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100 hover:border-dragon-red transition-all transform hover:-translate-y-2"
                            >
                                <div className="h-48 bg-dragon-blue relative overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url('${tripImage}')`
                                        }}
                                    />
                                    <div className="absolute top-4 left-4 bg-dragon-red text-white px-3 py-1 rounded-md text-xs font-black shadow-lg uppercase tracking-wider">
                                        {trip.tripFields?.city ? trip.tripFields.city : 'China'}
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-2xl font-black text-dragon-blue mb-3 uppercase leading-tight italic">{trip.title}</h3>
                                    <div className="flex items-center gap-2 mb-6 text-dragon-red font-black text-xl italic uppercase">
                                        {trip.tripFields?.price ? trip.tripFields.price : 'Enquire for Price'}
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {(trip.tripFields?.features ? trip.tripFields.features.split(',') : ['B2B Matchmaking', 'Factory Visits', 'Market Access'])
                                            .filter(f => f.trim().length > 0)
                                            .map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-gray-500 text-sm font-bold uppercase tracking-tight">
                                                    <div className="w-2 h-2 rounded-full bg-dragon-red" />
                                                    {feature.trim()}
                                                </li>
                                            ))}
                                    </ul>

                                    <Link href="/enquiry" className="block w-full">
                                        <button className="w-full bg-dragon-blue text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-dragon-red transition-all cursor-pointer shadow-lg hover:shadow-red-500/20">
                                            Enquire Now
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
