export type About_Type = {
  garageImage: string;
  number1: string;
  number2: string;
  telegram: string;
  location: string;
};

export type SERVICES = string[];

export type CARS = string[];

export type Service_Type = {
  name: string;
  images: string[];
  description: string;
};

export type Car_Type = {
  name: string;
  services: Car_Service_Type[];
};

export type Car_Service_Type = {
  name: string;
  items: {
    price: string;
    before: string;
    then: string;
  }[];
};