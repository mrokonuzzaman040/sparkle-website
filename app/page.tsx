import {
  HeroSection,
  SparkleTaglineSection,
  WhatWeDoSection,
  WhyUsSection,
  EventsSection,
  CommitmentsSection,
  AnnouncementSection,
  HonorableClientsSection,
  ProgramVideosSection,
  ContactSection,
} from "@/components/home";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <SparkleTaglineSection />
        <WhatWeDoSection />
        <WhyUsSection />
        <EventsSection />
        <CommitmentsSection />
        <AnnouncementSection />
        <HonorableClientsSection />
        <ProgramVideosSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
