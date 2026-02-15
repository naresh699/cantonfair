import Header from '@/components/DynamicHeader';
import Image from 'next/image';
import Link from 'next/link';
import {
    Calendar, MapPin, Globe, CreditCard, ShieldCheck, Users,
    CheckCircle2, ArrowRight, Plane, Building2, Smartphone,
    FileText, BadgeCheck, Download, ExternalLink, Clock, Star,
    Zap, Heart, Trophy, Target
} from 'lucide-react';

export const metadata = {
    title: 'Canton Fair 2025 – Complete Guide for Indian Buyers | Canton Fair India',
    description: 'Everything you need to know about the 138th Canton Fair (China Import & Export Fair) 2025. Phases, dates, badge process, invitation letters, and why you should attend with Canton Fair India.',
    keywords: 'Canton Fair 2025, China Import Export Fair, Canton Fair India, Canton Fair badge, Canton Fair invitation, Guangzhou trade fair, Indian buyers China',
    openGraph: {
        title: 'Canton Fair 2025 – Complete Guide | Canton Fair India',
        description: 'Your ultimate guide to the world\'s largest trade fair. Phases, dates, registration, and expert assistance for Indian entrepreneurs.',
    }
};

const phases = [
    {
        id: 1,
        title: "Phase 1",
        springDates: "April 15–19",
        autumnDates: "October 15–19",
        color: "from-blue-500 to-blue-700",
        categories: [
            { name: "Electronics & Appliances", items: "Household Electrical Appliances, Consumer Electronics, Information Products" },
            { name: "Manufacturing & Machinery", items: "Industrial Automation, Processing Machinery, Power Machinery, Construction & Agricultural Machinery" },
            { name: "Vehicles & Transport", items: "New Energy Vehicles, Smart Mobility, Vehicle Spare Parts, Motorcycles, Bicycles" },
            { name: "Lighting & Electrical", items: "Lighting Equipment, Electronic Products, New Energy Resources" },
            { name: "Hardware & Tools", items: "Hardware, Tools, International Pavilion" },
        ]
    },
    {
        id: 2,
        title: "Phase 2",
        springDates: "April 23–27",
        autumnDates: "October 23–27",
        color: "from-emerald-500 to-emerald-700",
        categories: [
            { name: "Houseware & Ceramics", items: "General Ceramics, Kitchenware, Tableware, Household Items" },
            { name: "Gifts & Decorations", items: "Glass Artware, Home Decorations, Festival Products, Clocks, Watches, Optical Instruments" },
            { name: "Building & Furniture", items: "Building Materials, Sanitary & Bathroom Equipment, Furniture, Stone/Iron Decoration" },
            { name: "Gardening", items: "Gardening Products, Outdoor Spa Equipment, Art Ceramics, Weaving & Rattan Products" },
        ]
    },
    {
        id: 3,
        title: "Phase 3",
        springDates: "May 1–5",
        autumnDates: "Oct 31 – Nov 4",
        color: "from-purple-500 to-purple-700",
        categories: [
            { name: "Fashion & Apparel", items: "Men's & Women's Clothing, Kids' Wear, Sportswear, Leather, Shoes, Bags" },
            { name: "Home Textiles", items: "Home Textiles, Carpets, Tapestries, Fashion Accessories, Textile Raw Materials" },
            { name: "Health & Recreation", items: "Medicines, Medical Devices, Food, Sports & Recreation Products, Personal Care, Pet Products" },
            { name: "Children & Toys", items: "Toys, Baby & Maternity Products, Office Supplies, Traditional Chinese Specialties" },
        ]
    }
];

const badgeSteps = [
    { step: 1, title: "Pre-Register Online", description: "Visit buyer.cantonfair.org.cn and create your buyer account. Fill in your business details and passport information.", icon: Globe },
    { step: 2, title: "Get Invitation Letter", description: "Download your official e-invitation from the Canton Fair app or request one through our concierge service. This confirms your eligibility.", icon: FileText },
    { step: 3, title: "Generate QR Code", description: "After pre-registration, you'll receive a QR code via email. Save this on your phone — it's your ticket to collect the badge.", icon: Smartphone },
    { step: 4, title: "Collect Your Badge", description: "Present your passport + QR code at any registration office: Baiyun Airport, Guangzhou South Railway Station, Pazhou Ferry Terminal, or the Fair Complex.", icon: BadgeCheck },
];

