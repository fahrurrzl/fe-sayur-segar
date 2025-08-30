"use client";

import useProfile from "@/hooks/useProfile";
import {
  calendarDateToString,
  stringToCalendarDate,
} from "@/utils/stringToCalendarDate";
import { Button } from "@heroui/button";
import {
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Textarea,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { FiCalendar, FiMail, FiPhone } from "react-icons/fi";
import { I18nProvider } from "@react-aria/i18n";

const ProfileForm = () => {
  const router = useRouter();
  const {
    dataUser,
    isPendingUpdateUser,
    handleSubmit,
    handleUpdateUser,
    control,
    errors,
    setValue,
  } = useProfile();

  useEffect(() => {
    if (dataUser) {
      setValue("name", dataUser?.name || "");
      setValue("email", dataUser?.email || "");
      setValue("address", dataUser?.address || "");
      setValue("phone", dataUser?.phone || "");
      setValue("username", dataUser?.username || "");
      setValue("gender", dataUser?.gender || "");
      const birthDate = dataUser?.birthDate
        ? dataUser.birthDate.split("T")[0]
        : "";

      setValue("birthDate", birthDate);
      setValue("photo", dataUser?.photo || "");
    }
  }, [dataUser]);

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-xl flex items-center gap-2">
            <FaUser className="h-5 w-5 text-emerald-600" />
            Informasi Pribadi
          </h2>
          <p className="text-gray-600 text-sm">
            Perbarui informasi pribadi Anda di sini
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(handleUpdateUser)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Informasi Dasar
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Nama Lengkap"
                          placeholder="Masukkan nama lengkap"
                          variant="bordered"
                          startContent={
                            <FaUser className="h-4 w-4 text-gray-400" />
                          }
                          isRequired
                          isInvalid={!!errors.name}
                          errorMessage={errors.name?.message}
                        />
                      )}
                    />
                  </Skeleton>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Username"
                          placeholder="Masukkan username"
                          disabled
                          startContent={
                            <FaUser className="h-4 w-4 text-gray-400" />
                          }
                          isRequired
                          isInvalid={!!errors.username}
                          errorMessage={errors.username?.message}
                        />
                      )}
                    />
                  </Skeleton>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Jenis Kelamin"
                          variant="bordered"
                          selectedKeys={field.value ? [field.value] : []}
                          isInvalid={!!errors.gender}
                          errorMessage={errors.gender?.message}
                        >
                          <SelectItem key="male">Laki-laki</SelectItem>
                          <SelectItem key="female">Perempuan</SelectItem>
                        </Select>
                      )}
                    />
                  </Skeleton>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="birthDate"
                      control={control}
                      render={({ field }) => (
                        <I18nProvider locale="id">
                          <DatePicker
                            {...field}
                            startContent={<FiCalendar />}
                            label="Tanggal Lahir"
                            variant="bordered"
                            value={stringToCalendarDate(field.value)}
                            onChange={(val) =>
                              field.onChange(calendarDateToString(val))
                            }
                            isInvalid={!!errors.birthDate}
                            errorMessage={errors.birthDate?.message}
                          />
                        </I18nProvider>
                      )}
                    />
                  </Skeleton>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Informasi Kontak
                </h3>
                <div className="space-y-4">
                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Alamat Email"
                          placeholder="Masukkan alamat email"
                          disabled
                          startContent={
                            <FiMail className="h-4 w-4 text-gray-400" />
                          }
                          isRequired
                          isInvalid={!!errors.email}
                          errorMessage={errors.email?.message}
                        />
                      )}
                    />
                  </Skeleton>

                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Nomor Telepon"
                          placeholder="Masukkan nomor telepon"
                          variant="bordered"
                          startContent={
                            <FiPhone className="h-4 w-4 text-gray-400" />
                          }
                          isInvalid={!!errors.phone}
                          errorMessage={errors.phone?.message}
                        />
                      )}
                    />
                  </Skeleton>

                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          label="Alamat Lengkap"
                          placeholder="Masukkan alamat lengkap"
                          minRows={3}
                          variant="bordered"
                          isInvalid={!!errors.address}
                          errorMessage={errors.address?.message}
                        />
                      )}
                    />
                  </Skeleton>
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
                isLoading={isPendingUpdateUser}
                disabled={isPendingUpdateUser}
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

export default ProfileForm;
