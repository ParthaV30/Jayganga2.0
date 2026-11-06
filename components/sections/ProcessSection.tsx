'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Compass, 
  Hammer, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Workflow 
} from 'lucide-react';
import { HomepageContent } from '../../lib/data/types';

interface ProcessSectionProps {
  content: HomepageContent;
}

const STEPS = [
  {
    number: "01",
    title: "Requirement Analysis",
    stageName: "Discovery & Spatial Programming",
    duration: "Day 1 – 5",
    description: "Deep dive into your brand's marketing objectives, visitor throughput goals, product display dimensions, and venue structural guidelines.",
    deliverables: ["Exhibition space brief", "Footprint allocation plan", "Structural feasibility sign-off"]
  },
  {
    number: "02",
    title: "Concept & 3D Design",
    stageName: "Photorealistic CAD Architecture",
    duration: "Day 6 – 14",
    description: "Our principal spatial architects sculpt your stall in cinematic 3D. We test sightlines, foot-traffic flow, lighting lux levels, and finish materials.",
    deliverables: ["Photorealistic 4K 3D renders", "Interactive 360° VR preview", "Venue organizer drawing packet"]
  },
  {
    number: "03",
    title: "Fabrication & Production",
    stageName: "Factory Machining & Pre-Assembly",
    duration: "Day 15 – 35",
    description: "Structural metal framing, 5-axis CNC timber joinery, acrylic laser cutting, and automated paint finishing inside our 45,000 sq.ft workshops.",
    deliverables: ["Full structural dry-fit mockup", "Client pre-shipment inspection", "Barcoded logistics packing"]
  },
  {
    number: "04",
    title: "Installation & Execution",
    stageName: "Venue Rigging & Rapid Build",
    duration: "Day 36 – 38",
    description: "Our certified installation crew unloads at the expo hall. We erect the subfloor, trusses, acoustic panels, LED walls, and photometric lighting.",
    deliverables: ["Onsite structural safety sign-off", "AV & LED screen calibration", "Deep architectural cleaning"]
  },
  {
    number: "05",
    title: "Final Handover",
    stageName: "Turnkey Sign-Off & Standby",
    duration: "18 hrs Pre-Show",
    description: "Final walkthrough with your marketing leadership. We hand over keys, provide standby electrical and AV technicians throughout expo show days.",
    deliverables: ["Client sign-off protocol", "24/7 onsite standby support", "Post-expo strike & warehousing"]
  }
];

export default function ProcessSection({ content }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-28 md:py-36 bg-[#08080c] border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Workflow className="w-3.5 h-3.5" />
            <span>{content.process_subheading || 'OUR FIVE-PHASE TURNKEY DELIVERY LIFECYCLE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
            {content.process_heading || 'HOW WE BRING VISIONS TO LIFE'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl">
            A military-grade project management timeline engineered to eliminate expo floor stress and deliver breathtaking results.
          </p>
        </div>

        {/* 5-Phase Horizontal / Stepped Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'bg-[#12121c] border-amber-400 shadow-xl shadow-amber-400/10'
                    : 'bg-[#0b0b10] border-white/[0.06] hover:border-white/20'
                }`}
              >
                {/* Step Index & Duration Pill */}
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-black font-mono tracking-tight ${
                    isSelected ? 'text-amber-400' : 'text-neutral-500'
                  }`}>
                    {step.number}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                    {step.duration}
                  </span>
                </div>

                {/* Title & Stage Name */}
                <div className="space-y-1.5">
                  <h3 className={`text-lg font-bold tracking-tight transition-colors ${
                    isSelected ? 'text-white' : 'text-neutral-300'
                  }`}>
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-amber-400/80 uppercase">
                    {step.stageName}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed pt-2 font-light">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">
                    Key Outputs
                  </div>
                  {step.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-300 font-mono">
                      <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
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

