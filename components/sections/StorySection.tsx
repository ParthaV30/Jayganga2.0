'use client';

import React, { useState, useEffect, useRef } from 'react';
import StoryStallCanvas from '../3d/StoryStallCanvas';
import { HomepageContent } from '../../lib/data/types';
import { Layers, CheckCircle2, ChevronRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StorySectionProps {
  content: HomepageContent;
}

const STAGES = [
  {
    number: "01",
    stage: 1,
    title: "Laser Grid & Subfloor Layout",
    subtitle: "PHASE 01 // SUBFLOOR ALIGNMENT",
    description: "Laser-calibrated 9.6m × 7.2m footprint layout, utility trench routing, and 4 corner hydraulic leveling pylons locked to strict hall venue regulations.",
    specs: ["Footprint: 120 sqm Island", "Tolerances: ±0.5mm Laser", "Subfloor: High-impact Phenolic Slabs"],
    code: "GRID_ALIGN_OK // X: +9.6m, Z: +7.2m"
  },
  {
    number: "02",
    stage: 2,
    title: "Triangulated Box-Truss Erection",
    subtitle: "PHASE 02 // STRUCTURAL SKELETON",
    description: "4 heavy-duty vertical column towers and overhead gantry bridge beams assembled from EN-AW 6082-T6 structural aluminum with certified load calculations.",
    specs: ["Alloy: EN-AW 6082-T6", "Load Rating: 750 kg/point", "Rigging Height: 4.6m Clearance"],
    code: "TORQUE_CHECK_PASSED // 850 KG/POINT"
  },
  {
    number: "03",
    stage: 3,
    title: "Mezzanine & Acoustic Wood Fin Cladding",
    subtitle: "PHASE 03 // ARCHITECTURAL JOINERY",
    description: "Cantilevered upper VIP deck slotted with structural I-beams, smoked glass safety balustrades, floating staircase, and 24 vertical acoustic fluted oak fins.",
    specs: ["Mezzanine: 4.2m × 3.2m VIP", "Glass: 12mm Smoked Tempered", "Acoustic: Fluted Natural Oak"],
    code: "MEZZANINE_LOAD // 40 PERSON CAPACITY"
  },
  {
    number: "04",
    stage: 4,
    title: "Panoramic LED Video Wall & Lighting",
    subtitle: "PHASE 04 // ILLUMINATIONS & AV RIGGING",
    description: "Ultra-wide 5.4m curved panoramic LED video screen, 6 overhead truss spotlights with photometric warmth calibration, and recessed perimeter amber neon flex strips.",
    specs: ["LED Pitch: 1.8mm Fine Pixel", "Color Temp: 4000K Neutral", "Screen Size: 5.4m × 2.3m Curve"],
    code: "PHOTOMETRIC_CALIB // 850 NITS LUMEN"
  },
  {
    number: "05",
    stage: 5,
    title: "Kinetic Halo Banner & Monolithic Reception",
    subtitle: "PHASE 05 // BRANDING & IDENTITY",
    description: "Suspended 5.2m circular kinetic halo ring, 3D acrylic monogram logo, reception counter in graphite and stone, and dual interactive demo kiosks.",
    specs: ["Halo: 5.2m Revolving Ring", "Counter: Monolithic Graphite & Stone", "Logo: Dimensional Acrylic"],
    code: "BRAND_IDENTITY // COMPLIANT"
  },
  {
    number: "06",
    stage: 6,
    title: "Completed Turnkey Handover & VIP Lounge",
    subtitle: "PHASE 06 // TURNKEY EXECUTION",
    description: "360° motorized revolving centerpiece turntable, executive VIP lounge armchairs, tempered glass discussion tables, preserved moss greenery, and final ISO 9001 sign-off.",
    specs: ["Lounge: 8-person executive pod", "Turntable: 360° Motorized base", "Handover: 18h Pre-Show Ahead"],
    code: "FINAL_HANDOVER_COMPLETE // ISO 9001"
  }
];

export default function StorySection({ content }: StorySectionProps) {
  const [activeStage, setActiveStage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wireframe, setWireframe] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=350%',
        pin: pinRef.current,
        scrub: 0.8,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);

          const stageIdx = Math.min(6, Math.max(1, Math.floor(prog * 6) + 1));
          setActiveStage(stageIdx);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentStageData = STAGES[activeStage - 1] || STAGES[0];

  const handleJumpToStage = (stageNum: number) => {
    setActiveStage(stageNum);
    if (!containerRef.current) return;
    const scrollTarget = containerRef.current.offsetTop + ((stageNum - 1) / 5.5) * (containerRef.current.offsetHeight - window.innerHeight);
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  };

  return (
    <section 
      id="story" 
      ref={containerRef}
      className="relative bg-[#202522] border-t border-[#292B28] text-[#FFFFFF]"
      style={{ height: '420vh' }}
    >
      {/* Sticky Pinned Canvas Container */}
      <div 
        ref={pinRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Dark Architectural Grid */}
        <div className="absolute inset-0 architectural-grid-dark opacity-20 pointer-events-none" />

        {/* Top Header HUD Information Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20 md:pt-24 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#292B28] border border-[#777B70]/40 text-[#D6D1C5] text-xs font-mono uppercase tracking-widest mb-1.5">
              <span>{content.story_section_badge || '3D FABRICATION STORY'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight">
              {content.story_section_title || 'THE ANATOMY OF A BESPOKE STALL'}
            </h2>
          </div>

          {/* Interactive Controls: Wireframe Toggle & Stage Scrubber */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors border flex items-center gap-1.5 ${
                wireframe
                  ? 'bg-[#C65D36] text-[#FFFFFF] border-[#C65D36] font-medium'
                  : 'bg-[#292B28] text-[#D6D1C5] border-[#777B70]/40 hover:text-[#FFFFFF]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{wireframe ? 'CAD Wireframe' : 'PBR Model'}</span>
            </button>

            {/* Stage Selector Pills */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded bg-[#292B28] border border-[#777B70]/40">
              {STAGES.map((s) => (
                <button
                  key={s.number}
                  onClick={() => handleJumpToStage(s.stage)}
                  className={`px-3 py-1 rounded text-xs font-mono transition-colors flex items-center gap-1 ${
                    activeStage === s.stage
                      ? 'bg-[#C65D36] text-[#FFFFFF] font-bold'
                      : 'text-[#D6D1C5] hover:text-[#FFFFFF]'
                  }`}
                >
                  <span>{s.number}</span>
                  <span className="hidden xl:inline">{s.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Fullscreen Continuous 3D Canvas */}
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
          <StoryStallCanvas 
            currentStage={activeStage} 
            progress={scrollProgress} 
            wireframeMode={wireframe}
          />
        </div>

        {/* Bottom Floating Architectural Card & Progress HUD */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pb-8 md:pb-12 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            {/* Stage Description Card (7 cols) */}
            <div className="lg:col-span-7 pointer-events-auto p-6 md:p-8 rounded-xl bg-[#202522]/95 border border-[#777B70]/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#777B70]/30 pb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#C65D36] text-[#FFFFFF] font-mono font-bold text-xs">
                    STAGE {currentStageData.number} / 06
                  </span>
                  <span className="text-xs uppercase font-mono tracking-widest text-[#D6D1C5]">
                    {currentStageData.subtitle}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#D6D1C5] bg-[#292B28] px-2.5 py-0.5 rounded border border-[#777B70]/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C65D36]" />
                  <span>{currentStageData.code}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#FFFFFF] tracking-tight mb-2">
                  {currentStageData.title}
                </h3>
                <p className="text-sm md:text-base text-[#D6D1C5] leading-relaxed font-light">
                  {currentStageData.description}
                </p>
              </div>

              {/* Technical Specifications Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentStageData.specs.map((spec, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded bg-[#292B28] border border-[#777B70]/30 text-xs font-mono text-[#D6D1C5]"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Vertical Progress Meter & Timeline Scrub (5 cols) */}
            <div className="lg:col-span-5 pointer-events-auto flex flex-col justify-end space-y-3">
              <div className="p-4 rounded-xl bg-[#202522]/95 border border-[#777B70]/30 flex items-center justify-between text-xs font-mono text-[#D6D1C5]">
                <div className="flex items-center gap-2">
                  <ArrowDown className="w-3.5 h-3.5 text-[#C65D36] animate-bounce" />
                  <span>FABRICATION PROGRESS</span>
                </div>
                <span className="text-[#C65D36] font-bold font-mono">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              {/* Step indicator bar - Solid Burnt Orange */}
              <div className="h-1.5 w-full rounded bg-[#292B28] overflow-hidden">
                <div 
                  className="h-full bg-[#C65D36] transition-all duration-150 rounded"
                  style={{ width: `${Math.max(16, scrollProgress * 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-[#777B70] uppercase">
                <span>01 Grid</span>
                <span>02 Truss</span>
                <span>03 Mezzanine</span>
                <span>04 LED Wall</span>
                <span>05 Halo</span>
                <span>06 Handover</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
