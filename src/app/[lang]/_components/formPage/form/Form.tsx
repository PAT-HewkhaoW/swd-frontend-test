import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/app/i18n/client";
import { RootState } from "@/app/stores/store";
import { post, resetFormData, updateOne } from "@/app/stores/slice/formSlice";
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
      const confirmed = confirm("test");

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
              label={t("title")}
              name="title"
              rules={[{ required: true, message: t("titleHelp") }]}
              className={style["form-hug"]}
            >
              <Select
                placeholder={t("titlePlaceholder")}
                options={titleOptions.map((title) => ({
                  label: t(title.labelKey),
                  value: title.value,
                }))}
                className={style.mySelect}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("firstName")}
              name="firstName"
              rules={[{ required: true, message: t("firstNameHelp") }]}
              className={style["form-fluid"]}
            >
              <Input placeholder={t("firstNamePlaceholder")}></Input>
            </Form.Item>

            <Form.Item<FieldType>
              label={t("lastName")}
              name="lastName"
              rules={[{ required: true, message: t("lastNameHelp") }]}
              className={style["form-fluid"]}
            >
              <Input placeholder={t("lastNamePlaceholder")}></Input>
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              label={t("birthDate")}
              name="birthDate"
              rules={[{ required: true, message: t("birthDateHelp") }]}
            >
              <DatePicker
                value={form.getFieldValue("birthDate")}
                placeholder={t("birthDatePlaceholder")}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={t("nationality")}
              name="nationality"
              rules={[{ required: true, message: t("nationalityHelp") }]}
            >
              <Select
                placeholder={t("nationalityPlaceholder")}
                options={nationalityOptions.map((nationality) => ({
                  value: nationality.value,
                  label: t(nationality.labelKey),
                }))}
                className={style.mySelect}
              />
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              label={t("citizenId")}
              name="citizenId"
              rules={[
                { required: true, message: t("citizenIdHelp") },
                {
                  validator: (_, value) => {
                    if (!value || value.length !== 13) {
                      return Promise.reject("Citizen ID must be exactly 13 characters.");
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
              label={t("gender")}
              name="gender"
              rules={[{ required: true, message: t("genderHelp") }]}
            >
              <Radio.Group>
                {genderOptions.map((gender, index) => (
                  <Radio key={index} value={gender.value}>
                    {t(gender.labelKey)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              name="mobilePhone"
              label={t("mobilePhone")}
              rules={[{ required: true, message: "" }]}
            >
              <Space className={style["form-space"]}>
                <Form.Item<FieldType>
                  name="mobileCode"
                  rules={[{ required: true, message: t("mobileCodeHelp") }]}
                  style={{ marginBottom: "0" }}
                >
                  <Select
                    options={mobileCodeOptions.map((code) => ({
                      value: code.value,
                      label: (
                        <div className={style["flag-option-container"]}>
                          <Flag size={16} country={code.labelKey.toUpperCase()} />
                          {t(`options.${code.labelKey}`)}
                        </div>
                      ),
                    }))}
                    className={style.mySelect}
                  />
                </Form.Item>
                <div>-</div>
                <Form.Item<FieldType>
                  name="mobilePhone"
                  rules={[{ required: true, message: t("mobilePhoneHelp") }]}
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
              label={t("passportNo")}
              rules={[{ required: true, message: t("passportNoHelp") }]}
            >
              <Input maxLength={9} />
            </Form.Item>
          </div>

          <div className={style["form-group"]}>
            <Form.Item<FieldType>
              name="expectedSalary"
              label={t("expectedSalary")}
              rules={[{ required: true, message: t("expectedSalaryHelp") }]}
            >
              <Input type="number" className={style["input-number"]} />
            </Form.Item>

            <Form.Item label={null}>
              <Button onClick={() => handleResetForm()}>{t("resetBtn")}</Button>
            </Form.Item>
            <Form.Item label={null}>
              <Button htmlType="submit">{t("submitBtn")}</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
