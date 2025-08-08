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

interface PropTypes {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const Cart = ({ isOpen, onOpenChange }: PropTypes) => {
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
                <Badge content={3} size="lg" className="bg-success text-white">
                  <span className="sr-only">unread messages</span>
                </Badge>
              </div>
            </DrawerHeader>
            <DrawerBody className="flex flex-col justify-between">
              <div className="overflow-y-auto space-y-4 p-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <CartItem key={index} />
                ))}
              </div>

              <div className="h-[calc(100vh-100%)] space-y-2">
                <Divider />

                <div className="flex justify-between items-center">
                  <p className="text-slate-600">Subtotal</p>
                  <p className="text-slate-600">Rp. 15.000</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-slate-600">Ongkos Kirim</p>
                  <p className="text-slate-600">Rp. 5.000</p>
                </div>

                <Divider />
                <div className="flex justify-between items-center mt-2">
                  <p className="font-semibold text-slate-800">Total</p>
                  <p className="font-semibold text-lg text-success">
                    Rp. 20.000
                  </p>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button
                color="success"
                className="w-full text-white"
                onPress={onClose}
              >
                Lanjut ke Pembayaran
              </Button>
              <Button onPress={onClose} variant="bordered">
                Cancel
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
export default Cart;
