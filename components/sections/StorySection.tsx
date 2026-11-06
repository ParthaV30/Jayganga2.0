'use client';

import React, { useState, useEffect, useRef } from 'react';
import StoryStallCanvas from '../3d/StoryStallCanvas';
import { HomepageContent } from '../../lib/data/types';
import { Layers, CheckCircle2, ChevronRight, Eye, Sparkles } from 'lucide-react';

interface StorySectionProps {
  content: HomepageContent;
}

const STAGES = [
  {
    number: "01",
    stage: 1,
    title: "Empty Exhibition Floor",
    subtitle: "Precision Subfloor Layout & Laser Gridding",
    description: "Laser-calibrated hall footprint marking, electrical duct channels, and heavy-duty corner leveling pylons installed across an 8.4m x 6.4m island boundary.",
    specs: ["Footprint: 120 sqm", "Tolerances: ±1.5mm", "Subfloor: High-impact phenolic board"]
  },
  {
    number: "02",
    stage: 2,
    title: "Structural Framework",
    subtitle: "High-Tensile Aluminum & Steel Truss Assembly",
    description: "Structural aluminum box-trusses, vertical load-bearing columns, and overhead gantry bridge beams erected with certified load capacity for hanging lighting rigs.",
    specs: ["Extrusions: EN-AW 6082-T6", "Load Rating: 750 kg/point", "Height: 4.6m Clearance"]
  },
  {
    number: "03",
    stage: 3,
    title: "Walls, Flooring & Panels",
    subtitle: "Architectural Cladding & Acoustic Wood Joinery",
    description: "Seamless matte graphite partition walls, dark polished parquet flooring tiles, and CNC-milled vertical acoustic timber fins assembled with flush concealed joins.",
    specs: ["Flooring: Dark Parquet Laminate", "Acoustic: Micro-slatted oak fins", "Finish: Zero-VOC Satin PU"]
  },
  {
    number: "04",
    stage: 4,
    title: "Lighting & Digital Displays",
    subtitle: "Photometric Illuminations & Panoramic LED Walls",
    description: "Overhead 4000K warm-balanced spotlights, glowing amber LED neon perimeter strips, and an ultra-fine pitch curved panoramic video wall energized and calibrated.",
    specs: ["LED Pitch: 1.8mm SMD", "Color Temp: 4000K Warm Neutral", "Lumens: 850 nits high-bright"]
  },
  {
    number: "05",
    stage: 5,
    title: "Brand Signage & Graphics",
    subtitle: "Dimensional Backlit Typography & Reception Desk",
    description: "Suspended circular rotating halo banner, 3D laser-cut acrylic backlit logo, monolithic champagne gold reception desk, and illuminated product pedestals.",
    specs: ["Logo: 3D Halo Backlit Acrylic", "Desk: Monolithic with brass trim", "Turntable: 360° Motorized base"]
  },
  {
    number: "06",
    stage: 6,
    title: "Final Completed Stall",
    subtitle: "VIP Executive Lounge & Turnkey Handover",
    description: "Contemporary modernist lounge armchairs, tempered frosted glass discussion tables, architectural biophilic planters, and deep detailing for a flawless VIP opening.",
    specs: ["Lounge: 8-person executive suite", "Sign-off: ISO 9001 quality audit", "Status: Turnkey Delivered Ahead of Schedule"]
  }
];

export default function StorySection({ content }: StorySectionProps) {
  const [activeStage, setActiveStage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize scroll through the 6 stages
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      
      if (totalHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));
      setScrollProgress(progress);

      // Map progress 0..1 to stage 1..6
      const stageIndex = Math.min(6, Math.max(1, Math.floor(progress * 6) + 1));
      setActiveStage(stageIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStageData = STAGES[activeStage - 1] || STAGES[0];

  return (
    <section 
      id="story" 
      ref={containerRef}
      className="relative bg-[#07070a] border-t border-white/[0.08]"
      style={{ height: '380vh' }} // Extended height for luxurious pinned scroll experience
    >
      {/* Sticky Fullscreen 3D Story Canvas */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />
        
        {/* Top Header Information Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20 md:pt-24 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.story_section_badge || 'THE 3D FABRICATION STORY'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {content.story_section_title || 'THE ANATOMY OF A BESPOKE STALL'}
            </h2>
          </div>

          {/* Interactive Scrubbing Step Tabs */}
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            {STAGES.map((s) => (
              <button
                key={s.number}
                onClick={() => {
                  setActiveStage(s.stage);
                  if (containerRef.current) {
                    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
                    const targetScroll = containerRef.current.offsetTop + (totalHeight * ((s.stage - 1) / 5.5));
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeStage === s.stage
                    ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/30'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{s.number}</span>
                <span className="hidden xl:inline">{s.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Fullscreen 3D Canvas */}
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
          <StoryStallCanvas currentStage={activeStage} progress={scrollProgress} />
        </div>

        {/* Bottom Floating Architectural Card & Stage Progress */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-8 md:pb-12 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            {/* Stage Description Card (7 cols) */}
            <div className="lg:col-span-7 pointer-events-auto p-6 md:p-8 rounded-2xl bg-[#0c0c12]/90 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded bg-amber-400/20 text-amber-300 font-mono font-bold text-sm">
                    STAGE {currentStageData.number} / 06
                  </span>
                  <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                    {currentStageData.subtitle}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PHASE VERIFIED</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                  {currentStageData.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  {currentStageData.description}
                </p>
              </div>

              {/* Technical Specifications Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentStageData.specs.map((spec, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Vertical Progress Meter (5 cols) */}
            <div className="lg:col-span-5 pointer-events-auto flex flex-col justify-end space-y-3">
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>SCROLL TIMELINE PROGRESS</span>
                <span className="text-amber-400 font-bold">{Math.round(scrollProgress * 100)}%</span>
              </div>

              {/* Step indicator bar */}
              <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-300 rounded-full"
                  style={{ width: `${Math.max(16, scrollProgress * 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-neutral-500">
                <span>01 FLOOR</span>
                <span>02 TRUSS</span>
                <span>03 CLADDING</span>
                <span>04 LIGHTS</span>
                <span>05 BRAND</span>
                <span>06 HANDOVER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
