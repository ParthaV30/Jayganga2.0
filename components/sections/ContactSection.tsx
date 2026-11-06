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
    <section id="contact" className="relative py-28 md:py-36 bg-[#08080c] border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-amber-500/[0.03] blur-[160px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.contact_subheading || 'SCHEDULE A PRIVATE CONSULTATION WITH OUR PRINCIPAL SPATIAL ARCHITECTS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
            {content.contact_heading || "LET'S BUILD SOMETHING EXTRAORDINARY."}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Studio Contacts & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base text-neutral-300 leading-relaxed font-light">
              Submit your booth specifications below. Our engineering leads will review your exhibition brief, evaluate venue load constraints, and return a tailored 3D spatial proposal and budget estimate within 24 hours.
            </p>

            <div className="p-6 rounded-2xl bg-[#0f0f16] border border-white/[0.08] space-y-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Direct Communications
              </h4>

              <div className="space-y-4 text-sm">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-3.5 text-neutral-300 hover:text-white transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-white/[0.04] text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase block font-mono">Direct Desk</span>
                    <span className="font-medium text-white">{settings.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3.5 text-neutral-300 hover:text-white transition-colors group"
                >
                  <div className="p-2.5 rounded-xl bg-white/[0.04] text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase block font-mono">Project RFQ</span>
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
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-500/80 uppercase block font-mono">Instant WhatsApp</span>
                      <span className="font-medium">Direct Chat with Project Director</span>
                    </div>
                  </a>
                )}

                <div className="flex items-start gap-3.5 pt-2 text-neutral-400">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] text-neutral-400 mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase block font-mono">Headquarters & Workshops</span>
                    <span className="text-xs text-neutral-300 leading-relaxed block mt-0.5">
                      {settings.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Turnkey Assurance Callout */}
            <div className="p-5 rounded-xl bg-amber-400/[0.03] border border-amber-400/20 text-xs font-mono text-neutral-300 space-y-1">
              <span className="text-amber-400 font-bold block uppercase">Turnkey Assurance:</span>
              <p className="text-neutral-400 leading-normal">
                Includes 3D VR approvals, organizer liaison, pre-shipment dry assembly, onsite rigging, and round-the-clock technician standby.
              </p>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-2xl bg-[#0c0c12] border border-white/10 shadow-2xl relative">
            {submittedId ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Enquiry Successfully Transmitted
                </h3>
                <p className="text-neutral-300 text-sm max-w-md leading-relaxed">
                  Thank you. Your project brief has been logged into our engineering dispatch system under reference:
                </p>
                <span className="px-4 py-2 rounded-lg bg-black border border-amber-400/40 font-mono text-amber-300 text-sm font-semibold">
                  REF: {submittedId}
                </span>
                <p className="text-xs text-neutral-500 pt-2 font-mono">
                  Our principal architect will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmittedId(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-neutral-300"
                >
                  Submit Another Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs font-mono">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Rathore"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Nexora Mobility Ltd"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="v.rathore@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Required */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Service Required
                    </label>
                    <select
                      value={formData.service_required}
                      onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white focus:outline-none focus:border-amber-400 text-sm transition-colors"
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
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Event Location & Hall
                    </label>
                    <input
                      type="text"
                      value={formData.event_location}
                      onChange={(e) => setFormData({ ...formData, event_location: e.target.value })}
                      placeholder="e.g. Pragati Maidan, Hall 5, New Delhi"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Stall Dimension */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Stall Footprint Dimension (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.stall_size}
                    onChange={(e) => setFormData({ ...formData, stall_size: e.target.value })}
                    placeholder="e.g. 12m x 10m (120 sqm) Island / 3-side open"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                  />
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Project Description & Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.project_description}
                    onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                    placeholder="Describe your design vision, double-decker mezzanine needs, LED screen sizes, VIP meeting room count, or special fabrication finishes..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
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

