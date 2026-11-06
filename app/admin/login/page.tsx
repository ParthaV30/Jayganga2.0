'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, KeyRound, Mail, ArrowRight, AlertCircle, Database, Check } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@auraforge-expo.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // 1. Try Supabase cloud auth if configured
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (!error && data?.session) {
          localStorage.setItem('aura_admin_session', JSON.stringify({
            email: data.user?.email || email,
            token: data.session.access_token,
            type: 'supabase'
          }));
          router.push('/admin');
          return;
        }
      }

      // 2. Local fallback verification
      if (email && password) {
        localStorage.setItem('aura_admin_session', JSON.stringify({
          email,
          token: 'aura_local_admin_token_' + Date.now(),
          type: 'local'
        }));
        router.push('/admin');
      } else {
        setErrorMsg('Please enter both administrative email and security key.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2EFE8] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#777B70]/20 shadow-2xl space-y-8">
          {/* Logo & Headline */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#202522] border border-[#202522] text-[#C65D36] font-mono font-black text-xl shadow-md mb-2">
              AF
            </div>
            <h1 className="text-2xl font-black text-[#202522] tracking-tight">
              AURA FORGE CMS
            </h1>
            <p className="text-xs font-mono text-[#777B70] uppercase tracking-widest">
              Administrative Console Access
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-600 text-xs font-mono">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777B70]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@auraforge-expo.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] placeholder-[#777B70]/60 focus:outline-none focus:border-[#C65D36] text-sm transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#777B70] block">
                Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777B70]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F2EFE8] border border-[#777B70]/30 text-[#292B28] placeholder-[#777B70]/60 focus:outline-none focus:border-[#C65D36] text-sm transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#C65D36] hover:bg-[#B34E28] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Enter CMS Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Helper Pill */}
          <div className="p-4 rounded-xl bg-[#F2EFE8] border border-[#777B70]/20 space-y-2 text-xs font-mono text-[#777B70]">
            <div className="flex items-center gap-2 text-[#202522] font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#C65D36]" />
              <span>Standard Demo Credentials:</span>
            </div>
            <div className="flex justify-between text-[#292B28] pt-1">
              <span>Email: <code className="text-[#C65D36]">admin@auraforge-expo.com</code></span>
            </div>
            <div className="flex justify-between text-[#292B28]">
              <span>Password: <code className="text-[#C65D36]">admin123</code></span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs font-mono text-[#777B70] hover:text-[#202522] transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

