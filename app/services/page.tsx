'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SmoothScroll from '../../components/layout/SmoothScroll';
import { useCMS } from '../../lib/data/useCMS';
import { 
  Layers, 
  Grid, 
  Compass, 
  Sparkles, 
  ShoppingBag, 
  Building, 
  ArrowUpRight, 
  CheckCircle2, 
  Wrench,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  Grid,
  Compass,
  Sparkles,
  ShoppingBag,
  Building
};

export default function ServicesPage() {
  const { services } = useCMS();
  const activeServices = services.filter(s => s.is_active);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#07070a] text-white">
        <Navbar />

        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="space-y-4 mb-20 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
                <Wrench className="w-3.5 h-3.5" />
                <span>SPATIAL ENGINEERING DIVISIONS</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                COMPREHENSIVE FABRICATION CAPABILITIES
              </h1>
              <p className="text-neutral-400 text-base leading-relaxed">
                Whether you need a double-decker cantilevered pavilion, a rapid multi-city modular deployment, or an airport luxury pop-up, our 45,000 sq.ft workshops deliver turnkey excellence.
              </p>
            </div>

            {/* In-depth Service Rows */}
            <div className="space-y-16">
              {activeServices.map((service, idx) => {
                const Icon = ICON_MAP[service.icon_name] || Layers;
                const isEven = idx % 2 === 1;

                return (
                  <div
                    key={service.id}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 md:p-12 rounded-3xl bg-[#0d0d14] border border-white/[0.08] ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Left/Right Image */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/70 backdrop-blur-md text-amber-400 border border-white/10">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Left/Right Text Narrative & Features */}
                    <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : ''}`}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-amber-400">DIVISION 0{idx + 1}</span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-xs font-mono uppercase text-neutral-400">TURNKEY FABRICATION</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {service.title}
                      </h2>

                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                        {service.full_description || service.short_description}
                      </p>

                      {/* Technical Features */}
                      {service.features && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {service.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs font-mono text-neutral-300">
                              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-4">
                        <Link
                          href={`/#contact`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all"
                        >
                          <span>Request Proposal for this Service</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

