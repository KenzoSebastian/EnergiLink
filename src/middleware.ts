import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Jika user akses root "/"
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Default: lanjutkan request
  return NextResponse.next();
}
