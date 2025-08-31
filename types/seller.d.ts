export type TSeller = {
  id?: string;
  storeName: string;
  storeLocation: string;
  description?: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  verified?: boolean;
  user?: {
    name: string;
    email: string;
    imageUrl?: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
    username?: string;
    address?: string;
  };
};