// Fetch dynamic content
import { getPageBySlug, getSiteContent } from '@/lib/wordpress';

export default async function CantonFairPage() {
    const [page, siteContent] = await Promise.all([
        getPageBySlug('canton-fair'),
        getSiteContent('canton-page-content')
    ]);

    const staticWhyWithUs = [
        { icon: "Users", title: "Expert Delegation Leader", description: "Travel with a seasoned China trade expert who speaks Mandarin and knows every hall of the Canton Fair Complex." },
        { icon: "ShieldCheck", title: "Visa & Invitation Handled", description: "We handle your Business Visa (M Category) application and provide the official invitation letter — zero paperwork stress." },
        { icon: "Building2", title: "Premium Accommodation", description: "Stay at hand-picked hotels near the Pazhou Complex with breakfast included. Walking distance to the fair." },
        { icon: "Target", title: "Supplier Matching", description: "Tell us your product requirements before the trip. We pre-identify verified suppliers and schedule meetings for you." },
        { icon: "CreditCard", title: "Payment & Logistics Support", description: "Navigate WeChat Pay, Alipay, and RMB transactions easily. We assist with sample shipping and freight forwarding." },
        { icon: "Trophy", title: "Post-Fair Support", description: "Our relationship doesn't end at the fair. We help with order follow-ups, quality inspections, and shipping coordination." },
    ];

    const whyWithUs = siteContent?.json?.why_us || staticWhyWithUs;

    // Icon Mapping
    const IconMap = {
        Users, ShieldCheck, Building2, Target, CreditCard, Trophy,
        Calendar, MapPin, Globe, CheckCircle2, ArrowRight, Plane, Smartphone,
        FileText, BadgeCheck, Download, ExternalLink, Clock, Star, Zap, Heart
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-28 pb-20 bg-gradient-to-br from-dragon-blue via-dragon-blue to-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
                            <Star size={14} className="text-dragon-red" />
                            <span>138th Session — Established Since 1957</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            {page?.title || 'Canton Fair 2025'}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-4">
                            China Import & Export Fair — The World's Largest Trade Exhibition
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-10">
                            <Link href="/visa" className="bg-dragon-red text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-dragon-red transition-all shadow-xl text-lg flex items-center gap-2">
                                Apply for Visa & Invitation <ArrowRight size={20} />
                            </Link>
                            <a href="https://www.cantonfair.org.cn" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all text-lg flex items-center gap-2">
                                Official Website <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Content Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Content */}
                        <div className="lg:w-2/3 prose prose-lg prose-headings:text-dragon-blue prose-a:text-dragon-red max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: page?.content }} />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3 space-y-8">
                            {/* Invitation Card */}
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-lg text-center">
                                <h3 className="text-lg font-bold text-dragon-blue mb-4">Official Invitation Sample</h3>
                                <div className="relative w-full aspect-square max-w-sm mx-auto rounded-xl overflow-hidden shadow-md">
                                    <Image src="/images/canton-fair/invitation_secure.png" alt="Canton Fair Invitation Letter" fill className="object-contain" />
                                </div>
                                <Link href="/visa" className="text-sm font-bold text-dragon-red hover:underline">Get your invitation letter &rarr;</Link>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-dragon-blue/5 rounded-2xl p-6 border border-dragon-blue/10">
                                <h3 className="font-bold text-dragon-blue mb-4">Quick Resources</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="https://www.cantonfair.org.cn" target="_blank" className="flex items-center gap-2 text-gray-600 hover:text-dragon-red transition-colors">
                                            <Globe size={16} /> Official Website
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://buyer.cantonfair.org.cn" target="_blank" className="flex items-center gap-2 text-gray-600 hover:text-dragon-red transition-colors">
                                            <BadgeCheck size={16} /> Buyer E-Service Tool
                                        </a>
                                    </li>
                                    <li>
                                        <Link href="/trips" className="flex items-center gap-2 text-gray-600 hover:text-dragon-red transition-colors">
                                            <Plane size={16} /> View Sourcing Trips
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Why With Us */}
            <section className="py-20 bg-gradient-to-br from-dragon-blue to-blue-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Attend Canton Fair <span className="text-dragon-red">With Us?</span></h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Yes, you can go alone. But with Canton Fair India, you get a curated, stress-free experience that maximizes your ROI.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyWithUs.map((item, index) => {
                            const IconComponent = IconMap[item.icon] || Star;
                            return (
                                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-dragon-red/50 transition-all group">
                                    <IconComponent size={36} className="text-dragon-red mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/visa" className="inline-flex items-center gap-2 bg-dragon-red text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-dragon-red transition-all shadow-2xl">
                            Start Your Canton Fair Journey <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Official Links */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-dragon-blue text-center mb-10">Official Canton Fair Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a href="https://www.cantonfair.org.cn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-dragon-red/30 transition-all group">
                            <Globe className="text-dragon-red shrink-0" size={24} />
                            <div>
                                <div className="font-bold text-dragon-blue group-hover:text-dragon-red transition-colors">Canton Fair Official Website</div>
                                <div className="text-sm text-gray-500">www.cantonfair.org.cn</div>
                            </div>
                            <ExternalLink size={16} className="text-gray-300 ml-auto" />
                        </a>
                        <a href="https://buyer.cantonfair.org.cn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-dragon-red/30 transition-all group">
                            <BadgeCheck className="text-dragon-red shrink-0" size={24} />
                            <div>
                                <div className="font-bold text-dragon-blue group-hover:text-dragon-red transition-colors">Buyer Registration Portal</div>
                                <div className="text-sm text-gray-500">buyer.cantonfair.org.cn</div>
                            </div>
                            <ExternalLink size={16} className="text-gray-300 ml-auto" />
                        </a>
                        <a href="https://www.cantonfair.org.cn/en-US/corpBadge/index" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-dragon-red/30 transition-all group">
                            <CreditCard className="text-dragon-red shrink-0" size={24} />
                            <div>
                                <div className="font-bold text-dragon-blue group-hover:text-dragon-red transition-colors">Badge Application</div>
                                <div className="text-sm text-gray-500">Online badge pre-registration</div>
                            </div>
                            <ExternalLink size={16} className="text-gray-300 ml-auto" />
                        </a>
                        <a href="https://www.cantonfair.org.cn/en-US/about/index#venue" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-dragon-red/30 transition-all group">
                            <MapPin className="text-dragon-red shrink-0" size={24} />
                            <div>
                                <div className="font-bold text-dragon-blue group-hover:text-dragon-red transition-colors">Venue & Floor Maps</div>
                                <div className="text-sm text-gray-500">Pazhou Complex layout</div>
                            </div>
                            <ExternalLink size={16} className="text-gray-300 ml-auto" />
                        </a>
                        <a href="https://www.cantonfair.org.cn/en-US/about/index" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-dragon-red/30 transition-all group">
                            <FileText className="text-dragon-red shrink-0" size={24} />
                            <div>
                                <div className="font-bold text-dragon-blue group-hover:text-dragon-red transition-colors">About Canton Fair</div>
                                <div className="text-sm text-gray-500">History & overview</div>
                            </div>
                            <ExternalLink size={16} className="text-gray-300 ml-auto" />
                        </a>
                        <Link href="/trips" className="flex items-center gap-4 p-6 bg-dragon-red/5 rounded-xl border-2 border-dragon-red/20 hover:shadow-lg hover:border-dragon-red/50 transition-all group">
                            <Plane className="text-dragon-red shrink-0" size={24} />
                            <div>
                                <div className="font-bold text-dragon-red">Our Sourcing Trips</div>
                                <div className="text-sm text-gray-500">View Canton Fair India tours</div>
                            </div>
                            <ArrowRight size={16} className="text-dragon-red ml-auto" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Bottom */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-dragon-blue mb-4">Ready to Visit the Canton Fair?</h2>
                    <p className="text-gray-500 max-w-xl mx-auto mb-8">
                        Whether it's your first time or your tenth, our team ensures you get maximum value from every visit. Let us handle the logistics — you focus on the deals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/visa" className="bg-dragon-red text-white px-8 py-4 rounded-full font-bold hover:bg-dragon-blue transition-all shadow-lg">
                            Get Started — Apply Now
                        </Link>
                        <Link href="/trips" className="border-2 border-dragon-blue text-dragon-blue px-8 py-4 rounded-full font-bold hover:bg-dragon-blue hover:text-white transition-all">
                            View Upcoming Trips
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
