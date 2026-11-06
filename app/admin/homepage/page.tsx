'use client';

import React, { useState, useEffect } from 'react';
import { DataStore } from '../../../lib/data/store';
import { HomepageContent } from '../../../lib/data/types';
import { initialHomepage } from '../../../lib/data/initial-data';
import { Save, Check, RefreshCw, Eye, Sparkles, AlertCircle } from 'lucide-react';

export default function HomepageEditorPage() {
  const [formData, setFormData] = useState<HomepageContent>(initialHomepage);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    DataStore.getHomepage().then(data => {
      setFormData(data);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (field: keyof HomepageContent, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await DataStore.updateHomepage(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center font-mono text-[#C65D36] text-sm">
        Loading homepage contents...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#777B70]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202522] tracking-tight">
            Homepage Content Editor
          </h1>
          <p className="text-xs font-mono text-[#777B70] mt-1">
            Modify cinematic hero headlines, 3D model parameters, narratives, and section banners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
              <Check className="w-3.5 h-3.5" />
              <span>Saved & Synced to Live Site</span>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 active:scale-95 disabled:opacity-50 shadow-sm"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        {/* SECTION 1: HERO CONFIGURATION */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm space-y-6">
          <div className="border-b border-[#777B70]/15 pb-4">
            <h2 className="text-lg font-bold text-[#202522] tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C65D36]" />
              <span>Section 1 — Hero Configuration</span>
            </h2>
            <p className="text-xs font-mono text-[#777B70] mt-1">
              Controls the full-screen cinematic 3D hero section.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Top Hero Badge
              </label>
              <input
                type="text"
                value={formData.hero_badge}
                onChange={(e) => handleChange('hero_badge', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Headline Line 1
                </label>
                <input
                  type="text"
                  value={formData.hero_title_line1}
                  onChange={(e) => handleChange('hero_title_line1', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36] font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Headline Line 2 (Burnt Orange Highlight)
                </label>
                <input
                  type="text"
                  value={formData.hero_title_line2}
                  onChange={(e) => handleChange('hero_title_line2', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#C65D36] text-sm focus:outline-none focus:border-[#C65D36] font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Hero Subtitle / Description
              </label>
              <textarea
                rows={3}
                value={formData.hero_subtitle}
                onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Primary CTA Button Text
                </label>
                <input
                  type="text"
                  value={formData.hero_cta_primary}
                  onChange={(e) => handleChange('hero_cta_primary', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Secondary CTA Button Text
                </label>
                <input
                  type="text"
                  value={formData.hero_cta_secondary}
                  onChange={(e) => handleChange('hero_cta_secondary', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Hero Exhibition Showcase Image URL
              </label>
              <input
                type="text"
                placeholder="/images/hero-stall.png or external CDN image URL"
                value={formData.hero_image_url || ''}
                onChange={(e) => handleChange('hero_image_url', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36] font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Custom 3D Model GLTF/GLB Asset URL (Optional)
              </label>
              <input
                type="text"
                placeholder="Leave blank to use internal high-performance procedural stall"
                value={formData.hero_3d_model_url || ''}
                onChange={(e) => handleChange('hero_3d_model_url', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36] font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: ABOUT & METRICS */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm space-y-6">
          <div className="border-b border-[#777B70]/15 pb-4">
            <h2 className="text-lg font-bold text-[#202522] tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C65D36]" />
              <span>Section 3 — About Us Narrative & Metrics</span>
            </h2>
            <p className="text-xs font-mono text-[#777B70] mt-1">
              Company ethos, workshop facility photography, and architectural stats.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                About Heading
              </label>
              <input
                type="text"
                value={formData.about_heading}
                onChange={(e) => handleChange('about_heading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Primary Narrative Paragraph
              </label>
              <textarea
                rows={3}
                value={formData.about_paragraph1}
                onChange={(e) => handleChange('about_paragraph1', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Secondary Narrative Paragraph (Workshops & Facilities)
              </label>
              <textarea
                rows={3}
                value={formData.about_paragraph2}
                onChange={(e) => handleChange('about_paragraph2', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Facility Architectural Image URL
              </label>
              <input
                type="text"
                value={formData.about_image_url}
                onChange={(e) => handleChange('about_image_url', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36] font-mono"
              />
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#777B70]/15">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#777B70] block">Stat 1 Value</label>
                <input
                  type="text"
                  value={formData.stat_years}
                  onChange={(e) => handleChange('stat_years', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-xs font-mono font-bold"
                />
                <input
                  type="text"
                  value={formData.stat_years_label}
                  onChange={(e) => handleChange('stat_years_label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 text-[#777B70] text-[11px] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#777B70] block">Stat 2 Value</label>
                <input
                  type="text"
                  value={formData.stat_projects}
                  onChange={(e) => handleChange('stat_projects', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-xs font-mono font-bold"
                />
                <input
                  type="text"
                  value={formData.stat_projects_label}
                  onChange={(e) => handleChange('stat_projects_label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 text-[#777B70] text-[11px] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#777B70] block">Stat 3 Value</label>
                <input
                  type="text"
                  value={formData.stat_venues}
                  onChange={(e) => handleChange('stat_venues', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-xs font-mono font-bold"
                />
                <input
                  type="text"
                  value={formData.stat_venues_label}
                  onChange={(e) => handleChange('stat_venues_label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 text-[#777B70] text-[11px] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#777B70] block">Stat 4 Value</label>
                <input
                  type="text"
                  value={formData.stat_rate}
                  onChange={(e) => handleChange('stat_rate', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-xs font-mono font-bold"
                />
                <input
                  type="text"
                  value={formData.stat_rate_label}
                  onChange={(e) => handleChange('stat_rate_label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 text-[#777B70] text-[11px] font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: OTHER SECTION HEADINGS */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm space-y-6">
          <div className="border-b border-[#777B70]/15 pb-4">
            <h2 className="text-lg font-bold text-[#202522] tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C65D36]" />
              <span>Section Titles & Badges</span>
            </h2>
            <p className="text-xs font-mono text-[#777B70] mt-1">
              Customize titles for Services, Portfolio, Process, Blog, and Contact sections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Services Section Heading
              </label>
              <input
                type="text"
                value={formData.services_heading}
                onChange={(e) => handleChange('services_heading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Portfolio Section Heading
              </label>
              <input
                type="text"
                value={formData.portfolio_heading}
                onChange={(e) => handleChange('portfolio_heading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Why Us Section Heading
              </label>
              <input
                type="text"
                value={formData.why_us_heading}
                onChange={(e) => handleChange('why_us_heading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Process Section Heading
              </label>
              <input
                type="text"
                value={formData.process_heading}
                onChange={(e) => handleChange('process_heading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 active:scale-95 disabled:opacity-50 shadow-sm"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving Changes...' : 'Save All Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
