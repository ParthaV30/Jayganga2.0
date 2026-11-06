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
  { value: 'new', label: 'New Unread', color: 'bg-[#C65D36]/15 text-[#C65D36] border-[#C65D36]/30' },
  { value: 'contacted', label: 'Contacted', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { value: 'converted', label: 'Converted', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { value: 'closed', label: 'Closed / Archived', color: 'bg-neutral-100 text-neutral-700 border-neutral-300' }
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#777B70]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202522] tracking-tight">
            Enquiry Management CRM
          </h1>
          <p className="text-xs font-mono text-[#777B70] mt-1">
            Track incoming client project briefs, manage conversion pipelines, and document notes.
          </p>
        </div>

        <div className="text-xs font-mono text-[#777B70]">
          Total Leads: <span className="text-[#202522] font-bold">{enquiries.length}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              filterStatus === 'all'
                ? 'bg-[#C65D36] text-white font-bold shadow-sm'
                : 'bg-[#F2EFE8] text-[#777B70] hover:text-[#202522]'
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
                    ? 'bg-[#C65D36] text-white font-bold shadow-sm'
                    : 'bg-[#F2EFE8] text-[#777B70] hover:text-[#202522]'
                }`}
              >
                {opt.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777B70]" />
          <input
            type="text"
            placeholder="Search leads by client or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-xs text-[#292B28] placeholder-[#777B70] focus:outline-none focus:border-[#C65D36]"
          />
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-[#777B70] font-mono text-xs">
            No client enquiries found matching your filter criteria.
          </div>
        ) : (
          filtered.map((enq) => {
            const statusConfig = STATUS_OPTIONS.find(o => o.value === enq.status) || STATUS_OPTIONS[0];

            return (
              <div
                key={enq.id}
                className="p-6 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm hover:border-[#C65D36] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Client Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-[#202522]">{enq.name}</span>
                    <span className="text-xs font-mono text-[#C65D36] font-semibold">@ {enq.company}</span>
                    <span className="text-[#777B70]">•</span>
                    <span className="text-[11px] font-mono text-[#777B70]">
                      {formatDate(enq.created_at)}
                    </span>
                  </div>

                  <div className="text-xs text-[#202522] font-semibold">
                    {enq.service_required} {enq.stall_size && `(${enq.stall_size})`}
                  </div>

                  <p className="text-xs text-[#777B70] line-clamp-2 max-w-2xl leading-relaxed">
                    {enq.project_description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#777B70] pt-1">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#777B70]" />
                      {enq.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#777B70]" />
                      {enq.phone}
                    </span>
                    {enq.event_location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#777B70]" />
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
                      <option key={opt.value} value={opt.value} className="bg-white text-[#292B28]">
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      setActiveEnquiry(enq);
                      setAdminNotes(enq.admin_notes || '');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#F2EFE8] hover:bg-[#D6D1C5] text-[#202522] font-mono text-xs uppercase transition-colors"
                  >
                    View Brief
                  </button>

                  <button
                    onClick={() => handleDelete(enq.id)}
                    className="p-2 text-[#777B70] hover:text-red-500 hover:bg-[#F2EFE8] rounded-lg transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white border border-[#777B70]/30 rounded-2xl p-6 sm:p-8 space-y-6 text-[#292B28] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#777B70]/15 pb-4">
              <div>
                <span className="text-xs font-mono text-[#C65D36] uppercase font-semibold">Enquiry Brief Record</span>
                <h3 className="text-xl font-bold text-[#202522] tracking-tight">{activeEnquiry.company}</h3>
              </div>
              <button onClick={() => setActiveEnquiry(null)} className="p-2 text-[#777B70] hover:text-[#202522]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#F2EFE8] border border-[#777B70]/20">
                <div>
                  <span className="text-[#777B70] uppercase block font-mono">Contact Name</span>
                  <span className="text-[#202522] font-medium">{activeEnquiry.name}</span>
                </div>
                <div>
                  <span className="text-[#777B70] uppercase block font-mono">Email Address</span>
                  <a href={`mailto:${activeEnquiry.email}`} className="text-[#C65D36] hover:underline font-medium">{activeEnquiry.email}</a>
                </div>
                <div>
                  <span className="text-[#777B70] uppercase block font-mono">Phone Number</span>
                  <a href={`tel:${activeEnquiry.phone}`} className="text-[#C65D36] hover:underline font-medium">{activeEnquiry.phone}</a>
                </div>
                <div>
                  <span className="text-[#777B70] uppercase block font-mono">Event Venue / Location</span>
                  <span className="text-[#202522] font-medium">{activeEnquiry.event_location || 'Not specified'}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[#777B70] uppercase font-mono block">Project Requirement Description:</span>
                <div className="p-4 rounded-xl bg-[#F2EFE8] border border-[#777B70]/20 text-[#292B28] text-sm leading-relaxed">
                  {activeEnquiry.project_description}
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div className="space-y-2 pt-2 border-t border-[#777B70]/15">
                <label className="text-xs font-mono uppercase text-[#C65D36] block font-semibold">
                  Internal Engineering Notes & Next Steps
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record quote estimates, CAD presentation dates, or discussion points..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-xs font-mono focus:outline-none focus:border-[#C65D36]"
                />
                <button
                  onClick={() => handleStatusChange(activeEnquiry.id, activeEnquiry.status, adminNotes)}
                  className="px-4 py-2 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold font-mono text-xs uppercase shadow-sm transition-colors"
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
