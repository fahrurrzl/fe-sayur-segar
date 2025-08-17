"use client";

import useProfile from "@/hooks/useProfile";
import { Alert } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { dataUser } = useProfile();
  const router = useRouter();
  const isSellerVerified =
    dataUser?.Seller[0]?.verified && dataUser?.Seller?.length;

  useEffect(() => {
    if (!dataUser?.Seller?.length) {
      router.push("/profile");
    }
  }, [dataUser]);

  return (
    <div className="p-4">
      {!isSellerVerified ? (
        <Alert
          title="Informasi"
          description="Lapak kamu belum terfertifikasi, silahkan tunggu!"
          color="warning"
        />
      ) : (
        <div>
          <h1>Welcome back, {dataUser?.name}</h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
