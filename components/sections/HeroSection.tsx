'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Box, Compass, ShieldCheck } from 'lucide-react';
import HeroStallCanvas from '../3d/HeroStallCanvas';
import { HomepageContent } from '../../lib/data/types';

interface HeroSectionProps {
  content: HomepageContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="top" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#F2EFE8] text-[#292B28]">
      {/* Subtle Hairline Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-60 pointer-events-none" />

      {/* Main Content & 3D Model Container */}
      <div className="relative max-w-7xl mx-auto px-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Headline, Subtitle, Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-7 text-left py-6 lg:py-0">
          {/* Telemetry Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 text-[#292B28] text-xs font-mono uppercase tracking-widest w-fit">
            <span className="w-2 h-2 rounded-full bg-[#C65D36]" />
            <span>{content.hero_badge || 'EXHIBITION ARCHITECTURE & FABRICATION'}</span>
          </div>

          {/* Monumental Solid Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.08] text-[#202522]">
              <span className="block">{content.hero_title_line1 || 'WE BUILD EXPERIENCES.'}</span>
              <span className="block text-[#C65D36]">
                {content.hero_title_line2 || 'YOU BUILD CONNECTIONS.'}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#777B70] font-normal leading-relaxed max-w-xl">
            {content.hero_subtitle || 'Transforming spaces into extraordinary brand experiences through innovative exhibition stall design, fabrication and execution.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Link
              href="/#projects"
              className="px-6 py-3.5 rounded-md bg-[#C65D36] text-[#FFFFFF] font-medium text-xs tracking-wider uppercase hover:bg-[#B34E28] transition-colors flex items-center gap-2"
            >
              <span>{content.hero_cta_primary || 'Explore Our Projects'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 hover:bg-[#D6D1C5] text-[#202522] font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-2"
            >
              <span>{content.hero_cta_secondary || 'Start Your Project'}</span>
            </Link>
          </div>

          {/* Live Engineering Telemetry Metadata */}
          <div className="pt-3 border-t border-[#777B70]/20 grid grid-cols-2 gap-4 text-[11px] font-mono text-[#777B70]">
            <div>
              <span className="text-[#777B70] block uppercase">FACILITY CAPACITY</span>
              <span className="text-[#202522] font-semibold">45,000 sq.ft Mechanized</span>
            </div>
            <div>
              <span className="text-[#777B70] block uppercase">QUALITY AUDIT</span>
              <span className="text-[#C65D36] font-semibold">ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Canvas Box (7 cols) */}
        <div className="lg:col-span-7 h-[480px] sm:h-[560px] lg:h-[640px] w-full relative flex items-center justify-center rounded-xl overflow-hidden border border-[#777B70]/30 bg-[#FFFFFF]">
          <HeroStallCanvas />
        </div>
      </div>

      {/* Bottom Architectural Bar & Animated Scroll Indicator */}
      <div className="relative max-w-7xl mx-auto px-6 w-full pt-4 flex items-center justify-between border-t border-[#777B70]/20 text-xs font-mono text-[#777B70] z-10">
        <div className="hidden sm:flex items-center gap-6">
          <span>PRECISION CNC JOINERY</span>
          <span>•</span>
          <span>CANTILEVER LOAD CERTIFIED</span>
          <span>•</span>
          <span>18-HR EARLY HANDOVER</span>
        </div>

        {/* Animated Scroll Cue */}
        <a
          href="#story"
          className="flex items-center gap-3 text-[#777B70] hover:text-[#202522] transition-colors mx-auto sm:mx-0 group cursor-pointer"
        >
          <span className="uppercase tracking-widest text-[11px]">3D Fabrication Sequence</span>
          <div className="w-6 h-9 rounded-full border border-[#777B70]/40 flex items-start justify-center p-1 group-hover:border-[#202522] transition-colors">
            <div className="w-1.5 h-2 rounded-full bg-[#C65D36] animate-bounce" />
          </div>
        </a>

        <div className="hidden sm:block text-[#C65D36]">
          PHASES 01 — 06
        </div>
      </div>
    </section>
  );
}
