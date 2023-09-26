import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "..";
import { Address_Type } from "../../types";

const collection_name = "info";

export const setGarageImage = async (url: string) => {
  try {
    await setDoc(doc(db, collection_name, "garageImage"), {
      url,
    });
  } catch (err) {
    console.log("Error while setting garage image: ", err);
  }
};

export const getGarageImage = async () => {
  try {
    const docRef = doc(db, collection_name, "garageImage");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (err) {
    console.log("Error while getting garage image: ", err);
  }
};

export const addTelNumber = async (number: string) => {
  try {
    const docRef = doc(db, collection_name, "number");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const newNumber = [...docSnap.data().number, number];

      await updateDoc(docRef, {
        number: newNumber,
      });

      console.log("number added");
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (err) {
    console.log("Error while adding number: ", err);
  }
};

export const getTelNumbers = async () => {
  try {
    const docRef = doc(db, collection_name, "number");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as { number: string[] };
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (err) {
    console.log("Error while getting numbers: ", err);
  }
};

export const deleteTelNumber = async (number: string) => {
  try {
    const docRef = doc(db, collection_name, "number");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data() as { number: string[] };
      const newNumber = data.number.filter((item) => item !== number);

      await updateDoc(docRef, {
        number: newNumber,
      });
    }
  } catch (err) {
    console.log("Error while deleting number: ", err);
  }
};

export const addAddress = async (address: Address_Type) => {
  try {
    const docRef = doc(db, collection_name, "address");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const newAddress = [...docSnap.data().address, address];

      await updateDoc(docRef, {
        address: newAddress,
      });
    }
  } catch (err) {
    console.log("Error while adding address: ", err);
  }
};

export const getAddress = async () => {
  try {
    const docRef = doc(db, collection_name, "address");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as { address: Address_Type[] };
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (err) {
    console.log("Error while getting address: ", err);
  }
};

export const deleteAddress = async (url: string) => {
  try {
    const docRef = doc(db, collection_name, "address");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data() as { address: Address_Type[] };
      const newAddress = data.address.filter((item) => item.url !== url);

      await updateDoc(docRef, {
        address: newAddress,
      });
    }
  } catch (err) {
    console.log("Error while deleting address: ", err);
  }
};
