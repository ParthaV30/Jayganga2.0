'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Award, Compass, Hammer, ShieldCheck, Factory, Ruler, Clock } from 'lucide-react';
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
    <section id="about" className="relative py-28 md:py-36 bg-[#08080c] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Ruler className="w-3.5 h-3.5" />
            <span>{content.about_subheading || 'PRECISION CRAFTSMANSHIP MEETS ARCHITECTURAL VISION'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
            {content.about_heading || 'TURNING IDEAS INTO REMARKABLE SPACES'}
          </h2>
        </div>

        {/* Narrative & Architectural Photography Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Architectural Imagery Collage (6 cols) */}
          <div className="lg:col-span-6 relative">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group">
              <img
                src={content.about_image_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80'}
                alt="Exhibition Stall Structural Engineering"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                  FACILITY & CRAFTSMANSHIP
                </span>
                <p className="text-sm font-semibold text-white">
                  45,000 sq.ft Heavy Structural & CNC Joinery Facilities
                </p>
              </div>
            </div>

            {/* Floating Overlapping Accent Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-64 p-5 rounded-xl bg-[#0f0f15]/95 border border-amber-400/30 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                  Zero-Tolerance Engineering
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Pre-assembled and dry-fitted in our workshop prior to venue dispatch.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Story & Metrics (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p className="font-light">
                {content.about_paragraph1 || 'We are a professional stall fabrication and exhibition solutions company specializing in designing, developing and executing customized exhibition spaces. From concept to completion, we combine creativity, engineering and craftsmanship to bring brands to life.'}
              </p>
              <p className="text-sm sm:text-base text-neutral-400 font-light">
                {content.about_paragraph2 || 'With over 45,000 sq.ft of in-house CNC carpentry, heavy metal fabrication workshops, laser cutting facilities, and paint booths, our team ensures every millimetre meets rigorous global expo standards.'}
              </p>
            </div>

            {/* Core Capabilities Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                'Structural Load Certification',
                'In-House 5-Axis CNC Milling',
                'Automated Dust-Free Paint Suites',
                'Curved LED Screen Engineering',
                'Overnight Hall Strike & Logistics',
                'Global Climate-Controlled Warehousing'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-mono text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* About Action CTA */}
            <div className="pt-4">
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300 hover:text-amber-200 transition-colors group"
              >
                <span>Discover All Fabrication Capabilities</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Architectural Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24 pt-12 border-t border-white/[0.08]">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/30 transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-xl bg-white/[0.04] w-fit text-amber-400 mb-4 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
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
