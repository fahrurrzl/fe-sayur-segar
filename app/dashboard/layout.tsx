"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
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
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineUser,
} from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import DashboardNavbar from "@/components/page/dashboard/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="h-screen bg-gray-50/50 flex overflow-hidden">
      {/* Sidebar */}
      <Card
        className={`fixed inset-y-0 left-0 z-50 w-72 shadow-xl transform h-full ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 rounded-none`}
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
                <p className="text-xs text-default-500">Langsung dari petani</p>
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
          <DashboardNavbar />

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
                      src={`https://ui-avatars.com/api/?name=${session?.user.name}&background=random`}
                    />
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-700">
                        {session?.user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session?.user.email}
                      </p>
                    </div>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem
                  key="profile"
                  startContent={<HiOutlineUser className="w-4 h-4" />}
                  onPress={() => router.push("/profile")}
                >
                  Profil
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<HiOutlineCog className="w-4 h-4" />}
                >
                  Pengaturan
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<HiOutlineLogout className="w-4 h-4" />}
                  onPress={() => signOut()}
                >
                  Keluar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardBody>
      </Card>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full lg:ml-0">
        {/* Top Header - Fixed */}
        <Card className="rounded-none shadow-sm sticky top-0 z-40">
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

        {/* Page Content - Scrollable */}
        <main className="flex-1 p-6 bg-gray-50/50 overflow-y-auto">
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
