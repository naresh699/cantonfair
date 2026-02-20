import { motion } from 'framer-motion';
import Link from 'next/link';

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
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-dragon-blue mb-4">Sourcing Trips</h2>
                    <div className="w-24 h-1 bg-dragon-red mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trips.map((trip, index) => (
                        <motion.div
                            key={trip.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:border-dragon-red/30 transition-all"
                        >
                            <div className="h-48 bg-dragon-blue relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                                    style={{
                                        backgroundImage: `url('${trip.tripFields?.image || 'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2070&auto=format&fit=crop'}')`
                                    }}
                                />
                                <div className="absolute top-4 left-4 bg-dragon-red text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg">
                                    {trip.tripFields?.city ? trip.tripFields.city : 'China'}
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-dragon-blue mb-3">{trip.title}</h3>
                                <div className="flex items-center gap-2 mb-6 text-dragon-red font-bold text-xl">
                                    {trip.tripFields?.price ? trip.tripFields.price : 'Enquire for Price'}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {(trip.tripFields?.features ? trip.tripFields.features.split(',') : ['B2B Matchmaking', 'Factory Visits', 'Market Access'])
                                        .filter(f => f.trim().length > 0)
                                        .map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-dragon-red" />
                                                {feature.trim()}
                                            </li>
                                        ))}
                                </ul>

                                <Link href={`/trips/${trip.slug}`} className="block w-full">
                                    <button className="w-full border-2 border-dragon-blue text-dragon-blue py-3 rounded-xl font-bold hover:bg-dragon-blue hover:text-white transition-all cursor-pointer">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
