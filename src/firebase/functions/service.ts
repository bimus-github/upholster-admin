import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { Service_Type } from "../../types";
import { db } from "..";

const colection_name = "services";

export const addService = async (service: Service_Type) => {
  try {
    const docRef = doc(db, colection_name, service.name);
    await setDoc(docRef, service);
    console.log("Service added");
  } catch (error) {
    console.log("Error while adding service: ", error);
  }
};

export const updateService = async (service: Service_Type) => {
  try {
    const docRef = doc(db, colection_name, service.name);
    await setDoc(docRef, service);
    console.log("Service updated");
  } catch (error) {
    console.log("Error while updating service: ", error);
  }
};

export const removeService = async (name: string) => {
  try {
    const docRef = doc(db, colection_name, name);
    await deleteDoc(docRef);
    console.log("Service removed");
  } catch (error) {
    console.log("Error while removing service: ", error);
  }
};

export const getServices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, colection_name));
    const services: Service_Type[] = [];

    if (querySnapshot.empty) {
      return null;
    }

    querySnapshot.forEach((doc) => {
      services.push(doc.data() as Service_Type);
    });
    return services;
  } catch (err) {
    console.log("Error while getting services: ", err);
  }
};
