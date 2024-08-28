import { NextResponse } from "next/server";
import prisma from "@/app/api/_db/db";
import Logger from "@/loggerServer";
import { PayPalEventResponse } from "../../../models/payment";

export async function handleSubscriptionCreated(event: PayPalEventResponse) {
  try {
    const existingSubscription = await prisma.subscription.findFirst({
      where: { subscriptionId: event.resource.id },
    });

    if (existingSubscription) {
      return NextResponse.json(
        { message: "Subscription already exists", existingSubscription },
        { status: 200 },
      );
    }

    const subscription = await prisma.subscription.create({
      data: {
        planId: event.resource.plan_id,
        subscriptionId: event.resource.id,
        startDate: new Date(event.resource.start_time),
        status: event.resource.status,
      },
    });
    return NextResponse.json(
      { message: "Subscription created successfully", subscription },
      { status: 200 },
    );
  } catch (error) {
    Logger.error("Error handling subscription created", "system-webhook", {
      data: { error },
    });
    return NextResponse.json(
      { error: "Failed to handle subscription created" },
      { status: 500 },
    );
  }
}
