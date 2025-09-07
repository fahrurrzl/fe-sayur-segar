import { useMemo } from "react";
import { Badge, Divider } from "@heroui/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { rupiahFormat } from "@/utils/rupiahFormat";
import CartItem from "./cart-item";

interface PropTypes {
  items: any[];
}

const Cart = ({ items }: PropTypes) => {
  const subTotal = useMemo(
    () => items?.reduce((total, item) => total + item.price, 0),
    [items]
  );
  // const ongkir = 5000;
  const total = subTotal;

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="py-2 text-success flex items-center gap-2">
          <MdOutlineShoppingCart size={24} />
          <p className="text-slate-800 dark:text-slate-200 font-semibold text-lg mr-2">
            Keranjang Belanja
          </p>
          <Badge
            content={items?.length}
            size="lg"
            className="bg-success text-white"
          >
            <span className="sr-only">unread messages</span>
          </Badge>
        </div>
      </div>
      {items?.length ? (
        <div className="flex flex-col justify-between">
          <div className="overflow-y-auto space-y-2 p-2">
            {items?.map((item: any, index: number) => (
              <CartItem key={index} item={item} />
            ))}
          </div>

          <div className="h-[calc(100vh-100%)] space-y-2">
            <Divider />

            <div className="flex justify-between items-center">
              <p className="text-slate-600 dark:text-slate-200">Subtotal</p>
              <p className="text-slate-600 dark:text-slate-200">
                {rupiahFormat(subTotal)}
              </p>
            </div>
            {/* <div className="flex justify-between items-center mt-2">
                    <p className="text-slate-600">Ongkos Kirim</p>
                    <p className="text-slate-600">{rupiahFormat(ongkir)}</p>
                  </div> */}

            <Divider />
            <div className="flex justify-between items-center mt-2">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Total
              </p>
              <p className="font-semibold text-lg text-success">
                {rupiahFormat(total)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center">Keranjang belanja masih kosong</p>
        </div>
      )}
    </>
  );
};
export default Cart;
