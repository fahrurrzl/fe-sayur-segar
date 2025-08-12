"use client";

import useProfile from "@/hooks/useProfile";
import { Button } from "@heroui/button";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaStore, FaUser } from "react-icons/fa";
import { FiCreditCard, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Seller = () => {
  const router = useRouter();
  const { dataUser } = useProfile();

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-xl flex items-center gap-2">
            <FaStore className="h-5 w-5 text-emerald-600" />
            Informasi Lapak
          </h2>
          <p className="text-gray-600 text-sm">
            Perbarui informasi lapak Anda di sini
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={() => {}} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Informasi Dasar
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <Input
                    name="storeName"
                    onChange={() => {}}
                    label="Nama Lapak"
                    placeholder="Masukkan nama lapak"
                    startContent={<FaStore className="h-4 w-4 text-gray-400" />}
                    isRequired
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Informasi Kontak
                </h3>
                <div className="space-y-4">
                  <Input
                    name="bankName"
                    type="text"
                    onChange={() => {}}
                    label="Nama Bank"
                    placeholder="Masukkan nama bank"
                    startContent={
                      <FiCreditCard className="h-4 w-4 text-gray-400" />
                    }
                  />

                  <Input
                    name="bankAccount"
                    type="text"
                    onChange={() => {}}
                    label="Nomor Rekening"
                    placeholder="Masukkan nomor rekening"
                    startContent={
                      <FiCreditCard className="h-4 w-4 text-gray-400" />
                    }
                  />

                  <Textarea
                    name="storeLocation"
                    onChange={() => {}}
                    label="Lokasi Lapak"
                    placeholder="Masukkan lokasi lapak"
                    minRows={3}
                    startContent={
                      <FiMapPin className="h-4 w-4 text-gray-400" />
                    }
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="bordered"
                className="flex-1"
                onPress={() => router.back()}
              >
                Batal
              </Button>
              <Button
                type="submit"
                color="success"
                className="flex-1 text-white"
              >
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Seller;
