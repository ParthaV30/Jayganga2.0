'use client';

import { useState, useEffect, useCallback } from 'react';
import { DataStore } from './store';
import { 
  SiteSettings, 
  HomepageContent, 
  Service, 
  Project, 
  BlogPost, 
  Enquiry, 
  MediaAsset 
} from './types';
import { initialSettings, initialHomepage } from './initial-data';

export function useCMS() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [homepage, setHomepage] = useState<HomepageContent>(initialHomepage);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCloud, setIsCloud] = useState(false);

  const loadAll = useCallback(async () => {
    try {
      const [s, h, srv, prj, blg, enq, med] = await Promise.all([
        DataStore.getSettings(),
        DataStore.getHomepage(),
        DataStore.getServices(),
        DataStore.getProjects(),
        DataStore.getBlogPosts(),
        DataStore.getEnquiries(),
        DataStore.getMedia()
      ]);
      setSettings(s);
      setHomepage(h);
      setServices(srv);
      setProjects(prj);
      setBlogs(blg);
      setEnquiries(enq);
      setMedia(med);
      setIsCloud(DataStore.isCloudConnected());
    } catch (err) {
      console.error('Failed to load CMS data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();

    const handleUpdate = () => {
      loadAll();
    };

    window.addEventListener('aura_cms_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('aura_cms_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [loadAll]);

  return {
    settings,
    homepage,
    services,
    projects,
    blogs,
    enquiries,
    media,
    loading,
    isCloud,
    refresh: loadAll
  };
}
