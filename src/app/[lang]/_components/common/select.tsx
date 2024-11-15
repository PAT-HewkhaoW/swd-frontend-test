"use client";

import { supportedLngs } from "@/app/i18n/setting";
import { Select, Button } from "antd";

import { useTranslation } from "@/app/i18n/client";
import { useCookies } from "react-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const I18nSelect = () => {
  const { t, i18n } = useTranslation(undefined, "common");
  const [cookies, setCookie] = useCookies(["locale"]);
  const pathname = usePathname();
  const router = useRouter();

  const isNotHomePage = pathname !== "/swd-frontend-test";

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    setCookie("locale", selectedLanguage, { path: "/" });
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <>
      <div style={{ display: "grid", rowGap: "16px" }}>
        <Select
          value={i18n.language}
          options={supportedLngs.map((lang: string) => ({
            label: t?.(lang),
            value: lang,
          }))}
          onChange={handleLanguageChange}
        ></Select>

        {isNotHomePage && <Button onClick={handleBackToHome}> {t("backToHone")}</Button>}
      </div>
    </>
  );
};

export default I18nSelect;
