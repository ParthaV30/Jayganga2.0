'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Maximize2, X, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HomepageContent } from '../../lib/data/types';

interface HeroSectionProps {
  content: HomepageContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const heroImage = content.hero_image_url || '/images/hero-stall.jpg';

  return (
    <section id="top" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#F2EFE8] text-[#292B28]">
      {/* Subtle Hairline Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-60 pointer-events-none" />

      {/* Main Content & Exhibition Stall Image Container */}
      <div className="relative max-w-7xl mx-auto px-6 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center z-10 py-6 lg:py-4">
        {/* Left Column: Headline, Subtitle, Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-7 text-left">
          {/* Telemetry Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 text-[#292B28] text-xs font-mono uppercase tracking-widest w-fit shadow-sm">
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
              className="px-6 py-3.5 rounded-md bg-[#C65D36] text-[#FFFFFF] font-medium text-xs tracking-wider uppercase hover:bg-[#B34E28] transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>{content.hero_cta_primary || 'Explore Our Projects'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 hover:bg-[#D6D1C5] text-[#202522] font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>{content.hero_cta_secondary || 'Start Your Project'}</span>
            </Link>
          </div>

          {/* Live Engineering Telemetry Metadata */}
          <div className="pt-4 border-t border-[#777B70]/20 grid grid-cols-2 gap-4 text-[11px] font-mono text-[#777B70]">
            <div>
              <span className="text-[#777B70] block uppercase tracking-wider">FACILITY CAPACITY</span>
              <span className="text-[#202522] font-semibold text-xs">45,000 sq.ft Mechanized</span>
            </div>
            <div>
              <span className="text-[#777B70] block uppercase tracking-wider">QUALITY AUDIT</span>
              <span className="text-[#C65D36] font-semibold text-xs">ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Exhibition Stall Showcase Visual (7 cols) */}
        <div className="lg:col-span-7 h-[460px] sm:h-[540px] lg:h-[620px] w-full relative rounded-2xl overflow-hidden border border-[#777B70]/30 bg-white shadow-xl group">
          {/* Blueprint Corner Registration Crosshairs */}
          <span className="absolute top-3 left-3 z-30 font-mono text-xs text-white/70 select-none pointer-events-none drop-shadow">+</span>
          <span className="absolute top-3 right-3 z-30 font-mono text-xs text-white/70 select-none pointer-events-none drop-shadow">+</span>
          <span className="absolute bottom-3 left-3 z-30 font-mono text-xs text-white/70 select-none pointer-events-none drop-shadow">+</span>
          <span className="absolute bottom-3 right-3 z-30 font-mono text-xs text-white/70 select-none pointer-events-none drop-shadow">+</span>

          {/* Primary High-Resolution Architectural Stall Photograph */}
          <img
            src={heroImage}
            alt="AURA FORGE Architectural Exhibition Stall Pavilion"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          />

          {/* Cinematic Shading Vignettes for Depth & Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Top Overlays */}
          <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
            {/* Architectural Figure Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/95 backdrop-blur-md border border-[#777B70]/30 text-[#202522] text-[11px] font-mono uppercase tracking-wider shadow-sm pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-[#C65D36] animate-pulse" />
              <span className="font-semibold">FIG. 01 — DOUBLE-DECKER EXPO PAVILION</span>
            </div>

            {/* Scale & Action Tag */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono tracking-widest uppercase">
                180 SQM • SCALE 1:1
              </span>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-1.5 rounded-md bg-white/90 hover:bg-white text-[#202522] transition-colors shadow-sm"
                title="Inspect in full resolution"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Overlays: Technical Narrative & Spec Tags */}
          <div className="absolute bottom-6 left-6 right-6 z-20 space-y-3 pointer-events-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1 max-w-lg">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C65D36] font-bold block">
                  CRAFTED ARCHITECTURAL EXECUTION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Bespoke Cantilevered Trade Show Pavilion
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed hidden sm:block">
                  Precision matte graphite structural framing, vertical warm acoustic timber louvers, integrated LED reveals, and an elevated glass-walled VIP meeting lounge.
                </p>
              </div>

              <Link
                href="/#projects"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-[#C65D36] hover:bg-[#B34E28] text-white text-xs font-mono uppercase tracking-wider transition-colors shadow-sm flex-shrink-0"
              >
                <span>View Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Specification Badges */}
            <div className="pt-3 border-t border-white/15 flex flex-wrap gap-2 text-[10px] font-mono text-neutral-200">
              <span className="px-2 py-0.5 rounded bg-black/50 border border-white/15">
                POWDER-COATED STEEL
              </span>
              <span className="px-2 py-0.5 rounded bg-black/50 border border-white/15">
                CNC MILLED TIMBER
              </span>
              <span className="px-2 py-0.5 rounded bg-black/50 border border-white/15">
                TERRAZZO PLINTH
              </span>
              <span className="px-2 py-0.5 rounded bg-[#C65D36]/30 border border-[#C65D36]/50 text-white font-semibold">
                TURNKEY ONSITE BUILD
              </span>
            </div>
          </div>
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

      {/* Full-Screen Architectural Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white border border-[#777B70]/30 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#777B70]/15 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-[#F2EFE8] border border-[#777B70]/25 text-[#C65D36] font-semibold">
                  FIG. 01 ARCHITECTURAL BLUEPRINT
                </span>
                <span className="text-[#777B70]">Full-scale exhibition pavilion execution</span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-lg text-[#777B70] hover:text-[#202522] hover:bg-[#F2EFE8] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-900 border border-[#777B70]/20">
              <img
                src={heroImage}
                alt="AURA FORGE Architectural Exhibition Stall Pavilion Full View"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
              <p className="text-[#777B70] font-mono">
                Location: International Convention Center • Structural Grid: 12m × 15m • Turnkey Build by AURA FORGE
              </p>
              <Link
                href="/#contact"
                onClick={() => setIsLightboxOpen(false)}
                className="px-4 py-2 rounded-md bg-[#C65D36] hover:bg-[#B34E28] text-white font-mono uppercase text-xs font-semibold tracking-wider transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Request Similar Stall Proposal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
