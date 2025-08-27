export interface IWalletTransaction {
  id?: string;
  amount: number;
  orderId?: string;
  paymentMethod: string;
  status: string;
  type: string;
  createdAt: string;
  wallet: {
    seller: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      storeName: string;
      storeLocation: string;
      user: {
        name: string;
      };
    };
  };
}
