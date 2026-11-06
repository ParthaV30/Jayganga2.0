'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project, HomepageContent } from '../../lib/data/types';
import ProjectModal from '../ui/ProjectModal';
import { MapPin, ArrowUpRight, Sparkles, Maximize2 } from 'lucide-react';

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
    <section id="projects" className="relative py-28 md:py-36 bg-[#F2EFE8] text-[#292B28] border-t border-[#777B70]/20 overflow-hidden">
      {/* Subtle Hairline Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 text-[#202522] text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#C65D36]" />
              <span>{content.portfolio_subheading || 'CURATED EXHIBITION PAVILIONS'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#202522] tracking-tight leading-[1.12]">
              {content.portfolio_heading || 'SELECTED ARCHITECTURE'}
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#202522] hover:text-[#C65D36] font-bold transition-colors"
          >
            <span>Full Archive ({publishedProjects.length})</span>
            <ArrowUpRight className="w-4 h-4 text-[#C65D36]" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-colors ${
                activeCategory === cat
                  ? 'bg-[#C65D36] text-[#FFFFFF] font-medium'
                  : 'bg-[#FFFFFF] border border-[#777B70]/30 text-[#292B28] hover:bg-[#D6D1C5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#777B70]/30 hover:border-[#202522] transition-colors flex flex-col justify-between shadow-sm"
            >
              {/* Natural Photography */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#D6D1C5]">
                <img
                  src={project.featured_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category & Zoom Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-[#202522]/90 text-[#FFFFFF] rounded">
                    {project.category}
                  </span>
                  <div className="w-7 h-7 rounded bg-[#FFFFFF]/90 text-[#202522] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-[#C65D36]" />
                  </div>
                </div>

                {/* Footprint badge */}
                {project.area_sqm && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#FFFFFF]/90 text-[11px] font-mono text-[#202522] border border-[#777B70]/20">
                    {project.area_sqm}
                  </div>
                )}
              </div>

              {/* Text Meta Container */}
              <div className="p-6 space-y-2.5">
                <div className="text-xs font-mono text-[#C65D36] uppercase tracking-wider font-semibold">
                  {project.client_name}
                </div>

                <h3 className="text-lg font-bold text-[#202522] tracking-tight line-clamp-1 group-hover:text-[#C65D36] transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-[#777B70] line-clamp-2 leading-relaxed font-normal">
                  {project.description}
                </p>

                <div className="pt-3 border-t border-[#777B70]/20 flex items-center justify-between text-xs font-mono text-[#777B70]">
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#777B70]" />
                    <span className="truncate max-w-[180px]">{project.location}</span>
                  </span>

                  <span className="text-[#202522] font-semibold group-hover:text-[#C65D36] transition-colors flex items-center gap-1">
                    <span>Inspect</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquire={onEnquireProject}
      />
    </section>
  );
}
