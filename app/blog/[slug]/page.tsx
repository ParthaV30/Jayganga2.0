import { Suspense } from 'react';
import { initialBlogs } from '../../../lib/data/initial-data';
import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  return initialBlogs.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2EFE8] flex items-center justify-center font-mono text-sm text-[#777B70]">Loading perspective...</div>}>
      <BlogPostClient slug={slug} />
    </Suspense>
  );
}
