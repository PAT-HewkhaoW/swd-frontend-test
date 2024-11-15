import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { cookieName, fallbackLng, supportedLngs } from "./app/i18n/setting";
import { useCookies } from "react-cookie";
import { useTranslation } from "./app/i18n/client";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)"],
};

export function middleware(req: NextRequest) {
  console.log(`middleware is working`);

  // let lng;
  // // ~ get language value from cookie
  // if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  // // ~ if no language from cookie, get from header
  // if (!lng) {
  //   lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  // }
  // // ~ if no language from header, set to default
  // if (!lng) {
  //   lng = fallbackLng;
  // }
  // // ! change lang to use form locale in cookies instead
  // // ~ Redirect
  // // if lng is not in languages redirect to page
  // // http://baseUrl/test -> http://baseUrl/[lng]/test
  if (
    !req.nextUrl.pathname.startsWith(`/swd-frontend-test`) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/swd-frontend-test${req.nextUrl.pathname}`, req.url));
  }
  // // if come from link
  // if (req.headers.has("referer")) {
  //   const refererHeader = req.headers.get("referer");
  //   if (refererHeader) {
  //     const refererUrl = new URL(refererHeader);
  //     const lngInReferer = supportedLngs.find((l) => refererUrl.pathname.startsWith(`/${l}`));
  //     const response = NextResponse.next();
  //     if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
  //     return response;
  //   }
  // }
  return NextResponse.next();
}
