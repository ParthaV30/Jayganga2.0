-- ==============================================================================
-- AURA FORGE / JAYGANGA 3D STALL FABRICATION & CMS DATABASE SCHEMA
-- Migration: 001_initial_schema.sql
-- Compatible with Supabase PostgreSQL (Postgres 15+)
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Clean existing tables if needed (idempotent)
DROP TABLE IF EXISTS project_images CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;
DROP TABLE IF EXISTS media_assets CASCADE;
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS page_contents CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- ------------------------------------------------------------------------------
-- Table: admin_users
-- Stores registered administrators permitted to access /admin
-- ------------------------------------------------------------------------------
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin', -- 'superadmin', 'admin', 'editor'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: site_settings
-- Global brand info, contacts, WhatsApp, social links, SEO, footer copy
-- ------------------------------------------------------------------------------
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL DEFAULT 'AURA FORGE',
  tagline TEXT NOT NULL DEFAULT 'Architectural Stall Fabrication & Immersive Exhibition Solutions',
  logo_url TEXT,
  email TEXT NOT NULL DEFAULT 'connect@auraforge-expo.com',
  phone TEXT NOT NULL DEFAULT '+91 98201 44552',
  whatsapp TEXT NOT NULL DEFAULT '+91 98201 44552',
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Mumbai & Bengaluru',
  country TEXT NOT NULL DEFAULT 'India / Global Projects',
  google_maps_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  youtube_url TEXT,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  footer_text TEXT NOT NULL,
  copyright_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: page_contents
-- Dynamic CMS content for pages: homepage, about, services, contact
-- ------------------------------------------------------------------------------
CREATE TABLE page_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug TEXT NOT NULL UNIQUE, -- 'homepage', 'about', 'services', 'contact'
  hero_title TEXT,
  hero_subtitle TEXT,
  banner_image TEXT,
  body_content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  sections JSONB NOT NULL DEFAULT '{}'::JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: services
-- Stall fabrication capabilities with icons, descriptions, and feature lists
-- ------------------------------------------------------------------------------
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Layers',
  features TEXT[] NOT NULL DEFAULT '{}',
  deliverables TEXT[] NOT NULL DEFAULT '{}',
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: projects
-- Curated exhibition stall portfolio with client, specs, categories
-- ------------------------------------------------------------------------------
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  event_name TEXT,
  year TEXT,
  area_sqm TEXT,
  featured_image TEXT NOT NULL,
  gallery_images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  challenge TEXT,
  solution TEXT,
  materials TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published', -- 'published', 'draft'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: project_images
-- High-resolution gallery images linked to projects
-- ------------------------------------------------------------------------------
CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: blog_categories
-- ------------------------------------------------------------------------------
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: blog_posts
-- Rich architectural & trade show strategy articles
-- ------------------------------------------------------------------------------
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  author_name TEXT NOT NULL DEFAULT 'AURA FORGE Editorial',
  author_role TEXT NOT NULL DEFAULT 'Spatial Architecture Team',
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'published', -- 'published', 'draft', 'scheduled'
  read_time TEXT NOT NULL DEFAULT '5 min read',
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: media_assets
-- Central media library for uploaded images and 3D assets
-- ------------------------------------------------------------------------------
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size TEXT,
  alt_text TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: enquiries
-- Inbound exhibition project leads & enquiries
-- ------------------------------------------------------------------------------
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_required TEXT NOT NULL,
  event_location TEXT NOT NULL,
  event_date TEXT,
  stall_size TEXT,
  project_description TEXT NOT NULL,
  budget_range TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'converted', 'closed'
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: testimonials
-- Verified client endorsements
-- ------------------------------------------------------------------------------
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_company TEXT NOT NULL,
  client_role TEXT NOT NULL,
  client_avatar TEXT,
  project_name TEXT NOT NULL,
  testimonial_text TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR FAST QUERYING
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all exposed tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies (Allow anyone to view published site content)
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read page_contents" ON page_contents FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "Public read published projects" ON projects FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Public read project_images" ON project_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read blog_categories" ON blog_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read published blog_posts" ON blog_posts FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Public read media_assets" ON media_assets FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (true);

-- 2. Public Enquiry Submission (Anyone can submit an enquiry)
CREATE POLICY "Public submit enquiries" ON enquiries FOR INSERT TO anon, authenticated WITH CHECK (
  name IS NOT NULL AND email IS NOT NULL AND phone IS NOT NULL AND project_description IS NOT NULL
);

-- 3. Admin Full Access Policies (Authenticated users manage everything)
CREATE POLICY "Admin manage site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage page_contents" ON page_contents FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage project_images" ON project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage blog_categories" ON blog_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage blog_posts" ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage media_assets" ON media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage enquiries" ON enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin view admin_users" ON admin_users FOR SELECT TO authenticated USING (true);

-- ==============================================================================
-- STORAGE BUCKETS CONFIGURATION (For image & 3D model uploads)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read media storage" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'media');
CREATE POLICY "Admin upload media storage" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');
CREATE POLICY "Admin update media storage" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media');
CREATE POLICY "Admin delete media storage" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media');
