import useOrder from "@/hooks/useOrder";
import { OrderResponse } from "@/types";
import { rupiahFormat } from "@/utils/rupiahFormat";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FiBox, FiCheck, FiClock, FiCreditCard, FiTruck } from "react-icons/fi";

const ModalOrderDetail = ({
  isOpen,
  onClose,
  order,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  order: OrderResponse;
  type: "user" | "seller";
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
    <Modal
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
      scrollBehavior="outside"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between gap-1 border-b border-b-foreground-300 pr-10">
              <p>Detail Pesanan #{order?.orderId}</p>
              <Chip
                variant="shadow"
                color={
                  order?.status === "PENDING"
                    ? "warning"
                    : order?.status === "PAID"
                      ? "success"
                      : order?.status === "FAILED"
                        ? "danger"
                        : order?.status === "PROCESSING"
                          ? "secondary"
                          : order?.status === "DELIVERED"
                            ? "primary"
                            : order?.status === "COMPLETED"
                              ? "default"
                              : "danger"
                }
              >
                {order?.status === "PENDING" && "Pending"}
                {order?.status === "PAID" && "Dibayar"}
                {order?.status === "FAILED" && "Gagal"}
                {order?.status === "PROCESSING" && "Diproses"}
                {order?.status === "DELIVERED" && "Dikirim"}
                {order?.status === "COMPLETED" && "Diterima"}
              </Chip>
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
                <div className="flex items-center justify-between">
                  <h2 className="my-3 font-semibold">Produk yang Dipesan</h2>
                  {order.status === "PENDING" && type === "user" ? (
                    <Button
                      color="primary"
                      size="sm"
                      startContent={<FiCreditCard />}
                      as={Link}
                      target="_blank"
                      href={`${order?.paymentUrl}`}
                    >
                      Bayar
                    </Button>
                  ) : null}
                </div>
                {order?.items?.map((item) => (
                  <Card shadow="sm" radius="sm" key={item.id} className="mb-2">
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
              {type === "seller" ? (
                <div>
                  <h2 className="my-3 font-semibold">Update Status</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="bordered"
                      size="sm"
                      color={
                        order?.status === "PENDING" ? "warning" : "default"
                      }
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
                      startContent={!isPendingIsProcessing ? <FiBox /> : null}
                      isLoading={isPendingIsProcessing}
                      isDisabled={isPendingIsProcessing}
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
                      startContent={!isPendingIsDelivered ? <FiTruck /> : null}
                      isLoading={isPendingIsDelivered}
                      isDisabled={isPendingIsDelivered}
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
                      startContent={!isPendingIsCompleted ? <FiCheck /> : null}
                      isLoading={isPendingIsCompleted}
                      isDisabled={isPendingIsCompleted}
                    >
                      Diterima
                    </Button>
                  </div>
                </div>
              ) : null}
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
