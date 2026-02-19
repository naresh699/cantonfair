"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero({ featuredTrip, heroData }) {
    const displayHeading = heroData?.heroHeading || featuredTrip?.title || "China Business Excellence";
    const displayTagline = heroData?.heroTagline?.replace(/<[^>]*>?/gm, '') || "Experience the world's largest trade fair with Canton Fair India's exclusive executive tours.";

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dragon-blue">
            {/* Parallax Background */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
            />

            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-dragon-red text-white px-4 py-1 rounded-full text-sm font-semibold mb-6 inline-block uppercase tracking-widest"
                >
                    Featured Experience
                </motion.span>

                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                    {displayHeading}
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10"
                >
                    {displayTagline}
                </motion.p>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/itinerary"
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all cursor-pointer"
                    >
                        View Itinerary
                    </Link>
                    <Link href="/guidance" className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-lg font-bold px-10 py-4 rounded-full hover:bg-white hover:text-dragon-blue transition-all inline-block">
                        Get Consultation
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dragon-blue to-transparent" />
        </section>
    );
}
