"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import React from "react";

export default function PaymentPage() {
  return (
    //       <GooglePayButton
    //   className="w-96 mb-1.5"
    //   environment="TEST"
    //   buttonColor="black"
    //   buttonType="buy"
    //   buttonRadius={9999}
    //   buttonSizeMode="fill"
    //   paymentRequest={{
    //     apiVersion: 2,
    //     apiVersionMinor: 0,
    //     allowedPaymentMethods: [
    //       {
    //         type: "CARD",
    //         parameters: {
    //           allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    //           allowedCardNetworks: ["MASTERCARD", "VISA"],
    //         },
    //         tokenizationSpecification: {
    //           type: "PAYMENT_GATEWAY",
    //           parameters: {
    //             gateway: "example",
    //             gatewayMerchantId: "exampleGatewayMerchantId",
    //           },
    //         },
    //       },
    //     ],
    //     merchantInfo: {
    //       merchantId: "12345678901234567890",
    //       merchantName: "Demo Merchant",
    //     },
    //     transactionInfo: {
    //       totalPriceStatus: "FINAL",
    //       totalPriceLabel: "Total",
    //       totalPrice: "1.00",
    //       currencyCode: "USD",
    //       countryCode: "US",
    //     },
    //     callbackIntents: ["PAYMENT_AUTHORIZATION"],
    //   }}
    //   onLoadPaymentData={paymentRequest => {
    //     console.log("Success", paymentRequest);
    //   }}
    //   onPaymentAuthorized={paymentData => ({ transactionState: "SUCCESS" })}
    // />
    <PayPalButtons
      style={{
        color: "gold",
        shape: "pill",
        layout: "vertical",
        label: "pay",
        height: 40,
      }}
      createOrder={async (data, actions) => {
        try {
          const result = await axios.post("/api/order", {
            cart: {
              itemId: "669935d4f30a2a6dacb06fdf",
              amount: "10",
            },
          });
          const orderData = result.data;
          debugger;

          if (orderData.id) {
            return orderData.id;
          } else {
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);

            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error(error);
          debugger;
        }
      }}
      onApprove={async (data, actions) => {
        try {
          const response = await fetch(`/api/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const orderData = await response.json();
          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you message

          const errorDetail = orderData?.details?.[0];

          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          } else if (errorDetail) {
            // (2) Other non-recoverable errors -> Show a failure message
            throw new Error(
              `${errorDetail.description} (${orderData.debug_id})`,
            );
          } else {
            // (3) Successful transaction -> Show confirmation or thank you message
            // Or go to another URL:  actions.redirect('thank_you.html');
            const transaction =
              orderData.purchase_units[0].payments.captures[0];
            console.log(
              "Capture result",
              orderData,
              JSON.stringify(orderData, null, 2),
            );
          }
        } catch (error) {
          console.error(error);
        }
      }}
      onError={(err: any) => {
        debugger;
        console.log("onError", err);
      }}
      onClick={(data, actions) => {
        data;
      }}
      onCancel={async (data, actions) => {
        debugger;
        await axios.post(`/api/orders/${data.orderID}/cancel`, {});
      }}
      onInit={(data, actions) => {
        debugger;
        console.log("onInit", data, actions);
      }}
    />
  );
}
