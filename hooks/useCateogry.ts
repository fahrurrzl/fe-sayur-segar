import categoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";

const useCategory = () => {
  const getCategoriesService = async () => {
    const res = await categoryService.getCategories();
    return res.data.data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
  });

  return {
    dataCategories,
    isLoadingCategories,
  };
};

export default useCategory;
