import React from 'react';
import { getPayload } from 'payload';
import payloadConfig from '@/payload.config';
import BlogCard from '@/components/Blog/BlogCard';
import { BookOpen } from 'lucide-react';

export default async function BlogPage() {
    const payload = await getPayload({ config: payloadConfig });

    const blogData = await payload.find({
        collection: 'blogs',
        where: {
            status: {
                equals: 'published'
            }
        },
        sort: '-publishedAt',
        limit: 50,
    });

    return (
        <div className="min-h-screen p-5 max-sm:p-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                        <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Blog</h1>
                        <p className="text-muted-foreground">Thoughts, tutorials, and insights</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{blogData.docs.length} total posts</span>
                    <span>•</span>
                    <span>{blogData.docs.filter(b => b.category === 'tutorial').length} tutorials</span>
                    <span>•</span>
                    <span>{blogData.docs.filter(b => b.category === 'technology').length} tech posts</span>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto">
                {blogData.docs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogData.docs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-4 rounded-full bg-muted/50 mb-4">
                            <BookOpen className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No blog posts yet</h2>
                        <p className="text-muted-foreground">
                            Check back soon for new content!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
