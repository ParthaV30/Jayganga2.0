'use client';

import React, { useState } from 'react';
import { Workflow } from 'lucide-react';
import { HomepageContent } from '../../lib/data/types';

interface ProcessSectionProps {
  content: HomepageContent;
}

const STEPS = [
  {
    number: "01",
    title: "Requirement Analysis",
    stageName: "Discovery & Spatial Brief",
    duration: "Day 1 – 5",
    description: "Deep dive into your brand marketing objectives, visitor throughput goals, product dimensions, and venue structural guidelines.",
    deliverables: ["Exhibition space brief", "Footprint allocation plan", "Structural feasibility sign-off"]
  },
  {
    number: "02",
    title: "Concept & 3D Design",
    stageName: "CAD Spatial Architecture",
    duration: "Day 6 – 14",
    description: "Our spatial architects sculpt your stall in cinematic 3D. We test sightlines, foot-traffic flow, lighting lux levels, and finish materials.",
    deliverables: ["Photorealistic 4K 3D renders", "Interactive 360° VR preview", "Venue organizer drawing packet"]
  },
  {
    number: "03",
    title: "Fabrication & Production",
    stageName: "Machining & Pre-Assembly",
    duration: "Day 15 – 35",
    description: "Structural metal framing, 5-axis CNC timber joinery, acrylic laser cutting, and paint finishing inside our 45,000 sq.ft workshops.",
    deliverables: ["Full structural dry-fit mockup", "Client pre-shipment inspection", "Barcoded logistics packing"]
  },
  {
    number: "04",
    title: "Installation & Execution",
    stageName: "Venue Rigging & Build",
    duration: "Day 36 – 38",
    description: "Our certified installation crew unloads at the expo hall. We erect the subfloor, trusses, acoustic panels, LED walls, and lighting.",
    deliverables: ["Onsite safety sign-off", "AV & LED screen calibration", "Deep architectural cleaning"]
  },
  {
    number: "05",
    title: "Final Handover",
    stageName: "Turnkey Sign-Off",
    duration: "18 hrs Pre-Show",
    description: "Final walkthrough with your marketing leadership. We hand over keys and provide standby technicians throughout expo show days.",
    deliverables: ["Client sign-off protocol", "24/7 onsite standby support", "Post-expo strike & warehousing"]
  }
];

export default function ProcessSection({ content }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-28 md:py-36 bg-[#F2EFE8] text-[#292B28] border-t border-[#777B70]/20 overflow-hidden">
      {/* Subtle Hairline Grid */}
      <div className="absolute inset-0 architectural-grid opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFFFFF] border border-[#777B70]/30 text-[#202522] text-xs font-mono uppercase tracking-widest">
            <Workflow className="w-3.5 h-3.5 text-[#C65D36]" />
            <span>{content.process_subheading || 'FIVE-PHASE TURNKEY LIFECYCLE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#202522] tracking-tight leading-[1.12]">
            {content.process_heading || 'HOW WE BRING VISIONS TO LIFE'}
          </h2>
          <p className="text-sm sm:text-base text-[#777B70] font-normal max-w-xl">
            A rigid project management timeline engineered to eliminate expo floor stress and deliver exceptional results.
          </p>
        </div>

        {/* 5-Phase Horizontal Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-6 rounded-xl border transition-colors flex flex-col justify-between space-y-6 shadow-sm ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#C65D36] ring-1 ring-[#C65D36]'
                    : 'bg-[#FFFFFF] border-[#777B70]/30 hover:border-[#202522]'
                }`}
              >
                {/* Step Index & Duration Pill */}
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-black font-mono tracking-tight ${
                    isSelected ? 'text-[#C65D36]' : 'text-[#777B70]'
                  }`}>
                    {step.number}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2EFE8] text-[#777B70] border border-[#777B70]/20">
                    {step.duration}
                  </span>
                </div>

                {/* Title & Stage Name */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#202522] tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-[#C65D36] uppercase font-semibold">
                    {step.stageName}
                  </div>
                  <p className="text-xs text-[#777B70] leading-relaxed pt-1.5 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-3 border-t border-[#777B70]/20 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#777B70] mb-0.5">
                    Outputs
                  </div>
                  {step.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#292B28] font-mono">
                      <span className="w-1 h-1 rounded-full bg-[#C65D36] flex-shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
