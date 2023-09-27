import { createSlice } from "@reduxjs/toolkit";
import { Car_Service_Type, Car_Type } from "../../types";

const initialState: Car_Type[] = [];

export const carSlices = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: (state, action: { payload: Car_Type }) => {
      state.push(action.payload);
    },
    setCars: (_, action: { payload: Car_Type[] }) => {
      return action.payload;
    },
    deleteCar: (state, action: { payload: { name: string } }) => {
      const filteredData = state.filter(
        (item) => item.name !== action.payload.name
      );

      return filteredData;
    },
    addServiceToCar: (
      state,
      action: { payload: { name: string; service: Car_Service_Type } }
    ) => {
      // getting index of car
      const index = state.findIndex(
        (item) => item.name === action.payload.name
      );

      const services = state[index].services;

      // find the service in the car
      const foundService = services.find(
        (item) => item.name === action.payload.service.name
      );

      if (foundService) {
        // updating the service from the car
        const updatedServices = services.map(({ name, items }) => {
          if (name === action.payload.service.name) {
            return {
              name,
              items: [...items, action.payload.service.items[0]],
            } as Car_Service_Type;
          } else {
            return { name, items };
          }
        });

        state[index].services = updatedServices;
      } else {
        state[index].services.push(action.payload.service);
      }
    },
    updateServiceByCar: (
      state,
      action: { payload: { name: string; service: Car_Service_Type } }
    ) => {
      const index = state.findIndex(
        (item) => item.name === action.payload.name
      );
      state[index].services = state[index].services.map((item) => {
        if (item.name === action.payload.service.name) {
          return action.payload.service;
        } else {
          return item;
        }
      });
    },
    removeServiceByCar: (
      state,
      action: { payload: { name: string; serviceName: string } }
    ) => {
      const filteredData = state.filter(
        (item) => item.name !== action.payload.name
      );
      return filteredData;
    },
  },
});

export const carActions = carSlices.actions;

export default carSlices.reducer;
