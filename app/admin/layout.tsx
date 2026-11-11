import React, { Suspense } from 'react';
import AdminClientLayout from './AdminClientLayout';

// Opt the administrative dashboard route out of Next.js 16 instant-navigation validation
export const instant = false;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2EFE8] flex items-center justify-center font-mono text-sm text-[#C65D36]">Loading Jay Ganga Console...</div>}>
      <AdminClientLayout>{children}</AdminClientLayout>
    </Suspense>
  );
}
