import { productSchema } from "@/schemas/product.schema";
import productService from "@/services/product.service";
import { TProductInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import useMedia from "./useMedia";
import { addToast } from "@heroui/react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import useDebounce from "./useDebounce";

const useProduct = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { debounce } = useDebounce();
  const params = useParams();
  const { id } = params;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const setUrl = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("category", category || "");
    params.set("search", search || "");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchDebounced = debounce((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);

    router.push(`${pathname}?${params.toString()}`);
  }, 500);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchDebounced(e.target.value);
  };

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", "");
    router.push(`${pathname}?${params.toString()}`);
  };

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
      price: 0,
      stock: 0,
      unitId: "",
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
    let params = `category=${category}&search=${search}`;
    if (!category && !search) {
      params = "";
    }
    const res = await productService.getProducts(params);
    return res.data;
  };

  const {
    data: dataProducts,
    isLoading: isLoadingProducts,
    refetch,
  } = useQuery({
    queryKey: ["products", category, search],
    queryFn: getProductsService,
  });

  // get product by id
  const getProductByIdService = async (id: string) => {
    const res = await productService.getProductById(id);
    return res.data;
  };

  // update
  const updateProductService = async (id: string, payload: TProductInput) => {
    const res = await productService.update(
      id,
      payload,
      session?.user.token as string
    );
    return res.data;
  };

  const { mutate: mutateUpdateProduct, isPending: isPendingUpdateProduct } =
    useMutation({
      mutationFn: (variables: { id: string; payload: TProductInput }) =>
        updateProductService(variables.id, variables.payload),
      onSuccess: () => {
        addToast({
          title: "Berhasil",
          description: "Produk berhasil diubah",
          color: "success",
        });
        reset();
        router.push("/dashboard/product");
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Produk gagal diubah",
          color: "danger",
        });
      },
    });

  const handleUpdateProduct = (data: TProductInput) =>
    mutateUpdateProduct({
      id: id as string,
      payload: {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      },
    });

  const queryClient = useQueryClient();

  // delete
  const deleteProductService = async (id: string) => {
    const res = await productService.destroy(id, session?.user.token as string);
    return res.data;
  };

  const {
    mutate: mutateDeleteProduct,
    isPending: isPendingDeleteProduct,
    isSuccess: isSuccessDeleteProduct,
  } = useMutation({
    mutationFn: deleteProductService,
    onSuccess: (data) => {
      handleDeleteFile(data.data.imageUrl, () => {
        addToast({
          title: "Berhasil",
          description: "Produk berhasil dihapus",
          color: "success",
        });
      });

      queryClient.invalidateQueries({ queryKey: ["seller"] });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        title: "Gagal",
        description: "Produk gagal dihapus",
        color: "danger",
      });
    },
  });

  const handleDeleteProduct = (id: string) => mutateDeleteProduct(id);

  // admin delete
  const adminDeleteProductService = async (id: string) => {
    const res = await productService.adminDelete(
      id,
      session?.user.token as string
    );
    return res.data;
  };

  const {
    mutate: mutateAdminDeleteProduct,
    isPending: isPendingAdminDeleteProduct,
    isSuccess: isSuccessAdminDeleteProduct,
  } = useMutation({
    mutationFn: adminDeleteProductService,
    onSuccess: (data) => {
      handleDeleteFile(data.data.imageUrl, () => {
        addToast({
          title: "Berhasil",
          description: "Produk berhasil dihapus",
          color: "success",
        });
      });

      queryClient.invalidateQueries({
        queryKey: ["products", category, search],
      });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        title: "Gagal",
        description: "Produk gagal dihapus",
        color: "danger",
      });
    },
  });

  const handleAdminDeleteProduct = (id: string) => mutateAdminDeleteProduct(id);

  return {
    // form
    control,
    handleSubmit,
    errors,
    reset,
    setValue,
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
    getProductByIdService,
    refetch,
    // mutation
    handleUpdateProduct,
    isPendingUpdateProduct,
    // delete
    handleDeleteProduct,
    isPendingDeleteProduct,
    isSuccessDeleteProduct,
    // admin delete
    handleAdminDeleteProduct,
    isPendingAdminDeleteProduct,
    isSuccessAdminDeleteProduct,
    setUrl,
    handleChangeCategory,
    handleChangeSearch,
    handleClearSearch,
  };
};

export default useProduct;
