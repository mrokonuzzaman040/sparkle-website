import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = body.password ?? "";
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected) {
    return NextResponse.json(
      { error: "Admin not configured" },
      { status: 500 }
    );
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
