"use client";

import useActivation from "@/hooks/useActivation";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const Activation = () => {
  const params = useSearchParams();
  const code = params.get("code");
  const { mutateActivation } = useActivation();
  const router = useRouter();

  useEffect(() => {
    if (code) {
      mutateActivation(code);
    }
  }, [code]);

  return (
    <Card className="w-full max-w-md text-center p-8">
      <CardHeader className="flex flex-col">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <FiCheck className="h-8 w-8 text-green-600 dark:text-green-400 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
          Akun Berhasil Diaktifkan!
        </h1>
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-base text-foreground-600 text-center">
          Selamat! Akun Anda telah berhasil diaktifkan. Anda sekarang dapat
          masuk dan mulai menggunakan layanan kami.
        </p>
      </CardBody>
      <CardFooter>
        <Button
          className="w-full text-white"
          onPress={() => router.push("/auth/login")}
          color="success"
        >
          Masuk ke Akun
          <FiArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Activation;
