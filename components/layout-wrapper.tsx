"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "./sroll-to-top";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = usePathname();
  const id = params.split("/").pop();

  const noNavbarPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/register-success",
    "/dashboard",
    "/dashboard/product",
    "/dashboard/product/create",
    `/dashboard/product/edit/${id}`,
    "/dashboard/store-info",
    `/dashboard/store-info/edit/${id}`,
    "/dashboard/my-order",
    "/dashboard/order",
    // admin
    "/admin/dashboard",
    "/admin/dashboard/category",
    "/admin/dashboard/product",
    "/admin/dashboard/order",
    "/admin/dashboard/category/create",
  ];

  const pathname = usePathname();
  const hideLayout = noNavbarPaths.includes(pathname);

  return (
    <>
      <main className="flex-grow">
        {!hideLayout && <Navbar />}
        {children}
        {!hideLayout && <Footer />}
      </main>
    </>
  );
}
