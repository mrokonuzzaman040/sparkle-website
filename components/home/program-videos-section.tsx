"use client";

import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Play } from "lucide-react";

type VideoItem = { image: string };

export function ProgramVideosSection({ items }: { items: VideoItem[] }) {
  return (
    <section
      id="videos"
      className="relative border-b bg-muted/20 px-4 py-16 md:px-6 md:py-20 bg-grid-subtle"
      aria-labelledby="videos-heading"
    >
      <SectionReveal className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            See our work
          </p>
          <h2
            id="videos-heading"
            className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            Our Program Videos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Highlights from conferences, corporate programs, and events we have
            delivered.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.image + index}
              className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-lg transition-shadow hover:shadow-xl"
            >
              <Image
                src={item.image}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={item.image.startsWith("https://res.cloudinary.com")}
              />
              <div
                className="absolute inset-0 bg-foreground/30 transition-colors group-hover:bg-foreground/40"
                aria-hidden
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform group-hover:scale-110">
                  <Play className="size-8 fill-primary pl-1" />
                </div>
              </div>
              <p className="absolute bottom-3 left-3 right-3 text-center text-sm font-medium text-white drop-shadow-md">
                Gallery {index + 1}
              </p>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Managed from the admin gallery
          </p>
        )}
      </SectionReveal>
    </section>
  );
}
