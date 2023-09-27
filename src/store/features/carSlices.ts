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
    updateBeforeImage(
      state,
      action: {
        payload: {
          carName: string;
          serviceName: string;
          beforeImage: string;
          itemId: string;
        };
      }
    ) {
      // getting index of car
      const index = state.findIndex(
        (item) => item.name === action.payload.carName
      );

      const services = state[index].services;

      // find the service in the car
      const foundService = services.find(
        (item) => item.name === action.payload.serviceName
      );

      if (foundService) {
        // updating the before image of item in the services
        const updatedServices = services.map(({ name, items }) => {
          if (name === action.payload.serviceName) {
            return {
              name,
              items: items.map((item) => {
                if (item.id === action.payload.itemId) {
                  return {
                    ...item,
                    beforeImage: action.payload.beforeImage,
                  };
                } else {
                  return item;
                }
              }),
            } as Car_Service_Type;
          } else {
            return { name, items };
          }
        });

        state[index].services = updatedServices;
      } else {
        return state;
      }
    },
    updateThenImfer(
      state,
      action: {
        payload: {
          carName: string;
          serviceName: string;
          thenImage: string;
          itemId: string;
        };
      }
    ) {
      // getting index of car
      const index = state.findIndex(
        (item) => item.name === action.payload.carName
      );

      const services = state[index].services;

      // find the service in the car
      const foundService = services.find(
        (item) => item.name === action.payload.serviceName
      );

      if (foundService) {
        // updating the then image of item in the services
        const updatedServices = services.map(({ name, items }) => {
          if (name === action.payload.serviceName) {
            return {
              name,
              items: items.map((item) => {
                if (item.id === action.payload.itemId) {
                  return {
                    ...item,
                    thenImage: action.payload.thenImage,
                  };
                } else {
                  return item;
                }
              }),
            } as Car_Service_Type;
          } else {
            return { name, items };
          }
        });

        state[index].services = updatedServices;
      } else {
        return state;
      }
    },
    updateDescription(
      state,
      action: {
        payload: {
          carName: string;
          serviceName: string;
          description: string;
          itemId: string;
        };
      }
    ) {
      // getting index of car
      const index = state.findIndex(
        (item) => item.name === action.payload.carName
      );

      const services = state[index].services;

      // find the service in the car
      const foundService = services.find(
        (item) => item.name === action.payload.serviceName
      );

      if (foundService) {
        // updating the description of item in the services
        const updatedServices = services.map(({ name, items }) => {
          if (name === action.payload.serviceName) {
            return {
              name,
              items: items.map((item) => {
                if (item.id === action.payload.itemId) {
                  return {
                    ...item,
                    description: action.payload.description,
                  };
                } else {
                  return item;
                }
              }),
            } as Car_Service_Type;
          } else {
            return { name, items };
          }
        });

        state[index].services = updatedServices;
      } else {
        return state;
      }
    },
    updatePrice(
      state,
      action: {
        payload: {
          carName: string;
          serviceName: string;
          price: string;
          itemId: string;
        };
      }
    ) {
      // getting index of car
      const index = state.findIndex(
        (item) => item.name === action.payload.carName
      );

      const services = state[index].services;

      // find the service in the car
      const foundService = services.find(
        (item) => item.name === action.payload.serviceName
      );

      if (foundService) {
        // updating the price of item in the services
        const updatedServices = services.map(({ name, items }) => {
          if (name === action.payload.serviceName) {
            return {
              name,
              items: items.map((item) => {
                if (item.id === action.payload.itemId) {
                  return {
                    ...item,
                    price: action.payload.price,
                  };
                } else {
                  return item;
                }
              }),
            } as Car_Service_Type;
          } else {
            return { name, items };
          }
        });

        state[index].services = updatedServices;
      } else {
        return state;
      }
    },
  },
});

export const carActions = carSlices.actions;

export default carSlices.reducer;
