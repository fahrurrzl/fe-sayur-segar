import CategoryForm from "@/components/page/admin/dashboard/category/category-form";
import categoryService from "@/services/category.service";
import React from "react";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await categoryService.getCategoryById(id);

  return <CategoryForm type="edit" data={data?.data || {}} />;
};

export default EditPage;
