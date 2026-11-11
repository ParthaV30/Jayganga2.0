import React from 'react';
import AdminClientLayout from './AdminClientLayout';

// Opt the administrative dashboard route out of Next.js 16 instant-navigation validation
export const instant = false;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}
