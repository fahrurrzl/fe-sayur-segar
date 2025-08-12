// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Middleware yang:
 * - Jika user TIDAK login dan akses route yg diproteksi -> redirect ke /auth/login?callbackUrl=...
 * - Jika user SUDAH login dan akses /auth/login atau /auth/register -> redirect ke /dashboard
 * - Jika user SUDAH login tapi akses /admin dan bukan admin -> redirect /not-authorized
 */

export default async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Ambil token NextAuth (null kalau tidak login).
  // Pastikan NEXTAUTH_SECRET di .env
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    // secureCookie: process.env.NODE_ENV === "production" // optional
  });

  // Define route checks
  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/profile");

  // Jika belum login dan akses route proteksi -> redirect ke login + simpan callbackUrl
  if (!token && isProtected) {
    const signInUrl = new URL("/auth/login", origin);
    signInUrl.searchParams.set(
      "callbackUrl",
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(signInUrl);
  }

  // Jika sudah login dan mengakses halaman auth -> redirect ke dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", origin));
  }

  // Contoh role-based check untuk /admin
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/not-authorized", origin));
  }

  // Lanjutkan request
  return NextResponse.next();
}

// Hanya jalankan middleware untuk route yang relevan
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/pricing/:path*",
    "/profile/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
