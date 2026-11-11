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
    headline: "Unfettered Architectural Vision",
    description: "Every stall is custom sculpted to your brand narrative. No templates, no recycled layouts — only original spatial artistry calibrated to command attention.",
    detail: "4K Photorealistic VR Walkthroughs"
  },
  {
    icon: Hammer,
    title: "Quality Fabrication",
    headline: "Industrial Precision Engineering",
    description: "Crafted in our mechanized 45,000 sq.ft facility using 5-axis CNC routers, high-tensile structural steel welding, and automated dust-free paint suites.",
    detail: "Certified ISO 9001:2015 Standards"
  },
  {
    icon: Users,
    title: "Professional Execution",
    headline: "Senior Engineering Leadership",
    description: "Every project is commanded onsite by licensed structural engineers and rigging masters who liaise directly with international expo venue authorities.",
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
    headline: "Turnkey Accountability",
    description: "From 3D architectural CAD, MEP utility coordination, and organizer approvals to fabrication, graphics printing, and overnight hall strike.",
    detail: "Zero Multi-Vendor Friction"
  },
  {
    icon: Sparkles,
    title: "Attention to Detail",
    headline: "Obsessive Millimetre Alignment",
    description: "From flush joint tolerances and concealed wiring looms to Kelvin-calibrated photometric lighting temperatures and museum-grade acrylic finishes.",
    detail: "±0.5mm Laser Tolerance Protocol"
  }
];

export default function WhyUsSection({ content }: WhyUsSectionProps) {
  return (
    <section className="relative py-28 md:py-36 bg-[#D6D1C5] text-[#292B28] border-t border-[#777B70]/30 overflow-hidden">
      {/* Subtle Hairline Grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 text-[#202522] text-xs font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C65D36]" />
            <span>{content.why_us_subheading || 'THE JAYGANGA ADVANTAGE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#202522] tracking-tight leading-[1.12]">
            {content.why_us_heading || 'WHY DISCERNING BRANDS CHOOSE US'}
          </h2>
          <p className="text-sm sm:text-base text-[#777B70] font-normal max-w-xl">
            When competing on an international exhibition floor, precision craftsmanship and structural integrity are paramount.
          </p>
        </div>

        {/* 6 Key Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-xl bg-[#FFFFFF] border border-[#777B70]/30 flex flex-col justify-between space-y-6 shadow-sm"
              >
                {/* Top Bar with Icon & Step */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-md bg-[#F2EFE8] text-[#C65D36]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#777B70]">
                    0{idx + 1}
                  </span>
                </div>

                {/* Core Narrative */}
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-[#202522] tracking-tight">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#C65D36] font-semibold">
                    {pillar.headline}
                  </div>
                  <p className="text-xs text-[#777B70] leading-relaxed font-normal pt-2">
                    {pillar.description}
                  </p>
                </div>

                {/* Technical Verification Tag */}
                <div className="pt-4 border-t border-[#777B70]/20 flex items-center gap-2 text-xs font-mono text-[#777B70]">
                  <Ruler className="w-3.5 h-3.5 text-[#C65D36]" />
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
