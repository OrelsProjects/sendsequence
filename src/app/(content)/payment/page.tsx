"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import usePayments from "../../../lib/hooks/usePayments";
import {
  OnApproveData,
  PayPalCapture,
  PayPalSubscription,
  PayPalSubscriptionPlan,
} from "../../../models/payment";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import axios from "axios";
import Loading from "../../../components/ui/loading";

export default function PaymentPage() {
  const [error, setError] = React.useState<string | null>(null);
  const [plans, setPlans] = React.useState<PayPalSubscriptionPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = React.useState<boolean>(false);
  const { approveOrder, cancelOrder, createOrder, approveSubscription } =
    usePayments();

  const getPlans = async () => {
    if (loadingPlans) return;
    setLoadingPlans(true);
    try {
      const result = await axios.get<PayPalSubscription>(
        "/api/subscriptions/list",
      );
      const { data } = result;
      setPlans(data.plans);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingPlans(false);
      setError(null);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  const handleApproveOrder = async (
    data: OnApproveData,
    actions: any,
    orderData: PayPalCapture | null,
  ) => {
    if (data.subscriptionID) {
      await approveSubscription(data);
    } else {
      const errorDetail = orderData?.details?.[0];
      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail?.issue === "PAYER_CANNOT_PAY") {
        throw new Error("Payer cannot pay");
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      }
      // Handle successful order
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PayPalButtons
        style={{
          color: "gold",
          shape: "rect",
          layout: "vertical",
          label: "pay",
          height: 40,
        }}
        createSubscription={async (data, actions) => {
          return actions.subscription.create({
            plan_id: "P-4PY750167K1027154M3HPVYQ",
          });
        }}
        onApprove={async (data: OnApproveData, actions) => {
          setError(null);
          let orderData = null;
          if (!data.subscriptionID) {
            orderData = await approveOrder(data.orderID);
          }
          await handleApproveOrder(data, actions, orderData);
        }}
        // onError={(err: any) => {
        //   setError(err.message);
        // }}
        // onCancel={async data => {
        //   // if (data.orderID) {
        //   //   await cancelOrder(data.orderID as string);
        //   // }
        //   // setError(null);
        // }}
      />
      <div className="flex flex-col gap-5">
        <span className="text-xl text-destructive">{error}</span>
      </div>
      <Button asChild>
        <Link
          href={process.env.NEXT_PUBLIC_PAYPAL_CREATE_SUBSCRIPTION_URL || ""}
          target="_blank"
        >
          Create Subscription Plan
        </Link>
      </Button>
      <Button asChild>
        <Link
          href={process.env.NEXT_PUBLIC_PAYPAL_SEE_SUBSCRIPTIONS_URL || ""}
          target="_blank"
        >
          See Subscriptions
        </Link>
      </Button>
      <Button onClick={getPlans}>Get Plans</Button>
      <div className="flex flex-col gap-8 justify-center items-center">
        {loadingPlans ? (
          <Loading spinnerClassName="w-12 h-12" />
        ) : plans.length > 0 ? (
          plans.map((plan, index) => (
            <div key={index} className="flex flex-row gap-0.5">
              <span>{plan.name}: </span>
              <span>{plan.id}</span>
            </div>
          ))
        ) : (
          <div>No plans</div>
        )}
      </div>
    </div>
  );
}
