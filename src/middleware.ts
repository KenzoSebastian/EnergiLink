import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withauth";
import { getToken } from "next-auth/jwt";

export async function mainMiddleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET!,
  });

  if (token) {
    const pathLimits: string[] = ["/login", "/register"];
    if (token.role === "user" && pathLimits.includes(request.nextUrl.pathname)) {
      const url = new URL("/dashboard", request.url);
      return NextResponse.redirect(url);
    }
    if (token.role === "admin" && pathLimits.includes(request.nextUrl.pathname)) {
      const url = new URL("/admin", request.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export default withAuth(mainMiddleware, ["/", "/admin", "/dashboard"]);
