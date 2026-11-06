'use client';

import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SmoothScroll from '../components/layout/SmoothScroll';
import HeroSection from '../components/sections/HeroSection';
import StorySection from '../components/sections/StorySection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import WhyUsSection from '../components/sections/WhyUsSection';
import ProcessSection from '../components/sections/ProcessSection';
import BlogSection from '../components/sections/BlogSection';
import ContactSection from '../components/sections/ContactSection';
import { useCMS } from '../lib/data/useCMS';

export default function HomePage() {
  const { settings, homepage, services, projects, blogs } = useCMS();
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  const handleEnquireProject = (projectTitle: string) => {
    setSelectedService(`Project: ${projectTitle}`);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#07070a] text-white selection:bg-amber-400 selection:text-black">
        {/* Architectural Sticky Navigation Header */}
        <Navbar />

        <main>
          {/* SECTION 1 — CINEMATIC HERO */}
          <HeroSection content={homepage} />

          {/* SECTION 2 — 3D STALL FABRICATION STORY (SIGNATURE EXPERIENCE) */}
          <StorySection content={homepage} />

          {/* SECTION 3 — ABOUT US */}
          <AboutSection content={homepage} />

          {/* SECTION 4 — SERVICES */}
          <ServicesSection 
            services={services} 
            content={homepage} 
            onSelectService={handleSelectService} 
          />

          {/* SECTION 5 — FEATURED PROJECTS */}
          <ProjectsSection 
            projects={projects} 
            content={homepage} 
            onEnquireProject={handleEnquireProject} 
          />

          {/* SECTION 6 — WHY CHOOSE US */}
          <WhyUsSection content={homepage} />

          {/* SECTION 7 — OUR PROCESS */}
          <ProcessSection content={homepage} />

          {/* SECTION 8 — BLOG */}
          <BlogSection blogs={blogs} content={homepage} />

          {/* SECTION 9 — CONTACT */}
          <ContactSection 
            settings={settings} 
            content={homepage} 
            preselectedService={selectedService} 
          />
        </main>

        {/* Global Architectural Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
