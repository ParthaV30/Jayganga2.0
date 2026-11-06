'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SmoothScroll from '../../components/layout/SmoothScroll';
import ContactSection from '../../components/sections/ContactSection';
import { useCMS } from '../../lib/data/useCMS';
import { Sparkles, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const { settings, homepage } = useCMS();

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#07070a] text-white">
        <Navbar />

        <main className="pt-24">
          <ContactSection settings={settings} content={homepage} />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

