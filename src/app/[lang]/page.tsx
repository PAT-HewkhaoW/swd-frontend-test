import style from "./page.module.scss";

import initI18nextTranslation from "../i18n/index";
import Link from "next/link";

export default async function Home({ params: { lang } }: Readonly<{ params: { lang: string } }>) {
  const { t: t } = await initI18nextTranslation(lang as string, ["common", "form"]);
  const items = [
    {
      number: 1,
      href: "layout-and-style",
    },
    {
      number: 2,
      href: "form-and-table",
    },
  ];

  return (
    <div className={style.page}>
      <div className={style.main}>
        <div className={style["item-container"]}>
          {items.map((item, index) => {
            return (
              <div key={index} className={style["test-item"]}>
                <Link href={`/${lang}/${item.href}`}>
                  <div className={style.title}>{t("test-title", { num: index + 1 })}</div>
                  <div className={style.description}>{t(`test${index + 1}desc`)}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps({ locale }: { locale: string }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// }
