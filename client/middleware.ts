import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userType = req.cookies.get("userType")?.value;
  console.log("logging from middleware: ",userType);
   
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (userType !== "seller") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/(.*)"],
};

