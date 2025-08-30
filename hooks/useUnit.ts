import { unitSchema } from "@/schemas/unit.schema";
import unitService from "@/services/unit.service";
import { IUnit } from "@/types/unit";
import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const useUnit = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const params = useParams();
  const { id } = params;

  // get units
  const getUnitsService = async () => {
    const res = await unitService.getUnits();
    return res.data;
  };

  const { data: dataUnits, isLoading: isLoadingUnits } = useQuery({
    queryKey: ["units"],
    queryFn: getUnitsService,
  });

  // use form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      name: "",
      symbol: "",
    },
  });

  // create unit
  const createUnitService = async (payload: IUnit) => {
    const res = await unitService.createUnit(
      payload,
      session?.user?.token as string
    );
    return res.data;
  };

  const { mutate: mutateCreateUnit, isPending: isPendingCreateUnit } =
    useMutation({
      mutationFn: createUnitService,
      onSuccess() {
        addToast({
          title: "Berhasil",
          description: "Unit berhasil ditambahkan",
          color: "success",
        });
        router.push("/admin/dashboard/unit");
        reset();
      },
      onError(error) {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Gagal menambahkan unit",
          color: "danger",
        });
      },
    });

  const handleCreateUnit = (payload: IUnit) => {
    mutateCreateUnit(payload);
  };

  // update unit
  const updateUnitService = async (payload: IUnit) => {
    const res = await unitService.updateUnit(
      payload,
      id as string,
      session?.user?.token as string
    );
    return res.data;
  };

  const { mutate: mutateUpdateUnit, isPending: isPendingUpdateUnit } =
    useMutation({
      mutationFn: updateUnitService,
      onSuccess() {
        addToast({
          title: "Berhasil",
          description: "Unit berhasil diubah",
          color: "success",
        });
        router.push("/admin/dashboard/unit");
      },
      onError() {
        addToast({
          title: "Gagal",
          description: "Gagal mengubah unit",
          color: "danger",
        });
      },
    });

  const handleUpdateUnit = (payload: IUnit) => {
    mutateUpdateUnit(payload);
  };

  const queryClient = useQueryClient();

  // delete unit
  const deleteUnitService = async (id: string) => {
    const res = await unitService.deleteUnit(
      id,
      session?.user?.token as string
    );
    return res.data;
  };

  const {
    mutate: mutateDeleteUnit,
    isPending: isPendingDeleteUnit,
    isSuccess: isSuccessDeleteUnit,
  } = useMutation({
    mutationFn: (id: string) => deleteUnitService(id),
    onSuccess() {
      addToast({
        title: "Berhasil",
        description: "Unit berhasil dihapus",
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["units"],
      });
    },
    onError() {
      addToast({
        title: "Gagal",
        description: "Gagal menghapus unit",
        color: "danger",
      });
    },
  });

  const handleDeleteUnit = (id: string) => {
    mutateDeleteUnit(id);
  };

  return {
    // form
    control,
    handleSubmit,
    setValue,
    errors,
    // get units
    dataUnits,
    isLoadingUnits,
    // create unit
    handleCreateUnit,
    isPendingCreateUnit,
    // update unit
    handleUpdateUnit,
    isPendingUpdateUnit,
    // delete unit
    handleDeleteUnit,
    isPendingDeleteUnit,
    isSuccessDeleteUnit,
  };
};
export default useUnit;
