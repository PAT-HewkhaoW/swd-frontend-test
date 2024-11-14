import { createInstance, i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { fallbackLng, supportedLngs } from "./setting";

export default async function initI18nextTranslation(
  locale: string,
  ns: string | string[],
  instance?: i18n
) {
  const i18nInstance = instance || createInstance();
  i18nInstance.use(initReactI18next);

  i18nInstance.use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`public/locales/${language}/${namespace}.json`)
    )
  );

  await i18nInstance.init({
    lng: locale,
    fallbackLng: fallbackLng,
    supportedLngs: supportedLngs,
    defaultNS: ns[0],
    fallbackNS: ns[0],
    ns: ns,
    interpolation: {
      escapeValue: false,
    },
  });

  return {
    i18n: i18nInstance,
    t: i18nInstance.t,
  };
}