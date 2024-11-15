"use client";

import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Moment } from "moment";

const runOnServerSide = typeof window !== "undefined";

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

interface DataStateProps {
  data: FieldType[];
  formData: FieldType;
}

const initialState: DataStateProps = {
  data:
    runOnServerSide && localStorage.getItem("formData")
      ? JSON.parse(localStorage.getItem("formData")!)
      : [],
  formData: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    resetFormData: (state) => {
      state.formData = {};
    },
    // getOne
    getOne: (state, action: PayloadAction<string>) => {
      const item = state.data.find((item) => item.key == action.payload);

      if (item) {
        state.formData = item;
      }
    },
    // getAll
    getAll: () => {},
    // post
    post: (state, action: PayloadAction<FieldType>) => {
      const newItem = { ...action.payload, key: nanoid() };
      state.data.push(newItem);
      localStorage.setItem("formData", JSON.stringify(state.data));
    },
    // update
    updateOne: (state, action: PayloadAction<{ id: string; newData: FieldType }>) => {
      const { id, newData } = action.payload;
      console.log(state.data.map((item) => ({ item })));

      const searchIndex = state.data.findIndex((item) => item.key == id);

      if (searchIndex === -1) {
        console.warn("Item Not Founded");
        state.formData = {};
      }

      if (searchIndex !== -1) {
        state.data = [
          ...state.data.slice(0, searchIndex),
          { ...state.data[searchIndex], ...newData },
          ...state.data.slice(searchIndex + 1),
        ];

        state.formData = {};
        localStorage.setItem("formData", JSON.stringify(state.data));
      } else {
        console.log("cannot find item");
        state.formData = {};
      }
    },
    // deleteOne
    deleteOne: (state, action: PayloadAction<number>) => {
      state.data.slice(action.payload, 1);
      localStorage.setItem("formData", JSON.stringify(state.data));
    },
    // deleteMany
    deleteMany: (state, action: PayloadAction<string[]>) => {
      const keys = action.payload;
      state.data = state.data.filter((item) => !keys.includes(item.key as string));
      localStorage.setItem("formData", JSON.stringify(state.data));
    },
  },
});

export const getAll = (state: RootState) => state.form.data;
export const getById = (id: string) => (state: RootState) =>
  state.form.data.find((item) => item.key == id);

export const { resetFormData, getOne, post, updateOne, deleteOne, deleteMany } = formSlice.actions;
export default formSlice.reducer;
