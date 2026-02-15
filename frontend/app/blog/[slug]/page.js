import Header from '@/components/DynamicHeader';
import { getPostBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-dragon-blue">
            <Header />

            {/* Header Content */}
            <header className="pt-40 pb-20 bg-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="flex items-center gap-4 mb-8 text-sm text-dragon-red font-bold uppercase tracking-widest">
                        <span>Trade Insight</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-400 font-medium lowercase italic uppercase no-italic">
                            {new Date(post.date).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-dragon-blue leading-tight mb-8 font-sans">
                        {post.title}
                    </h1>
                </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage?.node?.sourceUrl && (
                <div className="container mx-auto px-6 max-w-5xl -mt-10 mb-20">
                    <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Post Content */}
            <article className="container mx-auto px-6 max-w-3xl pb-16">
                <div
                    className="prose prose-lg prose-headings:text-dragon-blue prose-a:text-dragon-red prose-strong:text-dragon-blue max-w-none
                        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-8"
                    dangerouslySetInnerHTML={{
                        __html: post.content.replace(/<div class="[^"]*bg-slate-50[^"]*">.*?TL;DR: Key Findings.*?<\/div>/s, '')
                    }}
                />
            </article>

            {/* Related Resources */}
            <section className="bg-gray-50 py-16 mb-20 border-t border-gray-100">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h3 className="text-2xl font-bold text-dragon-blue mb-8">Related Resources</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-dragon-blue mb-2">Internal Guides</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/trips" className="text-dragon-red hover:underline flex items-center gap-2">
                                        <span>→</span> Upcoming Sourcing Trips
                                    </a>
                                </li>
                                <li>
                                    <a href="/visa" className="text-dragon-red hover:underline flex items-center gap-2">
                                        <span>→</span> Visa Assistance
                                    </a>
                                </li>
                                <li>
                                    <a href="/guidance" className="text-dragon-red hover:underline flex items-center gap-2">
                                        <span>→</span> Import Guidance
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-dragon-blue mb-2">External References</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="https://www.cantonfair.org.cn/en-US" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-dragon-red transition-colors flex items-center gap-2">
                                        <span>↗</span> Official Canton Fair Site
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.dgft.gov.in/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-dragon-red transition-colors flex items-center gap-2">
                                        <span>↗</span> DGFT India
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.cbic.gov.in/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-dragon-red transition-colors flex items-center gap-2">
                                        <span>↗</span> Indian Customs (CBIC)
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        </main >
    );
}
