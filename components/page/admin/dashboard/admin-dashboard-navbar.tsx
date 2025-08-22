"use client";

import useProfile from "@/hooks/useProfile";
import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineCube, HiShoppingCart } from "react-icons/hi";
import { MdCategory, MdDashboard } from "react-icons/md";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: MdDashboard,
  },
  {
    name: "Kelola Kategori",
    href: "/admin/dashboard/category",
    icon: MdCategory,
  },
  {
    name: "Kelola Produk",
    href: "/admin/dashboard/product",
    icon: HiOutlineCube,
  },
  {
    name: "Kelola Pesanan",
    href: "/admin/dashboard/order",
    icon: HiShoppingCart,
  },
];

const AdminDashboardNavbar = () => {
  const pathname = usePathname();
  const { dataUser } = useProfile();

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
                  ? "bg-green-100 text-green-700 border-r-2 rounded-r-sm border-green-600"
                  : "text-gray-600 hover:bg-gray-100"
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
