"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import usePayments from "@/lib/hooks/usePayments";
import { PayPalCapture } from "../../../models/payment";

export default function PaymentPage() {
  const [error, setError] = React.useState<string | null>(null);
  const { approveOrder, cancelOrder, createOrder } = usePayments();

  const handleApproveOrder = async (
    data: any,
    actions: any,
    orderData: PayPalCapture,
  ) => {
    const errorDetail = orderData?.details?.[0];

    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
      return actions.restart();
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

  return (
    <div className="flex flex-col gap-5">
      <PayPalButtons
        style={{
          color: "gold",
          shape: "pill",
          layout: "vertical",
          label: "pay",
          height: 40,
        }}
        createOrder={async () => {
          return handleCreate();
        }}
        onApprove={async (data, actions) => {
          const orderData = await approveOrder(data.orderID);
          await handleApproveOrder(data, actions, orderData);
        }}
        onError={(err: any) => {
          setError(err.toString());
        }}
        onCancel={async data => {
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
    </div>
  );
}
