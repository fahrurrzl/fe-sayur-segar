export type TCart = {
  productId: string;
  quantity: number;
  price: number;
};

export type TCartItem = {
  cartId: string;
  createdAt: string; // ISO date string
  id: string;
  price: number;
  product: {
    imageUrl: string;
    name: string;
    seller: {
      id?: string;
      storeLocation: string;
      storeName: string;
      SellerPaymentMethod?: {
        id: string;
        paymentMethodId: string;
        [key: string]: any;
      }[];
    };
    stock: number;
  };
  productId: string;
  quantity: number;
  updatedAt: string; // ISO date string
};
