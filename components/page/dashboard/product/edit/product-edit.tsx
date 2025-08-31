import { TProductResponse } from "@/types/product";
import ProductForm from "../product-form";

interface PropTypes {
  data: TProductResponse;
}
const ProductEdit = ({ data }: PropTypes) => {
  return <ProductForm type="edit" data={data} />;
};

export default ProductEdit;
