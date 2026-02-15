"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header({ variant = 'light', menuItems = [] }) {
    const [isScrolled, setIsScrolled] = useState(false);

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
                    <Link href="/canton-fair" className="bg-dragon-red text-white px-6 py-2 rounded-full hover:bg-white hover:text-dragon-red transition-all shadow-lg border border-transparent hover:border-dragon-red">
                        Canton Fair
                    </Link>
                </nav>
            </div>
        </header>
    );
}
