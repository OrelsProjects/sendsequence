import axios from "axios";
import { PayPalCapture } from "../../models/payment";

export default function usePayments() {
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

  return { approveOrder, cancelOrder, createOrder };
}
