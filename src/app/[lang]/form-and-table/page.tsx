"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";

import CForm from "../_components/formPage/form/Form";
import CTable from "../_components/formPage/table/Table";

export default function Form() {
  const [selectFormData, setSelectedFormData] = useState(null);

  const { t, i18n } = useTranslation(undefined, ["form"]);

  const handleEdit = (action: string, data) => {
    setSelectedFormData(data);
  };

  return (
    <>
      <div className="">{t("pageTitle")}</div>

      <CForm value={selectFormData} />
      <CTable onAction={handleEdit} />
    </>
  );
}
