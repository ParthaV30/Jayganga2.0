'use client';

import React, { useState, useEffect } from 'react';
import { DataStore } from '../../../lib/data/store';
import { PageContent } from '../../../lib/data/types';
import { initialPages } from '../../../lib/data/initial-data';
import { Save, Check, RefreshCw, FileText } from 'lucide-react';

const PAGES = ['about', 'services', 'contact'] as const;

export default function PagesManagementPage() {
  const [selectedSlug, setSelectedSlug] = useState<'about' | 'services' | 'contact'>('about');
  const [pageData, setPageData] = useState<PageContent>(initialPages.about);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    DataStore.getPage(selectedSlug).then(data => {
      setPageData(data);
      setIsLoading(false);
    });
  }, [selectedSlug]);

  const handleChange = (field: keyof PageContent, value: string) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await DataStore.updatePage(selectedSlug, pageData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Update page failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Page Management
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Customize inner pages: About, Services, and Contact headers, imagery, and SEO metadata.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <Check className="w-3.5 h-3.5" />
              <span>Page Updated</span>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Page'}</span>
          </button>
        </div>
      </div>

      {/* Page Selector Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-[#0c0c12] border border-white/10 w-fit">
        {PAGES.map(slug => (
          <button
            key={slug}
            onClick={() => setSelectedSlug(slug)}
            className={`px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              selectedSlug === slug
                ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            /{slug} Page
          </button>
        ))}
      </div>

      {/* Editor Form */}
      {isLoading ? (
        <div className="py-20 text-center font-mono text-amber-400 text-sm">
          Loading page data...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>/{selectedSlug.toUpperCase()} Header & Narrative Content</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Page Hero Title
                </label>
                <input
                  type="text"
                  value={pageData.hero_title}
                  onChange={(e) => handleChange('hero_title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400 font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Page Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={pageData.hero_subtitle}
                  onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Banner Architectural Image URL
                </label>
                <input
                  type="text"
                  value={pageData.banner_image || ''}
                  onChange={(e) => handleChange('banner_image', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 text-sm focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Body Architectural Content / Narrative
                </label>
                <textarea
                  rows={5}
                  value={pageData.body_content || ''}
                  onChange={(e) => handleChange('body_content', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white tracking-tight">
                SEO & OpenGraph Metadata for /{selectedSlug}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={pageData.meta_title || ''}
                  onChange={(e) => handleChange('meta_title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Meta Description
                </label>
                <input
                  type="text"
                  value={pageData.meta_description || ''}
                  onChange={(e) => handleChange('meta_description', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isSaving ? 'Saving...' : 'Save Page Content'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
