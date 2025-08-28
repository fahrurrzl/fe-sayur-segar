"use client";

import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient w-full p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
            Pendaftaran Berhasil!
          </h1>
          <p className="text-base text-foreground-600">
            Akun Anda telah berhasil dibuat. Silahkan cek email untuk
            mengaktifkan akun!
          </p>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="rounded-lg bg-foreground-100 p-4">
            <p className="text-sm text-foreground-500">
              Email konfirmasi telah dikirim ke alamat email Anda. Silakan cek
              kotak masuk atau folder spam.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              variant="bordered"
              className="w-full"
              onPress={() => router.push("/")}
            >
              Kembali ke Beranda
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default RegisterSuccess;
