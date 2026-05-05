import { NextRequest, NextResponse } from "next/server";
import { updateUserName } from "@/lib/utopia";
import { requireAuth, requireOwnership, validateCSRF, UnauthorizedError, ForbiddenError, CSRFError } from "@/lib/auth";
import { sanitizeName, ValidationError } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const sessionUserId = await requireAuth(request);
    const sessionToken = request.cookies.get('session')?.value!;
    await validateCSRF(request, sessionToken);
    const { userId, name } = await request.json();

    if (!userId || !name) {
      return NextResponse.json({ error: "userId and name required" }, { status: 400 });
    }

    // Sanitize and validate name
    let sanitizedName: string;
    try {
      sanitizedName = sanitizeName(name);
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      throw error;
    }

    await requireOwnership(sessionUserId, userId);
    await updateUserName(userId, sanitizedName);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof CSRFError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Error updating name:", error);
    return NextResponse.json({ error: "Failed to update name" }, { status: 500 });
  }
}
