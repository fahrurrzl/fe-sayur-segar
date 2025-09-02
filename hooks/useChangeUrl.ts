import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounce from "./useDebounce";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constant/PAGINATION";

const useChangeUrl = () => {
  const router = useRouter();
  const { debounce } = useDebounce();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page")) || PAGE_DEFAULT;
  const limit = Number(searchParams.get("limit")) || LIMIT_DEFAULT;

  const setUrl = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("category", category || "");
    params.set("search", search || "");
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", e.target.value);
    params.set("page", PAGE_DEFAULT.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchDebounced = debounce((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", value);
    params.set("page", PAGE_DEFAULT.toString());

    router.push(`${pathname}?${params.toString()}`);
  }, 500);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchDebounced(e.target.value);
  };

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", "");
    params.set("page", PAGE_DEFAULT.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", e.target.value);
    params.set("page", PAGE_DEFAULT.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    setUrl,
    handleChangePage,
    handleChangeCategory,
    handleChangeSearch,
    handleClearSearch,
    handleChangeLimit,
    category,
    search,
    page,
    limit,
  };
};

export default useChangeUrl;
