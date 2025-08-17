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
  ];

  const pathname = usePathname();
  const hideLayout = noNavbarPaths.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}
      <ScrollToTop />
    </>
  );
}
