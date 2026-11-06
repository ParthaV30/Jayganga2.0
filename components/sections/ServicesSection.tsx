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
    <section id="services" className="relative py-28 md:py-36 bg-[#D6D1C5] text-[#292B28] border-t border-[#777B70]/30 overflow-hidden">
      {/* Subtle Hairline Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 text-[#202522] text-xs font-mono uppercase tracking-widest">
              <Wrench className="w-3.5 h-3.5 text-[#C65D36]" />
              <span>{content.services_subheading || 'COMPREHENSIVE FABRICATION CAPABILITIES'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#202522] tracking-tight leading-[1.12]">
              {content.services_heading || 'ENGINEERED DIVISIONS'}
            </h2>
          </div>

          <p className="text-sm text-[#777B70] font-normal max-w-md leading-relaxed">
            From custom double-decker pavilions to agile modular systems, each discipline is engineered for commanding brand authority.
          </p>
        </div>

        {/* 6 Clean Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon_name] || Layers;
            return (
              <TiltCard
                key={service.id}
                className="bg-[#FFFFFF] border border-[#777B70]/30 hover:border-[#202522] transition-colors flex flex-col justify-between shadow-sm"
              >
                {/* Natural Photography Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#D6D1C5]">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Icon & Index Pill */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="p-2 rounded-md bg-[#FFFFFF]/90 text-[#C65D36] border border-[#777B70]/30">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#202522] bg-[#FFFFFF]/90 px-2 py-0.5 rounded border border-[#777B70]/30">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-bold text-[#202522] tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#777B70] leading-relaxed font-normal">
                      {service.short_description}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#777B70]/20">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#292B28] font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C65D36] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Action Button — Understated Solid Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleEnquireService(service.title)}
                      className="w-full py-2.5 px-4 rounded-md bg-[#F2EFE8] hover:bg-[#202522] hover:text-[#FFFFFF] border border-[#777B70]/30 text-xs font-mono uppercase tracking-wider text-[#202522] font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Commission Division</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C65D36]" />
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
