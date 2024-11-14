import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const url = req.url ? new URL(req.url) : null;

  const lang = url?.searchParams.get("lang");

  //   document.cookie = `locale=${lang}; path=/; samesite=strict`;

  const expires = new Date();
  expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);

  if (lang) {
    return new Response(null, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `locale=${lang}; expires=${expires.toUTCString()}; Path=/; SameSite=Strict; HttpOnly`,
      },
    });
  }
}
