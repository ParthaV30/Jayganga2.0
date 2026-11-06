'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DataStore } from '../../../lib/data/store';
import { BlogPost, BlogCategory } from '../../../lib/data/types';
import { formatDate, slugify } from '../../../lib/utils';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  BookOpen,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: 'Design & Technology',
    tags: ['Architecture', '3D Fabrication'],
    author_name: 'AURA FORGE Editorial',
    author_role: 'Spatial Architecture Team',
    published_at: new Date().toISOString().split('T')[0],
    status: 'published',
    read_time: '5 min read',
    seo_title: '',
    seo_description: ''
  });

  const loadData = async () => {
    const [b, c] = await Promise.all([
      DataStore.getBlogPosts(),
      DataStore.getCategories()
    ]);
    setBlogs(b);
    setCategories(c);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      category: categories[0]?.name || 'Design & Technology',
      tags: ['Architecture', '3D Fabrication'],
      author_name: 'AURA FORGE Editorial',
      author_role: 'Spatial Architecture Team',
      published_at: new Date().toISOString().split('T')[0],
      status: 'published',
      read_time: '5 min read',
      seo_title: '',
      seo_description: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ ...post });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: prev.slug && editingPost ? prev.slug : slugify(val)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const postToSave: BlogPost = {
      id: editingPost ? editingPost.id : `blog-${Date.now()}`,
      slug: formData.slug || slugify(formData.title),
      title: formData.title,
      excerpt: formData.excerpt || '',
      content: formData.content,
      featured_image: formData.featured_image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      category: formData.category || 'General',
      tags: typeof formData.tags === 'string' ? (formData.tags as string).split(',').map(t => t.trim()) : (formData.tags || []),
      author_name: formData.author_name || 'AURA FORGE Editorial',
      author_role: formData.author_role || 'Spatial Architecture Team',
      published_at: formData.published_at || new Date().toISOString().split('T')[0],
      status: (formData.status as any) || 'published',
      read_time: formData.read_time || '5 min read',
      seo_title: formData.seo_title || formData.title,
      seo_description: formData.seo_description || formData.excerpt
    };

    await DataStore.saveBlogPost(postToSave);
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await DataStore.deleteBlogPost(id);
      loadData();
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Blog & Articles Management
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Publish spatial essays, exhibition insights, and SEO-optimized industry perspectives.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-2xl bg-[#0f0f16] border border-white/10 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search articles by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>
        <div className="text-xs font-mono text-neutral-400">
          Total: {blogs.length} articles
        </div>
      </div>

      {/* Articles Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0c0c12]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-neutral-400 font-mono uppercase">
              <th className="p-4">Article</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {filteredBlogs.map((post) => (
              <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-12 h-10 rounded-lg object-cover bg-neutral-900 border border-white/10 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-white text-sm line-clamp-1">{post.title}</div>
                      <div className="text-[11px] font-mono text-neutral-500">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-mono text-neutral-300">
                  {post.category}
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                    post.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4 font-mono text-neutral-400">
                  {formatDate(post.published_at)}
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 inline-block"
                    title="View live article"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => openEditModal(post)}
                    className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-white/5"
                    title="Edit article"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/5"
                    title="Delete article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0d14] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {editingPost ? 'Edit Blog Article' : 'Write New Article'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. The Future of Exhibition Stall Fabrication"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 text-xs font-mono"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Excerpt / Summary *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Article Body Content (Markdown Supported) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write in markdown: ## Section Heading, > Quotes, bullet points..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Publication Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#111118] border border-white/10 text-white text-xs font-mono"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm"
                  />
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
                  {editingPost ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
