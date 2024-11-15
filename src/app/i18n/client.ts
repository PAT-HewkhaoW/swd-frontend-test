"use client";

// ✅✅✅✅✅✅✅✅✅

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useCookies } from "react-cookie";
import { cookieName, getOptions, supportedLngs } from "./setting";
import { useEffect, useState } from "react";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    preload: runsOnServerSide ? supportedLngs : [],
    detection: {
      order: ["cookie", "navigator", "htmlTag"],
      caches: ["cookie"],
    },
  });

export function useTranslation(lng?: string, ns?: string | string[]) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const [tReady, setTReady] = useState(false);

  const ret = useTranslationOrg(ns);
  const { i18n } = ret;

  const currentLng = lng || cookies.locale || i18n.language;
  console.log(
    `--------------------\ncurrentLngs : ${currentLng}\ncookie : ${cookies.locale}\ni18n : ${i18n.language}\n--------------------`
  );

  useEffect(() => {
    if (i18n.isInitialized) {
      setTReady(true);
    }
  }, [i18n.isInitialized]);

  //  watch for cookie or props? change
  useEffect(() => {
    if (tReady && currentLng && i18n.language !== currentLng) {
      console.log("set current ");

      i18n.changeLanguage(currentLng);
    }
  }, [currentLng, i18n, tReady]);

  // sync cookie🍪
  useEffect(() => {
    if (cookies.locale !== currentLng) {
      setCookie(cookieName, currentLng, { path: "/" });
    }
  }, [i18n, currentLng, cookies.locale, setCookie]);

  return ret;
}
