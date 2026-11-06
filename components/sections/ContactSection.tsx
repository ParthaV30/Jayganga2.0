'use client';

import React, { useState, useEffect } from 'react';
import { DataStore } from '../../lib/data/store';
import { SiteSettings, HomepageContent } from '../../lib/data/types';
import { 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Calendar, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

interface ContactSectionProps {
  settings: SiteSettings;
  content: HomepageContent;
  preselectedService?: string;
}

export default function ContactSection({ settings, content, preselectedService }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service_required: preselectedService || 'Custom Exhibition Stall Fabrication',
    event_location: '',
    stall_size: '',
    project_description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service_required: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name || !formData.email || !formData.phone || !formData.project_description) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await DataStore.submitEnquiry(formData);
      setSubmittedId(res.id);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service_required: 'Custom Exhibition Stall Fabrication',
        event_location: '',
        stall_size: '',
        project_description: ''
      });
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      setErrorMsg('Failed to transmit enquiry. Please reach us directly via phone or WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-[#F2EFE8] border-t border-[#777B70]/20 text-[#292B28] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#777B70]/30 text-[#C65D36] text-xs font-mono uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.contact_subheading || 'SCHEDULE A PRIVATE CONSULTATION WITH OUR PRINCIPAL SPATIAL ARCHITECTS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#202522] tracking-tight leading-[1.12]">
            {content.contact_heading || "LET'S BUILD SOMETHING EXTRAORDINARY."}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Studio Contacts & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base text-[#777B70] leading-relaxed font-normal">
              Submit your booth specifications below. Our engineering leads will review your exhibition brief, evaluate venue load constraints, and return a tailored 3D spatial proposal and budget estimate within 24 hours.
            </p>

            <div className="p-8 rounded-2xl bg-[#202522] text-[#D6D1C5] shadow-xl border border-[#202522] space-y-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#C65D36] font-semibold">
                Direct Communications
              </h4>

              <div className="space-y-4 text-sm">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-3.5 text-[#D6D1C5] hover:text-white transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#C65D36] group-hover:bg-[#C65D36] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#777B70] uppercase block font-mono">Direct Desk</span>
                    <span className="font-medium text-white">{settings.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3.5 text-[#D6D1C5] hover:text-white transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#C65D36] group-hover:bg-[#C65D36] group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#777B70] uppercase block font-mono">Project RFQ</span>
                    <span className="font-medium text-white">{settings.email}</span>
                  </div>
                </a>

                {settings.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 text-emerald-400 hover:text-emerald-300 transition-colors group"
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-400/80 uppercase block font-mono">Instant WhatsApp</span>
                      <span className="font-medium text-white">Direct Chat with Project Director</span>
                    </div>
                  </a>
                )}

                <div className="flex items-start gap-3.5 pt-2 text-[#D6D1C5]/80">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#D6D1C5] mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#777B70] uppercase block font-mono">Headquarters & Workshops</span>
                    <span className="text-xs text-[#D6D1C5] leading-relaxed block mt-0.5">
                      {settings.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Turnkey Assurance Callout */}
            <div className="p-5 rounded-xl bg-white border border-[#777B70]/20 text-xs font-mono text-[#292B28] space-y-1 shadow-sm">
              <span className="text-[#C65D36] font-bold block uppercase tracking-wider">Turnkey Assurance:</span>
              <p className="text-[#777B70] leading-relaxed">
                Includes 3D VR approvals, organizer liaison, pre-shipment dry assembly, onsite rigging, and round-the-clock technician standby.
              </p>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-2xl bg-white border border-[#777B70]/20 shadow-xl relative">
            {submittedId ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#202522] tracking-tight">
                  Enquiry Successfully Transmitted
                </h3>
                <p className="text-[#777B70] text-sm max-w-md leading-relaxed">
                  Thank you. Your project brief has been logged into our engineering dispatch system under reference:
                </p>
                <span className="px-4 py-2 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 font-mono text-[#202522] text-sm font-semibold">
                  REF: {submittedId}
                </span>
                <p className="text-xs text-[#777B70] pt-2 font-mono">
                  Our principal architect will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmittedId(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#202522] hover:bg-[#202522]/90 text-xs font-mono uppercase tracking-wider text-white transition-colors"
                >
                  Submit Another Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-600 text-xs font-mono">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Rathore"
                      className="w-full px-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] placeholder-[#777B70]/60 focus:outline-none focus:border-[#C65D36] text-sm transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Nexora Mobility Ltd"
                      className="w-full px-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] placeholder-[#777B70]/60 focus:outline-none focus:border-[#C65D36] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="v.rathore@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] placeholder-[#777B70]/60 focus:outline-none focus:border-[#C65D36] text-sm transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full px-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] placeholder-[#777B70]/60 focus:outline-none focus:border-[#C65D36] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Required */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                      Service Required
                    </label>
                    <select
                      value={formData.service_required}
                      onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] focus:outline-none focus:border-[#C65D36] text-sm transition-colors"
                    >
                      <option value="Custom Exhibition Stall Fabrication">Custom Exhibition Stall Fabrication</option>
                      <option value="Modular Stall Fabrication">Modular Stall Fabrication</option>
                      <option value="Exhibition Stall Design">Exhibition Stall Design</option>
                      <option value="Corporate Event Fabrication">Corporate Event Fabrication</option>
                      <option value="Retail and Promotional Displays">Retail and Promotional Displays</option>
                      <option value="Interior and Commercial Fabrication">Interior and Commercial Fabrication</option>
                    </select>
                  </div>

                  {/* Event Location & Venue */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                      Event Location & Hall
                    </label>
                    <input
                      type="text"
                      value={formData.event_location}
                      onChange={(e) => setFormData({ ...formData, event_location: e.target.value })}
                      placeholder="e.g. Pragati Maidan, Hall 5, New Delhi"
                      className="w-full px-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] placeholder-[#777B70]/60 focus:outline-none focus:border-[#C65D36] text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Stall Dimension */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                    Stall Footprint Dimension (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.stall_size}
                    onChange={(e) => setFormData({ ...formData, stall_size: e.target.value })}
                    placeholder="e.g. 12m x 10m (120 sqm) Island / 3-side open"
                    className="w-full px-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] placeholder-[#777B70]/60 focus:outline-none focus:border-[#C65D36] text-sm transition-colors"
                  />
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                    Project Description & Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.project_description}
                    onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                    placeholder="Describe your design vision, double-decker mezzanine needs, LED screen sizes, VIP meeting room count, or special fabrication finishes..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] placeholder-[#777B70]/60 focus:outline-none focus:border-[#C65D36] text-sm transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-sm tracking-wider uppercase shadow-sm transition-colors flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting Project Brief...</span>
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

