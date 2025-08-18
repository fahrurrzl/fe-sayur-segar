import ProductEdit from "@/components/page/dashboard/product/edit";
import productService from "@/services/product.service";
import React from "react";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await productService.getProductById(id);

  return <ProductEdit data={data?.data} />;
};

export default EditPage;
