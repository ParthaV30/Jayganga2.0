'use client';

import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Factory, Building2, MapPin } from 'lucide-react';

interface ClientItem {
  id: string;
  name: string;
  logo: string;
  width?: number;
  height?: number;
  industry?: string;
}

const ROW_1: ClientItem[] = [
  { id: 'c-01', name: 'Royal Enfield', logo: '/images/clients/royal-enfield.webp', industry: 'Automotive' },
  { id: 'c-02', name: 'Macpower CNC', logo: '/images/clients/macpower.webp', industry: 'Engineering' },
  { id: 'c-03', name: 'Dolphin Systems', logo: '/images/clients/dolphin.webp', industry: 'Automation' },
  { id: 'c-04', name: 'Welcare Health', logo: '/images/clients/welcare.webp', industry: 'Healthcare' },
  { id: 'c-05', name: 'Adam Compressors', logo: '/images/clients/adam-compressors.webp', industry: 'Machinery' },
  { id: 'c-06', name: 'Sandhu Drill Machines', logo: '/images/clients/sandhu-drill-machines.webp', industry: 'Heavy Equipment' },
  { id: 'c-07', name: 'Barani Hydraulics', logo: '/images/clients/barani-hydraulics.webp', industry: 'Hydraulics' },
  { id: 'c-08', name: 'Biophar Life Sciences', logo: '/images/clients/biophar.webp', industry: 'Pharma' },
  { id: 'c-09', name: 'Synapse Robotics', logo: '/images/clients/synapse-robotics.webp', industry: 'Robotics' },
  { id: 'c-10', name: 'Werke Health', logo: '/images/clients/werke-health.webp', industry: 'Medical' },
  { id: 'c-11', name: 'Endo-Med', logo: '/images/clients/endo-med.webp', industry: 'Diagnostics' },
  { id: 'c-12', name: 'SSI TMT Steel', logo: '/images/clients/ssi-tmt.webp', industry: 'Building Materials' },
  { id: 'c-13', name: 'India Builders', logo: '/images/clients/india-builders.webp', industry: 'Infrastructure' },
  { id: 'c-14', name: 'Srivari', logo: '/images/clients/srivari.webp', industry: 'Manufacturing' },
  { id: 'c-15', name: 'Inwud Furniture', logo: '/images/clients/inwud-furniture.webp', industry: 'Interiors' },
  { id: 'c-16', name: 'Sri Bhagirath Textiles', logo: '/images/clients/sri-bhagirath-textiles.webp', industry: 'Textiles' },
];

const ROW_2: ClientItem[] = [
  { id: 'c-17', name: 'Bayer Global', logo: '/images/clients/bayer.webp', industry: 'Life Sciences' },
  { id: 'c-18', name: 'Indian Oil Corporation', logo: '/images/clients/indian-oil.webp', industry: 'Energy' },
  { id: 'c-19', name: 'Mankind Pharma', logo: '/images/clients/mankind-pharma.webp', industry: 'Pharmaceuticals' },
  { id: 'c-20', name: 'Pricol Limited', logo: '/images/clients/pricol.webp', industry: 'Automotive' },
  { id: 'c-21', name: 'Lovol Heavy Industry', logo: '/images/clients/lovol.webp', industry: 'Heavy Machinery' },
  { id: 'c-22', name: 'CHNT Power', logo: '/images/clients/chnt-power.webp', industry: 'Renewable Energy' },
  { id: 'c-23', name: 'Kewaunee Scientific', logo: '/images/clients/kewaunee.webp', industry: 'Laboratory Tech' },
  { id: 'c-24', name: 'ACO Systems', logo: '/images/clients/aco.webp', industry: 'Building Materials' },
  { id: 'c-25', name: 'Kothari Industrial', logo: '/images/clients/kothari-industrial-corporation.webp', industry: 'Conglomerate' },
  { id: 'c-26', name: 'Marut Drones', logo: '/images/clients/marut-drones.webp', industry: 'Aviation & Drones' },
  { id: 'c-27', name: 'Paragon Irrigation', logo: '/images/clients/paragon-irrigation.webp', industry: 'AgriTech' },
  { id: 'c-28', name: 'Black Wolf', logo: '/images/clients/black-wolf.webp', industry: 'Industrial Gear' },
  { id: 'c-29', name: 'Effee Power', logo: '/images/clients/effee.webp', industry: 'Electronics' },
  { id: 'c-30', name: 'Edify World School', logo: '/images/clients/edify-world-school.webp', industry: 'Education' },
  { id: 'c-31', name: 'Deepa Machinery', logo: '/images/clients/deepa-machinery.webp', industry: 'Engineering' },
  { id: 'c-32', name: 'Kestrel Aerospace', logo: '/images/clients/kestrel.webp', industry: 'Aerospace' },
];

