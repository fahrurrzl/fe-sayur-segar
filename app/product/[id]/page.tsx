import ProductDetail from "@/components/page/product-detail";
import productService from "@/services/product.service";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: product } = await productService.getProductById(id);

  return <ProductDetail product={product?.data} />;
};

export default ProductDetailPage;
