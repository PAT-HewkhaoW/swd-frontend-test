"use client";

// import { useClientTranslation } from "@/app/lib/i18n/client";
// import { Trans } from "react-i18next";
// import { useCookies } from "react-cookie";

import { supportedLngs } from "@/app/i18n/setting";
import { Select } from "antd";

import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const I18nSelect = ({ currentLang }: Readonly<{ currentLang: string }>) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { t, i18n } = useTranslation(undefined, "common");

  const handleLanguageChange = (selectedLanguage: string) => {
    // const segments = pathName.split("/").filter(Boolean);
    // if (supportedLngs.includes(segments[0])) {
    //   segments.shift();
    // }

    // const params = searchParams.toString();

    // const newPath = params
    //   ? `/${selectedLanguage}/${segments.join("/")}?${params}`
    //   : `/${selectedLanguage}/${segments.join("/")}`;

    // router.push(newPath);

    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <>
      <Select
        value={i18n.language}
        options={supportedLngs.map((lang: string) => ({
          label: t?.(lang),
          value: lang,
        }))}
        onChange={handleLanguageChange}
      ></Select>
    </>
  );
};

export default I18nSelect;
