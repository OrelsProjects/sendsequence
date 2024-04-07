import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<void> {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}