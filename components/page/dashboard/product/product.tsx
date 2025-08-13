"use client";

import DataTable from "@/components/data-table";
import { columns } from "./columns";
import { renderCell } from "./render-cell";
import useSeller from "@/hooks/useSeller";

const Product = () => {
  const { dataSeller } = useSeller();

  return (
    <DataTable
      title="Produk"
      description="Kelola produk yang Anda miliki"
      columns={columns}
      data={dataSeller?.products || []}
      renderCell={renderCell as any}
      addButton
      addButtonText="Tambah Produk"
      onPressAddButton={() => {}}
      emptyContent="Belum ada produk yang ditambahkan"
    />
  );
};

export default Product;
