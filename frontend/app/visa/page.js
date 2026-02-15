import Header from '@/components/DynamicHeader';
import VisaForm from '@/components/VisaForm';
import { getPageBySlug, getSiteContent } from '@/lib/wordpress';

export default async function VisaPage() {
    const [page, siteContent] = await Promise.all([
        getPageBySlug('visa'),
        getSiteContent('visa-features')
    ]);

    const features = siteContent?.json?.features || [
        "Official document handling",
        "Fast processing (3-5 days)",
        "Business Invitations included"
    ];

    const formTitle = siteContent?.json?.form_title || "Start Your Application";

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Content (Smaller) */}
                    <div className="lg:col-span-4 prose prose-lg max-w-none order-2 lg:order-1">
                        <h1 className="text-5xl font-bold text-dragon-blue mb-6">{page?.title || 'Visa Assistance'}</h1>
                        <div
                            className="text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: page?.content || 'Canton Fair India handles the complexity of your travel documentation.' }}
                        />
                        <div className="mt-8">
                            <h3 className="text-2xl font-bold text-dragon-blue mb-4">Why Choose Us?</h3>
                            <ul className="space-y-3">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-700">
                                        <span className="text-dragon-red">✓</span> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Form (Larger - 66%) */}
                    <div className="lg:col-span-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-32 order-1 lg:order-2">
                        <h2 className="text-2xl font-bold text-dragon-blue mb-6">{formTitle}</h2>
                        <VisaForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
