import { NextRequest, NextResponse } from "next/server";
import Logger from "@/loggerServer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { captureOrder, createOrder } from "@/app/api/_utils/payments";
import prisma from "@/app/api/_db/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { orderId } = params;

    const captureResponse: { id: string; status: string } =
      await captureOrder(orderId);

    await prisma.userOrders.update({
      where: {
        orderId,
      },
      data: {
        status: captureResponse.status,
      },
    });

    // RUN YOUR LOGIC HERE TO ADD THE ORDER TO YOUR DATABASE. MAYBE TOKENS OR SOMETHING.

    return NextResponse.json(captureResponse, { status: 200 });
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
