import React from 'react';
import { getPayload } from 'payload';
import payloadConfig from '@/payload.config';
import BlogPageClient from '@/components/Blog/BlogPageClient';

// Server component wrapper
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
    limit: 100,
  });

  return <BlogPageClient blogs={blogData.docs} />;
}
