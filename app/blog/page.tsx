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
      <div className="min-h-screen bg-[#F2EFE8] text-[#292B28]">
        <Navbar />

        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="space-y-4 mb-16 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#777B70]/30 text-[#C65D36] text-xs font-mono uppercase tracking-widest shadow-sm">
                <BookOpen className="w-3.5 h-3.5" />
                <span>EXHIBITION INDUSTRY PERSPECTIVES</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-[#202522] tracking-tight">
                INSIGHTS, IDEAS & SPATIAL STRATEGY
              </h1>
              <p className="text-[#777B70] text-base leading-relaxed">
                Essays, architectural analysis, and engineering perspectives on trade show ROI, modular systems, and cutting-edge materials.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                      selectedCat === cat
                        ? 'bg-[#C65D36] text-white font-bold'
                        : 'bg-[#F2EFE8] text-[#777B70] hover:text-[#202522] hover:bg-[#D6D1C5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777B70]" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-xs text-[#292B28] placeholder-[#777B70] focus:outline-none focus:border-[#C65D36]"
                />
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(post => (
                <article
                  key={post.id}
                  className="group flex flex-col justify-between rounded-2xl bg-white border border-[#777B70]/20 hover:border-[#C65D36] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-white/90 backdrop-blur-md border border-[#777B70]/20 text-[#202522] rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs font-mono text-[#777B70]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#777B70]" />
                          {formatDate(post.published_at)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#777B70]" />
                          {post.read_time}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#202522] tracking-tight group-hover:text-[#C65D36] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-[#777B70] line-clamp-3 leading-relaxed font-normal">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#777B70]/15">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C65D36] group-hover:text-[#B34E28] font-semibold transition-colors"
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

