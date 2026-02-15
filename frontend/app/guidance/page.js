import Header from '@/components/DynamicHeader';
import Link from 'next/link';
import { getPageBySlug, getGuidancePages } from '@/lib/wordpress';

export default async function GuidanceOverview() {
    const mainPage = await getPageBySlug('/guidance/');
    const subPages = await getGuidancePages();

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="pt-32 container mx-auto px-6">
                <h1 className="text-5xl font-bold text-dragon-blue mb-8">{mainPage?.title || 'Business Guidance'}</h1>
                <div
                    className="prose prose-lg max-w-none text-gray-700 mb-16"
                    dangerouslySetInnerHTML={{ __html: mainPage?.content || 'Access our expert trade guides.' }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {subPages.map((page) => (
                        <Link
                            key={page.id}
                            href={`/guidance/${page.slug}`}
                            className="group p-8 border border-gray-100 rounded-3xl shadow-xl hover:border-dragon-red transition-all"
                        >
                            <h3 className="text-2xl font-bold text-dragon-blue mb-4 group-hover:text-dragon-red transition-colors">
                                {page.title}
                            </h3>
                            <div
                                className="text-gray-600 mb-6 text-sm line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: page.excerpt || `Learn more about our ${page.title.toLowerCase()} strategies.` }}
                            />
                            <span className="text-dragon-red font-bold">Read Guide →</span>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
