"use client";

import useProfile from "@/hooks/useProfile";
import { Alert } from "@heroui/react";

const Dashboard = () => {
  const { dataUser } = useProfile();
  const isSellerVerified =
    dataUser?.Seller[0].verified || dataUser?.Seller[0].length > 0;

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
          <h1>Dashboard</h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
