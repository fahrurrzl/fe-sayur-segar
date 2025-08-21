"use client";

import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import {
  FaCheckCircle,
  FaExternalLinkAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const OrderSuccess = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient p-8">
      <Card className="container mx-auto px-4 py-8 max-w-xl">
        <CardHeader className="flex justify-center items-center gap-2">
          <div className="space-y-3">
            <FaCheckCircle className="mx-auto w-16 h-16 text-success" />
            <h1 className="text-3xl font-bold text-foreground">
              Pesanan Berhasil!
            </h1>
          </div>
        </CardHeader>
        <CardBody className="max-w-4xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-foreground-500 max-w-md mx-auto">
                Terima kasih atas pembelian Anda. Pesanan telah berhasil
                diproses dan sedang dalam tahap persiapan.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              color="success"
              variant="bordered"
              startContent={<FaExternalLinkAlt className="h-4 w-4" />}
              onPress={() => router.push("/dashboard/my-order")}
            >
              Lihat Pesanan
            </Button>
            <Button
              className="text-white"
              color="success"
              startContent={<FaShoppingBag className="h-4 w-4" />}
              onPress={() => router.push("/")}
            >
              Lanjut Belanja
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderSuccess;
