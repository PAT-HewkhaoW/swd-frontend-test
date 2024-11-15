"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import "./FormAndTable.scss";

import CForm from "../_components/formPage/form/Form";
import CTable from "../_components/formPage/table/Table";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Form() {
  const [isClient, setIsClient] = useState(false);
  const [selectFormData, setSelectedFormData] = useState(null);
  const { t } = useTranslation(undefined, ["form"]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEdit = (action: string, data) => {
    setSelectedFormData(data);
  };

  if (!isClient) {
    return (
      <Spin
        indicator={<LoadingOutlined spin style={{ fontSize: 48 }} />}
        style={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="page-title">{t("pageTitle")}</div>

        <div className="form-and-table-container">
          <CForm value={selectFormData} />
          <CTable onAction={handleEdit} />
        </div>
      </div>
    </>
  );
}
