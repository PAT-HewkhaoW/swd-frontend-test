import cookie from "cookie";
import { IncomingMessage } from "http";

// export function setCookie(name: string, value: string, expire?: number) {
//   const expires = expire ? new Date(Date.now() + expire * 864e5).toUTCString() : null;

//   document.cookie = `${name}=${value}; ${
//     expires ? "expires=expires;" : ""
//   } path=/; SameSite=Strict; HttpOnly`;
// }

export function getServerCookie(req: IncomingMessage, name: string) {
  const cookies = req.headers?.cookie;

  if (cookies) {
    const parsedCookie = cookie.parse(cookies);
    return parsedCookie[name];
  }

  return null;
}
