"use client";

import initI18nextTranslation from "@/app/i18n";
import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";
import React from "react";

export default function TranslationProvider({
  children,
  lang,
  ns,
}: Readonly<{ children: React.ReactNode; lang: string; ns: string[] }>) {
  const i18n = createInstance();

  initI18nextTranslation(lang, ns);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
