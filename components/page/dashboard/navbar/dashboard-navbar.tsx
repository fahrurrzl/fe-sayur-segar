"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineCube } from "react-icons/hi";
import { MdDashboard, MdStore } from "react-icons/md";

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
    name: "Info Lapak",
    href: "/dashboard/store-info",
    icon: MdStore,
  },
];

const DashboardNavbar = () => {
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

export default DashboardNavbar;
