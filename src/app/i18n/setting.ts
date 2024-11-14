export const fallbackLng = "en";
export const supportedLngs = [fallbackLng, "th"];
export const defaultNS = "common";
export const cookieName = "locale";

export function getOptions(lng: string = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    lng: lng,
    supportedLngs: supportedLngs,
    fallbackLng,
    defaultNS,
    fallbackNs: defaultNS,
    ns: ns,
    interpolation: {
      escapeValue: false,
    },
  };
}
