import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Car_Service_Type, Car_Type } from "../../types";
import { db } from "..";

const collection_name = "cars";

export const getCars = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collection_name));
    const cars: Car_Type[] = [];

    if (querySnapshot.empty) {
      return null;
    }

    querySnapshot.forEach((doc) => {
      cars.push(doc.data() as Car_Type);
    });

    return cars;
  } catch (err) {
    console.log("Error while getting cars: ", err);
  }
};

export const addCar = async (car: Car_Type) => {
  try {
    const docRef = doc(db, collection_name, car.name);

    await setDoc(docRef, car);
  } catch (error) {
    console.log("Error while adding car: ", error);
  }
};

export const deleteCar = async (name: string) => {
  try {
    const docRef = doc(db, collection_name, name);

    await deleteDoc(docRef);
    console.log("Car removed");
  } catch (error) {
    console.log("Error while removing car: ", error);
  }
};

export const addServiceToCar = async ({
  name,
  service,
}: {
  name: string;
  service: Car_Service_Type;
}) => {
  try {
    // getting the services from the car
    const docRef = doc(db, collection_name, name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const services = docSnap.data().services as Car_Service_Type[];

      // adding the service to the car
      services.push(service);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such car!");
    }
    console.log("Service added to: ", name);
  } catch (error) {
    console.log("Error while adding service to car: ", error);
  }
};

export const updateServiceByCar = async ({
  name,
  service,
}: {
  name: string;
  service: Car_Service_Type;
}) => {
  try {
    // getting the services from the car
    const docRef = doc(db, collection_name, name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const services = docSnap.data().services as Car_Service_Type[];

      // updating the service from the car
      const updatedServices = services.map((item) => {
        if (item.name === service.name) {
          return service;
        } else {
          return item;
        }
      });

      await updateDoc(docRef, {
        services: updatedServices,
      });
    }
    console.log("Service updated to: ", name);
  } catch (error) {
    console.log("Error while updating service to car: ", error);
  }
};

export const deleteServiceFromCar = async ({
  name,
  serviceName,
}: {
  name: string;
  serviceName: string;
}) => {
  try {
    // getting the services from the car
    const docRef = doc(db, collection_name, name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const services = docSnap.data().services as Car_Service_Type[];

      // removing the service from the car
      await updateDoc(docRef, {
        services: services.filter((item) => item.name !== serviceName),
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such car!");
    }
  } catch (error) {
    console.log("Error while deleting service from car: ", error);
  }
};
