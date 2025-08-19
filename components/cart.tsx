import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";
import { Badge, Button, Divider } from "@heroui/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartItem from "./cart-item";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { useRouter } from "next/navigation";
import useProfile from "@/hooks/useProfile";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  items: any[];
}

const Cart = ({ isOpen, onOpenChange, items }: PropTypes) => {
  const router = useRouter();
  const { dataUser } = useProfile();
  const subTotal = items?.reduce((total, item) => total + item.price, 0);
  // const ongkir = 5000;
  const total = subTotal;

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              <div className="py-2 text-success flex items-center gap-2">
                <MdOutlineShoppingCart size={24} />
                <p className="text-slate-800 font-semibold text-lg mr-2">
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
            </DrawerHeader>
            {items?.length ? (
              <DrawerBody className="flex flex-col justify-between">
                <div className="overflow-y-auto space-y-4 p-2">
                  {items?.map((item: any, index: number) => (
                    <CartItem key={index} item={item} />
                  ))}
                </div>

                <div className="h-[calc(100vh-100%)] space-y-2">
                  <Divider />

                  <div className="flex justify-between items-center">
                    <p className="text-slate-600">Subtotal</p>
                    <p className="text-slate-600">{rupiahFormat(subTotal)}</p>
                  </div>
                  {/* <div className="flex justify-between items-center mt-2">
                    <p className="text-slate-600">Ongkos Kirim</p>
                    <p className="text-slate-600">{rupiahFormat(ongkir)}</p>
                  </div> */}

                  <Divider />
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-semibold text-slate-800">Total</p>
                    <p className="font-semibold text-lg text-success">
                      {rupiahFormat(total)}
                    </p>
                  </div>
                </div>
              </DrawerBody>
            ) : (
              <DrawerBody>
                <p className="text-center">Keranjang belanja masih kosong</p>
              </DrawerBody>
            )}
            {items?.length ? (
              <DrawerFooter>
                <Button
                  color="success"
                  className="w-full text-white"
                  onPress={() => {
                    router.push(`/checkout/${dataUser?.id}`);
                    onClose();
                  }}
                >
                  Lanjut ke Pembayaran
                </Button>
                <Button
                  onPress={onClose}
                  variant="bordered"
                  className="flex lg:hidden"
                >
                  Cancel
                </Button>
              </DrawerFooter>
            ) : null}
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
export default Cart;
