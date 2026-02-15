import Header from '@/components/DynamicHeader';
import FAQ from '@/components/FAQ';
import { getFAQs, getPageBySlug } from '@/lib/wordpress';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Frequently Asked Questions | Canton Fair India',
    description: 'Common questions about attending the Canton Fair, getting a visa, and sourcing from China.',
};

export default async function FAQPage() {
    const [faqs, page] = await Promise.all([
        getFAQs(),
        getPageBySlug('faq')
    ]);

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-dragon-red transition-colors mb-4">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-dragon-blue mb-4">{page?.title || 'Frequently Asked Questions'}</h1>
                    <div
                        className="text-gray-600 prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: page?.content || '<p>Find answers to common questions about our services and the Canton Fair.</p>' }}
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <FAQ faqs={faqs} />
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <Link href="/visa" className="bg-dragon-blue text-white px-8 py-3 rounded-full font-bold hover:bg-dragon-red transition-colors">
                        Contact Meaning Support
                    </Link>
                </div>
            </div>
        </main>
    );
}
