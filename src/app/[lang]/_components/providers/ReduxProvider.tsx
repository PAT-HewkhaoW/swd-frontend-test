"use client";

import { store } from "@/app/stores/store";
import React from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Provider store={store}>{children}</Provider>;
}
