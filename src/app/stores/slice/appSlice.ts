import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type StateProps = {
  counter: number;
};

const initialValue: StateProps = { counter: 0 };

const appSlice = createSlice({
  name: "app",
  initialState: initialValue,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
  },
});

export default appSlice.reducer;
export const { increment, decrement } = appSlice.actions;
export const appSelector = (state: RootState) => state.appReducer;
