'use client';

import React from 'react';
import { Service, HomepageContent } from '../../lib/data/types';
import TiltCard from '../ui/TiltCard';
import { 
  Layers, 
  Grid, 
  Compass, 
  Sparkles, 
  ShoppingBag, 
  Building, 
  ArrowUpRight, 
  CheckCircle2, 
  Wrench 
} from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  content: HomepageContent;
  onSelectService?: (serviceName: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  Grid,
  Compass,
  Sparkles,
  ShoppingBag,
  Building
};

export default function ServicesSection({ services, content, onSelectService }: ServicesSectionProps) {
  const activeServices = services.filter(s => s.is_active);

  const handleEnquireService = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-28 md:py-36 bg-[#07070a] border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Wrench className="w-3.5 h-3.5" />
              <span>{content.services_subheading || 'COMPREHENSIVE FABRICATION & SPATIAL SOLUTIONS'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {content.services_heading || 'ENGINEERED CAPABILITIES'}
            </h2>
          </div>

          <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed">
            From monumental custom double-decker pavilions to agile reusable modular systems, each discipline is engineered for commanding brand authority.
          </p>
        </div>

        {/* 6 Premium Service Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon_name] || Layers;
            return (
              <TiltCard
                key={service.id}
                className="bg-[#0f0f15] border border-white/[0.08] hover:border-amber-400/40 transition-colors flex flex-col justify-between"
              >
                {/* Image Container with Top Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f15] via-[#0f0f15]/30 to-transparent pointer-events-none" />

                  {/* Icon & Index Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-amber-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-neutral-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-light">
                      {service.short_description}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Action */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleEnquireService(service.title)}
                      className="w-full py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-amber-400 hover:text-black border border-white/10 hover:border-amber-400 text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Commission Service</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

