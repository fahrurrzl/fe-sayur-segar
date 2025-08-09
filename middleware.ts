import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const token = (req as any).nextauht?.token;

  if (!token) {
    const signInUrl = new URL("/login", req.url);
    // simpan url tujuan agar setelah login bisa redirect balik
    signInUrl.searchParams.set(
      "callbackUrl",
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(signInUrl);
  }

  // contoh: role-based access untuk route /admin
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  // jika lolos semua pengecekan -> lanjutkan request
  return NextResponse.next();
});

// config: pilih route mana yang diterapkan middleware
export const config = {
  matcher: [
    "/dashboard/:path*", // proteksi semua route di bawah /dashboard
    "/admin/:path*", // proteksi semua route admin
    "/pricing/:path*", // contoh lain
  ],
};
