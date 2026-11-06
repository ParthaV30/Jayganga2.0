'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost, HomepageContent } from '../../lib/data/types';
import { formatDate } from '../../lib/utils';
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react';

interface BlogSectionProps {
  blogs: BlogPost[];
  content: HomepageContent;
}

export default function BlogSection({ blogs, content }: BlogSectionProps) {
  const publishedBlogs = blogs.filter(b => b.status === 'published');

  return (
    <section id="blog" className="relative py-28 md:py-36 bg-[#07070a] border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{content.blog_subheading || 'PERSPECTIVES ON SPATIAL DESIGN & EXPO ROI'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {content.blog_heading || 'INSIGHTS, IDEAS & INSPIRATION'}
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300 hover:text-amber-200 transition-colors group"
          >
            <span>View All Insights ({publishedBlogs.length})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedBlogs.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between rounded-2xl bg-[#0e0e14] border border-white/[0.07] hover:border-amber-400/40 transition-all duration-300 overflow-hidden"
            >
              {/* Featured Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent pointer-events-none" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/10 text-amber-300 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {formatDate(post.published_at)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {post.read_time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300 group-hover:text-amber-200 font-semibold transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
