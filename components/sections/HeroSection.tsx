'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Sparkles, Box, Compass, Ruler, ShieldCheck } from 'lucide-react';
import HeroStallCanvas from '../3d/HeroStallCanvas';
import { HomepageContent } from '../../lib/data/types';

interface HeroSectionProps {
  content: HomepageContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="top" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#07070a]">
      {/* Background Architectural Atmosphere & Glows */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/[0.035] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-500/[0.025] blur-[120px] pointer-events-none rounded-full" />

      {/* Main Content & 3D Model Container */}
      <div className="relative max-w-7xl mx-auto px-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Headline, Subtitle, Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-7 text-left py-6 lg:py-0">
          {/* Telemetry Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest w-fit backdrop-blur-md">
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
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
            {content.hero_subtitle || 'Transforming spaces into extraordinary brand experiences through innovative exhibition stall design, fabrication and execution.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link
              href="/#projects"
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 active:scale-95 group"
            >
              <span>{content.hero_cta_primary || 'Explore Our Projects'}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/#contact"
              className="px-7 py-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.08] text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <span>{content.hero_cta_secondary || 'Start Your Project'}</span>
            </Link>
          </div>

          {/* Live Engineering Telemetry Metadata */}
          <div className="pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-4 text-[11px] font-mono text-neutral-400">
            <div>
              <span className="text-neutral-500 block uppercase">WORKSHOP CAPACITY</span>
              <span className="text-neutral-200 font-medium">45,000 sq.ft Mechanized</span>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase">STRUCTURAL SIGN-OFF</span>
              <span className="text-amber-400 font-medium">ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Canvas (7 cols) */}
        <div className="lg:col-span-7 h-[480px] sm:h-[560px] lg:h-[640px] w-full relative flex items-center justify-center rounded-3xl overflow-hidden border border-white/[0.08] bg-[#09090e]/60 backdrop-blur-sm">
          {/* 3D Canvas with Viewport HUD */}
          <HeroStallCanvas />
        </div>
      </div>

      {/* Bottom Architectural Bar & Animated Scroll Indicator */}
      <div className="relative max-w-7xl mx-auto px-6 w-full pt-4 flex items-center justify-between border-t border-white/[0.06] text-xs font-mono text-neutral-500 z-10">
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
          className="flex items-center gap-3 text-neutral-400 hover:text-amber-300 transition-colors mx-auto sm:mx-0 group cursor-pointer"
        >
          <span className="uppercase tracking-widest text-[11px]">Explore 3D Fabrication Story</span>
          <div className="w-7 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-amber-400 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-amber-400 animate-bounce" />
          </div>
        </a>

        <div className="hidden sm:block text-amber-400/80">
          6-STAGE GSAP TIMELINE
        </div>
      </div>
    </section>
  );
}
