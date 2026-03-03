import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";

export const revalidate = 60;
import { collections } from "@/lib/db";
import type { BlogPost } from "@/lib/types";
import { SiteFooter } from "@/components/site-footer";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = await getDb();
  const post = await db
    .collection<BlogPost>(collections.blog)
    .findOne({ slug, published: true });
  if (!post) notFound();

  return (
    <>
      <main className="min-h-screen px-4 py-16 md:px-6">
        <article className="container mx-auto max-w-2xl">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Blog
          </Link>
          {post.coverImage && (
            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl bg-muted">
              <Image
                src={post.coverImage}
                alt=""
                fill
                className="object-cover"
                priority
                unoptimized={post.coverImage.startsWith("https://res.cloudinary.com")}
              />
            </div>
          )}
          <h1 className="mt-8 text-3xl font-bold">{post.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div
            className="prose prose-neutral mt-8 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
