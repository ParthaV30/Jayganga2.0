'use client';

import React, { useState, useEffect } from 'react';
import { DataStore } from '../../../lib/data/store';
import { Enquiry, EnquiryStatus } from '../../../lib/data/types';
import { formatDate } from '../../../lib/utils';
import { 
  Search, 
  MailCheck, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  X, 
  MessageSquare,
  FileText,
  User
} from 'lucide-react';

const STATUS_OPTIONS: { value: EnquiryStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New Unread', color: 'bg-amber-400/20 text-amber-300 border-amber-400/30' },
  { value: 'contacted', label: 'Contacted', color: 'bg-blue-400/20 text-blue-300 border-blue-400/30' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-purple-400/20 text-purple-300 border-purple-400/30' },
  { value: 'converted', label: 'Converted', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { value: 'closed', label: 'Closed / Archived', color: 'bg-neutral-800 text-neutral-400 border-neutral-700' }
];

export default function EnquiryManagementPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const loadData = async () => {
    const list = await DataStore.getEnquiries();
    setEnquiries(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus, notes?: string) => {
    await DataStore.updateEnquiryStatus(id, newStatus, notes);
    loadData();
    if (activeEnquiry && activeEnquiry.id === id) {
      setActiveEnquiry(prev => prev ? { ...prev, status: newStatus, admin_notes: notes } : null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this client enquiry record?')) {
      await DataStore.deleteEnquiry(id);
      if (activeEnquiry?.id === id) setActiveEnquiry(null);
      loadData();
    }
  };

  const filtered = enquiries.filter(e => {
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    const matchesSearch = 
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.company.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.service_required.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Enquiry Management CRM
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Track incoming client project briefs, manage conversion pipelines, and document notes.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400">
          Total Leads: <span className="text-white font-bold">{enquiries.length}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0f0f16] border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              filterStatus === 'all'
                ? 'bg-amber-400 text-black font-bold'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            All ({enquiries.length})
          </button>
          {STATUS_OPTIONS.map(opt => {
            const count = enquiries.filter(e => e.status === opt.value).length;
            return (
              <button
                key={opt.value}
                onClick={() => setFilterStatus(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  filterStatus === opt.value
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {opt.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search leads by client or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-neutral-500 font-mono text-xs">
            No client enquiries found matching your filter criteria.
          </div>
        ) : (
          filtered.map((enq) => {
            const statusConfig = STATUS_OPTIONS.find(o => o.value === enq.status) || STATUS_OPTIONS[0];

            return (
              <div
                key={enq.id}
                className="p-6 rounded-2xl bg-[#0c0c12] border border-white/10 hover:border-amber-400/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Client Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-white">{enq.name}</span>
                    <span className="text-xs font-mono text-amber-400">@ {enq.company}</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {formatDate(enq.created_at)}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-300 font-medium">
                    {enq.service_required} {enq.stall_size && `(${enq.stall_size})`}
                  </div>

                  <p className="text-xs text-neutral-400 font-light line-clamp-2 max-w-2xl leading-relaxed">
                    {enq.project_description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      {enq.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      {enq.phone}
                    </span>
                    {enq.event_location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        {enq.event_location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Selector & Actions */}
                <div className="flex items-center gap-4 lg:flex-shrink-0">
                  <select
                    value={enq.status}
                    onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase border focus:outline-none cursor-pointer ${statusConfig.color}`}
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-[#111118] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      setActiveEnquiry(enq);
                      setAdminNotes(enq.admin_notes || '');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase"
                  >
                    View Brief
                  </button>

                  <button
                    onClick={() => handleDelete(enq.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 hover:bg-white/5 rounded-lg"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Drawer Modal */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl bg-[#0d0d14] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase">Enquiry Brief Record</span>
                <h3 className="text-xl font-bold text-white tracking-tight">{activeEnquiry.company}</h3>
              </div>
              <button onClick={() => setActiveEnquiry(null)} className="p-2 text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <span className="text-neutral-500 uppercase block font-mono">Contact Name</span>
                  <span className="text-white font-medium">{activeEnquiry.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block font-mono">Email Address</span>
                  <a href={`mailto:${activeEnquiry.email}`} className="text-amber-400 hover:underline">{activeEnquiry.email}</a>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block font-mono">Phone Number</span>
                  <a href={`tel:${activeEnquiry.phone}`} className="text-amber-400 hover:underline">{activeEnquiry.phone}</a>
                </div>
                <div>
                  <span className="text-neutral-500 uppercase block font-mono">Event Venue / Location</span>
                  <span className="text-white font-medium">{activeEnquiry.event_location || 'Not specified'}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-neutral-400 uppercase font-mono block">Project Requirement Description:</span>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-200 text-sm leading-relaxed">
                  {activeEnquiry.project_description}
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-xs font-mono uppercase text-amber-400 block font-semibold">
                  Internal Engineering Notes & Next Steps
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record quote estimates, CAD presentation dates, or discussion points..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-mono"
                />
                <button
                  onClick={() => handleStatusChange(activeEnquiry.id, activeEnquiry.status, adminNotes)}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-black font-bold font-mono text-xs uppercase"
                >
                  Save Internal Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

