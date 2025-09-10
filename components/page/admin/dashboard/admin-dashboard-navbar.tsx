"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuBox, LuWallet } from "react-icons/lu";
import { MdCategory, MdOutlineDashboard } from "react-icons/md";
import { TbWeight } from "react-icons/tb";
import { HiBuildingStorefront, HiOutlineUsers } from "react-icons/hi2";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: MdOutlineDashboard,
  },
  {
    name: "Kelola Kategori",
    href: "/admin/dashboard/category",
    icon: MdCategory,
  },
  {
    name: "Kelola Unit / Satuan",
    href: "/admin/dashboard/unit",
    icon: TbWeight,
  },
  {
    name: "Kelola User",
    href: "/admin/dashboard/user",
    icon: HiOutlineUsers,
  },
  {
    name: "Kelola Penjual",
    href: "/admin/dashboard/seller",
    icon: HiBuildingStorefront,
  },
  {
    name: "Kelola Produk",
    href: "/admin/dashboard/product",
    icon: LuBox,
  },
  {
    name: "Kelola Transaksi Wallet",
    href: "/admin/dashboard/wallet-transaction",
    icon: LuWallet,
  },
];

const AdminDashboardNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4">
      <div className="space-y-2">
        {menuItems.map((item) => {
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
                    isActive ? "text-green-600" : "text-gray-400"
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

export default AdminDashboardNavbar;
