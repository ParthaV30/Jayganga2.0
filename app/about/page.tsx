'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SmoothScroll from '../../components/layout/SmoothScroll';
import { useCMS } from '../../lib/data/useCMS';
import { Award, Compass, Factory, ShieldCheck, Ruler, Clock, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { homepage } = useCMS();

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#F2EFE8] text-[#292B28]">
        <Navbar />

        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6 space-y-24">
            {/* Header */}
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#777B70]/30 text-[#C65D36] text-xs font-mono uppercase tracking-widest shadow-sm">
                <Ruler className="w-3.5 h-3.5" />
                <span>ABOUT OUR ARCHITECTURAL FABRICATION STUDIO</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-[#202522] tracking-tight">
                TURNING EMPTY CONCRETE INTO ICONIC BRAND MONUMENTS
              </h1>
              <p className="text-[#777B70] text-base leading-relaxed">
                Founded on the premise that temporary exhibition architecture must embody the structural integrity and aesthetic poise of permanent civic monuments.
              </p>
            </div>

            {/* Main Visual & Workshop Capability */}
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-[#777B70]/20 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80"
                alt="Jayganga Fabrication Workshop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#C65D36] uppercase tracking-widest block mb-1 font-semibold">
                    PRODUCTION EPICENTER
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    45,000 sq.ft Heavy Structural Welding & CNC Joinery Facilities
                  </h3>
                </div>
                <span className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-[#777B70]/30 text-xs font-mono text-[#202522] font-semibold">
                  ISO 9001:2015 CERTIFIED
                </span>
              </div>
            </div>

            {/* The Ethos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm space-y-4">
                <div className="p-3 rounded-xl bg-[#F2EFE8] text-[#C65D36] w-fit">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#202522] tracking-tight">
                  Design Without Compromise
                </h3>
                <p className="text-sm text-[#777B70] leading-relaxed font-normal">
                  Our spatial architects collaborate directly with brand leadership to conceptualize bold, memorable environments featuring organic geometries and monumental cantilevers.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm space-y-4">
                <div className="p-3 rounded-xl bg-[#F2EFE8] text-[#C65D36] w-fit">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#202522] tracking-tight">
                  Internalized Manufacturing
                </h3>
                <p className="text-sm text-[#777B70] leading-relaxed font-normal">
                  We maintain zero third-party fabrication dependency. All structural steel framing, CNC routing, acrylic laser work, and paint finishing happens beneath our own roof.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm space-y-4">
                <div className="p-3 rounded-xl bg-[#F2EFE8] text-[#C65D36] w-fit">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#202522] tracking-tight">
                  18-Hour Early Handover
                </h3>
                <p className="text-sm text-[#777B70] leading-relaxed font-normal">
                  By pre-assembling 100% of the booth in our factory dry-run bay before dispatch, we eliminate expo floor surprises and guarantee early handover with zero defects.
                </p>
              </div>
            </div>

            {/* Direct Contact Banner */}
            <div className="p-10 md:p-14 rounded-3xl bg-[#202522] text-[#D6D1C5] border border-[#202522] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Ready to elevate your next international exhibition presence?
                </h3>
                <p className="text-[#D6D1C5]/80 text-sm">
                  Consult with our senior spatial engineering team today.
                </p>
              </div>

              <Link
                href="/#contact"
                className="px-8 py-4 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
              >
                <span>Initiate Your Brief</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

