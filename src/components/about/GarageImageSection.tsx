import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "../Dialog";

export const garageImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMyuehKGonIes74bz4xrGZW8EGBqgWq7V7Yg&usqp=CAU";

function GarageImageSection() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}> Garaj Ko'rinishi</cite>
        <button className={styles.iconBtn} onClick={() => setIsOpenModal(true)}>
          <EditIcon color="primary" />
        </button>
      </legend>
      <picture className={styles.picture}>
        <img src={garageImage} alt="garage_image" className={styles.image} />
      </picture>

      <Dialog isOpenDialog={isOpenModal} setIsOpenDialog={setIsOpenModal}>
        <p>Hello</p>
      </Dialog>
    </fieldset>
  );
}

export default GarageImageSection;

const styles = {
  fieldset:
    "border w-full p-5 rounded-md border-black flex flex-col items-center",
  legend: "relative font-semibold text-[20px]",
  cite: "text-sky-500",
  iconBtn: "p-3 hover:bg-slate-100 rounded-full",
  picture: "relative w-[500px]  overflow-hidden rounded-lg",
  image: "w-full",
};
