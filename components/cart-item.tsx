import { Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";

const CartItem = () => {
  return (
    <Card radius="sm" shadow="sm">
      <CardBody className="flex gap-3 justify-between flex-row">
        <div className="flex gap-2 items-center">
          <Image
            src="/images/logo.png"
            alt="product image"
            width={80}
            height={80}
            className="aspect-square object-cover"
          />
          <div>
            <h3 className="font-medium">Sayur Segar</h3>
            <p className="text-xs text-foreground-500">Pak Budi</p>
            <p className="font-medium text-success">Rp. 5.000 / kg</p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          {/* Counter */}
          <div className="flex items-center space-x-2">
            <Button isIconOnly variant="bordered" size="sm" onPress={() => {}}>
              <FaMinus className="w-3 h-3" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">{3}</span>
            <Button isIconOnly variant="bordered" size="sm" onPress={() => {}}>
              <FaPlus className="w-3 h-3" />
            </Button>
          </div>
          <Button color="danger" isIconOnly size="md" variant="light">
            <FaRegTrashAlt />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default CartItem;
