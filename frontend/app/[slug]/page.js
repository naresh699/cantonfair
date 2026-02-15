import Header from '@/components/DynamicHeader';
import { getPageBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

export default async function DynamicPage({ params }) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-dragon-blue">
            <Header />

            {/* Header Content */}
            <header className="pt-40 pb-20 bg-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-dragon-blue leading-tight mb-4 font-sans">
                        {page.title}
                    </h1>
                </div>
            </header>

            {/* Page Content */}
            <article className="container mx-auto px-6 max-w-3xl py-20">
                <div
                    className="prose prose-lg prose-headings:text-dragon-blue prose-a:text-dragon-red prose-strong:text-dragon-blue max-w-none
                        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:text-gray-600 prose-li:mb-2"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </article>
        </main>
    );
}
