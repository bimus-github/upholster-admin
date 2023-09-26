import { createSlice } from "@reduxjs/toolkit";
import { Service_Type } from "../../types";

const initialState: Service_Type[] = [];

export const serviceSlices = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (_, action: { payload: Service_Type[] }) => {
      return action.payload;
    },
    addService: (state, action: { payload: Service_Type }) => {
      state.push(action.payload);
    },
    removeService: (state, action: { payload: { name: string } }) => {
      const filteredData = state.filter(
        (item) => item.name !== action.payload.name
      );
      return filteredData;
    },
    updateService: (state, action: { payload: Service_Type }) => {
      const index = state.findIndex(
        (item) => item.name === action.payload.name
      );
      state[index] = action.payload;
    },
  },
});

export const serviceAction = serviceSlices.actions;

export default serviceSlices.reducer;
