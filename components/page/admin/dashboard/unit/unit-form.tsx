"use client";

import useUnit from "@/hooks/useUnit";
import { IUnit } from "@/types/unit";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { TbWeight } from "react-icons/tb";
import { useEffect } from "react";

const UnitForm = ({
  type,
  data,
}: {
  type: "create" | "edit";
  data?: IUnit;
}) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    errors,
    handleCreateUnit,
    isPendingCreateUnit,
    handleUpdateUnit,
    isPendingUpdateUnit,
  } = useUnit();

  useEffect(() => {
    if (type === "edit") {
      if (data) {
        setValue("name", data?.name);
        setValue("symbol", data?.symbol);
      }
    }
  }, [data]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-4">
        <Button isIconOnly variant="light" onPress={() => router.back()}>
          <FaArrowLeft />
        </Button>

        <div className="flex items-center gap-2">
          <TbWeight className="h-6 w-6 text-success" />
          <h1 className="text-2xl font-bold">
            {type === "create" ? "Buat Unit Baru" : "Ubah Unit"}
          </h1>
        </div>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(
            type === "create" ? handleCreateUnit : handleUpdateUnit
          )}
          className="space-y-4"
        >
          <Card>
            <CardHeader className="flex flex-col gap-w items-start">
              <h2 className="text-lg font-semibold">Detail Unit</h2>
              <p className="text-sm text-foreground-500">Isi detail unit</p>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Nama Satuan"
                        variant="bordered"
                        {...field}
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <Controller
                    name="symbol"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Simbol Satuan"
                        variant="bordered"
                        {...field}
                        isInvalid={!!errors.symbol}
                        errorMessage={errors.symbol?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="flex justify-end gap-2">
            <Button
              variant="flat"
              onPress={() => router.push("/admin/dashboard/unit")}
            >
              Batal
            </Button>
            <Button
              type="submit"
              color="success"
              className="text-white"
              isLoading={isPendingCreateUnit || isPendingUpdateUnit}
              disabled={isPendingCreateUnit || isPendingUpdateUnit}
            >
              {type === "create" ? "Buat Unit" : "Ubah Unit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitForm;
