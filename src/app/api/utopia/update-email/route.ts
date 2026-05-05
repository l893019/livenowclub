import { NextRequest, NextResponse } from "next/server";
import { updateUserEmail } from "@/lib/utopia";
import { requireAuth, requireOwnership, UnauthorizedError, ForbiddenError } from "@/lib/auth";
import { checkRateLimit, RateLimitError } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    const sessionUserId = await requireAuth(request);
    await checkRateLimit('user', sessionUserId, 'update-email', 3, 86400);

    const { userId, email } = await request.json();
    if (!userId || !email) {
      return NextResponse.json({ error: "userId and email required" }, { status: 400 });
    }

    await requireOwnership(sessionUserId, userId);
    await updateUserEmail(userId, email);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    if (error instanceof RateLimitError) {
      return NextResponse.json({ error: error.message }, { status: 429 });
    }
    console.error("Error updating email:", error);
    return NextResponse.json({ error: "Failed to update email" }, { status: 500 });
  }
}
