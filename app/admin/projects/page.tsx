'use client';

import React, { useState, useEffect } from 'react';
import { DataStore } from '../../../lib/data/store';
import { Project } from '../../../lib/data/types';
import { slugify } from '../../../lib/utils';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  X, 
  Layers, 
  Star, 
  Image as ImageIcon,
  MapPin,
  Check
} from 'lucide-react';

const CATEGORIES = [
  'Custom Exhibition Stalls',
  'Modular Exhibition Stalls',
  'Corporate Exhibitions',
  'Retail Displays',
  'Event Fabrication'
] as const;

export default function PortfolioManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    client_name: '',
    category: 'Custom Exhibition Stalls',
    location: '',
    event_name: '',
    year: '2025',
    area_sqm: '120 sqm',
    featured_image: '',
    gallery_images: [],
    description: '',
    challenge: '',
    solution: '',
    materials: ['Steel Truss', 'Curved Acoustic Wood', 'LED Displays'],
    is_featured: false,
    display_order: 1,
    status: 'published'
  });

  const loadData = async () => {
    const p = await DataStore.getProjects();
    setProjects(p);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      client_name: '',
      category: 'Custom Exhibition Stalls',
      location: 'Pragati Maidan, New Delhi',
      event_name: 'Auto Expo',
      year: '2025',
      area_sqm: '150 sqm',
      featured_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
      gallery_images: [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80'
      ],
      description: 'A bespoke two-story structural pavilion fabricated for leading international expo presence.',
      challenge: 'High mezzanine structural load calculation with cantilevered sightlines.',
      solution: 'Custom engineered perimeter bridge truss system with certified load anchors.',
      materials: ['Structural Box Truss', 'Acoustic Slats', 'Backlit Acrylic'],
      is_featured: true,
      display_order: projects.length + 1,
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setFormData({ ...proj });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: prev.slug && editingProject ? prev.slug : slugify(val)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.client_name) return;

    const projectToSave: Project = {
      id: editingProject ? editingProject.id : `proj-${Date.now()}`,
      slug: formData.slug || slugify(formData.title),
      title: formData.title,
      client_name: formData.client_name,
      category: (formData.category as any) || 'Custom Exhibition Stalls',
      location: formData.location || 'Exhibition Center',
      event_name: formData.event_name,
      year: formData.year || '2025',
      area_sqm: formData.area_sqm || '120 sqm',
      featured_image: formData.featured_image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
      gallery_images: formData.gallery_images || [],
      description: formData.description || '',
      challenge: formData.challenge,
      solution: formData.solution,
      materials: formData.materials || [],
      is_featured: Boolean(formData.is_featured),
      display_order: Number(formData.display_order) || 1,
      status: (formData.status as any) || 'published'
    };

    await DataStore.saveProject(projectToSave);
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this exhibition project?')) {
      await DataStore.deleteProject(id);
      loadData();
    }
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.client_name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Portfolio Management
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Showcase completed custom stalls, modular pavilions, client details, and multi-angle photo galleries.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Counter */}
      <div className="p-4 rounded-2xl bg-[#0f0f16] border border-white/10 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search projects by title, client, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>
        <div className="text-xs font-mono text-neutral-400">
          Total: {projects.length} exhibition projects
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-2xl bg-[#0c0c12] border border-white/10 flex flex-col justify-between space-y-4 group hover:border-amber-400/40 transition-colors"
          >
            <div className="space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                <img
                  src={proj.featured_image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-black/70 text-amber-300 backdrop-blur-md">
                    {proj.category}
                  </span>
                  {proj.is_featured && (
                    <span className="p-1 rounded bg-amber-400 text-black">
                      <Star className="w-3 h-3 fill-current" />
                    </span>
                  )}
                </div>
                {proj.area_sqm && (
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-neutral-300 backdrop-blur-md">
                    {proj.area_sqm}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                  {proj.client_name}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight line-clamp-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light line-clamp-2 mt-1">
                  {proj.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500 truncate max-w-[140px]">
                {proj.location}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(proj)}
                  className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-white/5"
                  title="Edit project"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/5"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0d14] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {editingProject ? 'Edit Exhibition Project' : 'Add New Exhibition Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-neutral-400 hover:text-white rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#111118] border border-white/10 text-white text-xs font-mono"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Location & Venue
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Footprint Area (e.g. 180 sqm)
                  </label>
                  <input
                    type="text"
                    value={formData.area_sqm}
                    onChange={(e) => setFormData({ ...formData, area_sqm: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Featured Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.featured_image}
                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-xs"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Gallery Image URLs (Comma-separated)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.gallery_images?.join(', ')}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      gallery_images: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                    })}
                    placeholder="https://image1.jpg, https://image2.jpg"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-xs"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Project Architectural Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Engineering Challenge
                  </label>
                  <textarea
                    rows={2}
                    value={formData.challenge || ''}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Engineering Solution
                  </label>
                  <textarea
                    rows={2}
                    value={formData.solution || ''}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs"
                  />
                </div>

                <div className="flex items-center gap-3 sm:col-span-2 pt-2">
                  <label className="flex items-center gap-2 text-xs font-mono text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-400 bg-black border-white/20 focus:ring-amber-400"
                    />
                    <span>Highlight as Featured Project on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-mono text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold font-mono text-xs uppercase"
                >
                  {editingProject ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
