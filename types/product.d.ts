export type TProductInput = {
  id?: string;
  name: string;
  price: number;
  stock: number;
  unitId: string;
  categoryId: string;
  description: string;
  imageUrl: string;
};

export type TProduct = Omit<TProductInput, "imageUrl"> & {
  id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  seller: {
    sellerId: string;
    storeLocation: string;
    storeName: string;
    userId: string;
  };
  Unit: {
    id: string;
    name: string;
    symbol: string;
  };
};

export type TProductResponse = TProduct;