const ROW_3: ClientItem[] = [
  { id: 'c-33', name: 'Fastwell Products', logo: '/images/clients/fastwell-products.webp', industry: 'Fasteners' },
  { id: 'c-34', name: 'Tapco Pneumatics', logo: '/images/clients/tapco.webp', industry: 'Pneumatics' },
  { id: 'c-35', name: 'Brand Automation', logo: '/images/clients/brand-automation.webp', industry: 'Packaging' },
  { id: 'c-36', name: 'Rolon Transmissions', logo: '/images/clients/rolon.webp', industry: 'Power Transmission' },
  { id: 'c-37', name: 'Involtics Energy', logo: '/images/clients/involtics.webp', industry: 'Electrical' },
  { id: 'c-38', name: 'Sunbio Molecules', logo: '/images/clients/sunbio-molecules.webp', industry: 'Biotech' },
  { id: 'c-39', name: 'SB Lifesciences', logo: '/images/clients/sb-lifesciences.webp', industry: 'Pharmaceuticals' },
  { id: 'c-40', name: 'KLM Laboratories', logo: '/images/clients/klm-laboratories.webp', industry: 'Healthcare' },
  { id: 'c-41', name: 'Arabiz Global', logo: '/images/clients/arabiz.webp', industry: 'International Trade' },
  { id: 'c-42', name: 'Rich Building Solutions', logo: '/images/clients/rich-building-solutions.webp', industry: 'Construction' },
  { id: 'c-43', name: 'Subset Industries', logo: '/images/clients/subset-industries.webp', industry: 'Precision Tools' },
  { id: 'c-44', name: 'Thukral Fabrics', logo: '/images/clients/thukral-fabrics.webp', industry: 'Textiles' },
  { id: 'c-45', name: 'SVN9T9 Sportswear', logo: '/images/clients/svn9t9-sportswear.webp', industry: 'Apparel' },
  { id: 'c-46', name: 'Shri Arthi Jewellery', logo: '/images/clients/shri-arthi-jewellery.webp', industry: 'Retail Luxury' },
  { id: 'c-47', name: 'Bridgewoods International', logo: '/images/clients/bridgewoods-international-school.webp', industry: 'Education' },
  { id: 'c-48', name: 'AJK Group of Institutions', logo: '/images/clients/ajk-group-of-institutions.webp', industry: 'Higher Ed' },
];

