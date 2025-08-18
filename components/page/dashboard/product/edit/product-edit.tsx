import ProductForm from "../product-form";
import { TProductResponse } from "@/types";

interface PropTypes {
  data: TProductResponse;
}
const ProductEdit = ({ data }: PropTypes) => {
  return <ProductForm type="edit" data={data} />;
};

export default ProductEdit;
