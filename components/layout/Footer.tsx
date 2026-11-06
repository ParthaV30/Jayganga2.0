'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight, Shield, Globe, Award, Sparkles } from 'lucide-react';
import { useCMS } from '../../lib/data/useCMS';

export default function Footer() {
  const { settings, services } = useCMS();

  return (
    <footer className="relative bg-[#060608] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden text-neutral-400">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />
      
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/5 to-transparent blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Col 1 & 2: Brand & Statement */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a1a24] to-[#121218] border border-amber-400/40 flex items-center justify-center">
                <span className="font-mono text-base font-black text-amber-300">AF</span>
              </div>
              <div>
                <span className="text-xl font-black tracking-wider text-white font-sans block">
                  {settings.company_name || 'AURA FORGE'}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-amber-400/80 uppercase">
                  Exhibition Stall Architecture
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-neutral-400 max-w-md">
              {settings.footer_text || 'Transforming empty exhibition concrete into monumental architectural brand environments through precision engineering, custom metal fabrication, and turnkey execution globally.'}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300/80 bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Certified ISO 9001:2015 Fabrication</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300/80 bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>48+ Global Expo Venues</span>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href="/#services"
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-neutral-600 group-hover:text-amber-400 transition-colors">›</span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#story" className="hover:text-amber-300 transition-colors">3D Stall Story</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-amber-300 transition-colors">About Our Studio</Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-amber-300 transition-colors">Curated Portfolio</Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-amber-300 transition-colors">Turnkey Process</Link>
              </li>
              <li>
                <Link href="/#blog" className="hover:text-amber-300 transition-colors">Industry Insights</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-amber-300 transition-colors">Project Enquiry</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Consultation
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-2.5 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="break-all">{settings.email}</span>
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2.5 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{settings.phone}</span>
              </a>

              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp Business Desk</span>
                </a>
              )}

              <div className="flex items-start gap-2.5 pt-1 text-neutral-500">
                <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>{settings.copyright_text || '© 2026 AURA FORGE. All rights reserved.'}</p>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-neutral-500 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500/70" />
              <span>CMS Admin Panel</span>
            </Link>
            <span>•</span>
            <a href="#top" className="hover:text-white transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

