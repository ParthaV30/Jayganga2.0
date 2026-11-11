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

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>('admin@jayganga.com');
  const [isCloud, setIsCloud] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // If we're on /admin/login, don't perform auth redirect
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    const session = typeof window !== 'undefined' 
      ? (localStorage.getItem('jayganga_admin_session') || localStorage.getItem('aura_admin_session')) 
      : null;
    if (!session) {
      router.push('/admin/login');
    } else {
      try {
        const parsed = JSON.parse(session);
        setUserEmail(parsed.email || 'admin@jayganga.com');
      } catch {
        // default email
      }
      setIsAuthenticated(true);
      setIsCloud(DataStore.isCloudConnected());
    }
  }, [pathname, router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jayganga_admin_session');
      localStorage.removeItem('aura_admin_session');
    }
    router.push('/admin/login');
  };

  // Skip layout wrap on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Always keep children in the render tree so Next.js Turbopack instant-navigation validation never drops segments
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F2EFE8] flex items-center justify-center text-[#C65D36] font-mono text-sm relative">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C65D36] animate-pulse" />
          <span>Authenticating Jay Ganga Admin Console...</span>
        </div>
        <div className="hidden" aria-hidden="true">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EFE8] text-[#292B28] flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#202522] text-white border-b border-white/10 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[#C65D36] font-bold font-mono text-xs">
            JG
          </div>
          <span className="font-bold text-white text-sm">JAY GANGA CMS</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-white/10 border border-white/20 text-neutral-200"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop / Mobile Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-40 w-72 bg-[#202522] text-[#D6D1C5] border-r border-[#202522] flex flex-col justify-between transition-transform duration-300 shadow-xl ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="font-mono text-sm font-black text-[#C65D36]">JG</span>
            </div>
            <div>
              <span className="font-black tracking-wide text-white font-sans text-base block">
                JAY <span className="text-[#C65D36]">GANGA</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#D6D1C5]/70 uppercase">
                CMS CONTROL PANEL
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#777B70] px-3 mb-2 font-semibold">
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
                    ? 'bg-[#C65D36] text-white font-semibold shadow-sm'
                    : 'text-[#D6D1C5] hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#D6D1C5]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Database Status & User Card */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* Supabase Status Pill */}
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-mono ${
            isCloud
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : 'bg-white/10 border-white/20 text-[#D6D1C5]'
          }`}>
            <Database className="w-4 h-4 flex-shrink-0" />
            <div className="leading-tight truncate">
              <span className="font-bold block text-[11px]">
                {isCloud ? 'Supabase Live Connected' : 'Local Storage Engine'}
              </span>
              <span className="text-[10px] text-[#D6D1C5]/70 truncate block">
                {isCloud ? 'PostgreSQL Active' : 'Offline / Standalone Mode'}
              </span>
            </div>
          </div>

          {/* User info & quick logout */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 truncate max-w-[160px]">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs text-[#C65D36] font-bold">
                {userEmail[0]?.toUpperCase() || 'A'}
              </div>
              <div className="truncate text-xs">
                <span className="text-white font-medium block truncate">{userEmail}</span>
                <span className="text-[10px] text-[#777B70] font-mono">Master Administrator</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-[#D6D1C5] hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
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
        <header className="sticky top-0 z-20 px-8 py-4 bg-white/90 backdrop-blur-md border-b border-[#777B70]/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#777B70]">
            <span>Admin</span>
            <span>/</span>
            <span className="text-[#202522] font-semibold">
              {NAV_ITEMS.find(n => n.href === pathname)?.label || 'Console'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg bg-[#F2EFE8] border border-[#777B70]/30 hover:border-[#C65D36] text-xs font-mono text-[#202522] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C65D36]" />
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

