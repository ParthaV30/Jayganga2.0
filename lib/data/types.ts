export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';

export interface SiteSettings {
  id?: string;
  company_name: string;
  tagline: string;
  logo_url?: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
  google_maps_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  youtube_url?: string;
  seo_title: string;
  seo_description: string;
  footer_text: string;
  copyright_text: string;
}

export interface HomepageContent {
  id?: string;
  hero_badge: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_image_url?: string;
  hero_3d_model_url?: string;
  about_heading: string;
  about_subheading: string;
  about_paragraph1: string;
  about_paragraph2: string;
  about_image_url: string;
  stat_years: string;
  stat_years_label: string;
  stat_projects: string;
  stat_projects_label: string;
  stat_venues: string;
  stat_venues_label: string;
  stat_rate: string;
  stat_rate_label: string;
  story_section_badge: string;
  story_section_title: string;
  story_section_desc: string;
  services_heading: string;
  services_subheading: string;
  portfolio_heading: string;
  portfolio_subheading: string;
  why_us_heading: string;
  why_us_subheading: string;
  process_heading: string;
  process_subheading: string;
  blog_heading: string;
  blog_subheading: string;
  contact_heading: string;
  contact_subheading: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  image_url: string;
  icon_name: string;
  features: string[];
  deliverables?: string[];
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface ProjectImage {
  id?: string;
  project_id?: string;
  image_url: string;
  caption?: string;
  display_order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  category: 'Custom Exhibition Stalls' | 'Modular Exhibition Stalls' | 'Corporate Exhibitions' | 'Retail Displays' | 'Event Fabrication';
  location: string;
  event_name?: string;
  year?: string;
  area_sqm?: string;
  featured_image: string;
  gallery_images: string[];
  description: string;
  challenge?: string;
  solution?: string;
  materials?: string[];
  is_featured: boolean;
  display_order: number;
  status: 'published' | 'draft';
  created_at?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  author_name: string;
  author_role: string;
  published_at: string;
  status: 'published' | 'draft' | 'scheduled';
  read_time: string;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  file_type: string;
  file_size?: string;
  alt_text?: string;
  category: string;
  created_at?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service_required: string;
  event_location: string;
  event_date?: string;
  stall_size?: string;
  project_description: string;
  budget_range?: string;
  status: EnquiryStatus;
  admin_notes?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_company: string;
  client_role: string;
  client_avatar?: string;
  project_name: string;
  testimonial_text: string;
  rating: number;
  display_order: number;
}

export interface PageContent {
  id: string;
  page_slug: string; // 'about' | 'services' | 'contact'
  hero_title: string;
  hero_subtitle: string;
  banner_image?: string;
  body_content?: string;
  meta_title?: string;
  meta_description?: string;
  sections?: Record<string, any>;
}

