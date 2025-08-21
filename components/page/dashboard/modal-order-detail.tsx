import useOrder from "@/hooks/useOrder";
import { OrderResponse } from "@/types";
import { rupiahFormat } from "@/utils/rupiahFormat";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import Image from "next/image";
import { FiBox, FiCheck, FiClock, FiCreditCard, FiTruck } from "react-icons/fi";

const ModalOrderDetail = ({
  isOpen,
  onClose,
  order,
}: {
  isOpen: boolean;
  onClose: () => void;
  order: OrderResponse;
}) => {
  const {
    mutateIsProcessing,
    isPendingIsProcessing,
    mutateIsDelivered,
    isPendingIsDelivered,
    mutateIsCompleted,
    isPendingIsCompleted,
  } = useOrder();

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b border-b-foreground-300">
              Detail Pesanan #{order?.orderId}
            </ModalHeader>
            <ModalBody>
              <div>
                {/* Informasi Pelanggan */}
                <h2 className="my-3 font-semibold">Informasi Pelanggan</h2>
                <table className="w-md">
                  <tbody>
                    <tr>
                      <td className="font-semibold">Nama</td>
                      <td>:</td>
                      <td>{order?.user?.name}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Email</td>
                      <td>:</td>
                      <td>{order?.user?.email}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Phone</td>
                      <td>:</td>
                      <td>{order?.user?.phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                {/* Product item */}
                <h2 className="my-3 font-semibold">Produk yang Dipesan</h2>
                {order?.items?.map((item) => (
                  <Card shadow="sm" radius="sm" key={item.id}>
                    <CardBody>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="aspect-square object-cover rounded-sm"
                          />
                          <div>
                            <p className="font-semibold">{item.product.name}</p>
                            <p className="text-sm text-foreground-500">
                              {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">
                            {rupiahFormat(item.price)}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              <Divider className="my-2" />

              {/* Total */}
              <div className="flex justify-between">
                <p className="font-semibold">Ongkir</p>
                <p className="font-semibold">
                  {rupiahFormat(order?.shippingFee)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Total Harga</p>
                <p className="font-semibold">
                  {rupiahFormat(order?.totalPrice)}
                </p>
              </div>

              {/* Button Action */}
              <div>
                <h2 className="my-3 font-semibold">Update Status</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="bordered"
                    size="sm"
                    color={order?.status === "PENDING" ? "warning" : "default"}
                    startContent={<FiClock />}
                  >
                    Pending
                  </Button>
                  <Button
                    variant="bordered"
                    size="sm"
                    color={order?.status === "PAID" ? "success" : "default"}
                    startContent={<FiCreditCard />}
                  >
                    Paid
                  </Button>
                  <Button
                    disabled={order?.status === "PENDING"}
                    onPress={() => {
                      mutateIsProcessing(order?.id);
                    }}
                    variant="bordered"
                    size="sm"
                    color={
                      order?.status === "PROCESSING" ? "secondary" : "default"
                    }
                    startContent={<FiBox />}
                  >
                    Diproses
                  </Button>
                  <Button
                    disabled={order?.status === "PENDING"}
                    onPress={() => {
                      mutateIsDelivered(order?.id);
                    }}
                    variant="bordered"
                    size="sm"
                    color={
                      order?.status === "DELIVERED" ? "primary" : "default"
                    }
                    startContent={<FiTruck />}
                  >
                    Dikirim
                  </Button>
                  <Button
                    disabled={order?.status === "PENDING"}
                    onPress={() => {
                      mutateIsCompleted(order?.id);
                    }}
                    variant="bordered"
                    size="sm"
                    color={
                      order?.status === "COMPLETED" ? "success" : "default"
                    }
                    startContent={<FiCheck />}
                  >
                    Diterima
                  </Button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalOrderDetail;
