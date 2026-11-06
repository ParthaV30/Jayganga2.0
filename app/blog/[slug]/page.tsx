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
  return <BlogPostClient slug={slug} />;
}
