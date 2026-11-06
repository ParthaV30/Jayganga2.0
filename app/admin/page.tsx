'use client';

import React from 'react';
import Link from 'next/link';
import { useCMS } from '../../lib/data/useCMS';
import { formatDate } from '../../lib/utils';
import { 
  MailCheck, 
  BookOpen, 
  Layers, 
  Wrench, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  Database, 
  Plus, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboardOverview() {
  const { enquiries, blogs, projects, services, isCloud } = useCMS();

  const newEnquiriesCount = enquiries.filter(e => e.status === 'new').length;
  const publishedBlogsCount = blogs.filter(b => b.status === 'published').length;
  const publishedProjectsCount = projects.filter(p => p.status === 'published').length;
  const activeServicesCount = services.filter(s => s.is_active).length;

  const kpis = [
    {
      label: 'Total Enquiries',
      value: enquiries.length,
      subValue: `${newEnquiriesCount} New Unread`,
      icon: MailCheck,
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
      href: '/admin/enquiries'
    },
    {
      label: 'Curated Projects',
      value: projects.length,
      subValue: `${publishedProjectsCount} Published`,
      icon: Layers,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      href: '/admin/projects'
    },
    {
      label: 'Published Articles',
      value: blogs.length,
      subValue: `${publishedBlogsCount} Live Online`,
      icon: BookOpen,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      href: '/admin/blog'
    },
    {
      label: 'Fabrication Services',
      value: services.length,
      subValue: `${activeServicesCount} Active`,
      icon: Wrench,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      href: '/admin/services'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            System status, inbound leads, and real-time CMS content distribution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/blog"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/10"
          >
            <Plus className="w-4 h-4" />
            <span>Post Article</span>
          </Link>
        </div>
      </div>

      {/* Supabase Connectivity Card */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
        isCloud 
          ? 'bg-emerald-500/[0.04] border-emerald-500/30' 
          : 'bg-amber-500/[0.04] border-amber-500/30'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isCloud ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
            <Database className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                {isCloud ? 'Cloud Supabase Connection: Active' : 'Operating in Persistent Local Storage Mode'}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                isCloud ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {isCloud ? 'CONNECTED' : 'STANDALONE READY'}
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
              {isCloud 
                ? 'Your website is actively connected to Supabase PostgreSQL. Database queries, authentication, and storage are syncing in real time.'
                : 'All edits and CRUD operations are actively persisting in your browser. To sync with remote Supabase cloud, configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'}
            </p>
          </div>
        </div>

        <Link
          href="/admin/settings"
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-200 border border-white/10 whitespace-nowrap transition-colors"
        >
          View Database Settings →
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={idx}
              href={kpi.href}
              className="p-6 rounded-2xl bg-[#0d0d14] border border-white/[0.07] hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div className={`p-2.5 rounded-xl ${kpi.bgColor} ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-white font-mono tracking-tight group-hover:text-amber-200 transition-colors">
                  {kpi.value}
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-1">
                  {kpi.subValue}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries & Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Enquiries (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Recent Inbound Enquiries
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                Latest client briefs submitted through website
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
            >
              View All ({enquiries.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div
                key={enq.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{enq.name}</span>
                    <span className="text-xs text-neutral-500 font-mono">• {enq.company}</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-light truncate max-w-sm">
                    {enq.service_required} • {enq.event_location || 'Venue pending'}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                    enq.status === 'new' 
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      : enq.status === 'converted'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-white/10 text-neutral-300'
                  }`}>
                    {enq.status.replace('_', ' ')}
                  </span>
                  <Link
                    href="/admin/enquiries"
                    className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Activities Timeline & Quick Links (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c12] border border-white/10 space-y-6">
            <h3 className="text-base font-bold text-white tracking-tight border-b border-white/10 pb-4">
              Administrative Quick Actions
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/admin/homepage"
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-amber-400/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Edit Homepage Hero & Copy</span>
                    <span className="text-[10px] font-mono text-neutral-400">Update headlines and CTAs</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors" />
              </Link>

              <Link
                href="/admin/projects"
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-amber-400/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Manage Portfolio Gallery</span>
                    <span className="text-[10px] font-mono text-neutral-400">Upload new exhibition booths</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 transition-colors" />
              </Link>

              <Link
                href="/admin/media"
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-amber-400/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Media Asset Library</span>
                    <span className="text-[10px] font-mono text-neutral-400">Manage photos and 3D files</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

