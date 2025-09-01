"use client";

import useProfile from "@/hooks/useProfile";
import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineCube, HiShoppingCart } from "react-icons/hi";
import { LuWallet } from "react-icons/lu";
import { MdDashboard, MdReceipt, MdStore } from "react-icons/md";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: MdDashboard,
  },
  {
    name: "Kelola Produk",
    href: "/dashboard/product",
    icon: HiOutlineCube,
  },
  {
    name: "Kelola Pesanan",
    href: "/dashboard/order",
    icon: HiShoppingCart,
  },
  {
    name: "Pesanan Saya",
    href: "/dashboard/my-order",
    icon: MdReceipt,
  },
  {
    name: "Kelola Wallet",
    href: "/dashboard/wallet",
    icon: LuWallet,
  },
  {
    name: "Info Lapak",
    href: "/dashboard/store-info",
    icon: MdStore,
  },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const { dataUser } = useProfile();
  const isSellerVerified =
    dataUser?.Seller[0]?.verified && dataUser?.Seller?.length;

  return (
    <nav className="flex-1 p-4">
      <div className="space-y-2">
        {menuItems.map((item) => {
          if (!isSellerVerified && item.href.startsWith("/dashboard/wallet")) {
            return null;
          }

          if (!isSellerVerified && item.href.startsWith("/dashboard/product")) {
            return null;
          }

          if (!isSellerVerified && item.href.startsWith("/dashboard/order")) {
            return null;
          }
          const isActive = pathname === item.href;
          const IconComponent = item.icon;
          return (
            <Button
              key={item.name}
              as={Link}
              href={item.href}
              variant={isActive ? "flat" : "light"}
              color={isActive ? "success" : "default"}
              className={`w-full justify-start h-12 ${
                isActive
                  ? "bg-green-100 text-green-700 border-r-2 rounded-r-sm border-green-600 dark:border-emerald-600 dark:bg-emerald-900 dark:text-emerald-100"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              }`}
              startContent={
                <IconComponent
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-emerald-600"
                      : "text-gray-400 dark:text-gray-200"
                  }`}
                />
              }
            >
              {item.name}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default DashboardNavbar;
