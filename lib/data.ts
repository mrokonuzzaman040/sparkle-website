import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";
import type { Event } from "@/lib/types";
import type { GalleryItem as GalleryDoc } from "@/lib/types";
import { events as staticEvents, programVideoThumbnails } from "@/lib/home-content";

export type EventItem = { name: string; image: string };
export type GalleryDisplayItem = { image: string; title?: string; caption?: string };

export async function getEvents(): Promise<EventItem[]> {
  try {
    const db = await getDb();
    const list = await db
      .collection<Event>(collections.events)
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    if (list.length === 0) return [...staticEvents];
    return list.map((e) => ({ name: e.name, image: e.image }));
  } catch {
    return [...staticEvents];
  }
}

export async function getGalleryForVideos(): Promise<{ image: string }[]> {
  try {
    const db = await getDb();
    const list = await db
      .collection<GalleryDoc>(collections.gallery)
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    if (list.length === 0) {
      return programVideoThumbnails.map((src) => ({ image: src }));
    }
    return list.map((item) => ({ image: item.image }));
  } catch {
    return programVideoThumbnails.map((src) => ({ image: src }));
  }
}
