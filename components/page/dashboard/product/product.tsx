"use client";

import DataTable from "@/components/data-table";
import { columns } from "./columns";
import { renderCell } from "./render-cell";
import useSeller from "@/hooks/useSeller";
import { useRouter } from "next/navigation";

const Product = () => {
  const { dataSeller } = useSeller();
  const router = useRouter();

  return (
    <DataTable
      title="Produk"
      description="Kelola produk yang Anda miliki"
      columns={columns}
      data={dataSeller?.products || []}
      renderCell={renderCell as any}
      addButton
      addButtonText="Tambah Produk"
      onPressAddButton={() => router.push("/dashboard/product/create")}
      emptyContent="Belum ada produk yang ditambahkan"
    />
  );
};

export default Product;
