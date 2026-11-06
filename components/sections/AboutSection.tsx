'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Award, Compass, ShieldCheck, Factory, Ruler, Clock } from 'lucide-react';
import { HomepageContent } from '../../lib/data/types';

interface AboutSectionProps {
  content: HomepageContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const stats = [
    { value: content.stat_years || '16+', label: content.stat_years_label || 'Years of Craftsmanship', icon: Clock },
    { value: content.stat_projects || '850+', label: content.stat_projects_label || 'Turnkey Stalls Fabricated', icon: Factory },
    { value: content.stat_venues || '48+', label: content.stat_venues_label || 'Global Expo Venues', icon: Compass },
    { value: content.stat_rate || '99.4%', label: content.stat_rate_label || 'On-Time Handover Rate', icon: ShieldCheck }
  ];

  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#F2EFE8] text-[#292B28] overflow-hidden">
      {/* Subtle Hairline Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 text-[#202522] text-xs font-mono uppercase tracking-widest">
            <Ruler className="w-3.5 h-3.5 text-[#C65D36]" />
            <span>{content.about_subheading || 'PRECISION CRAFTSMANSHIP MEETS ARCHITECTURAL VISION'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#202522] tracking-tight leading-[1.12]">
            {content.about_heading || 'TURNING IDEAS INTO REMARKABLE SPACES'}
          </h2>
        </div>

        {/* Narrative & Photography Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Natural Architectural Photography (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#777B70]/30 shadow-md bg-[#FFFFFF]">
              <img
                src={content.about_image_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80'}
                alt="Exhibition Stall Structural Engineering"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#202522]/90 text-[#FFFFFF] backdrop-blur-sm">
                <span className="text-[10px] font-mono text-[#D6D1C5] uppercase tracking-widest block mb-0.5">
                  FACILITY & CRAFTSMANSHIP
                </span>
                <p className="text-xs font-medium">
                  45,000 sq.ft Heavy Structural & CNC Joinery Facilities
                </p>
              </div>
            </div>

            {/* Overlapping Spec Box */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-60 p-4 rounded-lg bg-[#FFFFFF] border border-[#777B70]/40 shadow-lg">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Award className="w-4 h-4 text-[#C65D36]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#202522] font-bold">
                  Zero-Tolerance
                </span>
              </div>
              <p className="text-xs text-[#777B70] leading-relaxed">
                Pre-assembled and dry-fitted in our workshop prior to venue dispatch.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Metrics (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-base sm:text-lg leading-relaxed font-normal text-[#292B28]">
              <p>
                {content.about_paragraph1 || 'We are a professional stall fabrication and exhibition solutions company specializing in designing, developing and executing customized exhibition spaces. From concept to completion, we combine creativity, engineering and craftsmanship to bring brands to life.'}
              </p>
              <p className="text-sm sm:text-base text-[#777B70] font-normal leading-relaxed">
                {content.about_paragraph2 || 'With over 45,000 sq.ft of in-house CNC carpentry, heavy metal fabrication workshops, laser cutting facilities, and paint booths, our team ensures every millimetre meets rigorous global expo standards.'}
              </p>
            </div>

            {/* Core Capabilities Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Structural Load Certification',
                'In-House 5-Axis CNC Milling',
                'Automated Dust-Free Paint Suites',
                'Curved LED Screen Engineering',
                'Overnight Hall Strike & Logistics',
                'Global Climate-Controlled Warehousing'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#292B28]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65D36]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* About Action CTA */}
            <div className="pt-2">
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#202522] hover:text-[#C65D36] font-bold transition-colors group"
              >
                <span>Discover All Fabrication Capabilities</span>
                <ArrowUpRight className="w-4 h-4 text-[#C65D36]" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Architectural Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-10 border-t border-[#777B70]/20">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-xl bg-[#FFFFFF] border border-[#777B70]/30 shadow-sm transition-all"
              >
                <div className="p-2 rounded bg-[#F2EFE8] w-fit text-[#C65D36] mb-3">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#202522] tracking-tight mb-1 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-[#777B70] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
