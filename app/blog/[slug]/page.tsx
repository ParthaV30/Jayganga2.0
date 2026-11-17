import type { Metadata } from 'next';
import { Suspense } from 'react';
import { initialBlogs } from '../../../lib/data/initial-data';
import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  return initialBlogs.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = initialBlogs.find((b) => b.slug === slug);
  const title = post ? `${post.title} | JAYGANGA Expo Stall Fabrication` : 'Exhibition Insights | JAYGANGA';
  const description = post?.excerpt || 'Expert exhibition stall fabrication insights, architectural design, and trade show spatial strategies across India.';
  const url = `https://www.stallfabricator.in/blog/${slug}`;
  const image = post?.featured_image || '/images/logo.png';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'JAYGANGA Expo Stall Fabrication',
      images: [
        {
          url: image,
          alt: post?.title || 'JAYGANGA Blog Article',
        },
      ],
      type: 'article',
      publishedTime: post?.published_at,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
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
