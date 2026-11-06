'use client';

import { 
  SiteSettings, 
  HomepageContent, 
  Service, 
  Project, 
  BlogPost, 
  BlogCategory, 
  MediaAsset, 
  Enquiry, 
  Testimonial,
  PageContent,
  EnquiryStatus 
} from './types';
import { 
  initialSettings, 
  initialHomepage, 
  initialServices, 
  initialProjects, 
  initialBlogs, 
  initialCategories, 
  initialMedia, 
  initialEnquiries, 
  initialTestimonials, 
  initialPages 
} from './initial-data';
import { supabase, isSupabaseConfigured } from '../supabase/client';

const STORAGE_KEYS = {
  SETTINGS: 'aura_site_settings',
  HOMEPAGE: 'aura_homepage_content',
  SERVICES: 'aura_services',
  PROJECTS: 'aura_projects',
  BLOGS: 'aura_blogs',
  CATEGORIES: 'aura_categories',
  MEDIA: 'aura_media',
  ENQUIRIES: 'aura_enquiries',
  TESTIMONIALS: 'aura_testimonials',
  PAGES: 'aura_pages'
};

const notifySubscribers = (key: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('aura_cms_update', { detail: { key } }));
  }
};

const getLocal = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setLocal = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifySubscribers(key);
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }
};

// ==========================================
// STORE API
// ==========================================

