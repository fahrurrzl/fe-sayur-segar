import Checkout from "@/components/page/checkout";

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <Checkout id={id} />;
};

export default CheckoutPage;
