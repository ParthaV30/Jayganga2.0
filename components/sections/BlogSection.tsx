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
    <section id="blog" className="relative py-28 md:py-36 bg-[#D6D1C5] text-[#292B28] border-t border-[#777B70]/30 overflow-hidden">
      {/* Subtle Hairline Grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 text-[#202522] text-xs font-mono uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5 text-[#C65D36]" />
              <span>{content.blog_subheading || 'PERSPECTIVES ON SPATIAL DESIGN & EXPO ROI'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#202522] tracking-tight leading-[1.12]">
              {content.blog_heading || 'INSIGHTS & ARCHITECTURAL PAPERS'}
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#202522] hover:text-[#C65D36] font-bold transition-colors"
          >
            <span>All Articles ({publishedBlogs.length})</span>
            <ArrowUpRight className="w-4 h-4 text-[#C65D36]" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedBlogs.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-xl bg-[#FFFFFF] border border-[#777B70]/30 overflow-hidden shadow-sm hover:border-[#202522] transition-colors"
            >
              {/* Featured Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#D6D1C5]">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider bg-[#202522]/90 text-[#FFFFFF] rounded">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#777B70]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.published_at)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.read_time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#202522] tracking-tight line-clamp-2 hover:text-[#C65D36] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#777B70] line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#777B70]/20">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#202522] hover:text-[#C65D36] font-bold transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C65D36]" />
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
