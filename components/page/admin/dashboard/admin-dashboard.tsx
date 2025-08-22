"use client";

import { useSession } from "next-auth/react";

const AdminDashboard = () => {
  const { data: session } = useSession();
  return <div>Selamat datang kembali, {session?.user?.name}</div>;
};

export default AdminDashboard;
