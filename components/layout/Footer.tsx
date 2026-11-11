'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight, Shield, Globe, Award } from 'lucide-react';
import { useCMS } from '../../lib/data/useCMS';

export default function Footer() {
  const { settings, services } = useCMS();

  return (
    <footer className="relative bg-[#202522] border-t border-[#292B28] pt-20 pb-12 text-[#D6D1C5]">
      {/* Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 architectural-grid-dark opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#777B70]/30">
          {/* Col 1 & 2: Brand & Statement */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#292B28] border border-[#777B70]/40 flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-[#F2EFE8]">JG</span>
              </div>
              <div>
                <span className="text-lg font-bold tracking-wider text-[#FFFFFF] font-sans block">
                  {settings.company_name || 'JAYGANGA'}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#D6D1C5] uppercase">
                  Exhibition Architecture
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-[#D6D1C5] max-w-md">
              {settings.footer_text || 'Transforming empty exhibition concrete into monumental architectural brand environments through precision engineering, custom metal fabrication, and turnkey execution globally.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#D6D1C5] bg-[#292B28] px-3 py-1.5 rounded border border-[#777B70]/30">
                <Award className="w-3.5 h-3.5 text-[#C65D36]" />
                <span>ISO 9001:2015 Fabrication</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#D6D1C5] bg-[#292B28] px-3 py-1.5 rounded border border-[#777B70]/30">
                <Globe className="w-3.5 h-3.5 text-[#C65D36]" />
                <span>48+ Global Expo Venues</span>
              </div>
            </div>
          </div>

          {/* Col 3: Capabilities */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFFFFF] font-bold">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href="/#services"
                    className="text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[#777B70] group-hover:text-[#C65D36] transition-colors">›</span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Navigation */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFFFFF] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#story" className="text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors">3D Stall Story</Link>
              </li>
              <li>
                <Link href="/#about" className="text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors">About Studio</Link>
              </li>
              <li>
                <Link href="/#projects" className="text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors">Curated Portfolio</Link>
              </li>
              <li>
                <Link href="/#process" className="text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors">Turnkey Process</Link>
              </li>
              <li>
                <Link href="/#blog" className="text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors">Industry Insights</Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors">Project Enquiry</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Consultation Contact */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FFFFFF] font-bold">
              Consultation
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-2 text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C65D36] flex-shrink-0 mt-0.5" />
                <span className="break-all">{settings.email}</span>
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C65D36] flex-shrink-0" />
                <span>{settings.phone}</span>
              </a>

              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#C65D36] flex-shrink-0" />
                  <span>WhatsApp Desk</span>
                </a>
              )}

              <div className="flex items-start gap-2 pt-1 text-[#777B70]">
                <MapPin className="w-4 h-4 text-[#777B70] flex-shrink-0 mt-0.5" />
                <span className="leading-snug text-[#D6D1C5]">{settings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777B70]">
          <p>{settings.copyright_text || '© 2026 JAYGANGA. All rights reserved.'}</p>

          <div className="flex items-center gap-5">
            <Link
              href="/admin"
              className="text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#C65D36]" />
              <span>CMS Admin Panel</span>
            </Link>
            <span>•</span>
            <a href="#top" className="text-[#D6D1C5] hover:text-[#FFFFFF] transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
