import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/app/i18n/client";
import { RootState } from "@/app/stores/store";
import { post, updateOne } from "@/app/stores/slice/formSlice";
import style from "./form.module.scss";

import { Button, DatePicker, Form, FormProps, Input, Radio, Select, Space } from "antd";
import Flag from "react-flagkit";
import CitizenIdInput from "./IdInput/CitizenIdInput";
import PhoneInput from "./phoneInput/PhoneInput";
import moment, { Moment } from "moment";

type FieldType = {
  title?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string | Moment;
  nationality?: string;
  citizenId?: string;
  gender?: string;
  mobileCode?: string;
  mobilePhone?: string;
  passportNo?: string;
  expectedSalary?: number;
  key?: string;
};

interface FormDataProps {
  value: FieldType | null;
}

const titleOptions = [
  {
    labelKey: "Mr",
    value: "Mr",
  },
  {
    labelKey: "Ms",
    value: "Ms",
  },
  {
    labelKey: "Mrs",
    value: "Mrs",
  },
];

const nationalityOptions = [
  {
    labelKey: "thai",
    value: "thai",
  },
  {
    labelKey: "french",
    value: "french",
  },
  {
    labelKey: "american",
    value: "american",
  },
];

const genderOptions = [
  {
    labelKey: "male",
    value: "male",
  },
  {
    labelKey: "female",
    value: "female",
  },
  {
    labelKey: "unsex",
    value: "unsex",
  },
];

const mobileCodeOptions = [
  {
    labelKey: "th",
    value: "th",
  },
  {
    labelKey: "fr",
    value: "fr",
  },
  {
    labelKey: "us",
    value: "us",
  },
];

export default function CForm({ value }: FormDataProps) {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.data);
  const getForm = useSelector((state: RootState) => state.form.formData);

  const [form] = Form.useForm<FieldType>();
  const { t, i18n } = useTranslation(undefined, "form");

  // post
  const handlePostSubmit = (formData: FieldType) => {
    const { birthDate } = formData;

    dispatch(post({ ...formData, birthDate: birthDate?.toString() }));
  };

  // updateOne
  const handleUpdateSubmit = (id: string, formData: FieldType) => {
    dispatch(
      updateOne({ id, newData: { ...formData, birthDate: formData.birthDate?.toString() } })
    );
  };

  // resetForm
  const handleResetForm = () => {
    form.resetFields();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (value: FieldType) => {
    const id = form.getFieldValue("key");

    if (id) {
      console.log("update");
      const confirmed = confirm(t("dialog.editSave"));

      if (confirmed) {
        handleUpdateSubmit(id, { ...value, key: id });
        form.resetFields();
      }
    } else {
      console.log("create");
      handlePostSubmit(value);
      form.resetFields();
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (value) {
      console.log(value.key);

      form.setFieldsValue({ ...value, birthDate: moment(value.birthDate) });
    }
  }, [value, form]);

  return (
    <div className={style["form-wrapper"]}>
      <div className={style["form-container"]}>
        <Form
          form={form}
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              label={t("label.title")}
              name="title"
              rules={[{ required: true, message: t("help.title") }]}
              className={style["form-hug"]}
            >
              <Select
                placeholder={t("placeholder.title")}
                options={titleOptions.map((title) => ({
                  label: t(`options.title.${title.labelKey}`),
                  value: title.value,
                }))}
                className={style.mySelect}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("label.firstName")}
              name="firstName"
              rules={[{ required: true, message: t("help.firstName") }]}
              className={style["form-fluid"]}
            >
              <Input placeholder={t("placeholder.firstName")}></Input>
            </Form.Item>

            <Form.Item<FieldType>
              label={t("label.lastName")}
              name="lastName"
              rules={[{ required: true, message: t("help.lastName") }]}
              className={style["form-fluid"]}
            >
              <Input placeholder={t("placeholder.lastName")}></Input>
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              label={t("label.birthDate")}
              name="birthDate"
              rules={[{ required: true, message: t("help.birthDate") }]}
            >
              <DatePicker
                value={form.getFieldValue("birthDate")}
                placeholder={t("placeholder.birthDate")}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("label.nationality")}
              name="nationality"
              rules={[{ required: true, message: t("help.nationality") }]}
            >
              <Select
                placeholder={t("placeholder.nationality")}
                options={nationalityOptions.map((nationality) => ({
                  value: nationality.value,
                  label: t(`options.nationality.${nationality.labelKey}`),
                }))}
                className={style.mySelect}
              />
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              label={t("label.citizenId")}
              name="citizenId"
              rules={[
                { required: true, message: t("help.citizenId") },
                {
                  validator: (_, value) => {
                    if (!value || value.length !== 13) {
                      return Promise.reject(t("help.citizenIdIndexes"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <CitizenIdInput
                value={form.getFieldValue("citizenId")}
                onchange={(newVal) => form.setFieldValue("citizenId", newVal)}
              />
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              label={t("label.gender")}
              name="gender"
              rules={[{ required: true, message: t("help.gender") }]}
            >
              <Radio.Group>
                {genderOptions.map((gender, index) => (
                  <Radio key={index} value={gender.value}>
                    {t(`options.gender.${gender.labelKey}`)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              name="mobilePhone"
              label={t("label.mobilePhone")}
              rules={[{ required: true, message: "" }]}
            >
              <Space className={style["form-space"]}>
                <Form.Item<FieldType>
                  name="mobileCode"
                  rules={[{ required: true, message: t("help.mobileCode") }]}
                  style={{ marginBottom: "0" }}
                >
                  <Select
                    options={mobileCodeOptions.map((code) => ({
                      value: code.value,
                      label: (
                        <div className={style["flag-option-container"]}>
                          <Flag size={16} country={code.labelKey.toUpperCase()} />
                          {t(`options.mobileCode.${code.labelKey}`)}
                        </div>
                      ),
                    }))}
                    className={style.mySelect}
                    placeholder={t("placeholder.mobileCode")}
                  />
                </Form.Item>
                <div>-</div>
                <Form.Item<FieldType>
                  name="mobilePhone"
                  rules={[{ required: true, message: t("help.mobilePhone") }]}
                  style={{ marginBottom: "0" }}
                >
                  <PhoneInput
                    value=""
                    country={form.getFieldValue("mobileCode")}
                    onchange={(newVal) => form.setFieldValue("mobilePhone", newVal)}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              name="passportNo"
              label={t("label.passportNo")}
              rules={[{ required: true, message: t("help.passportNo") }]}
            >
              <Input maxLength={9} placeholder={t("placeholder.passportNo")} />
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              name="expectedSalary"
              label={t("label.expectedSalary")}
              rules={[{ required: true, message: t("help.expectedSalary") }]}
            >
              <Input
                type="number"
                className={style["input-number"]}
                placeholder={t("placeholder.expectedSalary")}
                max={10000000}
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button onClick={() => handleResetForm()}>{t("actionButton.reset")}</Button>
            </Form.Item>
            <Form.Item label={null}>
              <Button htmlType="submit">{t("actionButton.submit")}</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
