'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { useCMS } from '../../lib/data/useCMS';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = useCMS();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 bg-[#202522] text-[#FFFFFF] ${
        isScrolled
          ? 'py-3.5 border-b border-[#292B28] shadow-md'
          : 'py-5 border-b border-[#292B28]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-md bg-[#292B28] border border-[#777B70]/40 flex items-center justify-center">
            <span className="font-mono text-xs font-bold text-[#F2EFE8] tracking-tight">AF</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-wider text-[#FFFFFF] font-sans">
              {settings.company_name || 'AURA FORGE'}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#D6D1C5] uppercase">
              Exhibition Architecture
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-md text-xs uppercase tracking-wider font-medium text-[#D6D1C5] hover:text-[#FFFFFF] hover:bg-[#292B28] transition-colors"
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
            className="px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider text-[#D6D1C5] hover:text-[#FFFFFF] hover:bg-[#292B28] border border-[#777B70]/40 transition-colors flex items-center gap-1.5"
            title="Access CMS Admin Panel"
          >
            <Shield className="w-3.5 h-3.5 text-[#C65D36]" />
            <span className="hidden md:inline">Admin CMS</span>
          </Link>

          {/* Primary CTA — Solid Burnt Orange */}
          <Link
            href="/#contact"
            className="px-4 py-2 rounded-md bg-[#C65D36] text-[#FFFFFF] font-medium text-xs tracking-wider uppercase hover:bg-[#B34E28] transition-colors flex items-center gap-1.5"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md bg-[#292B28] border border-[#777B70]/40 text-[#D6D1C5] hover:text-[#FFFFFF]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#202522] border-b border-[#292B28] p-6 shadow-xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-md text-xs uppercase tracking-wider font-medium text-[#D6D1C5] hover:text-[#FFFFFF] hover:bg-[#292B28]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#777B70]/30 flex flex-col gap-2.5">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-md text-xs font-mono uppercase tracking-wider text-[#D6D1C5] bg-[#292B28] border border-[#777B70]/30 flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-[#C65D36]" />
                <span>Admin CMS Dashboard</span>
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-md bg-[#C65D36] text-[#FFFFFF] font-medium text-xs tracking-wider uppercase text-center"
              >
                Start Project
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
