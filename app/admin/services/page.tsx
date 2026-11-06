'use client';

import React, { useState, useEffect } from 'react';
import { DataStore } from '../../../lib/data/store';
import { Service } from '../../../lib/data/types';
import { slugify } from '../../../lib/utils';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Wrench, 
  Layers, 
  X, 
  Check, 
  ArrowUpDown,
  CheckCircle2
} from 'lucide-react';

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    slug: '',
    short_description: '',
    full_description: '',
    image_url: '',
    icon_name: 'Layers',
    features: ['Custom structural engineering', 'Concealed wiring looms', 'Turnkey installation'],
    display_order: 1,
    is_active: true
  });

  const loadData = async () => {
    const s = await DataStore.getServices();
    setServices(s);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      icon_name: 'Layers',
      features: ['Precision structural calculations', 'Onsite engineering director', 'ISO 9001 certified finish'],
      display_order: services.length + 1,
      is_active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({ ...service });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: prev.slug && editingService ? prev.slug : slugify(val)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const serviceToSave: Service = {
      id: editingService ? editingService.id : `srv-${Date.now()}`,
      slug: formData.slug || slugify(formData.title),
      title: formData.title,
      short_description: formData.short_description || '',
      full_description: formData.full_description || formData.short_description || '',
      image_url: formData.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      icon_name: formData.icon_name || 'Layers',
      features: formData.features || [],
      display_order: Number(formData.display_order) || 1,
      is_active: Boolean(formData.is_active)
    };

    await DataStore.saveService(serviceToSave);
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this fabrication service division?')) {
      await DataStore.deleteService(id);
      loadData();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#777B70]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202522] tracking-tight">
            Services Management
          </h1>
          <p className="text-xs font-mono text-[#777B70] mt-1">
            Configure exhibition fabrication capabilities, scope of work, and homepage ordering.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm flex flex-col justify-between space-y-6 hover:border-[#C65D36] transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F2EFE8] border border-[#777B70]/20 flex items-center justify-center text-[#C65D36] font-mono font-bold text-sm">
                    0{srv.display_order}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#202522] tracking-tight">{srv.title}</h3>
                    <div className="text-xs font-mono text-[#777B70]">/{srv.slug}</div>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                  srv.is_active ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {srv.is_active ? 'Active' : 'Disabled'}
                </span>
              </div>

              <p className="text-xs text-[#777B70] leading-relaxed">
                {srv.short_description}
              </p>

              {srv.features && (
                <div className="space-y-1.5 pt-2 border-t border-[#777B70]/15">
                  {srv.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#292B28]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C65D36] flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#777B70]/15 flex items-center justify-between text-xs font-mono">
              <span className="text-[#777B70]">
                Order: #{srv.display_order}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(srv)}
                  className="p-1.5 rounded-lg text-[#C65D36] hover:text-[#B34E28] hover:bg-[#F2EFE8]"
                  title="Edit service"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(srv.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-[#F2EFE8]"
                  title="Delete service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white border border-[#777B70]/30 rounded-2xl p-6 sm:p-8 space-y-6 text-[#292B28] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#777B70]/15 pb-4">
              <h3 className="text-lg font-bold text-[#202522] tracking-tight">
                {editingService ? 'Edit Fabrication Service' : 'Add New Fabrication Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#777B70] hover:text-[#202522]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#777B70] block">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#777B70] block">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] font-mono text-xs focus:outline-none focus:border-[#C65D36]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-[#777B70] block">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] font-mono text-xs focus:outline-none focus:border-[#C65D36]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#777B70] block">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] font-mono text-xs focus:outline-none focus:border-[#C65D36]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#777B70] block">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-xs focus:outline-none focus:border-[#C65D36]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#777B70] block">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.features?.join(', ')}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-4 py-2 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-xs focus:outline-none focus:border-[#C65D36]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-mono text-[#292B28] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-[#C65D36] accent-[#C65D36] border-[#777B70]/30"
                  />
                  <span>Active & Visible on Public Website</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#777B70]/15">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F2EFE8] text-[#777B70] hover:bg-[#D6D1C5] text-xs font-mono uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-xs font-mono uppercase shadow-sm"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
