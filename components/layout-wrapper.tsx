"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import { Suspense, useRef } from "react";
import { ScrollProgress } from "./motion-primitives/scroll-progress";
import LoadingSpinner from "./loading-spinner";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
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
    "/dashboard/wallet",
    // admin
    "/admin/dashboard",
    "/admin/dashboard/category",
    "/admin/dashboard/product",
    "/admin/dashboard/order",
    "/admin/dashboard/category/create",
    `/admin/dashboard/category/edit/${id}`,
    "/admin/dashboard/unit",
    "/admin/dashboard/unit/create",
    `/admin/dashboard/unit/edit/${id}`,
    "/admin/dashboard/seller",
    "/admin/dashboard/wallet-transaction",
  ];

  const pathname = usePathname();
  const hideLayout = noNavbarPaths.includes(pathname);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className="overflow-auto" ref={containerRef}>
        <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-white to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,white,transparent)] dark:bg-neutral-900" />
        <div className="pointer-events-none absolute left-0 top-0 w-full z-50">
          <div className="absolute left-0 top-0 h-1 w-full bg-[#E6F4FE] dark:bg-[#111927]" />
          <ScrollProgress
            containerRef={containerRef}
            className="absolute top-0 bg-success"
          />
        </div>
        <>
          {!hideLayout && <Navbar />}
          {children}
          {!hideLayout && <Footer />}
        </>
      </main>
    </Suspense>
  );
}
