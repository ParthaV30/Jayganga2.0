'use client';

import React, { useState, useEffect } from 'react';
import { DataStore } from '../../../lib/data/store';
import { SiteSettings } from '../../../lib/data/types';
import { initialSettings } from '../../../lib/data/initial-data';
import { 
  Save, 
  Check, 
  RefreshCw, 
  Database, 
  Copy, 
  Settings, 
  ShieldCheck, 
  Globe, 
  Share2, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function WebsiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const isCloud = DataStore.isCloudConnected();

  useEffect(() => {
    DataStore.getSettings().then(data => {
      setSettings(data);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await DataStore.updateSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Save settings failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyEnvSample = () => {
    const envSample = `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
# Optional for backend migrations:
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here`;
    navigator.clipboard.writeText(envSample);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Website & Global Settings
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Brand identity, corporate contact channels, social networks, SEO parameters, and Supabase integration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <Check className="w-3.5 h-3.5" />
              <span>Settings Saved</span>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      {/* Supabase Cloud Connection Panel */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isCloud ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'}`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Database Engine Status: {isCloud ? 'Connected to Remote Supabase' : 'Standalone Local Storage'}
              </h2>
              <p className="text-xs font-mono text-neutral-400">
                {isCloud ? 'PostgreSQL schema synced and accepting real-time cloud data.' : 'Data is currently persisting in browser LocalStorage.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyEnvSample}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 border border-white/10 flex items-center gap-2"
          >
            {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEnv ? 'Copied .env Example' : 'Copy .env Configuration'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-neutral-300 space-y-2">
          <div className="font-semibold text-amber-300">How to connect your remote Supabase Project:</div>
          <ol className="list-decimal pl-5 space-y-1 text-neutral-400">
            <li>Create a project at <a href="https://supabase.com" target="_blank" className="text-amber-400 underline">supabase.com</a>.</li>
            <li>Go to the Supabase SQL Editor and execute <code className="text-amber-300">supabase/migrations/001_initial_schema.sql</code>.</li>
            <li>Copy your Project URL and anon key into <code className="text-amber-300">.env.local</code>.</li>
            <li>Restart the application — the system will immediately switch to live PostgreSQL cloud storage!</li>
          </ol>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* BRAND & CONTACT INFORMATION */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Brand & Corporate Channels</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={settings.company_name}
                onChange={(e) => handleChange('company_name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Tagline / Sub-brand
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Corporate Email Address *
              </label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="+91 98201 44552"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-emerald-400 font-mono text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Operating Cities / Hubs
              </label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Full Physical Address & Workshop Facility Location
              </label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* SOCIAL NETWORKS */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Social Networks</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">LinkedIn Profile</label>
              <input
                type="text"
                value={settings.linkedin_url || ''}
                onChange={(e) => handleChange('linkedin_url', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 text-xs font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">Instagram Handle</label>
              <input
                type="text"
                value={settings.instagram_url || ''}
                onChange={(e) => handleChange('instagram_url', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 text-xs font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">Facebook Page</label>
              <input
                type="text"
                value={settings.facebook_url || ''}
                onChange={(e) => handleChange('facebook_url', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 text-xs font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">YouTube Channel</label>
              <input
                type="text"
                value={settings.youtube_url || ''}
                onChange={(e) => handleChange('youtube_url', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* SEO & FOOTER */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Global SEO & Footer Information</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">Default SEO Title</label>
              <input
                type="text"
                value={settings.seo_title}
                onChange={(e) => handleChange('seo_title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">Default Meta Description</label>
              <textarea
                rows={2}
                value={settings.seo_description}
                onChange={(e) => handleChange('seo_description', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">Footer Statement</label>
              <textarea
                rows={2}
                value={settings.footer_text}
                onChange={(e) => handleChange('footer_text', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">Copyright Notice</label>
              <input
                type="text"
                value={settings.copyright_text}
                onChange={(e) => handleChange('copyright_text', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSaving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

