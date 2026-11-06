'use client';

import React from 'react';
import { 
  Palette, 
  Hammer, 
  Users, 
  Clock, 
  Boxes, 
  Sparkles, 
  ShieldCheck, 
  Ruler 
} from 'lucide-react';
import { HomepageContent } from '../../lib/data/types';

interface WhyUsSectionProps {
  content: HomepageContent;
}

const PILLARS = [
  {
    icon: Palette,
    title: "Customized Designs",
    headline: "Unfettered Creative Freedom",
    description: "Every stall is architecturally custom sculpted to your brand's unique narrative. No templates, no recycled layouts — only original spatial artistry calibrated to command attention.",
    detail: "4K Photorealistic VR Walkthroughs"
  },
  {
    icon: Hammer,
    title: "Quality Fabrication",
    headline: "Industrial Precision Engineering",
    description: "Crafted in our mechanized 45,000 sq.ft facility using 5-axis CNC routers, high-tensile structural steel welding, and automated dust-free polyurethane paint booths.",
    detail: "Certified ISO 9001:2015 Standards"
  },
  {
    icon: Users,
    title: "Professional Execution",
    headline: "Senior Engineering Leadership",
    description: "Every project is commanded onsite by licensed structural engineers and seasoned venue rigging masters who liaise directly with international expo authorities.",
    detail: "Dedicated Onsite Project Director"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    headline: "18-Hour Early Handover Record",
    description: "We enforce rigorous dry-fit workshop mockups prior to venue dispatch, ensuring flawless on-site installation and final handover ahead of schedule.",
    detail: "99.4% Flawless Handover Metric"
  },
  {
    icon: Boxes,
    title: "End-to-End Solutions",
    headline: "True Turnkey Accountability",
    description: "From 3D architectural CAD, MEP utility coordination, and organizer approvals to fabrication, graphics printing, and overnight hall strike.",
    detail: "Zero Multi-Vendor Friction"
  },
  {
    icon: Sparkles,
    title: "Attention to Detail",
    headline: "Obsessive Millimetre Alignment",
    description: "From flush joint tolerances and concealed wiring looms to Kelvin-calibrated photometric lighting temperatures and museum-grade acrylic finishes.",
    detail: "±1.5mm Laser Tolerance Protocol"
  }
];

export default function WhyUsSection({ content }: WhyUsSectionProps) {
  return (
    <section className="relative py-28 md:py-36 bg-[#07070a] border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/[0.02] blur-[160px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{content.why_us_subheading || 'THE AURA FORGE ENGINEERING ADVANTAGE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
            {content.why_us_heading || 'WHY DISCERNING BRANDS CHOOSE US'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl">
            When your brand is competing against global giants on an international exhibition floor, compromise is not an option.
          </p>
        </div>

        {/* 6 Key Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative group p-8 rounded-2xl bg-[#0d0d14] border border-white/[0.07] hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                {/* Top Bar with Icon & Step */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white/[0.04] text-amber-400 border border-white/5 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-neutral-500">
                    0{idx + 1}
                  </span>
                </div>

                {/* Core Narrative */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400/80">
                    {pillar.headline}
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light pt-2">
                    {pillar.description}
                  </p>
                </div>

                {/* Technical Verification Tag */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Ruler className="w-3.5 h-3.5 text-amber-400" />
                  <span>{pillar.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
