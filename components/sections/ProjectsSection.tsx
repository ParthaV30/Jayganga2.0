'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project, HomepageContent } from '../../lib/data/types';
import ProjectModal from '../ui/ProjectModal';
import { MapPin, ArrowUpRight, Sparkles, Layers, Maximize2 } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  content: HomepageContent;
  onEnquireProject?: (projectTitle: string) => void;
}

const CATEGORIES = [
  'All',
  'Custom Exhibition Stalls',
  'Modular Exhibition Stalls',
  'Corporate Exhibitions',
  'Retail Displays',
  'Event Fabrication'
] as const;

export default function ProjectsSection({ projects, content, onEnquireProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const publishedProjects = projects.filter(p => p.status === 'published');
  
  const filteredProjects = activeCategory === 'All'
    ? publishedProjects
    : publishedProjects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 md:py-36 bg-[#08080c] border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.portfolio_subheading || 'WORLD-CLASS ARCHITECTURAL EXHIBITION PAVILIONS'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {content.portfolio_heading || 'CURATED PORTFOLIO'}
            </h2>
          </div>

          {/* Quick link to all projects */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300 hover:text-amber-200 transition-colors group"
          >
            <span>View Full Archive ({publishedProjects.length})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/20'
                  : 'bg-white/[0.03] border border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid (Asymmetric Architectural Composition) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, 6).map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden bg-[#0d0d12] border border-white/[0.08] hover:border-amber-400/50 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
                <img
                  src={project.featured_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent pointer-events-none" />

                {/* Category & Zoom Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/10 text-amber-300 rounded-full">
                    {project.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                  </div>
                </div>

                {/* Footprint badge */}
                {project.area_sqm && (
                  <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-neutral-300">
                    {project.area_sqm}
                  </div>
                )}
              </div>

              {/* Text Meta Container */}
              <div className="p-6 space-y-3">
                <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider">
                  {project.client_name}
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                  {project.description}
                </p>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="truncate max-w-[180px]">{project.location}</span>
                  </span>

                  <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Inspect</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquire={onEnquireProject}
      />
    </section>
  );
}
