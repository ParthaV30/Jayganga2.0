# JAYGANGA — SUPABASE DATABASE & CMS SETUP GUIDE

This project uses **Supabase PostgreSQL** for persistent storage, authentication, and media storage.

## Fast Setup Guide

### 1. Create a Supabase Project
1. Log into [supabase.com](https://supabase.com) and create a new project.
2. Choose your region (e.g., Mumbai, Frankfurt, Singapore, or US).

### 2. Run the SQL Migration
1. In the Supabase Dashboard, open the **SQL Editor** from the left navigation.
2. Open `supabase/migrations/001_initial_schema.sql` from this codebase.
3. Paste the entire SQL contents into the query runner and click **Run**.
4. This will create all 11 tables (`admin_users`, `site_settings`, `page_contents`, `services`, `projects`, `project_images`, `blog_posts`, `blog_categories`, `media_assets`, `enquiries`, `testimonials`), set up RLS security policies, and create the `media` storage bucket.

### 3. Add Environment Variables
Create a file named `.env.local` inside `stall-fabrication/` with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>
```

### 4. Admin Credentials & Authentication
You can create an administrator directly in the Supabase **Authentication** panel:
- Add a user with your chosen email (e.g. `admin@jayganga.com`).
- Insert their `auth.users.id` into the `admin_users` table if desired.

### 5. Local Storage Fallback Mode
If Supabase environment variables are not provided, the application automatically runs in **Persistent Local Storage Engine Mode**. All changes in the `/admin` CMS persist in your local browser state, allowing instant testing and demonstrations with zero setup friction!

