"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero({ featuredTrip, heroData }) {
    const displayHeading = heroData?.heroHeading || featuredTrip?.title || "China Business Excellence";
    const displayTagline = heroData?.heroTagline?.replace(/<[^>]*>?/gm, '') || "Experience the world's largest trade fair with Canton Fair India's exclusive executive tours.";
    const heroImage = featuredTrip?.tripFields?.image || featuredTrip?.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2070&auto=format&fit=crop";

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-dragon-blue">
            {/* Parallax Background */}
            <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url('${heroImage}')` }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-dragon-blue/80 via-dragon-blue/60 to-dragon-blue z-1" />

            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center mb-8"
                >
                    <span className="bg-dragon-red text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-4 shadow-2xl">
                        Official 2026 Batch
                    </span>
                    <div className="w-12 h-1 bg-dragon-red rounded-full" />
                </motion.div>

                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl md:text-8xl font-black mb-8 leading-[0.95] uppercase tracking-tighter italic"
                >
                    {displayHeading.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 === 0 ? "text-white" : "text-dragon-red block md:inline"}>
                            {word}{' '}
                        </span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
                >
                    {displayTagline}
                </motion.p>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link href="/enquiry" className="group bg-dragon-red text-white text-lg font-black px-12 py-5 rounded-xl hover:bg-white hover:text-dragon-red transition-all shadow-[0_20px_50px_rgba(222,41,16,0.3)] uppercase tracking-widest flex items-center gap-3">
                        Enquire Now
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                    </Link>
                    <Link
                        href="/visa"
                        className="text-white border-b-2 border-white/30 hover:border-dragon-red px-4 py-2 font-black uppercase tracking-widest transition-all text-sm"
                    >
                        Apply for Visa
                    </Link>
                </motion.div>
            </div>

            {/* Floating Stats */}
            <div className="absolute bottom-12 left-0 w-full hidden lg:block z-10 px-6">
                <div className="container mx-auto flex justify-between items-end border-l-4 border-dragon-red pl-8">
                    <div className="space-y-1">
                        <div className="text-4xl font-black text-white italic">15+</div>
                        <div className="text-xs font-black text-dragon-red uppercase tracking-widest">Years Experience</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-4xl font-black text-white italic">5000+</div>
                        <div className="text-xs font-black text-dragon-red uppercase tracking-widest">Entrepreneurs Guided</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-4xl font-black text-white italic">100%</div>
                        <div className="text-xs font-black text-dragon-red uppercase tracking-widest">Visa Success Rate</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
