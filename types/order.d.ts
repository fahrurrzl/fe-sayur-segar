export type TOrderInput = {
  address: string;
};

export interface OrderResponse {
  id: string;
  orderId: string;
  invoiceId: string;
  paymentUrl: string;
  payment_method: "BANK_TRANSFER" | "EWALLET" | "QRIS" | string;
  status: "PENDING" | "PAID" | "FAILED" | "EXPIRED" | string;
  totalPrice: number;
  shippingFee: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  userId: string;

  items: OrderItem[];
  seller: Seller;
  user: User;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    imageUrl: string;
  };
}
