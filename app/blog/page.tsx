'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SmoothScroll from '../../components/layout/SmoothScroll';
import { useCMS } from '../../lib/data/useCMS';
import { formatDate } from '../../lib/utils';
import { Calendar, Clock, ArrowUpRight, BookOpen, Search } from 'lucide-react';

export default function BlogArchivePage() {
  const { blogs } = useCMS();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const published = blogs.filter(b => b.status === 'published');
  const categories = ['All', ...Array.from(new Set(published.map(b => b.category)))];

  const filtered = published.filter(b => {
    const matchesCat = selectedCat === 'All' || b.category === selectedCat;
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                          b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#07070a] text-white">
        <Navbar />

        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="space-y-4 mb-16 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" />
                <span>EXHIBITION INDUSTRY PERSPECTIVES</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                INSIGHTS, IDEAS & SPATIAL STRATEGY
              </h1>
              <p className="text-neutral-400 text-base leading-relaxed">
                Essays, architectural analysis, and engineering perspectives on trade show ROI, modular systems, and cutting-edge materials.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-[#0f0f16] border border-white/10 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                      selectedCat === cat
                        ? 'bg-amber-400 text-black font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(post => (
                <article
                  key={post.id}
                  className="group flex flex-col justify-between rounded-2xl bg-[#0e0e14] border border-white/[0.07] hover:border-amber-400/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/10 text-amber-300 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

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

                    <div className="pt-4 border-t border-white/[0.06]">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300 group-hover:text-amber-200 font-semibold transition-colors"
                      >
                        <span>Read Full Essay</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

