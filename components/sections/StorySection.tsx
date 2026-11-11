'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import StoryStallCanvas from '../3d/StoryStallCanvas';
import { HomepageContent } from '../../lib/data/types';
import { 
  CheckCircle2, 
  Play, 
  Pause, 
  ArrowUpRight, 
  Layers,
  Compass,
  RotateCw,
  Info,
  ChevronUp,
  ChevronDown,
  X
} from 'lucide-react';

interface StorySectionProps {
  content: HomepageContent;
}

interface StageData {
  number: string;
  stage: number;
  title: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  specs: string[];
  code: string;
  milestone: string;
}

const STAGES: StageData[] = [
  {
    number: "01",
    stage: 1,
    title: "Raised Floor & Hidden Wiring",
    shortLabel: "Floor",
    subtitle: "STEP 01 // FOUNDATION & CABLE TRENCHES",
    description: "We mark your exact booth space on the expo hall floor and lay a laser-leveled raised wooden platform. All heavy electrical wires, internet cables, and utility conduits are neatly hidden underneath so your stall has zero trip hazards and a clean, luxury finish.",
    specs: ["100% Level Wooden Platform", "Concealed Wiring & Power Outlets", "Zero Tripping Hazards for Attendees"],
    code: "FOUNDATION // LEVEL & VENUE COMPLIANT",
    milestone: "Flat & Deflection-Free Floor"
  },
  {
    number: "02",
    stage: 2,
    title: "Structural Metal Truss & Pillars",
    shortLabel: "Truss",
    subtitle: "STEP 02 // STRONG ALUMINUM SKELETON",
    description: "Certified riggers erect high-grade structural aluminum box-trusses and support columns, anchored securely with ceiling safety wires. This heavy-duty metal frame forms the safe skeleton that holds up all overhead lights, branding rings, and meeting rooms.",
    specs: ["Heavy-Duty Aluminum Trusses", "Safety-Rigged to Hall Ceiling", "Tested for Heavy Equipment Loads"],
    code: "STRUCTURE // SAFETY LOAD TESTED",
    milestone: "Rigid & Safe Framework"
  },
  {
    number: "03",
    stage: 3,
    title: "Custom Wooden Walls & VIP Room",
    shortLabel: "Walls",
    subtitle: "STEP 03 // CARPENTRY & PRIVATE LOUNGE",
    description: "Our master carpenters install pre-fabricated wooden feature walls, vertical acoustic timber fins, and a private upper mezzanine lounge with tempered glass safety railings — giving your team a quiet, premium space to close high-value deals.",
    specs: ["Smooth Factory-Finished Woodwork", "Private VIP Meeting Lounge", "Smoked Tempered Safety Glass"],
    code: "CARPENTRY // PRE-TESTED WORKSHOP FIT",
    milestone: "Precision Woodwork Finish"
  },
  {
    number: "04",
    stage: 4,
    title: "Curved LED Screen & Spotlights",
    shortLabel: "Screen",
    subtitle: "STEP 04 // VIDEO WALL & WARM LIGHTING",
    description: "We mount a seamless, high-definition curved LED video wall to showcase your brand films, install focused 4000K warm spotlights directly above key product displays, and embed concealed ambient glowing LED strips along the edges.",
    specs: ["Curved HD LED Video Screen", "Color-Balanced Focus Spotlights", "Concealed Warm Glow Accents"],
    code: "LIGHTING // 4000K OPTIMAL COLOR TEMP",
    milestone: "High-Impact Visual Draw"
  },
  {
    number: "05",
    stage: 5,
    title: "Front Reception Desk & Brand Signage",
    shortLabel: "Reception",
    subtitle: "STEP 05 // VISITOR WELCOME & BRAND WALL",
    description: "We install the solid stone-finish front reception counter, interactive digital touch kiosks, and the dimensional 3D backlit JAYGANGA brand wall emblem to create an inviting, professional entrance for incoming buyers.",
    specs: ["Solid Stone Reception Counter", "3D Backlit Brand Wall Emblem", "Interactive Digital Demo Kiosks"],
    code: "BRANDING // RECEPTION & SIGNAGE COMPLETE",
    milestone: "Welcoming Entrance"
  },
  {
    number: "06",
    stage: 6,
    title: "Furniture Setup & Early Handover",
    shortLabel: "Handover",
    subtitle: "STEP 06 // READY FOR BUSINESS 18-HRS EARLY",
    description: "We set up luxury leather armchairs, discussion tables, motorized rotating product stands, and fresh greenery. Following a thorough 50-point quality and cleanliness inspection, we hand over the stall 18 hours before the show opens.",
    specs: ["Luxury Leather Client Seating", "Rotating Product Showcase Pod", "Guaranteed 18-Hour Early Handover"],
    code: "HANDOVER // 100% READY FOR BUSINESS",
    milestone: "Early Handover Guarantee"
  }
];

