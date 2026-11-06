'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Home, 
  FileText, 
  BookOpen, 
  Layers, 
  Image as ImageIcon, 
  Wrench, 
  MailCheck, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Shield, 
  Sparkles, 
  Database, 
  CheckCircle2, 
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';
import { DataStore } from '../../lib/data/store';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Homepage Editor', href: '/admin/homepage', icon: Home },
  { label: 'Page Management', href: '/admin/pages', icon: FileText },
  { label: 'Blog & Articles', href: '/admin/blog', icon: BookOpen },
  { label: 'Portfolio Projects', href: '/admin/projects', icon: Layers },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Services Manager', href: '/admin/services', icon: Wrench },
  { label: 'Enquiries CRM', href: '/admin/enquiries', icon: MailCheck },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>('admin@auraforge-expo.com');
  const [isCloud, setIsCloud] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // If we're on /admin/login, don't perform auth redirect
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    const session = typeof window !== 'undefined' ? localStorage.getItem('aura_admin_session') : null;
    if (!session) {
      router.push('/admin/login');
    } else {
      try {
        const parsed = JSON.parse(session);
        setUserEmail(parsed.email || 'admin@auraforge-expo.com');
      } catch {
        // default email
      }
      setIsAuthenticated(true);
      setIsCloud(DataStore.isCloudConnected());
    }
  }, [pathname, router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aura_admin_session');
    }
    router.push('/admin/login');
  };

  // Skip layout wrap on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#07070a] flex items-center justify-center text-amber-400 font-mono text-sm">
        Authenticating Aura Forge Admin Console...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080c] text-neutral-200 flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0c0c12] border-b border-white/10 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold font-mono text-xs">
            AF
          </div>
          <span className="font-bold text-white text-sm">AURA FORGE CMS</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop / Mobile Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-40 w-72 bg-[#0a0a0f] border-r border-white/[0.08] flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/[0.08]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a1a24] to-[#121218] border border-amber-400/40 flex items-center justify-center">
              <span className="font-mono text-sm font-black text-amber-300">AF</span>
            </div>
            <div>
              <span className="font-black tracking-wide text-white font-sans text-base block">
                AURA FORGE
              </span>
              <span className="text-[10px] font-mono tracking-widest text-amber-400/80 uppercase">
                CMS CONTROL PANEL
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-3 mb-2 font-semibold">
            Administrative Modules
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/10'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Database Status & User Card */}
        <div className="p-4 border-t border-white/[0.08] space-y-3">
          {/* Supabase Status Pill */}
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-mono ${
            isCloud
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <Database className="w-4 h-4 flex-shrink-0" />
            <div className="leading-tight truncate">
              <span className="font-bold block text-[11px]">
                {isCloud ? 'Supabase Live Connected' : 'Local Storage Engine'}
              </span>
              <span className="text-[10px] text-neutral-400 truncate block">
                {isCloud ? 'PostgreSQL Active' : 'Offline / Standalone Mode'}
              </span>
            </div>
          </div>

          {/* User info & quick logout */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 truncate max-w-[160px]">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center font-mono text-xs text-amber-400 font-bold">
                {userEmail[0]?.toUpperCase() || 'A'}
              </div>
              <div className="truncate text-xs">
                <span className="text-white font-medium block truncate">{userEmail}</span>
                <span className="text-[10px] text-neutral-500 font-mono">Master Administrator</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-neutral-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Administrative Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-20 px-8 py-4 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-white font-semibold">
              {NAV_ITEMS.find(n => n.href === pathname)?.label || 'Console'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-amber-400/50 hover:bg-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </header>

        {/* Children Page Content */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
