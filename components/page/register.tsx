"use client";

import useRegister from "@/hooks/useRegister";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Textarea,
} from "@heroui/react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    isVisiblePassword,
    setIsVisiblePassword,
    isVisibleConfirmPassword,
    setIsVisibleConfirmPassword,
    agreeToTerms,
    setAgreeToTerms,
  } = useRegister();

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-green-500/20 via-background to-green-500/10 w-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pt-8">
          <h2 className="text-2xl font-bold">Daftar</h2>
          <p className="text-foreground-500 text-sm">
            Buat akun baru untuk mulai berbelanja sayuran segar
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={() => {}} className="space-y-3">
            <div className="space-y-2">
              <Input
                isRequired
                variant="bordered"
                label="Nama Lengkap"
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                isRequired
                variant="bordered"
                label="Email"
                id="email"
                type="email"
                placeholder="nama@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                isRequired
                variant="bordered"
                label="Nomor Telepon"
                id="phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>

            <div className="space-y-2">
              <Textarea
                isRequired
                variant="bordered"
                label="Alamat"
                id="address"
                placeholder="Masukkan alamat"
                required
              ></Textarea>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-solid outline-transparent"
                      type="button"
                      onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                    >
                      {isVisiblePassword ? (
                        <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaEye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  label="Password"
                  isRequired
                  placeholder="Enter your password"
                  type={isVisiblePassword ? "text" : "password"}
                  variant="bordered"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  className="w-full"
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-solid outline-transparent"
                      type="button"
                      onClick={() =>
                        setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
                      }
                    >
                      {isVisibleConfirmPassword ? (
                        <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaEye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  isRequired
                  label="Konfirmasi Password"
                  placeholder="Enter your password"
                  type={isVisibleConfirmPassword ? "text" : "password"}
                  variant="bordered"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <label htmlFor="terms" className="text-sm">
                Saya setuju dengan{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  syarat dan ketentuan
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full text-white disabled:bg-green-500/50 disabled:cursor-not-allowed"
              color="success"
              disabled={!agreeToTerms}
            >
              Daftar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-foreground-500">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default Register;
