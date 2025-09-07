import useCart from "@/hooks/useCart";
import { TCartItem } from "@/types/cart";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";

interface PropTypes {
  item: TCartItem;
  isCheckout?: boolean;
}

const CartItem = ({ item, isCheckout = false }: PropTypes) => {
  const {
    mutateDeleteItem,
    isPendingDeleteItem,
    mutateIncreaseQuantity,
    isPendingIncreaseQuantity,
    mutateDecreaseQuantity,
    isPendingDecreaseQuantity,
  } = useCart();

  return (
    <Card radius="sm" shadow="sm" className="w-full">
      <CardBody className="flex gap-3 justify-between flex-row">
        <div className="flex gap-2 items-center">
          <Image
            src={item?.product?.imageUrl}
            alt={item?.product?.name}
            width={50}
            height={50}
            className="aspect-square object-cover rounded-sm"
          />
          <div>
            <h3 className="font-medium text-sm">{item?.product?.name}</h3>
            <p className="text-xs text-foreground-500">
              {item?.product?.seller?.storeName}
            </p>
            <p className="font-medium text-success">
              {rupiahFormat(item?.price)} / kg
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          {/* Counter */}
          {!isCheckout ? (
            <>
              <div className="flex items-center space-x-2">
                <button
                  className="shrink-0 border border-gray-500 rounded-sm w-5 h-5 flex items-center justify-center cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-500"
                  disabled={isPendingDecreaseQuantity}
                  onClick={() => mutateDecreaseQuantity({ itemId: item?.id })}
                >
                  <FaMinus className="w-2 h-2" />
                </button>
                <span className="text-sm font-medium w-8 text-center">
                  {item?.quantity}
                </span>
                <button
                  className="shrink-0 border border-gray-500 rounded-sm w-5 h-5 flex items-center justify-center cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-500"
                  disabled={isPendingIncreaseQuantity}
                  onClick={() => mutateIncreaseQuantity({ itemId: item?.id })}
                >
                  <FaPlus className="w-2 h-2" />
                </button>
              </div>

              <button
                disabled={
                  isPendingDeleteItem ||
                  isPendingIncreaseQuantity ||
                  isPendingDecreaseQuantity
                }
                onClick={() => mutateDeleteItem({ itemId: item?.id })}
                className="shrink-0 text-danger w-5 h-5 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:text-danger-300"
              >
                <FaRegTrashAlt />
              </button>
            </>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
};
export default CartItem;
