import { NextRequest, NextResponse } from "next/server";
import Logger from "@/loggerServer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { createSubscriptionPlan } from "../../_utils/payments";
import { CreateSubscriptionPlan } from "../../../../models/payment";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { item }: { item: CreateSubscriptionPlan } = await req.json();

    const subscriptionItem: { id: string; status: string } =
      await createSubscriptionPlan(item);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    Logger.error("Error sending notification", session.user.userId, {
      data: { error },
    });
    return NextResponse.json(
      { error: "Error sending notification" },
      { status: 500 },
    );
  }
}
