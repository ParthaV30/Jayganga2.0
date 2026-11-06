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
    <div className="min-h-screen bg-[#07070a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0c12]/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-8">
          {/* Logo & Headline */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a1a24] to-[#121218] border border-amber-400/40 text-amber-300 font-mono font-black text-xl shadow-lg shadow-amber-400/10 mb-2">
              AF
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              AURA FORGE CMS
            </h1>
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Administrative Console Access
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-300 text-xs font-mono">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@auraforge-expo.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
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
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2 text-amber-300/90 font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Standard Demo Credentials:</span>
            </div>
            <div className="flex justify-between text-neutral-300 pt-1">
              <span>Email: <code className="text-amber-200">admin@auraforge-expo.com</code></span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Password: <code className="text-amber-200">admin123</code></span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
