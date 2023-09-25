import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "..";

const collection_name = "info";

export const setGarageImage = async (url: string) => {
  try {
    await setDoc(doc(db, collection_name, "garageImage"), {
      url,
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
      return null;
    }
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    console.log(err);
  }
};
