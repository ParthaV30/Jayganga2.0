'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Shield, Layers, Phone } from 'lucide-react';
import { useCMS } from '../../lib/data/useCMS';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = useCMS();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '3D Story', href: '/#story' },
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Portfolio', href: '/#projects' },
    { label: 'Process', href: '/#process' },
    { label: 'Insights', href: '/#blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#08080c]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a1a24] to-[#121218] border border-amber-400/40 flex items-center justify-center relative overflow-hidden group-hover:border-amber-400 transition-colors shadow-lg shadow-amber-400/5">
            <span className="font-mono text-base font-black text-amber-300 tracking-tighter">AF</span>
            <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider text-white group-hover:text-amber-200 transition-colors font-sans">
              {settings.company_name || 'AURA FORGE'}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-amber-400/80 uppercase">
              Stall Architecture & Fabrication
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin shortcut */}
          <Link
            href="/admin"
            className="px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-amber-300 hover:bg-white/5 border border-white/5 transition-all flex items-center gap-1.5"
            title="Access CMS Admin Panel"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Admin CMS</span>
          </Link>

          {/* Primary CTA */}
          <Link
            href="/#contact"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[76px] bg-[#09090e]/98 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl text-sm uppercase tracking-wider font-medium text-neutral-300 hover:text-amber-300 hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin CMS Dashboard</span>
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold text-xs tracking-wider uppercase text-center"
              >
                Start Your Project
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
