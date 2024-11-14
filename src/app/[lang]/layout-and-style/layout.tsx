import React from "react";
import "@/app/styles/_base.scss";
export async function generateMetadata() {
  return {
    title: "Form & Table",
    description: "",
  };
}

export default function LayoutPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <main>{children}</main>
    </div>
  );
}
