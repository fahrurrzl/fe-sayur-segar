"use client";

import React from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { FaKey, FaUserShield } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Security = () => {
  const router = useRouter();

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-xl flex items-center gap-2">
            <FaUserShield className="h-5 w-5 text-emerald-600" />
            Keamanan
          </h2>
          <p className="text-gray-600 text-sm">
            Perbarui kata sandi Anda di sini
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={() => {}} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <div className="grid grid-cols-1 gap-6">
                  <Input
                    name="oldPassword"
                    onChange={() => {}}
                    label="Kata Sandi Lama"
                    placeholder="Masukkan kata sandi lama"
                    startContent={<FaKey className="h-4 w-4 text-gray-400" />}
                    isRequired
                  />

                  <Input
                    name="password"
                    onChange={() => {}}
                    label="Kata Sandi Baru"
                    placeholder="Masukkan kata sandi baru"
                    startContent={<FaKey className="h-4 w-4 text-gray-400" />}
                    isRequired
                  />

                  <Input
                    name="confirmPassword"
                    onChange={() => {}}
                    label="Konfirmasi Kata Sandi Baru"
                    placeholder="Masukkan konfirmasi kata sandi baru"
                    startContent={<FaKey className="h-4 w-4 text-gray-400" />}
                    isRequired
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

export default Security;
