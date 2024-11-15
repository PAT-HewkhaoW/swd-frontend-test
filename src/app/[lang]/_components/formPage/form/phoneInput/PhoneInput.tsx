import React from "react";
import { Input } from "antd";
import { useTranslation } from "@/app/i18n/client";

interface PhoneInputProps {
  value: string;
  onchange: (value: string) => void;
  country: "us" | "fr" | "th" | "";
}

// const commonRegex: string = `^d{10}$`;
// const usRegex: string = `^d{10}$`;
// const frRegex: string = `^0[1-5|6-7]d{8}$`;
// const thRegex: string = `^(0[2-9]d{8}|09d{8})$`;

export default function PhoneInput({ value, onchange, country }: PhoneInputProps) {
  const { t } = useTranslation(undefined, "form");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace("/D/g", "");
    let formatted = "";

    formatted = input.replace(/\D/g, "").slice(0, 10);

    if (formatted.length == 10) {
      if (country == "" || country == null) {
        formatted = formatted;
      } else if (country == "us") {
        const usPhoneRegex = /^[2-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/;
        if (!usPhoneRegex.test(formatted)) {
          formatted = "";
        }
      } else if (country == "fr") {
        const frPhoneRegex = /^0[1-9]{1}[0-9]{8}$/;
        if (!frPhoneRegex.test(formatted)) {
          formatted = "";
        }
      } else if (country == "th") {
        const thPhoneRegex = /^(08|09|06)[0-9]{8}$/;
        if (!thPhoneRegex.test(formatted)) {
          formatted = "";
        }
      }

      onchange(formatted);
    }
  };

  return (
    <>
      <Input
        value={value}
        maxLength={10}
        onChange={handleInputChange}
        placeholder={t("placeholder.mobilePhone")}
      />
    </>
  );
}