export default function StorySection({ content }: StorySectionProps) {
  const [activeStage, setActiveStage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wireframe, setWireframe] = useState(false);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const autoPlayAnimRef = useRef<number | null>(null);

  // Scroll Progress Calculation with smooth interpolation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          const currentScrolled = -rect.top;

          if (currentScrolled >= 0 && currentScrolled <= totalScrollable) {
            const rawProgress = currentScrolled / totalScrollable;
            const clamped = Math.max(0, Math.min(1, rawProgress));
            setScrollProgress(clamped);

            const stageIndex = Math.min(6, Math.max(1, Math.floor(clamped * 5.99) + 1));
            setActiveStage(stageIndex);
          } else if (currentScrolled < 0) {
            setScrollProgress(0);
            setActiveStage(1);
          } else if (currentScrolled > totalScrollable) {
            setScrollProgress(1);
            setActiveStage(6);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  // Smooth Progress Tween Function for Mobile & Desktop button clicks
  const tweenProgressTo = (target: number) => {
    if (autoPlayAnimRef.current) cancelAnimationFrame(autoPlayAnimRef.current);
    const start = scrollProgress;
    const startTime = performance.now();
    const duration = 650; // ms

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - t, 3);
      const val = start + (target - start) * ease;
      setScrollProgress(val);

      const stageIndex = Math.min(6, Math.max(1, Math.floor(val * 5.99) + 1));
      setActiveStage(stageIndex);

      if (t < 1) {
        autoPlayAnimRef.current = requestAnimationFrame(animate);
      }
    };

    autoPlayAnimRef.current = requestAnimationFrame(animate);
  };

  // Automated Tour Walkthrough
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayAnimRef.current) cancelAnimationFrame(autoPlayAnimRef.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setScrollProgress((prev) => {
        let next = prev + delta * 0.055; // 3D sequence completes in ~18 seconds
        if (next >= 1) {
          next = 0; // loop seamlessly
        }
        const stageIdx = Math.min(6, Math.max(1, Math.floor(next * 5.99) + 1));
        setActiveStage(stageIdx);
        return next;
      });

      autoPlayAnimRef.current = requestAnimationFrame(loop);
    };

    autoPlayAnimRef.current = requestAnimationFrame(loop);

    return () => {
      if (autoPlayAnimRef.current) cancelAnimationFrame(autoPlayAnimRef.current);
    };
  }, [isPlaying]);

  // Jump smoothly to a specific stage
  const handleJumpToStage = (stageNum: number) => {
    setIsPlaying(false);
    setActiveStage(stageNum);

    const targetProgress = (stageNum - 1) / 5;
    tweenProgressTo(targetProgress);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const targetScrollY = containerTop + targetProgress * totalScrollable;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    }
  };

  const currentStageData = STAGES[activeStage - 1] || STAGES[0];

  return (
    <section 
      id="story" 
      ref={containerRef}
      className="relative bg-[#1a1d1b] border-t border-[#292B28] text-[#FFFFFF]"
      style={{ height: '390vh' }} // Extended height for buttery smooth parallax scrub
    >
      {/* Sticky Pinned 3D Viewport (100dvh for perfect mobile address bar stability) */}
      <div 
        ref={pinRef}
        className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Architectural Grid Atmosphere */}
        <div className="absolute inset-0 architectural-grid-dark opacity-15 pointer-events-none" />

        {/* Blueprint Corner Registration Crosshairs */}
        <span className="absolute top-4 left-6 z-30 font-mono text-xs text-white/30 select-none pointer-events-none">+</span>
        <span className="absolute top-4 right-6 z-30 font-mono text-xs text-white/30 select-none pointer-events-none">+</span>
        <span className="absolute bottom-4 left-6 z-30 font-mono text-xs text-white/30 select-none pointer-events-none">+</span>
        <span className="absolute bottom-4 right-6 z-30 font-mono text-xs text-white/30 select-none pointer-events-none">+</span>

        {/* TOP STREAMLINED HUD BAR (Compact single-line header) */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20 md:pt-22 flex items-center justify-between gap-4 pointer-events-auto">
          {/* Section Badge & Current Phase Tag */}
          <div className="flex items-center gap-2.5">
            <div className="px-3 py-1.5 rounded-lg bg-[#202522]/90 backdrop-blur-md border border-[#777B70]/35 text-xs font-mono text-[#D6D1C5] flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C65D36] animate-pulse flex-shrink-0" />
              <span className="font-bold text-white uppercase tracking-wider hidden sm:inline">
                {content.story_section_badge || '3D FABRICATION STORY'}
              </span>
              <span className="text-[#777B70] hidden sm:inline">•</span>
              <span className="text-[#C65D36] font-semibold">
                PHASE 0{activeStage}/06
              </span>
            </div>
          </div>

          {/* Quick HUD Toolbar Controls */}
          <div className="flex items-center gap-2 text-xs font-mono">
            {/* Auto Tour Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all shadow-sm ${
                isPlaying 
                  ? 'bg-[#C65D36] border-[#C65D36] text-white font-bold' 
                  : 'bg-[#202522]/90 backdrop-blur-md border-[#777B70]/35 text-[#D6D1C5] hover:text-white hover:bg-[#292B28]'
              }`}
              title={isPlaying ? 'Pause automated walkthrough' : 'Play continuous 3D tour'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#C65D36]" />}
              <span className="hidden xs:inline">{isPlaying ? 'Pause' : 'Auto Tour'}</span>
            </button>

            {/* Orbit / Parallax Toggle */}
            <button
              onClick={() => setIsOrbitMode(!isOrbitMode)}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all shadow-sm ${
                isOrbitMode 
                  ? 'bg-[#C65D36] border-[#C65D36] text-white font-bold' 
                  : 'bg-[#202522]/90 backdrop-blur-md border-[#777B70]/35 text-[#D6D1C5] hover:text-white hover:bg-[#292B28]'
              }`}
              title="Toggle free 360 degree drag orbit vs cursor parallax"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isOrbitMode ? 'Free 360°' : 'Parallax Cam'}</span>
            </button>

            {/* CAD Wireframe Toggle */}
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all shadow-sm ${
                wireframe 
                  ? 'bg-[#C65D36] border-[#C65D36] text-white font-bold' 
                  : 'bg-[#202522]/90 backdrop-blur-md border-[#777B70]/35 text-[#D6D1C5] hover:text-white hover:bg-[#292B28]'
              }`}
              title="Toggle CAD Wireframe Inspection"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{wireframe ? 'CAD Wireframe' : 'PBR Model'}</span>
            </button>
          </div>
        </div>

        {/* CENTER FULLSCREEN 3D PARALLAX CANVAS (Unobstructed View) */}
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
          <StoryStallCanvas 
            currentStage={activeStage} 
            progress={scrollProgress} 
            wireframeMode={wireframe}
            isOrbitMode={isOrbitMode}
            parallaxStrength={1.2}
          />
        </div>

        {/* BOTTOM COMPACT ANNOUNCEMENT BAR & STEP CONTROLLER (Low-profile dock) */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 w-full pb-5 md:pb-6 pointer-events-none">
          {/* Collapsible Detailed Specs Drawer (Slides up only when clicked) */}
          {showDetails && (
            <div className="pointer-events-auto mb-3 p-5 sm:p-6 rounded-2xl bg-[#202522]/95 backdrop-blur-2xl border border-[#777B70]/35 shadow-2xl space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between border-b border-[#777B70]/25 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-[#C65D36] text-white font-mono font-bold text-xs">
                    PHASE 0{currentStageData.number}
                  </span>
                  <span className="text-xs uppercase font-mono tracking-wider text-[#D6D1C5]">
                    {currentStageData.subtitle}
                  </span>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-[#777B70] hover:text-white transition-colors"
                  title="Close specifications drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#D6D1C5] font-light leading-relaxed">
                {currentStageData.description}
              </p>

              {/* Technical Specifications */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentStageData.specs.map((spec, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 rounded bg-[#292B28] border border-[#777B70]/30 text-[11px] font-mono text-[#D6D1C5] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C65D36]" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#777B70]/20 text-xs">
                <span className="font-mono text-[#777B70]">
                  Milestone Audit: <strong className="text-white">{currentStageData.milestone}</strong>
                </span>
                <Link
                  href="/#contact"
                  className="px-4 py-2 rounded-lg bg-[#C65D36] hover:bg-[#B34E28] text-white font-mono uppercase text-xs font-bold tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Request RFQ for this Stage</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Low-Profile Compact Announcement Bar & Steps Dock */}
          <div className="pointer-events-auto p-2 sm:p-2.5 rounded-2xl bg-[#202522]/90 backdrop-blur-xl border border-[#777B70]/35 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
            {/* Left: Active Stage Name & Code */}
            <div className="flex items-center gap-2.5 min-w-0 w-full sm:w-auto">
              <span className="px-2 py-0.5 rounded-md bg-[#C65D36] text-white font-mono font-bold text-xs flex-shrink-0 shadow-sm">
                0{activeStage}
              </span>
              <div className="min-w-0 truncate">
                <span className="text-xs sm:text-sm font-bold text-white truncate block">
                  {currentStageData.title}
                </span>
                <span className="text-[10px] font-mono text-[#777B70] hidden md:block truncate">
                  {currentStageData.milestone}
                </span>
              </div>
            </div>

            {/* Center: The Steps Involved (Compact 01 to 06 Tabs) */}
            <div className="flex items-center gap-1 flex-shrink-0 bg-[#161817]/80 p-1 rounded-xl border border-[#777B70]/25 overflow-x-auto max-w-full">
              {STAGES.map((s) => {
                const isActive = activeStage === s.stage;
                return (
                  <button
                    key={s.number}
                    onClick={() => handleJumpToStage(s.stage)}
                    className={`h-7 px-2 sm:px-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 flex-shrink-0 ${
                      isActive
                        ? 'bg-[#C65D36] text-white shadow-sm scale-105'
                        : 'text-[#D6D1C5] hover:text-white hover:bg-white/10'
                    }`}
                    title={`Jump to Step ${s.number}: ${s.title}`}
                  >
                    <span>{s.number}</span>
                    <span className="hidden sm:inline text-[11px] font-medium">{s.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Progress % + Details Toggle */}
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto flex-shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#292B28] border border-[#777B70]/25 text-xs font-mono">
                <span className="text-[#777B70]">Progress:</span>
                <span className="text-[#C65D36] font-bold">{Math.round(scrollProgress * 100)}%</span>
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm ${
                  showDetails
                    ? 'bg-[#C65D36] border-[#C65D36] text-white'
                    : 'bg-[#292B28] border-[#777B70]/30 text-[#D6D1C5] hover:text-white hover:bg-[#343836]'
                }`}
                title="Toggle detailed phase specifications"
              >
                <Info className="w-3.5 h-3.5 text-[#C65D36]" />
                <span className="hidden xs:inline">{showDetails ? 'Hide' : 'Specs'}</span>
                {showDetails ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
