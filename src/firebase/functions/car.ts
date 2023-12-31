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

export const updateCarName = async (name: string, newName: string) => {
  try {
    const docRef = doc(db, collection_name, name);
    // our car name and id are the same, so we should update both id and name
    await updateDoc(docRef, {
      newName: newName,
    });
  } catch (error) {
    console.log("Error while updating car name: ", error);
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

      // find the service in the car
      const foundService = services.find((item) => item.name === service.name);

      if (foundService) {
        // updating the service from the car
        const updatedServices = services.map(({ name, items }) => {
          if (name === service.name) {
            return {
              name,
              items: [...items, service.items[0]],
            } as Car_Service_Type;
          } else {
            return { name, items };
          }
        });

        await updateDoc(docRef, {
          services: updatedServices,
        });
      } else {
        // adding the service to the car
        await updateDoc(docRef, {
          services: [...services, service],
        });
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such car!");
    }
    console.log("Service added to: ", name);
  } catch (error) {
    console.log("Error while adding service to car: ", error);
  }
};

export const updateBeforeImage = async ({
  carName,
  serviceName,
  beforeImage,
  itemId,
}: {
  carName: string;
  serviceName: string;
  beforeImage: string;
  itemId: string;
}) => {
  try {
    // getting the services from the car
    const docRef = doc(db, collection_name, carName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const services = docSnap.data().services as Car_Service_Type[];

      // find the service in the car
      const foundService = services.find((item) => item.name === serviceName);

      if (foundService) {
        // update before image of the item
        const updatedServices = services.map(({ name, items }) => {
          if (name === serviceName) {
            return {
              name,
              items: items.map((item) => {
                if (item.id === itemId) {
                  return {
                    ...item,
                    before: beforeImage,
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

        await updateDoc(docRef, {
          services: updatedServices,
        });
      } else {
        console.log("No such car!");
      }
    }
  } catch (error) {
    console.log("Error while updating before image: ", error);
  }
};

export const updateThenImage = async ({
  carName,
  serviceName,
  thenImage,
  itemId,
}: {
  carName: string;
  serviceName: string;
  thenImage: string;
  itemId: string;
}) => {
  try {
    // getting the services from the car
    const docRef = doc(db, collection_name, carName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const services = docSnap.data().services as Car_Service_Type[];

      // find the service in the car

      const foundService = services.find((item) => item.name === serviceName);

      if (foundService) {
        // update then image of the item
        const updatedServices = services.map(({ name, items }) => {
          if (name === serviceName) {
            return {
              name,
              items: items.map((item) => {
                if (item.id === itemId) {
                  return {
                    ...item,
                    then: thenImage,
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

        await updateDoc(docRef, {
          services: updatedServices,
        });
      } else {
        console.log("No such car!");
      }
    }
  } catch (error) {
    console.log("Error while updating then image: ", error);
  }
};

export const updateDescription = async ({
  carName,
  serviceName,
  description,
  itemId,
}: {
  carName: string;
  serviceName: string;
  description: string;
  itemId: string;
}) => {
  try {
    // getting the services from the car
    const docRef = doc(db, collection_name, carName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const services = docSnap.data().services as Car_Service_Type[];

      // find the service in the car
      const foundService = services.find((item) => item.name === serviceName);

      if (foundService) {
        // update description of the item
        const updatedServices = services.map(({ name, items }) => {
          if (name === serviceName) {
            return {
              name,
              items: items.map((item) => {
                if (item.id === itemId) {
                  return {
                    ...item,
                    description,
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

        await updateDoc(docRef, {
          services: updatedServices,
        });
      } else {
        console.log("No such car!");
      }
    } else {
      console.log("No such car!");
    }
  } catch (error) {
    console.log("Error while updating description: ", error);
  }
};

export const updatePrice = async ({
  carName,
  serviceName,
  price,
  itemId,
}: {
  carName: string;
  serviceName: string;
  price: string;
  itemId: string;
}) => {
  try {
    // getting the services from the car
    const docRef = doc(db, collection_name, carName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const services = docSnap.data().services as Car_Service_Type[];

      // find the service in the car
      const foundService = services.find((item) => item.name === serviceName);

      if (foundService) {
        // update price of the item
        const updatedServices = services.map(({ name, items }) => {
          if (name === serviceName) {
            return {
              name,
              items: items.map((item) => {
                if (item.id === itemId) {
                  return {
                    ...item,
                    price,
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

        await updateDoc(docRef, {
          services: updatedServices,
        });
      } else {
        console.log("No such car!");
      }
    } else {
      console.log("No such car!");
    }
  } catch (error) {
    console.log("Error while updating price: ", error);
  }
};

export const deleteItem = async ({
  carName,
  serviceName,
  itemId,
}: {
  carName: string;
  serviceName: string;
  itemId: string;
}) => {
  try {
    // getting the services from the car
    const docRef = doc(db, collection_name, carName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const services = docSnap.data().services as Car_Service_Type[];

      // find the service in the car

      const foundService = services.find((item) => item.name === serviceName);

      if (foundService) {
        // delete the item
        const updatedServices = services.map(({ name, items }) => {
          if (name === serviceName) {
            return {
              name,
              items: items.filter((item) => item.id !== itemId),
            } as Car_Service_Type;
          } else {
            return { name, items };
          }
        });

        await updateDoc(docRef, {
          services: updatedServices,
        });
      } else {
        console.log("No such car!");
      }
    } else {
      console.log("No such car!");
    }
  } catch (error) {
    console.log("Error while deleting item: ", error);
  }
};
