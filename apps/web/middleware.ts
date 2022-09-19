import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const url = request.nextUrl.clone();
    if (
        url.pathname.startsWith("/api/listing") ||
        url.pathname.startsWith("/listing")
    ) {
        if (!token) {
            url.pathname = "/login";
            return NextResponse.rewrite(url);
        }
    }
    if (!token) {
        return NextResponse.next();
    }
    const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    if (!payload) {
        url.pathname = "/login";
        return NextResponse.rewrite(url);
    }
    if (
        request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/register"
    ) {
        url.pathname = "/";
        return NextResponse.rewrite(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: "/(.*)",
};
