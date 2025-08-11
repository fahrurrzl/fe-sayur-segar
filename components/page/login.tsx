"use client";

import useLogin from "@/hooks/useLogin";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const {
    isVisiblePassword,
    setIsVisiblePassword,
    control,
    handleSubmit,
    errors,
    handleLogin,
    isPendingLogin,
  } = useLogin();
  return (
    <div className="flex justify-center w-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pt-8">
          <h2 className="text-2xl font-bold">Masuk</h2>
          <p className="text-foreground-500 text-sm">
            Masuk untuk mulai berbelanja sayuran segar
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
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

            <Button
              isLoading={isPendingLogin}
              type="submit"
              className="w-full text-white disabled:bg-green-500/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              color="success"
              disabled={isPendingLogin}
            >
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-foreground-500">
              Belum punya akun?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:underline font-medium"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default Login;
