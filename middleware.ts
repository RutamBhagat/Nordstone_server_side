export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/userPosts/:path*", "/photos/:path*", "/text/:path*"],
};