export const DataStore = {
  isCloudConnected(): boolean {
    return isSupabaseConfigured;
  },

  // --- SITE SETTINGS ---
  async getSettings(): Promise<SiteSettings> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
        if (!error && data) return data as SiteSettings;
      } catch (err) {
        console.warn('Supabase fetch settings failed, fallback to local:', err);
      }
    }
    return getLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('site_settings').upsert(updated);
      } catch (err) {
        console.error('Supabase update settings error:', err);
      }
    }
    setLocal(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // --- HOMEPAGE CONTENT ---
  async getHomepage(): Promise<HomepageContent> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('page_contents').select('sections').eq('page_slug', 'homepage').single();
        if (!error && data?.sections) return { ...initialHomepage, ...data.sections };
      } catch (err) {
        console.warn('Supabase fetch homepage failed:', err);
      }
    }
    return getLocal<HomepageContent>(STORAGE_KEYS.HOMEPAGE, initialHomepage);
  },

  async updateHomepage(content: Partial<HomepageContent>): Promise<HomepageContent> {
    const current = await this.getHomepage();
    const updated = { ...current, ...content };
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('page_contents').upsert({
          page_slug: 'homepage',
          sections: updated,
          updated_at: new Date().toISOString()
        }, { onConflict: 'page_slug' });
      } catch (err) {
        console.error('Supabase update homepage error:', err);
      }
    }
    setLocal(STORAGE_KEYS.HOMEPAGE, updated);
    return updated;
  },

  // --- PAGE CONTENTS ---
  async getPage(slug: string): Promise<PageContent> {
    const defaultPage = initialPages[slug] || {
      id: `page-${slug}`,
      page_slug: slug,
      hero_title: slug.toUpperCase(),
      hero_subtitle: '',
      body_content: ''
    };
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('page_contents').select('*').eq('page_slug', slug).single();
        if (!error && data) return { ...defaultPage, ...data };
      } catch (err) {
        console.warn('Supabase fetch page failed:', err);
      }
    }
    const allPages = getLocal<Record<string, PageContent>>(STORAGE_KEYS.PAGES, initialPages);
    return allPages[slug] || defaultPage;
  },

  async updatePage(slug: string, content: Partial<PageContent>): Promise<PageContent> {
    const current = await this.getPage(slug);
    const updated = { ...current, ...content, page_slug: slug };
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('page_contents').upsert(updated, { onConflict: 'page_slug' });
      } catch (err) {
        console.error('Supabase update page error:', err);
      }
    }
    const allPages = getLocal<Record<string, PageContent>>(STORAGE_KEYS.PAGES, initialPages);
    allPages[slug] = updated;
    setLocal(STORAGE_KEYS.PAGES, allPages);
    return updated;
  },

  // --- SERVICES ---
  async getServices(): Promise<Service[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Service[];
      } catch (err) {
        console.warn('Supabase fetch services failed:', err);
      }
    }
    const items = getLocal<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    return items.sort((a, b) => a.display_order - b.display_order);
  },

  async saveService(service: Service): Promise<Service> {
    const items = await this.getServices();
    const index = items.findIndex(s => s.id === service.id);
    let updated: Service[];
    if (index >= 0) {
      updated = [...items];
      updated[index] = service;
    } else {
      updated = [...items, service];
    }
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('services').upsert(service);
      } catch (err) {
        console.error('Supabase save service error:', err);
      }
    }
    setLocal(STORAGE_KEYS.SERVICES, updated);
    return service;
  },

  async deleteService(id: string): Promise<void> {
    const items = await this.getServices();
    const updated = items.filter(s => s.id !== id);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('services').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete service error:', err);
      }
    }
    setLocal(STORAGE_KEYS.SERVICES, updated);
  },

  // --- PROJECTS ---
  async getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Project[];
      } catch (err) {
        console.warn('Supabase fetch projects failed:', err);
      }
    }
    const items = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
    return items.sort((a, b) => a.display_order - b.display_order);
  },

  async saveProject(project: Project): Promise<Project> {
    const items = await this.getProjects();
    const index = items.findIndex(p => p.id === project.id);
    let updated: Project[];
    if (index >= 0) {
      updated = [...items];
      updated[index] = project;
    } else {
      updated = [project, ...items];
    }
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').upsert(project);
      } catch (err) {
        console.error('Supabase save project error:', err);
      }
    }
    setLocal(STORAGE_KEYS.PROJECTS, updated);
    return project;
  },

  async deleteProject(id: string): Promise<void> {
    const items = await this.getProjects();
    const updated = items.filter(p => p.id !== id);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete project error:', err);
      }
    }
    setLocal(STORAGE_KEYS.PROJECTS, updated);
  },

  // --- BLOG POSTS ---
  async getBlogPosts(): Promise<BlogPost[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
        if (!error && data && data.length > 0) return data as BlogPost[];
      } catch (err) {
        console.warn('Supabase fetch blogs failed:', err);
      }
    }
    return getLocal<BlogPost[]>(STORAGE_KEYS.BLOGS, initialBlogs);
  },

  async saveBlogPost(blog: BlogPost): Promise<BlogPost> {
    const items = await this.getBlogPosts();
    const index = items.findIndex(b => b.id === blog.id);
    let updated: BlogPost[];
    if (index >= 0) {
      updated = [...items];
      updated[index] = blog;
    } else {
      updated = [blog, ...items];
    }
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('blog_posts').upsert(blog);
      } catch (err) {
        console.error('Supabase save blog error:', err);
      }
    }
    setLocal(STORAGE_KEYS.BLOGS, updated);
    return blog;
  },

  async deleteBlogPost(id: string): Promise<void> {
    const items = await this.getBlogPosts();
    const updated = items.filter(b => b.id !== id);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('blog_posts').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete blog error:', err);
      }
    }
    setLocal(STORAGE_KEYS.BLOGS, updated);
  },

  // --- BLOG CATEGORIES ---
  async getCategories(): Promise<BlogCategory[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('blog_categories').select('*');
        if (!error && data && data.length > 0) return data as BlogCategory[];
      } catch (err) {
        console.warn('Supabase fetch categories failed:', err);
      }
    }
    return getLocal<BlogCategory[]>(STORAGE_KEYS.CATEGORIES, initialCategories);
  },

  // --- MEDIA ASSETS ---
  async getMedia(): Promise<MediaAsset[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('media_assets').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as MediaAsset[];
      } catch (err) {
        console.warn('Supabase fetch media failed:', err);
      }
    }
    return getLocal<MediaAsset[]>(STORAGE_KEYS.MEDIA, initialMedia);
  },

  async saveMedia(asset: MediaAsset): Promise<MediaAsset> {
    const items = await this.getMedia();
    const updated = [asset, ...items.filter(m => m.id !== asset.id)];
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('media_assets').upsert(asset);
      } catch (err) {
        console.error('Supabase save media error:', err);
      }
    }
    setLocal(STORAGE_KEYS.MEDIA, updated);
    return asset;
  },

  async deleteMedia(id: string): Promise<void> {
    const items = await this.getMedia();
    const updated = items.filter(m => m.id !== id);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('media_assets').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete media error:', err);
      }
    }
    setLocal(STORAGE_KEYS.MEDIA, updated);
  },

  // --- ENQUIRIES ---
  async getEnquiries(): Promise<Enquiry[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as Enquiry[];
      } catch (err) {
        console.warn('Supabase fetch enquiries failed:', err);
      }
    }
    return getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
  },

  async submitEnquiry(enquiryData: Omit<Enquiry, 'id' | 'status' | 'created_at'>): Promise<Enquiry> {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'new',
      created_at: new Date().toISOString()
    };
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('enquiries').insert([newEnquiry]);
      } catch (err) {
        console.error('Supabase submit enquiry error:', err);
      }
    }
    const current = await this.getEnquiries();
    setLocal(STORAGE_KEYS.ENQUIRIES, [newEnquiry, ...current]);
    return newEnquiry;
  },

  async updateEnquiryStatus(id: string, status: EnquiryStatus, notes?: string): Promise<void> {
    const items = await this.getEnquiries();
    const updated = items.map(e => e.id === id ? { ...e, status, admin_notes: notes !== undefined ? notes : e.admin_notes } : e);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('enquiries').update({ status, admin_notes: notes }).eq('id', id);
      } catch (err) {
        console.error('Supabase update enquiry status error:', err);
      }
    }
    setLocal(STORAGE_KEYS.ENQUIRIES, updated);
  },

  async deleteEnquiry(id: string): Promise<void> {
    const items = await this.getEnquiries();
    const updated = items.filter(e => e.id !== id);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('enquiries').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete enquiry error:', err);
      }
    }
    setLocal(STORAGE_KEYS.ENQUIRIES, updated);
  },

  // Reset to initial mock data (helpful for dev or demo)
  resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    notifySubscribers('all');
  }
};

