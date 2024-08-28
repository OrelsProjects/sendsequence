"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import usePayments from "@/lib/hooks/usePayments";
import {
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
  const { approveOrder, cancelOrder, createOrder, createSubscription } =
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

  /* Write your own logic for handling errors */
  useEffect(() => {
    toast.error(error);
  }, [error]);

  const handleApproveOrder = async (
    data: any,
    actions: any,
    orderData: PayPalCapture,
  ) => {
    const errorDetail = orderData?.details?.[0];
    debugger;
    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
      return actions.restart();
    } else if (errorDetail?.issue === "PAYER_CANNOT_PAY") {
      throw new Error("Payer cannot pay");
    } else if (errorDetail) {
      throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
    } else {
      const transaction = orderData.purchase_units[0].payments.captures[0];
      console.log(
        "Capture result",
        orderData,
        JSON.stringify(orderData, null, 2),
      );
    }
  };

  const handleCreate = async () =>
    await createOrder("669935d4f30a2a6dacb06fdf", 10);

  const handleCreateSubscription = async () =>
    await createSubscription("669935d4f30a2a6dacb06fdf");

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
          // Create a one-time product (Recurring payment) -> Create a subscription plan -> Create a subscription
          return actions.subscription.create({
            plan_id: "P-4PY750167K1027154M3HPVYQ",
          });
        }}
        // createOrder={async () => {
        //   return await handleCreate();
        // }}
        onApprove={async (data, actions) => {
          debugger;
          alert("Order approved");
          setError(null);
          const orderData = await approveOrder(data.orderID);
          await handleApproveOrder(data, actions, orderData);
        }}
        onError={(err: any) => {
          debugger;
          setError(err.message);
        }}
        onCancel={async data => {
          debugger;
          setError(null);
          await cancelOrder(data.orderID as string);
        }}
      />

      {/* <GooglePayButton
        className="w-96 mb-1.5"
        environment="TEST"
        buttonColor="black"
        buttonType="buy"
        buttonRadius={9999}
        buttonSizeMode="fill"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "1.00",
            currencyCode: "USD",
            countryCode: "US",
          },
          callbackIntents: ["PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log("Success", paymentRequest);
        }}
        onPaymentAuthorized={paymentData => ({ transactionState: "SUCCESS" })}
      /> */}
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
