export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/photos/:path*", "/text/:path*"],
};
