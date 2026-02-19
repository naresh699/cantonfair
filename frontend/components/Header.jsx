"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

    // Always use dark text on white background for consistency
    const textColor = 'text-dragon-blue';

    // Default menu if none provided from WordPress
    const defaultMenu = [
        { label: 'Trips', uri: '/trips' },
        { label: 'Guidance', uri: '/guidance' },
        { label: 'Blog', uri: '/blog' },
        { label: 'Visa', uri: '/visa' }
    ];

    const displayMenu = menuItems.length > 0 ? menuItems : defaultMenu;

    return (
        <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300 py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className={`text-2xl font-bold transition-colors flex items-center gap-2 ${textColor}`}>
                    Canton Fair <span className="text-dragon-red">India</span>
                </Link>
                <nav className={`hidden md:flex items-center gap-8 font-medium transition-colors ${textColor}`}>
                    {displayMenu.map((item, index) => (
                        <Link
                            key={index}
                            href={item.uri || item.path}
                            className="hover:text-dragon-red transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/trips" className="bg-dragon-red text-white px-6 py-2 rounded-full hover:bg-white hover:text-dragon-red transition-all shadow-lg border border-transparent hover:border-dragon-red">
                        Canton Fair
                    </Link>
                </nav>

                {/* Mobile Menu Button - Improved Visibility */}
                <button
                    className="md:hidden text-dragon-blue z-50 relative bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>

                {/* Mobile Menu Overlay - Adjusted Sizes */}
                {/* Mobile Menu Overlay - Adjusted Sizes */}
                <div className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-40 transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-6 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    {displayMenu.map((item, index) => (
                        <Link
                            key={index}
                            href={item.uri || item.path}
                            className="text-xl font-bold text-dragon-blue hover:text-dragon-red transition-colors block py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/canton-fair"
                        className="bg-dragon-red text-white text-lg font-bold px-8 py-3 rounded-full hover:bg-white hover:text-dragon-red transition-all shadow-lg border border-transparent hover:border-dragon-red mt-4 cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Join Canton Fair
                    </Link>
                </div>
            </div>
        </header>
    );
}
