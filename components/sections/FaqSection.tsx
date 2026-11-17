'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is turnkey exhibition stall fabrication?",
    answer: "Turnkey exhibition stall fabrication is our complete end-to-end service: 3D spatial CAD architecture, structural CNC woodwork, high-tensile metal framing, electrical lighting calibration, high-resolution graphic branding, venue organizer liaisons, pre-event dry assembly, on-site expo rigging, and post-event dismantle."
  },
  {
    question: "Why choose JAYGANGA for stall fabrication across India?",
    answer: "With our mechanized 45,000 sq.ft in-house workshops based in Coimbatore and experienced flying engineering crews, we guarantee 100% in-house production with zero third-party dependency, MSME certified standards, and an 18-hour early handover record across all major Indian trade convention centers."
  },
  {
    question: "What is the difference between custom and modular stall fabrication?",
    answer: "Custom stall fabrication delivers bespoke architectural artistry with organic curves, double-decker lounges, custom acrylic features, and flush finishes. Modular stall fabrication uses lightweight precision aluminum frameworks that are quick to erect and re-usable across multi-city trade show schedules for maximum ROI."
  },
  {
    question: "How much does exhibition stall fabrication cost in India?",
    answer: "Stall fabrication costs vary based on dimensions, structural height, material selection (timber, ACP, acrylic, glass), and interactive tech (LED walls, kinetic rigs). Modular booths generally range from ₹1,200 to ₹2,500 per sq.ft, while bespoke luxury architectural pavilions range from ₹2,500 to ₹6,000+ per sq.ft, inclusive of turnkey management."
  },
  {
    question: "How early should we start the exhibition stall fabrication process?",
    answer: "We recommend initiating 3D conceptualization 45 to 90 days prior to the expo date. This ensures ample time for 3D photorealistic approvals, organizer engineering permits, full dry-assembly mockups in our facility, and flawless stress-free on-site setup."
  },
  {
    question: "Do you provide on-site technical support during the exhibition?",
    answer: "Yes. Every JAYGANGA project includes dedicated on-site standby technicians and structural riggers throughout the exhibition days to oversee power loads, audiovisual systems, and lighting maintenance, ensuring uninterrupted brand performance."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(prev => prev === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#F2EFE8] border-t border-[#777B70]/20 text-[#292B28] relative">
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#777B70]/30 text-[#C65D36] text-xs font-mono uppercase tracking-widest shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>EXPO KNOWLEDGE & ARCHITECTURAL GUIDANCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#202522] tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm sm:text-base text-[#777B70] leading-relaxed">
            Everything you need to know about professional exhibition stall fabrication, turnkey timelines, budgeting, and pan-India booth execution.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-white border border-[#777B70]/20 shadow-sm transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-[#202522] group-hover:text-[#C65D36] transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl transition-all ${
                    isOpen ? 'bg-[#C65D36] text-white rotate-180' : 'bg-[#F2EFE8] text-[#777B70]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#777B70] leading-relaxed border-t border-[#777B70]/10 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
