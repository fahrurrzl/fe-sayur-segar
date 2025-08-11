import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import LayoutWrapper from "@/components/layout-wrapper";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  // Ambil pathname dari header
  const pathname = (await headers()).get("x-next-url") || "";
  const hideLayout = pathname === "/auth/login"; // Kondisi untuk sembunyikan Navbar & Footer

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers
          session={session}
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <div className="relative flex flex-col h-screen">
            <LayoutWrapper>{children}</LayoutWrapper>
          </div>
        </Providers>
      </body>
    </html>
  );
}
