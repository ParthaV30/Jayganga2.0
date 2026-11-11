# Jayganga2.0 — Premium 3D Exhibition Stall Fabrication & Architecture Platform

A complete, production-ready, architectural-grade web platform for an international **Exhibition Stall Fabrication & Spatial Solutions** company.

Built with **Next.js 16 (App Router)**, **React 19**, **Three.js / React Three Fiber**, **Drei**, **GSAP ScrollTrigger**, **Lenis Smooth Scroll**, **Tailwind CSS**, and **Supabase**.

---

## 🌟 Key Features

### 1. Architectural & Cinematic Aesthetic
- **Color Palette:** Obsidian Deep Charcoal (`#07070a`), Dark Graphite (`#0f0f15`), and Warm Metallic Champagne Gold (`#d4af37`, `#c5a880`).
- **Typography:** Architectural geometric sans-serif with high-contrast hierarchical scale.
- **Micro-Interactions:** Lenis smooth scrolling, cursor-following 3D card tilts, frosted glassmorphic navigation, and gold glow states.

### 2. Immersive 3D Experiences
- **Section 1 — Cinematic Hero:**
  - Procedurally generated 120 sqm luxury island exhibition pavilion.
  - Directional warm gold key light casting 2048x2048 shadow maps, cool rim lighting, and realistic floor contact shadows.
  - Interactive mouse parallax camera orbit and automatic cinematic slow rotation.
- **Section 2 — 3D Stall Fabrication Story (Signature Experience):**
  - Full-screen pinned scroll animation showcasing the step-by-step structural erection of a pavilion across 6 stages:
    1. **Empty Exhibition Floor:** Laser-calibrated hall footprint, utility channels, leveling pylons.
    2. **Structural Framework:** Heavy-duty EN-AW 6082-T6 aluminum box trusses, vertical columns, overhead gantry beams.
    3. **Walls & Panels:** Dark parquet flooring, curved acoustic partitions, vertical CNC-milled timber fins.
    4. **Lighting & Digital Displays:** Focused 4000K truss spotlights, ambient neon flex strips, panoramic curved LED video wall.
    5. **Brand Signage & Graphics:** Backlit 3D acrylic monogram, rotating overhead halo banner, monolithic champagne gold reception counter.
    6. **Final Completed Pavilion:** Modernist VIP discussion lounge, motorized revolving showcase turntable, architectural planters, turnkey sign-off.
  - Dynamic camera travel synchronizing position and target across each fabrication phase.
  - Interactive stage scrubber buttons for instant phase inspection.

### 3. Public Sections & Dedicated Pages
- **Section 1: Hero Section** (Monumental headline, CTAs, 3D Canvas, live status cues).
- **Section 2: 3D Fabrication Story** (Pinned scroll sequence).
- **Section 3: About Us** (45,000 sq.ft facility narrative, 4 key metrics, workshop photography).
- **Section 4: Services** (6 core divisions with interactive 3D tilt cards and direct brief commission buttons).
- **Section 5: Featured Projects** (Filterable category showcase with technical specifications modal).
- **Section 6: Why Choose Us** (6 key engineering pillars with laser tolerance protocols).
- **Section 7: Our Process** (5-step timeline from brief to 18-hour early handover).
- **Section 8: Blog** (Dynamic spatial insights with reading time, category pills, and full article pages).
- **Section 9: Contact** (Comprehensive project enquiry wizard with direct database transmission).
- **Dedicated Inner Pages:**
  - `/projects` (Full filterable portfolio archive with search)
  - `/services` (Comprehensive engineering divisions and capability tables)
  - `/about` (Company story, ISO certifications, and fabrication machinery)
  - `/blog` & `/blog/[slug]` (Full blog reading experience with table of contents and consultation boxes)
  - `/contact` (Direct studio consultation and workshop coordinates)

### 4. CMS Admin Panel (`/admin`)
A protected dashboard with dual-mode storage (Live Supabase Cloud + Local Storage Standalone):
- **Overview:** Real-time KPI counters (Enquiries, Projects, Blogs, Services), Supabase status banner, recent enquiries, quick actions.
- **Homepage Editor:** Modify hero line 1 & 2, subtitle, CTAs, 3D model GLB URL, about text, metrics, and section titles in real time.
- **Page Management:** Edit About, Services, and Contact inner pages.
- **Blog Management:** Full CRUD, markdown formatting, draft/published status, categories, tags, SEO metadata.
- **Portfolio Management:** Add/edit exhibition booths, upload multi-angle gallery photos, client names, challenge & solution, footprint area.
- **Media Library:** Central gallery for image assets with instant URL copying and alt text management.
- **Services Manager:** Manage capabilities, descriptions, icons, feature lists, and display ordering.
- **Enquiry Management CRM:** Filter by pipeline status (`new`, `contacted`, `in_progress`, `converted`, `closed`), view project briefs, add internal engineering notes.
- **Website Settings:** Edit branding, phone, WhatsApp, email, physical facility coordinates, social links, SEO tags, and database migration helper.

---

## 🗄️ Database Architecture (Supabase PostgreSQL)

Full SQL migration is located at: `supabase/migrations/001_initial_schema.sql`

Tables implemented:
1. `admin_users`
2. `site_settings`
3. `page_contents`
4. `services`
5. `projects`
6. `project_images`
7. `blog_posts`
8. `blog_categories`
9. `media_assets`
10. `enquiries`
11. `testimonials`

Security:
- Row Level Security (RLS) enabled across all public and admin tables.
- Public read access for published content.
- Public insert access for project enquiries.
- Authenticated-only write permissions for administrative CMS modules.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional for Supabase Cloud)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

*Note: If no `.env.local` is provided, the application runs seamlessly in **Persistent Local Storage Engine Mode** with zero crashes or blank states.*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Access
- Navigate to: `http://localhost:3000/admin`
- Login URL: `http://localhost:3000/admin/login`
- Standard Demo Credentials:
  - **Email:** `admin@jayganga.com`
  - **Password:** `admin123`

### 5. Production Build
```bash
npm run build
npm start
```
