"use client";

import style from "./page.module.scss";
import Link from "next/link";
import { useTranslation } from "../i18n/client";
import { useEffect, useState } from "react";

export function Home() {
  const { t, i18n } = useTranslation(undefined, ["common", "form"]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient) {
    return null;
  }

  return (
    <div className={style.page}>
      <div className={style.main}>
        <div className={style["item-container"]}>
          {items.map((item, index) => {
            return (
              <div key={index} className={style["test-item"]}>
                <Link href={`/${item.href}`}>
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

export default function Page() {
  return <Home />;
}
