'use client';

import React, { useState, useEffect } from 'react';
import { DataStore } from '../../../lib/data/store';
import { MediaAsset } from '../../../lib/data/types';
import { 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  Plus, 
  X, 
  Eye, 
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Projects',
    alt_text: ''
  });

  const loadData = async () => {
    const m = await DataStore.getMedia();
    setMedia(m);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;

    const newAsset: MediaAsset = {
      id: `med-${Date.now()}`,
      title: formData.title,
      url: formData.url,
      file_type: 'image/jpeg',
      file_size: '2.5 MB',
      alt_text: formData.alt_text || formData.title,
      category: formData.category,
      created_at: new Date().toISOString()
    };

    await DataStore.saveMedia(newAsset);
    setIsModalOpen(false);
    setFormData({ title: '', url: '', category: 'Projects', alt_text: '' });
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this media asset?')) {
      await DataStore.deleteMedia(id);
      loadData();
    }
  };

  const filteredMedia = media.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#777B70]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202522] tracking-tight">
            Media Asset Library
          </h1>
          <p className="text-xs font-mono text-[#777B70] mt-1">
            Central repository for architectural photography, renders, and exhibition graphics.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Search & Stats */}
      <div className="p-4 rounded-2xl bg-white border border-[#777B70]/20 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777B70]" />
          <input
            type="text"
            placeholder="Search media by title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-xs text-[#292B28] placeholder-[#777B70] focus:outline-none focus:border-[#C65D36]"
          />
        </div>
        <div className="text-xs font-mono text-[#777B70]">
          Assets: {media.length} items
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((asset) => (
          <div
            key={asset.id}
            className="group relative rounded-2xl bg-white border border-[#777B70]/20 hover:border-[#C65D36] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-neutral-200 overflow-hidden">
              <img
                src={asset.url}
                alt={asset.alt_text || asset.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 justify-between">
                <button
                  onClick={() => setSelectedAsset(asset)}
                  className="p-1.5 rounded-lg bg-white/90 text-[#202522] hover:bg-white"
                  title="Enlarge preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleCopyUrl(asset.url, asset.id)}
                    className="p-1.5 rounded-lg bg-[#C65D36] text-white hover:bg-[#B34E28] font-semibold"
                    title="Copy URL"
                  >
                    {copiedId === asset.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    title="Delete asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3.5 space-y-1">
              <div className="text-xs font-semibold text-[#202522] truncate">{asset.title}</div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#777B70]">
                <span>{asset.category}</span>
                <span>{asset.file_size || '2.0 MB'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white border border-[#777B70]/30 rounded-2xl p-6 sm:p-8 space-y-6 text-[#292B28] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#777B70]/15 pb-4">
              <h3 className="text-lg font-bold text-[#202522] tracking-tight">Add Media Asset</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#777B70] hover:text-[#202522]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#777B70] block">Asset Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Frankfurt CPHI Booth Main Angle"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#777B70] block">Direct Image URL *</label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] font-mono text-xs focus:outline-none focus:border-[#C65D36]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#777B70] block">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-xs font-mono focus:outline-none focus:border-[#C65D36]"
                >
                  <option value="Projects">Projects</option>
                  <option value="Retail">Retail</option>
                  <option value="Events">Events</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Branding">Branding</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-[#777B70] block">Alt Text (Accessibility & SEO)</label>
                <input
                  type="text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Descriptive architectural alt text..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] text-sm focus:outline-none focus:border-[#C65D36]"
                />
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
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Asset Full Preview Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md" onClick={() => setSelectedAsset(null)}>
          <div className="relative max-w-4xl max-h-[85vh] bg-white border border-[#777B70]/30 rounded-2xl overflow-hidden p-4 space-y-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={selectedAsset.url} alt={selectedAsset.title} className="max-h-[60vh] w-auto mx-auto rounded-xl object-contain" />
            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#777B70]/15">
              <span className="text-[#202522] font-bold">{selectedAsset.title}</span>
              <button
                onClick={() => handleCopyUrl(selectedAsset.url, selectedAsset.id)}
                className="px-3 py-1.5 rounded-lg bg-[#C65D36] hover:bg-[#B34E28] text-white font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedId === selectedAsset.id ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
