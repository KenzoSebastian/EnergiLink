import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  const userLimits: string[] = ["/", "/admin"];
  const adminLimits: string[] = ["/", "/dashboard"];
  return async (request: NextRequest, next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const firstSegment = pathname.split("/")[1];
    if (requireAuth.includes(`/${firstSegment}`)) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXT_AUTH_SECRET!,
      });
      if (!token) {
        const url = new URL("/login", request.url);
        return NextResponse.redirect(url);
      }
      if (token.role === "user" && userLimits.includes(pathname)) {
        const url = new URL("/dashboard", request.url);
        return NextResponse.redirect(url);
      }
      if (token.role === "admin" && adminLimits.includes(pathname)) {
        const url = new URL("/admin", request.url);
        return NextResponse.redirect(url);
      }
    }
    return middleware(request, next);
  };
}
