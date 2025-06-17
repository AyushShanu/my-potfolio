import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Suspense } from 'react';
import { PageLoader } from '@/components/ui/page-loader';
import  ExperienceSection  from '@/components/sections/ExperienceSection';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Suspense fallback={<PageLoader />}>
        <HeroSection />
         <AboutSection />
        <ProjectsSection /> 
        <ExperienceSection />
        <ContactSection />
      </Suspense>
    </main>
  );
}