import { photoProfileSchema } from "@/schemas/photo-profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useMedia from "./useMedia";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import { useSession } from "next-auth/react";
import { IUpdatePhoto } from "@/types/auth";
import { useState } from "react";

const usePhotoProfile = () => {
  const [visibleForm, setVisibleForm] = useState(false);
  const { data: session } = useSession();
  const {
    handleUploadFile,
    isPendingUploadFile,
    handleDeleteFile,
    isPendingDeleteFile,
  } = useMedia();

  const handleVisibleForm = () => setVisibleForm((visible) => !visible);

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(photoProfileSchema),
    defaultValues: {
      photo: "",
    },
  });

  const preview = watch("photo");
  const photoUrl = getValues("photo");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    handleUploadFile(files, onChange, (fileUrl) => {
      if (fileUrl) {
        setValue("photo", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChnage: (files: FileList | undefined) => void
  ) => {
    handleDeleteFile(photoUrl, () => onChnage(undefined));
    setValue("photo", "");
  };

  // update photo
  const updatePhotoService = async (payload: IUpdatePhoto) => {
    const res = await authService.updatePhoto(
      payload,
      session?.user?.token as string
    );
    return res.data.data;
  };

  const queryClient = useQueryClient();

  const { mutate: mutateUpdatePhoto, isPending: isPendingMutateUpdatePhoto } =
    useMutation({
      mutationFn: updatePhotoService,
      onSuccess: () => {
        addToast({
          title: "Berhasil",
          description: "Foto berhasil diubah",
          color: "success",
        });
        setVisibleForm(false);
        setValue("photo", "");

        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Foto gagal diubah",
          color: "danger",
        });
      },
    });

  const handleUpdatePhoto = (data: IUpdatePhoto) => mutateUpdatePhoto(data);

  return {
    handleSubmit,
    control,
    errors,
    handleUploadImage,
    isPendingUploadFile,
    preview,
    handleDeleteImage,
    isPendingDeleteFile,
    isPendingMutateUpdatePhoto,
    handleUpdatePhoto,
    handleVisibleForm,
    visibleForm,
  };
};

export default usePhotoProfile;
