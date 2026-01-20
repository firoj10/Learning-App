// import NextAuth from "next-auth";
// import type { NextRequest } from "next/server";
// import { authConfig } from "./auth.config";

// import { DEFAULT_REDIRECT, PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes";

// const { auth } = NextAuth(authConfig);

// export default auth((req: NextRequest) => {
//   const { nextUrl } = req;

//   const isAuthenticated = !!(req as any).auth;

//   console.log(isAuthenticated, nextUrl.pathname);

//   const isPublicRoute =
//     PUBLIC_ROUTES.find((route: string) => nextUrl.pathname.startsWith(route)) ||
//     nextUrl.pathname === ROOT;

//   console.log({ isPublicRoute });

//   if (!isAuthenticated && !isPublicRoute) {
//     return Response.redirect(new URL(LOGIN, nextUrl));
//   }
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// import NextAuth from "next-auth";
// import type { NextRequest } from "next/server";
// import { authConfig } from "./auth.config";

// import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes";

// const { auth } = NextAuth(authConfig);

// export default auth((req: NextRequest) => {
//   const { nextUrl } = req;

//   const isAuthenticated = !!(req as any).auth;

//   console.log(isAuthenticated, nextUrl.pathname);

//   const isPublicRoute =
//     PUBLIC_ROUTES.find((route: string) => nextUrl.pathname.startsWith(route)) ||
//     nextUrl.pathname === ROOT;

//   console.log({ isPublicRoute });

//   if (!isAuthenticated && !isPublicRoute) {
//     return Response.redirect(new URL(LOGIN, nextUrl));
//   }
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { authConfig } from "./auth.config";
import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest) => {
  const { nextUrl } = req;

  // ✅ NextAuth routes must be skipped, otherwise client gets HTML instead of JSON
  if (nextUrl.pathname.startsWith("/api/auth")) return;

  const isAuthenticated = !!(req as any).auth;

  const isPublicRoute =
    PUBLIC_ROUTES.find((route: string) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
