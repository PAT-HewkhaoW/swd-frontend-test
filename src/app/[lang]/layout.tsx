import type { Metadata } from "next";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { supportedLngs } from "../i18n/setting";

import style from "./page.module.scss";
import "../styles/_globals.scss";

import ReduxProvider from "./_components/providers/ReduxProvider";
const I18nSelect = dynamic(() => import("./_components/common/select"), { ssr: false });

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Home",
  description: "",
};

export async function generateStaticParams() {
  return supportedLngs.map((lng: string) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: string;
  };
}>) {
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <div className={style["language-switcher"]}>
            <I18nSelect currentLang={lang} />
          </div>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
