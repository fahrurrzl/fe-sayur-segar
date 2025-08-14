import { productSchema } from "@/schemas/product.schema";
import productService from "@/services/product.service";
import { TProductInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import useMedia from "./useMedia";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";

const useProduct = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    handleUploadFile,
    isPendingUploadFile,
    handleDeleteFile,
    isPendingDeleteFile,
  } = useMedia();

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      categoryId: "",
      description: "",
      imageUrl: "",
    },
  });
  const preview = watch("imageUrl");
  const imageUrl = getValues("imageUrl");

  // upload image
  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    handleUploadFile(files, onChange, (fileUrl) => {
      if (fileUrl) {
        setValue("imageUrl", fileUrl);
      }
    });
  };

  // delete image
  const handleDeleteImage = (
    onChnage: (files: FileList | undefined) => void
  ) => {
    handleDeleteFile(imageUrl, () => onChnage(undefined));
    setValue("imageUrl", "");
  };

  // create product
  const createProductService = async (payload: TProductInput) => {
    const res = await productService.create(
      payload,
      session?.user.token as string
    );
    return res.data;
  };

  const { mutate: mutateCreateProduct, isPending: isPendingCreateProduct } =
    useMutation({
      mutationFn: createProductService,
      onSuccess: () => {
        addToast({
          title: "Berhasil",
          description: "Produk berhasil dibuat",
          color: "success",
        });
        reset();
        router.push("/dashboard/product");
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Produk gagal dibuat",
          color: "danger",
        });
      },
    });

  const handleCreateProduct = (data: TProductInput) =>
    mutateCreateProduct({
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    });

  // get products
  const getProductsService = async () => {
    const res = await productService.getProducts();
    return res.data;
  };

  const { data: dataProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsService,
  });

  return {
    // form
    control,
    handleSubmit,
    errors,
    reset,
    // mutation
    handleCreateProduct,
    isPendingCreateProduct,
    // handle image
    handleUploadImage,
    isPendingUploadFile,
    handleDeleteImage,
    isPendingDeleteFile,
    preview,
    // query
    dataProducts,
    isLoadingProducts,
  };
};

export default useProduct;
