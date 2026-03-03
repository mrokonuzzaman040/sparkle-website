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
import { getEvents, getGalleryForVideos } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [events, galleryItems] = await Promise.all([
    getEvents(),
    getGalleryForVideos(),
  ]);

  return (
    <>
      <main>
        <HeroSection />
        <SparkleTaglineSection />
        <WhatWeDoSection />
        <WhyUsSection />
        <EventsSection events={events} />
        <CommitmentsSection />
        <AnnouncementSection />
        <HonorableClientsSection />
        <ProgramVideosSection items={galleryItems} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
