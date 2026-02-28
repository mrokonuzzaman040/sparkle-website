"use client";

import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { clientsSectionImage } from "@/lib/home-content";

const placeholderClients = [
  "Gov", "Corp", "NGO", "Local", "Event", "Partner",
];

export function HonorableClientsSection() {
  return (
    <section
      id="clients"
      className="relative border-b bg-background px-4 py-16 md:px-6 md:py-20 bg-mesh"
      aria-labelledby="clients-heading"
    >
      <SectionReveal className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Trusted by
          </p>
          <h2
            id="clients-heading"
            className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Honorable Clients & Contributors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We are proud to have served government bodies, local companies, and
            organizations across Bangladesh.
          </p>
        </div>
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-muted shadow-lg">
          <div className="relative aspect-[21/9] w-full min-h-[200px]">
            <Image
              src={clientsSectionImage}
              alt="Our clients and events"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-foreground/40" aria-hidden />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {placeholderClients.map((label) => (
            <div
              key={label}
              className="flex size-20 items-center justify-center rounded-xl border-2 border-primary/20 bg-muted/80 text-sm font-semibold text-primary shadow-sm backdrop-blur sm:size-24"
            >
              {label}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Replace with your client logos when ready
        </p>
      </SectionReveal>
    </section>
  );
}
