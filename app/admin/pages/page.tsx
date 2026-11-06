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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#777B70]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202522] tracking-tight">
            Page Management
          </h1>
          <p className="text-xs font-mono text-[#777B70] mt-1">
            Customize inner pages: About, Services, and Contact headers, imagery, and SEO metadata.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
              <Check className="w-3.5 h-3.5" />
              <span>Page Updated</span>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 active:scale-95 disabled:opacity-50 shadow-sm"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Page'}</span>
          </button>
        </div>
      </div>

      {/* Page Selector Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm w-fit">
        {PAGES.map(slug => (
          <button
            key={slug}
            onClick={() => setSelectedSlug(slug)}
            className={`px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              selectedSlug === slug
                ? 'bg-[#C65D36] text-white font-bold shadow-sm'
                : 'text-[#777B70] hover:text-[#202522] hover:bg-[#F2EFE8]'
            }`}
          >
            /{slug} Page
          </button>
        ))}
      </div>

      {/* Editor Form */}
      {isLoading ? (
        <div className="py-20 text-center font-mono text-[#C65D36] text-sm">
          Loading page data...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm space-y-6">
            <div className="border-b border-[#777B70]/15 pb-4">
              <h2 className="text-lg font-bold text-[#202522] tracking-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C65D36]" />
                <span>/{selectedSlug.toUpperCase()} Header & Narrative Content</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Page Hero Title
                </label>
                <input
                  type="text"
                  value={pageData.hero_title}
                  onChange={(e) => handleChange('hero_title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36] font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Page Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={pageData.hero_subtitle}
                  onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Banner Architectural Image URL
                </label>
                <input
                  type="text"
                  value={pageData.banner_image || ''}
                  onChange={(e) => handleChange('banner_image', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36] font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Body Architectural Content / Narrative
                </label>
                <textarea
                  rows={5}
                  value={pageData.body_content || ''}
                  onChange={(e) => handleChange('body_content', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
                />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm space-y-6">
            <div className="border-b border-[#777B70]/15 pb-4">
              <h2 className="text-lg font-bold text-[#202522] tracking-tight">
                SEO & OpenGraph Metadata for /{selectedSlug}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={pageData.meta_title || ''}
                  onChange={(e) => handleChange('meta_title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                  Meta Description
                </label>
                <input
                  type="text"
                  value={pageData.meta_description || ''}
                  onChange={(e) => handleChange('meta_description', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 active:scale-95 disabled:opacity-50 shadow-sm"
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
