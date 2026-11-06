'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import SmoothScroll from '../../../components/layout/SmoothScroll';
import { useCMS } from '../../../lib/data/useCMS';
import { formatDate } from '../../../lib/utils';
import { Calendar, Clock, ArrowLeft, ArrowUpRight, Tag, User } from 'lucide-react';

export default function BlogPostClient({ slug }: { slug: string }) {
  const { blogs } = useCMS();

  const post = blogs.find(b => b.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#07070a] text-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-40 text-center space-y-4">
          <h1 className="text-3xl font-bold">Article Not Found</h1>
          <p className="text-neutral-400">The requested architectural perspective is unavailable or moved.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-amber-400 font-mono text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Insights Index</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#07070a] text-white">
        <Navbar />

        <main className="pt-32 pb-24">
          <article className="max-w-4xl mx-auto px-6 space-y-12">
            {/* Breadcrumb / Back button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-amber-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Insights</span>
            </Link>

            {/* Header info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.published_at)}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.read_time}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {post.title}
              </h1>

              {/* Author pill */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{post.author_name}</div>
                  <div className="text-xs font-mono text-neutral-400">{post.author_role}</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Excerpt Lead */}
            <div className="p-6 rounded-2xl bg-[#0f0f16] border border-amber-400/20 text-base md:text-lg text-amber-100 font-light leading-relaxed">
              {post.excerpt}
            </div>

            {/* Markdown Body Content Render */}
            <div className="prose prose-invert max-w-none space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed font-light">
              {post.content.split('\n\n').map((block, idx) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-4">
                      {block.replace('## ', '')}
                    </h2>
                  );
                }
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-bold text-amber-200 tracking-tight pt-2">
                      {block.replace('### ', '')}
                    </h3>
                  );
                }
                if (block.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="p-4 rounded-xl border-l-4 border-amber-400 bg-white/[0.02] text-amber-100 italic my-4">
                      {block.replace('> ', '')}
                    </blockquote>
                  );
                }
                return <p key={idx}>{block}</p>;
              })}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-2 items-center">
                <Tag className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-neutral-500 uppercase mr-2">Filed Under:</span>
                {post.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Consultation Box */}
            <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#12121a] to-[#0a0a0e] border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-1">Planning an upcoming trade show?</h4>
                <p className="text-xs text-neutral-400">Our engineering leads are ready to review your stall layout.</p>
              </div>
              <Link
                href="/#contact"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <span>Initiate Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

