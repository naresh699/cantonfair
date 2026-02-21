"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ variant = 'light', menuItems = [] }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const textColor = 'text-dragon-blue';

    const defaultMenu = [
        { label: 'Sourcing Trips', uri: '/#trips' },
        { label: 'Guidance', uri: '/guidance' },
        { label: 'Blog', uri: '/blog' },
        { label: 'Visa', uri: '/visa' }
    ];

    const displayMenu = menuItems.length > 0 ? menuItems : defaultMenu;

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/80 backdrop-blur-sm py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center group">
                    <div className="bg-white/10 p-1 rounded-lg transition-colors group-hover:bg-white/20">
                        <img
                            src="/logo.png"
                            alt="Canton Fair India Logo"
                            className="h-10 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                    </div>
                </Link>
                <nav className={`hidden md:flex items-center gap-8 font-bold transition-colors ${textColor}`}>
                    {displayMenu.map((item, index) => (
                        <Link
                            key={index}
                            href={item.uri || item.path || '#'}
                            className="hover:text-dragon-red transition-colors uppercase text-sm tracking-wider"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/enquiry" className="bg-dragon-red text-white px-6 py-2 rounded-full hover:bg-dragon-blue transition-all shadow-lg border border-transparent text-sm font-bold uppercase tracking-wider">
                        Enquire Now
                    </Link>
                </nav>

                {/* Mobile Menu Button - Highly Visible */}
                <button
                    className="md:hidden text-white z-50 relative bg-dragon-blue w-12 h-12 flex items-center justify-center rounded-xl shadow-lg hover:bg-dragon-red transition-all cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span className={`w-full h-1 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-full h-1 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-full h-1 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '-100%' }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-0 bg-white z-[60] md:hidden flex flex-col items-center justify-center gap-8 shadow-2xl"
                        >
                            {/* Close Button Inside Menu */}
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-8 right-8 w-12 h-12 bg-dragon-blue text-white rounded-full flex items-center justify-center shadow-lg"
                            >
                                <div className="w-6 h-6 relative">
                                    <span className="absolute top-1/2 left-0 w-full h-1 bg-white rounded-full rotate-45" />
                                    <span className="absolute top-1/2 left-0 w-full h-1 bg-white rounded-full -rotate-45" />
                                </div>
                            </button>

                            <div className="absolute top-8 left-8">
                                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                            </div>

                            <div className="flex flex-col items-center gap-8">
                                {displayMenu.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.uri || item.path || '#'}
                                        className="text-3xl font-black text-dragon-blue hover:text-dragon-red transition-colors block py-2 uppercase tracking-widest"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/enquiry"
                                    className="bg-dragon-red text-white text-xl font-black px-12 py-4 rounded-full hover:bg-dragon-blue transition-all shadow-2xl mt-4 uppercase tracking-widest"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Enquire Now
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
