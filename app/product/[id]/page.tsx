import ProductDetail from "@/components/page/product-detail";
import productService from "@/services/product.service";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const { data: product } = await productService.getProductById(params?.id);

  return <ProductDetail product={product?.data} />;
};

export default ProductDetailPage;
