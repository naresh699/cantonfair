import Link from 'next/link';

export default function Footer({ menuItems = [], content = null }) {
    const data = content?.json || {};
    const taglineMain = data.tagline_main || "Canton Fair India. Expert-led business guidance.";
    const taglineSub = data.tagline_sub || "Bridging Indo-China Business Alliances.";
    const copyright = data.copyright || `© ${new Date().getFullYear()} Canton Fair India. All rights reserved.`;

    return (
        <footer className="bg-dragon-blue py-12 border-t border-white/10 text-gray-400">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <p>{taglineMain} {copyright.replace(/© \d{4} /, '')}</p>
                        <p className="text-sm mt-2 opacity-60">{taglineSub}</p>
                    </div>
                    <div className="flex gap-6 text-sm font-medium">
                        {menuItems.length > 0 ? (
                            menuItems.map((item) => (
                                <Link key={item.id} href={item.uri} className="hover:text-dragon-red transition-colors">
                                    {item.label}
                                </Link>
                            ))
                        ) : (
                            <>
                                <Link href="/terms-and-conditions" className="hover:text-dragon-red transition-colors">
                                    Terms & Conditions
                                </Link>
                                <Link href="/privacy-policy" className="hover:text-dragon-red transition-colors">
                                    Privacy Policy
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
