"use client";

import React from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { FaEye, FaEyeSlash, FaKey, FaUserShield } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useChangePassword from "@/hooks/useChangePassword";
import { Controller } from "react-hook-form";

const Security = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    errors,
    handleChangePassword,
    isPendingChangePassword,
    // visibility
    isVisibleOldPassword,
    setIsVisibleOldPassword,
    isVisibleNewPassword,
    setIsVisibleNewPassword,
    isVisibleConfirmPassword,
    setIsVisibleConfirmPassword,
  } = useChangePassword();

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
          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="space-y-8"
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <div className="grid grid-cols-1 gap-4">
                  <Controller
                    name="oldPassword"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Kata Sandi Lama"
                        placeholder="Masukkan kata sandi lama"
                        startContent={
                          <FaKey className="h-4 w-4 text-gray-400" />
                        }
                        variant="bordered"
                        isInvalid={!!errors.oldPassword}
                        errorMessage={errors.oldPassword?.message}
                        type={isVisibleOldPassword ? "text" : "password"}
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-solid outline-transparent"
                            type="button"
                            onClick={() =>
                              setIsVisibleOldPassword(!isVisibleOldPassword)
                            }
                          >
                            {isVisibleOldPassword ? (
                              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <FaEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                      />
                    )}
                  />

                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Kata Sandi Baru"
                        placeholder="Masukkan kata sandi baru"
                        startContent={
                          <FaKey className="h-4 w-4 text-gray-400" />
                        }
                        variant="bordered"
                        isInvalid={!!errors.newPassword}
                        errorMessage={errors.newPassword?.message}
                        type={isVisibleNewPassword ? "text" : "password"}
                        endContent={
                          <button
                            aria-label="toggle password visibility"
                            className="focus:outline-solid outline-transparent"
                            type="button"
                            onClick={() =>
                              setIsVisibleNewPassword(!isVisibleNewPassword)
                            }
                          >
                            {isVisibleNewPassword ? (
                              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <FaEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                      />
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Konfirmasi Kata Sandi Baru"
                        placeholder="Masukkan konfirmasi kata sandi baru"
                        startContent={
                          <FaKey className="h-4 w-4 text-gray-400" />
                        }
                        variant="bordered"
                        isInvalid={!!errors.confirmPassword}
                        errorMessage={errors.confirmPassword?.message}
                        type={isVisibleConfirmPassword ? "text" : "password"}
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
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button type="button" variant="bordered" className="flex-1">
                Batal
              </Button>
              <Button
                isLoading={isPendingChangePassword}
                disabled={isPendingChangePassword}
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