export default function ClientsSection() {
  return (
    <section 
      id="clients" 
      aria-labelledby="clients-heading" 
      className="relative bg-[#FFFFFF] border-y border-[#777B70]/20 py-14 sm:py-20 overflow-hidden"
    >
      {/* Background Subtle Architectural Pattern */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 text-center">
        {/* Industry Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C65D36]/10 text-[#C65D36] border border-[#C65D36]/20 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest mb-3.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C65D36]" />
          <span>PROVEN TRACK RECORD // 850+ TURNKEY PAVILIONS</span>
        </div>

        {/* Section Heading */}
        <h2 
          id="clients-heading" 
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#202522] tracking-tight leading-tight"
        >
          Trusted by <span className="text-[#C65D36]">Leading Partners</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-3.5 max-w-2xl mx-auto text-sm sm:text-base text-[#777B70] font-normal leading-relaxed">
          Engineering, energy, pharma, defense, robotics, building materials &amp; textiles — turnkey exhibition stalls designed, fabricated, and installed on-time by our in-house team.
        </p>

        {/* Industry Pill Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-[#777B70]">
          {['Engineering', 'Defense & Aerospace', 'Energy & Power', 'Pharma & Biotech', 'Robotics & Automation', 'Building Materials', 'Textiles'].map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded bg-[#F2EFE8] border border-[#777B70]/15 text-[#202522]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Marquees Container (3 Opposing Dynamic Continuous Rows) */}
      <div className="relative w-full space-y-3.5 sm:space-y-4">
        {/* ROW 1: Scrolls Left */}
        <div className="marquee-wrapper">
          <ul 
            className="marquee-track marquee-track-left"
            style={{ '--marquee-speed': '68s' } as React.CSSProperties}
          >
            {ROW_1.concat(ROW_1).map((client, idx) => {
              const isDuplicate = idx >= ROW_1.length;
              return (
                <li
                  key={`r1-${client.id}-${idx}`}
                  aria-hidden={isDuplicate ? true : undefined}
                  className="group flex-shrink-0 h-[68px] sm:h-[78px] min-w-[145px] sm:min-w-[185px] px-5 sm:px-6 flex items-center justify-center bg-[#FFFFFF] border border-[#777B70]/20 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#C65D36] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C65D36]/10 transition-all duration-300 select-none cursor-pointer"
                  title={`${client.name} (${client.industry})`}
                >
                  <img
                    src={client.logo}
                    alt={isDuplicate ? '' : client.name}
                    width={180}
                    height={55}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[38px] sm:max-h-[46px] max-w-[125px] sm:max-w-[155px] w-auto h-auto object-contain opacity-100 group-hover:scale-105 transition-transform duration-300"
                  />
                </li>
              );
            })}
          </ul>
        </div>

        {/* ROW 2: Scrolls Right (Reverse) */}
        <div className="marquee-wrapper">
          <ul 
            className="marquee-track marquee-track-right"
            style={{ '--marquee-speed': '56s' } as React.CSSProperties}
          >
            {ROW_2.concat(ROW_2).map((client, idx) => {
              const isDuplicate = idx >= ROW_2.length;
              return (
                <li
                  key={`r2-${client.id}-${idx}`}
                  aria-hidden={isDuplicate ? true : undefined}
                  className="group flex-shrink-0 h-[68px] sm:h-[78px] min-w-[145px] sm:min-w-[185px] px-5 sm:px-6 flex items-center justify-center bg-[#FFFFFF] border border-[#777B70]/20 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#C65D36] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C65D36]/10 transition-all duration-300 select-none cursor-pointer"
                  title={`${client.name} (${client.industry})`}
                >
                  <img
                    src={client.logo}
                    alt={isDuplicate ? '' : client.name}
                    width={180}
                    height={55}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[38px] sm:max-h-[46px] max-w-[125px] sm:max-w-[155px] w-auto h-auto object-contain opacity-100 group-hover:scale-105 transition-transform duration-300"
                  />
                </li>
              );
            })}
          </ul>
        </div>

        {/* ROW 3: Scrolls Left */}
        <div className="marquee-wrapper">
          <ul 
            className="marquee-track marquee-track-left"
            style={{ '--marquee-speed': '74s' } as React.CSSProperties}
          >
            {ROW_3.concat(ROW_3).map((client, idx) => {
              const isDuplicate = idx >= ROW_3.length;
              return (
                <li
                  key={`r3-${client.id}-${idx}`}
                  aria-hidden={isDuplicate ? true : undefined}
                  className="group flex-shrink-0 h-[68px] sm:h-[78px] min-w-[145px] sm:min-w-[185px] px-5 sm:px-6 flex items-center justify-center bg-[#FFFFFF] border border-[#777B70]/20 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#C65D36] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C65D36]/10 transition-all duration-300 select-none cursor-pointer"
                  title={`${client.name} (${client.industry})`}
                >
                  <img
                    src={client.logo}
                    alt={isDuplicate ? '' : client.name}
                    width={180}
                    height={55}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[38px] sm:max-h-[46px] max-w-[125px] sm:max-w-[155px] w-auto h-auto object-contain opacity-100 group-hover:scale-105 transition-transform duration-300"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Bottom Proof Metric Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xl bg-[#F2EFE8]/70 border border-[#777B70]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#C65D36]/10 text-[#C65D36]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#202522]">850+</div>
              <div className="text-[11px] sm:text-xs font-mono text-[#777B70] uppercase">Stalls Handed Over</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#C65D36]/10 text-[#C65D36]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#202522]">99.4%</div>
              <div className="text-[11px] sm:text-xs font-mono text-[#777B70] uppercase">On-Time Handover</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#C65D36]/10 text-[#C65D36]">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#202522]">100%</div>
              <div className="text-[11px] sm:text-xs font-mono text-[#777B70] uppercase">In-House Workshop</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#C65D36]/10 text-[#C65D36]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#202522]">48+</div>
              <div className="text-[11px] sm:text-xs font-mono text-[#777B70] uppercase">Convention Centers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

