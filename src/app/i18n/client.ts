"use client";

// ✅✅✅✅✅✅✅✅✅

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useCookies } from "react-cookie";
import { cookieName, getOptions, supportedLngs } from "./setting";
import { useEffect } from "react";

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
  });

export function useTranslation(lng?: string, ns?: string | string[]) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns);
  const { i18n } = ret;
  //   if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
  //     i18n.changeLanguage(lng);
  //   } else {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useEffect(() => {
  //       if (activeLng === i18n.resolvedLanguage) return;
  //       setActiveLng(i18n.resolvedLanguage);
  //     }, [activeLng, i18n.resolvedLanguage]);

  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useEffect(() => {
  //       if (!lng || i18n.resolvedLanguage === lng) return;
  //       i18n.changeLanguage(lng);
  //     }, [lng, i18n]);

  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useEffect(() => {
  //       if (cookies.locale === lng) return;
  //       setCookie(cookieName, lng, { path: "/" });
  //     }, [lng, cookies.locale]);
  //   }

  const currentLng = lng || cookies.locale || i18n.language;

  //  watch for cookie or props? change
  useEffect(() => {
    if (currentLng && i18n.language !== currentLng) {
      i18n.changeLanguage(currentLng);
    }
  }, [currentLng, i18n]);

  // sync cookie🍪
  useEffect(() => {
    if (cookies.locale !== currentLng) {
      setCookie(cookieName, currentLng, { path: "/" });
      console.log(currentLng);
    }
  }, [currentLng, cookies.locale, setCookie]);

  return ret;
}
