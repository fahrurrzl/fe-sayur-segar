import React from "react";
import ProductForm from "../product-form";
import { TProductResponse } from "@/types";

interface PropTypes {
  data: TProductResponse;
}
const Edit = ({ data }: PropTypes) => {
  return <ProductForm type="edit" data={data} />;
};

export default Edit;
