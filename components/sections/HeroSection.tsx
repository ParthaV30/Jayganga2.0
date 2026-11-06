'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Sparkles, Box, Compass } from 'lucide-react';
import HeroStallCanvas from '../3d/HeroStallCanvas';
import { HomepageContent } from '../../lib/data/types';

interface HeroSectionProps {
  content: HomepageContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="top" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#07070a]">
      {/* Background Architectural Atmosphere & Glows */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/[0.04] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-500/[0.03] blur-[120px] pointer-events-none rounded-full" />

      {/* Main Content & 3D Model Container */}
      <div className="relative max-w-7xl mx-auto px-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Headline, Subtitle, Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 text-left py-8 lg:py-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{content.hero_badge || 'BESPOKE EXHIBITION ARCHITECTURE'}</span>
          </div>

          {/* Monumental Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.08] text-white">
              <span className="block">{content.hero_title_line1 || 'WE BUILD EXPERIENCES.'}</span>
              <span className="block gold-gradient-text">
                {content.hero_title_line2 || 'YOU BUILD CONNECTIONS.'}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl">
            {content.hero_subtitle || 'Transforming spaces into extraordinary brand experiences through innovative exhibition stall design, fabrication and execution.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/#projects"
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 active:scale-95 group"
            >
              <span>{content.hero_cta_primary || 'Explore Our Projects'}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/#contact"
              className="px-7 py-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.08] text-white font-semibold text-sm tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <span>{content.hero_cta_secondary || 'Start Your Project'}</span>
            </Link>
          </div>

          {/* Interactive Hint Pill */}
          <div className="flex items-center gap-3 pt-4 text-xs font-mono text-neutral-400">
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-amber-400">
              <Box className="w-4 h-4" />
            </div>
            <span>Interactive 3D Pavilion: Drag to rotate view</span>
          </div>
        </div>

        {/* Right Column: Interactive 3D Canvas (7 cols) */}
        <div className="lg:col-span-7 h-[460px] sm:h-[540px] lg:h-[620px] w-full relative flex items-center justify-center">
          {/* Subtle Framing Guides */}
          <div className="absolute top-2 left-2 text-[10px] font-mono text-neutral-600 tracking-wider">
            [MODEL_VIEWER: 120 SQM ISLAND]
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-amber-500/60 tracking-wider">
            SHADOWS_PBR // 60 FPS
          </div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-600 tracking-wider">
            AXIS: [X: +8.4m, Y: +4.6m, Z: +6.4m]
          </div>

          {/* 3D Canvas */}
          <HeroStallCanvas />
        </div>
      </div>

      {/* Bottom Architectural Bar & Animated Scroll Indicator */}
      <div className="relative max-w-7xl mx-auto px-6 w-full pt-6 flex items-center justify-between border-t border-white/[0.06] text-xs font-mono text-neutral-500 z-10">
        <div className="hidden sm:flex items-center gap-6">
          <span>PRECISION FABRICATION</span>
          <span>•</span>
          <span>MEZZANINE LOAD CERTIFIED</span>
          <span>•</span>
          <span>TURNKEY EXECUTION</span>
        </div>

        {/* Animated Scroll Cue */}
        <a
          href="#story"
          className="flex items-center gap-3 text-neutral-400 hover:text-amber-300 transition-colors mx-auto sm:mx-0 group cursor-pointer"
        >
          <span className="uppercase tracking-widest text-[11px]">Explore Fabrication Story</span>
          <div className="w-7 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-amber-400 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-amber-400 animate-bounce" />
          </div>
        </a>

        <div className="hidden sm:block text-amber-400/80">
          STAGE 01 — 06 SEQUENCE
        </div>
      </div>
    </section>
  );
}
