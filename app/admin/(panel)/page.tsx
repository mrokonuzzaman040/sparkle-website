import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Calendar, ArrowRight } from "lucide-react";
import { getDb } from "@/lib/db";
import { collections } from "@/lib/db";

export default async function AdminDashboardPage() {
  const db = await getDb();
  const [blogCount, eventsCount, galleryCount] = await Promise.all([
    db.collection(collections.blog).countDocuments(),
    db.collection(collections.events).countDocuments(),
    db.collection(collections.gallery).countDocuments(),
  ]);

  const links = [
    { href: "/admin/blog", label: "Blog posts", count: blogCount, icon: FileText },
    { href: "/admin/events", label: "Events", count: eventsCount, icon: Calendar },
    { href: "/admin/gallery", label: "Gallery items", count: galleryCount, icon: Image },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Manage blog, events, and gallery content.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {links.map(({ href, label, count, icon: Icon }) => (
          <Card key={href}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">{label}</CardTitle>
              <Icon className="size-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{count}</p>
              <Button variant="outline" size="sm" className="mt-2" asChild>
                <Link href={href}>
                  Manage <ArrowRight className="ml-1 size-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
