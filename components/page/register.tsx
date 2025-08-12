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
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    isVisiblePassword,
    setIsVisiblePassword,
    isVisibleConfirmPassword,
    setIsVisibleConfirmPassword,
    agreeToTerms,
    setAgreeToTerms,

    handleRegister,
    isPendingRegister,

    control,
    handleSubmit,
    errors,
  } = useRegister();

  return (
    <div className="flex justify-center w-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pt-8">
          <h2 className="text-2xl font-bold">Daftar</h2>
          <p className="text-foreground-500 text-sm">
            Buat akun baru untuk mulai berbelanja sayuran segar
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
            <div className="space-y-1">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Nama Lengkap"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    autoFocus
                    isInvalid={!!errors.name}
                  />
                )}
              />
              {errors.name && (
                <p className="text-danger text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Email"
                    type="email"
                    placeholder="example@email.com"
                    isInvalid={!!errors.email}
                  />
                )}
              />
              {errors.email && (
                <p className="text-danger text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Nomor Telepon"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    isInvalid={!!errors.phone}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-danger text-xs">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    variant="bordered"
                    label="Alamat"
                    placeholder="Masukkan alamat"
                    isInvalid={!!errors.address}
                  ></Textarea>
                )}
              />
              {errors.address && (
                <p className="text-danger text-xs">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-solid outline-transparent"
                          type="button"
                          onClick={() =>
                            setIsVisiblePassword(!isVisiblePassword)
                          }
                        >
                          {isVisiblePassword ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      label="Password"
                      placeholder="Enter your password"
                      type={isVisiblePassword ? "text" : "password"}
                      variant="bordered"
                      isInvalid={!!errors.password}
                    />
                  )}
                />
              </div>
              {errors.password && (
                <p className="text-danger text-xs">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="w-full"
                      endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-solid outline-transparent"
                          type="button"
                          onClick={() =>
                            setIsVisibleConfirmPassword(
                              !isVisibleConfirmPassword
                            )
                          }
                        >
                          {isVisibleConfirmPassword ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      label="Konfirmasi Password"
                      placeholder="Enter your password"
                      type={isVisibleConfirmPassword ? "text" : "password"}
                      variant="bordered"
                      isInvalid={!!errors.confirmPassword}
                    />
                  )}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-danger text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
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
              isLoading={isPendingRegister}
              type="submit"
              className="w-full text-white disabled:bg-green-500/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              color="success"
              disabled={!agreeToTerms || isPendingRegister}
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
