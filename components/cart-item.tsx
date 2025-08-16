import useCart from "@/hooks/useCart";
import { TCartItem } from "@/types";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";

interface PropTypes {
  item: TCartItem;
}

const CartItem = ({ item }: PropTypes) => {
  const {
    mutateDeleteItem,
    isPendingDeleteItem,
    mutateIncreaseQuantity,
    isPendingIncreaseQuantity,
    mutateDecreaseQuantity,
    isPendingDecreaseQuantity,
  } = useCart();

  return (
    <Card radius="sm" shadow="sm">
      <CardBody className="flex gap-3 justify-between flex-row">
        <div className="flex gap-2 items-center">
          <Image
            src={item?.product?.imageUrl}
            alt={item?.product?.name}
            width={80}
            height={80}
            className="aspect-square object-cover"
          />
          <div>
            <h3 className="font-medium">{item?.product?.name}</h3>
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
          <div className="flex items-center space-x-2">
            <Button
              isIconOnly
              variant="bordered"
              size="sm"
              disabled={isPendingDecreaseQuantity}
              isLoading={isPendingDecreaseQuantity}
              onPress={() => mutateDecreaseQuantity({ itemId: item?.id })}
            >
              <FaMinus className="w-3 h-3" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">
              {item?.quantity}
            </span>
            <Button
              isIconOnly
              variant="bordered"
              size="sm"
              disabled={isPendingIncreaseQuantity}
              isLoading={isPendingIncreaseQuantity}
              onPress={() => mutateIncreaseQuantity({ itemId: item?.id })}
            >
              <FaPlus className="w-3 h-3" />
            </Button>
          </div>
          <Button
            color="danger"
            isIconOnly
            size="md"
            variant="light"
            disabled={
              isPendingDeleteItem ||
              isPendingIncreaseQuantity ||
              isPendingDecreaseQuantity
            }
            isLoading={isPendingDeleteItem}
            onPress={() => mutateDeleteItem({ itemId: item?.id })}
          >
            <FaRegTrashAlt />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default CartItem;
