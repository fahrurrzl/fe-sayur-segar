"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "./sroll-to-top";

const noNavbarPaths = [
  "/auth/login",
  "/auth/register",
  "/auth/register-success",
  "/dashboard",
];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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
