import PageHeader from "@/components/page/profile/page-header";
import Seller from "@/components/page/profile/seller";

const SellerPage = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <PageHeader
        title="Jadi Penjual"
        description="Lengkapi informasi toko Anda di sini"
      />
      <div className="w-full max-w-xl mx-auto py-4">
        <Seller />
      </div>
    </div>
  );
};

export default SellerPage;
