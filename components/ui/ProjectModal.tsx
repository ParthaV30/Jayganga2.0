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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white border border-[#777B70]/30 rounded-2xl shadow-2xl z-10 flex flex-col text-[#292B28]">
        {/* Top bar with close button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-[#777B70]/20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono uppercase tracking-widest bg-[#F2EFE8] border border-[#777B70]/30 text-[#C65D36] rounded-full">
              {project.category}
            </span>
            <span className="text-xs text-[#777B70] font-mono">
              {project.year || '2025'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#777B70] hover:text-[#202522] hover:bg-[#F2EFE8] rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Main Hero Gallery View */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-900 border border-[#777B70]/20">
              <img
                src={currentImage}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                  <p className="text-sm text-neutral-200 flex items-center gap-2 mt-1">
                    <span className="text-[#C65D36] font-medium">{project.client_name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C65D36]" />
                      {project.location}
                    </span>
                  </p>
                </div>
                {project.area_sqm && (
                  <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg text-xs font-mono text-white">
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
                      activeImageIndex === idx ? 'border-[#C65D36] scale-105' : 'border-[#777B70]/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#777B70]/20">
            {/* Left 2 Cols: Description, Challenge, Solution */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono text-[#C65D36] mb-2 font-semibold">Project Brief</h4>
                <p className="text-sm md:text-base text-[#292B28] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.challenge && (
                <div className="p-4 rounded-xl bg-[#F2EFE8] border border-[#777B70]/20 space-y-1">
                  <h5 className="text-xs uppercase font-mono tracking-wider text-[#777B70] font-semibold">The Architectural Challenge</h5>
                  <p className="text-sm text-[#292B28] leading-relaxed">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div className="p-4 rounded-xl bg-[#F2EFE8] border border-[#C65D36]/30 space-y-1">
                  <h5 className="text-xs uppercase font-mono tracking-wider text-[#C65D36] font-semibold">Engineering Solution</h5>
                  <p className="text-sm text-[#292B28] leading-relaxed">{project.solution}</p>
                </div>
              )}
            </div>

            {/* Right Col: Specifications & CTA */}
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/20 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#777B70] border-b border-[#777B70]/20 pb-2 font-semibold">
                  Technical Specifications
                </h4>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-xs text-[#777B70] uppercase block font-mono">Client</span>
                    <span className="text-[#202522] font-medium">{project.client_name}</span>
                  </div>

                  <div>
                    <span className="text-xs text-[#777B70] uppercase block font-mono">Exhibition / Venue</span>
                    <span className="text-[#202522] font-medium">{project.event_name || project.location}</span>
                  </div>

                  <div>
                    <span className="text-xs text-[#777B70] uppercase block font-mono">Footprint Area</span>
                    <span className="text-[#202522] font-medium">{project.area_sqm || 'Custom Size'}</span>
                  </div>

                  {project.materials && project.materials.length > 0 && (
                    <div>
                      <span className="text-xs text-[#777B70] uppercase block font-mono mb-1.5">Materials & Finishes</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.materials.map((mat, i) => (
                          <span key={i} className="px-2 py-0.5 text-[11px] bg-white border border-[#777B70]/30 rounded text-[#292B28]">
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
                className="w-full py-3.5 px-6 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
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

