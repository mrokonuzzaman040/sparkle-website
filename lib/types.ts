import { ObjectId } from "mongodb";

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id?: ObjectId;
  name: string;
  image: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  _id?: ObjectId;
  title: string;
  image: string;
  caption?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
