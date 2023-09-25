import { createSlice } from "@reduxjs/toolkit";
import { Address_Type, Info_Type } from "../../types";

const intialState: Info_Type = {
  garageImage: "",
  number: [""],
  address: [
    {
      name: "",
      url: "",
    },
  ],
};

const infoSlice = createSlice({
  name: "info",
  initialState: intialState,
  reducers: {
    set: (state, action: { payload: Info_Type }) => {
      state = action.payload;
    },
    setGarageImage: (state, action: { payload: string }) => {
      state.garageImage = action.payload;
    },
    setNumbers: (state, action: { payload: string[] }) => {
      state.number = action.payload;
    },
    setAddress: (state, action: { payload: Address_Type[] }) => {
      state.address = action.payload;
    },
    addNumber: (state, action: { payload: string }) => {
      state.number.push(action.payload);
    },
    addAddress: (state, action: { payload: Address_Type }) => {
      state.address.push(action.payload);
    },
    removeAddress: (state, action: { payload: string }) => {
      state.address = state.address.filter(
        (item) => item.url !== action.payload
      );
    },
    removeNumber: (state, action: { payload: string }) => {
      state.number = state.number.filter((item) => item !== action.payload);
    },
  },
});

export const infoActions = infoSlice.actions;
export default infoSlice.reducer;
