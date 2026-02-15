import Header from '@/components/DynamicHeader';
import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-gray-50 text-dragon-blue">
            <Header variant="dark" />

            {/* Hero Section */}
            <section className="pt-40 pb-20 bg-dragon-blue">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-white mb-4">Trade Insights</h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        Your definitive guide to China sourcing, Indian trade policy updates, and business strategy for the 2026 trade frontier.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post.id}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                                    {post.featuredImage?.node?.sourceUrl ? (
                                        <img
                                            src={post.featuredImage.node.sourceUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-dragon-red" />
                                        <span className="text-dragon-blue font-semibold uppercase tracking-wider">Update</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-dragon-blue mb-4 group-hover:text-dragon-red transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <div
                                        className="text-gray-600 mb-6 text-sm line-clamp-3 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                    />
                                    <span className="text-dragon-red font-bold inline-flex items-center gap-2">
                                        Read Deep Dive <span>→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-white py-12 border-t border-gray-100">
                <div className="container mx-auto px-6 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Canton Fair India. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
