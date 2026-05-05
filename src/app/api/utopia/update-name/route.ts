import { NextRequest, NextResponse } from "next/server";
import { updateUserName } from "@/lib/utopia";
import { requireAuth, requireOwnership, UnauthorizedError, ForbiddenError } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const sessionUserId = await requireAuth(request);
    const { userId, name } = await request.json();

    if (!userId || !name) {
      return NextResponse.json({ error: "userId and name required" }, { status: 400 });
    }

    await requireOwnership(sessionUserId, userId);
    await updateUserName(userId, name);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Error updating name:", error);
    return NextResponse.json({ error: "Failed to update name" }, { status: 500 });
  }
}
