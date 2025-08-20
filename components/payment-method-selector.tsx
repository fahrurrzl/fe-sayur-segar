import { RadioGroup } from "@heroui/react";
import { FiTruck } from "react-icons/fi";
import { useState, useMemo } from "react";
import { CustomRadio } from "./custom-radio";

// Contoh props: cartItems diambil dari backend
// cartItems: [{ seller: { SellerPaymentMethod: [...] }}, ...]
export default function PaymentMethodSelector({
  cartItems,
}: {
  cartItems: any;
}) {
  const [selected, setSelected] = useState("");

  // Cari hanya metode pembayaran yang ada di semua seller
  const commonPaymentMethods = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return [];

    // ambil payment method IDs dari seller pertama sebagai acuan
    let methodIds =
      cartItems[0]?.seller?.SellerPaymentMethod?.map(
        (m: any) => m.paymentMethodId
      ) || [];

    // reduce ke seller berikutnya -> cari irisan payment method IDs
    for (let i = 1; i < cartItems.length; i++) {
      const sellerMethodIds =
        cartItems[i]?.seller?.SellerPaymentMethod?.map(
          (m: any) => m.paymentMethodId
        ) || [];

      methodIds = methodIds.filter((methodId: string) =>
        sellerMethodIds.includes(methodId)
      );
    }

    return methodIds;
  }, [cartItems]);

  // Helper function untuk mengecek apakah metode pembayaran tersedia
  // Untuk sementara, kita akan menampilkan semua payment method yang tersedia
  const hasAnyPaymentMethod = () => {
    return commonPaymentMethods.length > 0;
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Pilih Metode Pembayaran</h2>

      {hasAnyPaymentMethod() ? (
        <RadioGroup value={selected} onValueChange={setSelected}>
          {/* Menampilkan semua metode pembayaran yang tersedia */}
          <CustomRadio description="Bayar di Tempat (COD)" value="COD">
            <div className="flex items-center gap-2">
              <p>COD</p>
              <FiTruck className="w-5 h-5 text-success mr-2" />
            </div>
          </CustomRadio>

          <CustomRadio description="Transfer Bank" value="BANK">
            Transfer Bank
          </CustomRadio>

          <CustomRadio description="E-Wallet" value="E_WALLET">
            E-Wallet
          </CustomRadio>
        </RadioGroup>
      ) : (
        <div className="p-3 rounded-md bg-warning/20 text-warning">
          ⚠️ Metode pembayaran tidak tersedia untuk semua penjual. Silakan
          checkout terpisah per toko.
        </div>
      )}
    </div>
  );
}
