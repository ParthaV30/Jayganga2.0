'use client';

import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SmoothScroll from '../../components/layout/SmoothScroll';
import ProjectModal from '../../components/ui/ProjectModal';
import { useCMS } from '../../lib/data/useCMS';
import { Project } from '../../lib/data/types';
import { Search, MapPin, Maximize2, Sparkles, Filter } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Custom Exhibition Stalls',
  'Modular Exhibition Stalls',
  'Corporate Exhibitions',
  'Retail Displays',
  'Event Fabrication'
] as const;

export default function ProjectsPage() {
  const { projects } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const published = projects.filter(p => p.status === 'published');

  const filtered = published.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#F2EFE8] text-[#292B28]">
        <Navbar />

        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Page Header */}
            <div className="space-y-4 mb-12 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#777B70]/30 text-[#C65D36] text-xs font-mono uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL PORTFOLIO</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-[#202522] tracking-tight">
                COMPLETED EXHIBITION PAVILIONS
              </h1>
              <p className="text-[#777B70] text-base leading-relaxed">
                Explore our turnkey architectural stalls engineered for leading international trade shows, auto expos, aerospace summits, and luxury retail galleries.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#C65D36] text-white font-bold'
                        : 'bg-[#F2EFE8] text-[#777B70] hover:text-[#202522] hover:bg-[#D6D1C5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777B70]" />
                <input
                  type="text"
                  placeholder="Search project or client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-xs text-[#292B28] placeholder-[#777B70] focus:outline-none focus:border-[#C65D36]"
                />
              </div>
            </div>

            {/* Projects Grid */}
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-[#777B70] font-mono text-sm">
                No matching exhibition stalls found. Try adjusting your category or query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(project => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#777B70]/20 hover:border-[#C65D36] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden bg-neutral-200">
                      <img
                        src={project.featured_image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/90 backdrop-blur-md border border-[#777B70]/20 text-[#202522] rounded-full">
                          {project.category}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#777B70]/20 text-[#202522] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4 text-[#C65D36]" />
                        </div>
                      </div>

                      {project.area_sqm && (
                        <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white">
                          {project.area_sqm}
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="text-xs font-mono text-[#C65D36] uppercase tracking-wider font-semibold">
                        {project.client_name}
                      </div>

                      <h3 className="text-xl font-bold text-[#202522] tracking-tight group-hover:text-[#C65D36] transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#777B70] line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="pt-3 border-t border-[#777B70]/15 flex items-center justify-between text-xs font-mono text-[#777B70]">
                        <span className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#777B70]" />
                          <span className="truncate">{project.location}</span>
                        </span>
                        <span className="text-[#C65D36] font-semibold">Inspect →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </SmoothScroll>
  );
}

