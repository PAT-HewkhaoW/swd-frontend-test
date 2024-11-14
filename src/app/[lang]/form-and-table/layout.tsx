import React from "react";
import "@/app/styles/_base.scss";

export async function generateMetadata() {
  return {
    title: "Layout & Style",
    description: "",
  };
}

export default function FormPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page">
      <main>{children}</main>
    </div>
  );
}
