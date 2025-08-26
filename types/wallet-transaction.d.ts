export interface IWalletTransaction {
  id?: string;
  amount: number;
  orderId?: string;
  paymentMethod: string;
  status: string;
  type: string;
  createdAt: string;
}
