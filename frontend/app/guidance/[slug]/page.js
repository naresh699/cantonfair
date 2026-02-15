import Header from '@/components/DynamicHeader';
import { getPageBySlug } from '@/lib/wordpress';

export default async function GuidancePage({ params }) {
    const { slug } = params;
    const page = await getPageBySlug(slug);

    if (!page) {
        return <div className="pt-32 text-center">Guide info not found</div>;
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="pt-32 container mx-auto px-6 max-w-4xl">
                <h1 className="text-5xl font-bold text-dragon-blue mb-12 border-b pb-6">{page.title}</h1>
                <div className="prose prose-lg max-w-none text-gray-700 mb-24" dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
        </main>
    );
}
