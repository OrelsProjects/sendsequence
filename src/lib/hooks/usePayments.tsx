import axios from "axios";
import { CreateSubscriptionPlan, PayPalCapture } from "../../models/payment";

export default function usePayments() {
  // api/subscription/create
  const createSubscriptionPlan = async (item: CreateSubscriptionPlan) => {
    try {
      const result = await axios.post("/api/subscription/create", {
        item,
      });
      const subscriptionData = result.data;

      if (subscriptionData.id) {
        return subscriptionData.id;
      } else {
        const errorDetail = subscriptionData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${subscriptionData.debug_id})`
          : JSON.stringify(subscriptionData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createSubscription = async (itemId: string) => {
    try {
      const result = await axios.post("/api/subscription", {
        cart: {
          itemId,
        },
      });
      const subscriptionData = result.data;

      if (subscriptionData.id) {
        return subscriptionData.id;
      } else {
        const errorDetail = subscriptionData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${subscriptionData.debug_id})`
          : JSON.stringify(subscriptionData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createOrder = async (itemId: string, amount: number) => {
    try {
      const result = await axios.post("/api/order", {
        cart: {
          itemId,
          amount,
        },
      });
      const orderData = result.data;

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
      console.log(error);
      console.error(error);
    }
  };

  const approveOrder = async (orderId: string): Promise<PayPalCapture> => {
    try {
      const response = await axios.post<PayPalCapture>(
        `/api/orders/${orderId}/capture`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const cancelOrder = async (orderId: string) => {
    await axios.post(`/api/orders/${orderId}/cancel`);
  };

  return {
    approveOrder,
    cancelOrder,
    createOrder,
    createSubscription,
    createSubscriptionPlan,
  };
}
