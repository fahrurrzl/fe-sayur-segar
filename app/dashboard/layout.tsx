"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Input,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  Divider,
  Badge,
} from "@heroui/react";
import {
  HiOutlineCube,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineUser,
} from "react-icons/hi";
import { MdDashboard, MdStore } from "react-icons/md";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: MdDashboard,
    },
    {
      name: "Kelola Produk",
      href: "/dashboard/products",
      icon: HiOutlineCube,
    },
    {
      name: "Info Lapak",
      href: "/dashboard/store-info",
      icon: MdStore,
    },
  ];

  return (
    <div className="bg-gray-50/50 flex">
      {/* Sidebar */}
      <Card
        className={`fixed inset-y-0 left-0 z-50 w-72 shadow-xl transform h-screen ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 rounded-none`}
      >
        <CardBody className="p-0 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6">
            <Link className="flex justify-start items-center gap-2" href="/">
              <Image
                src="/images/logo-sayur.png"
                alt="logo"
                width={40}
                height={40}
              />
              <div>
                <p className="font-bold text-inherit">SayurSegar</p>
                <p className="text-xs text-default-500">
                  Sayur Segar dari Petani
                </p>
              </div>
            </Link>
            <Button
              isIconOnly
              variant="light"
              className="lg:hidden text-white"
              onPress={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <HiOutlineX className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
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

          <Divider />

          {/* User Profile Section */}
          <div className="p-4">
            <Dropdown placement="top-start">
              <DropdownTrigger>
                <Button
                  variant="light"
                  className="w-full justify-start h-auto p-3"
                >
                  <div className="flex items-center w-full">
                    <Avatar
                      size="sm"
                      name="Admin"
                      className="bg-green-600 text-white"
                    />
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-700">Admin</p>
                      <p className="text-xs text-gray-500">Dashboard</p>
                    </div>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem
                  key="profile"
                  startContent={<HiOutlineUser className="w-4 h-4" />}
                  as={Link}
                  href="/profile"
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<HiOutlineCog className="w-4 h-4" />}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<HiOutlineLogout className="w-4 h-4" />}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardBody>
      </Card>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-gradient">
        {/* Top Header */}
        <Card className="rounded-none shadow-sm">
          <CardBody className="p-0">
            <div className="flex items-center justify-between h-16 px-6">
              <Button
                isIconOnly
                variant="light"
                className="lg:hidden"
                onPress={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <HiOutlineMenu className="w-5 h-5" />
              </Button>

              <div className="flex items-center space-x-4 justify-between w-full">
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">Kelola Lapak Anda</h1>
                  <p className="text-xs text-gray-500">
                    Pantau dan kelola produk yang anda jual
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge content="3" color="danger" size="sm">
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-gray-500"
                    >
                      <HiOutlineBell className="w-5 h-5" />
                    </Button>
                  </Badge>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
