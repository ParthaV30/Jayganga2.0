'use client';

import React, { useState } from 'react';
import { Project } from '../../lib/data/types';
import { X, MapPin, Calendar, Maximize2, ShieldCheck, ChevronRight, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onEnquire?: (projectTitle: string) => void;
}

export default function ProjectModal({ project, onClose, onEnquire }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const allImages = [project.featured_image, ...(project.gallery_images || [])].filter(Boolean);
  const currentImage = allImages[activeImageIndex] || project.featured_image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0d0d12] border border-white/10 rounded-2xl shadow-2xl z-10 flex flex-col">
        {/* Top bar with close button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0d0d12]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-full">
              {project.category}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {project.year || '2025'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Main Hero Gallery View */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/10">
              <img
                src={currentImage}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                  <p className="text-sm text-neutral-300 flex items-center gap-2 mt-1">
                    <span className="text-amber-400 font-medium">{project.client_name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {project.location}
                    </span>
                  </p>
                </div>
                {project.area_sqm && (
                  <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-xs font-mono text-neutral-200">
                    {project.area_sqm}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail selector */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-white/10">
            {/* Left 2 Cols: Description, Challenge, Solution */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono text-amber-400 mb-2">Project Brief</h4>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.challenge && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                  <h5 className="text-xs uppercase font-mono tracking-wider text-neutral-400">The Architectural Challenge</h5>
                  <p className="text-sm text-neutral-300">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div className="p-4 rounded-xl bg-amber-400/[0.03] border border-amber-400/20 space-y-1">
                  <h5 className="text-xs uppercase font-mono tracking-wider text-amber-400">Engineering Solution</h5>
                  <p className="text-sm text-neutral-300">{project.solution}</p>
                </div>
              )}
            </div>

            {/* Right Col: Specifications & CTA */}
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-white/10 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-white/10 pb-2">
                  Technical Specifications
                </h4>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs text-neutral-500 uppercase block font-mono">Client</span>
                    <span className="text-white font-medium">{project.client_name}</span>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 uppercase block font-mono">Exhibition / Venue</span>
                    <span className="text-white font-medium">{project.event_name || project.location}</span>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-500 uppercase block font-mono">Footprint Area</span>
                    <span className="text-white font-medium">{project.area_sqm || 'Custom Size'}</span>
                  </div>

                  {project.materials && project.materials.length > 0 && (
                    <div>
                      <span className="text-xs text-neutral-500 uppercase block font-mono mb-1.5">Materials & Finishes</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.materials.map((mat, i) => (
                          <span key={i} className="px-2 py-0.5 text-[11px] bg-white/5 border border-white/10 rounded text-neutral-300">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Commission Enquiry Button */}
              <button
                onClick={() => {
                  onClose();
                  if (onEnquire) {
                    onEnquire(project.title);
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold text-sm hover:from-amber-300 hover:to-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <span>Enquire About Similar Booth</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
