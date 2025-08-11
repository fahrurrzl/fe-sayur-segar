"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/Footer";

const noNavbarPaths = ["/auth/login", "/auth/register"];

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
    </>
  );
}
