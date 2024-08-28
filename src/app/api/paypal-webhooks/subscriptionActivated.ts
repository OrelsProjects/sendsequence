import { NextResponse } from "next/server";
import prisma from "@/app/api/_db/db";
import Logger from "@/loggerServer";
import { PayPalEventResponse } from "../../../models/payment";
import { handleSubscriptionCreated } from "./subscriptionCreated";

export async function handleSubscriptionActivated(event: PayPalEventResponse) {
  const { email_address } = event.resource.subscriber;
  const user = await prisma.appUser.findFirst({
    where: { email: email_address },
  });

  if (!user) {
    Logger.error("User not found", "system-webhook", {
      data: { email_address },
    });
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingSubscription = await prisma.subscription.findFirst({
    where: { subscriptionId: event.resource.id },
  });

  if (!existingSubscription) {
    await handleSubscriptionCreated(event);
  }

  try {
    const subscriptionUpdate = await prisma.subscription.update({
      where: { subscriptionId: event.resource.id },
      data: {
        userId: user.id,
        status: "active", // Update status to active
        nextBillingDate: new Date(
          event.resource.billing_info.next_billing_time,
        ),
        lastPaymentDate: new Date(), // Initialize assuming payment is processed immediately
        lastPaymentAmount: parseFloat(
          event.resource.billing_info.last_payment.amount.value,
        ),
      },
    });
    return NextResponse.json(
      { message: "Subscription activated successfully", subscriptionUpdate },
      { status: 200 },
    );
  } catch (error) {
    Logger.error("Error handling subscription activated", "system-webhook", {
      data: { error },
    });
    return NextResponse.json(
      { error: "Failed to handle subscription activated" },
      { status: 500 },
    );
  }
}
