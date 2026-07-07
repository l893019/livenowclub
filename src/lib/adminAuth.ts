import { NextRequest, NextResponse } from "next/server";

// Same scheme as /api/admin/dashboard: Authorization: Bearer <ADMIN_API_KEY>.
// If ADMIN_API_KEY is unset, everything is denied.
export function requireAdmin(request: NextRequest): NextResponse | null {
  const authHeader = request.headers.get("authorization");
  const expectedAuth = process.env.ADMIN_API_KEY;

  if (!expectedAuth || authHeader !== `Bearer ${expectedAuth}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
