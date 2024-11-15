import React, { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import "./table.scss";

import { deleteMany, getAll } from "@/app/stores/slice/formSlice";
import { useDispatch, useSelector } from "react-redux";

import { Table, TableProps, Button, Checkbox, CheckboxProps } from "antd";
import { formatPhoneNumber } from "../form/phoneFormatter";

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];

type FieldType = {
  title?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  nationality?: string;
  citizenId?: string;
  gender?: string;
  mobileCode?: string;
  mobilePhone?: string;
  passportNo?: string;
  expectedSalary?: number;
};

interface DataType extends FieldType {
  key: string;
}

interface TableDataProps {
  onAction: (action: string, data: DataType) => void;
}

export default function CTable({ onAction }: TableDataProps) {
  const dispatch = useDispatch();
  const formDataList = useSelector(getAll);

  const data: DataType[] = formDataList.map((item, index) => ({
    ...item,
  }));

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { t } = useTranslation(undefined, "form");

  const columns = [
    {
      titleKey: "table.name",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: DataType) =>
        `${t((record?.title as string) || "")} ${record.firstName} ${record.lastName}`,
    },
    {
      titleKey: "table.gender",
      dataIndex: "gender",
      key: "gender",
      render: (_: string, record: DataType) => t(record.gender as string),
    },
    {
      titleKey: "table.mobilePhone",
      dataIndex: "mobilePhone",
      key: "mobilePhone",
      render: (_: string, record: DataType) =>
        formatPhoneNumber(record.mobileCode?.toString() as string, record.mobilePhone as string) ||
        "",
    },
    {
      titleKey: "table.nationality",
      dataIndex: "nationality",
      key: "nationality",
      render: (_: string, record: DataType) => t(record.nationality as string),
    },
    {
      titleKey: "table.manage",
      dataIndex: "manage",
      key: "manage",
      render: (_: string, record: DataType) => (
        <>
          <span className="table--manage-ctn">
            <Button onClick={() => onEditItem(record)} variant="text">
              {t("actionButton.edit")}
            </Button>
            <Button onClick={() => onDeleteItem(record)} variant="text">
              {t("actionButton.delete")}
            </Button>
          </span>
        </>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: string) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onSelectAllChange: CheckboxProps["onChange"] = (e) => {
    if (e.target.checked) {
      setSelectedRowKeys(data.map((item) => item.key));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const onDeleteItem = (data: DataType) => {
    const key = data.key;
    dispatch(deleteMany([key]));
    setSelectedRowKeys(selectedRowKeys.filter((selected) => selected != key));
  };

  const onDeleteItems = () => {
    dispatch(deleteMany(selectedRowKeys));
    setSelectedRowKeys([]);
  };

  const onEditItem = (data: DataType) => {
    onAction("edit", data);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <div className="container">
        <div className="">
          <Checkbox onChange={onSelectAllChange}> {t("actionButton.selectAll")}</Checkbox>
          <Button onClick={onDeleteItems}> {t("actionButton.delete")}</Button>
        </div>
        <Table
          dataSource={data}
          columns={columns.map((col) => ({ ...col, title: t(col.titleKey) }))}
          rowSelection={rowSelection}
          pagination={{
            position: ["topRight"],
            locale: {
              prev_page: t("table.prev"),
              next_page: t("table.next"),
            },
          }}
          rowKey="key"
        ></Table>
      </div>
    </>
  );
}
