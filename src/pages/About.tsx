import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "../components";

export const garageImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMyuehKGonIes74bz4xrGZW8EGBqgWq7V7Yg&usqp=CAU";

function About() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);

  return (
    <section className={styles.main}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <cite className={styles.cite}> Garaj Ko'rinishi</cite>
          <button
            className={styles.iconBtn}
            onClick={() => setIsOpenModal(true)}
          >
            <EditIcon color="primary" />
          </button>
        </legend>
        <picture className={styles.picture}>
          <img src={garageImage} alt="garage_image" className={styles.image} />
        </picture>
      </fieldset>

      <Dialog isOpenDialog={isOpenModal} setIsOpenDialog={setIsOpenModal}>
        <p>Hello</p>
      </Dialog>
    </section>
  );
}

export default About;

const styles = {
  main: "min-h-[100vh] flex flex-col p-10 items-center ",
  fieldset:
    "border w-full p-5 rounded-md border-black flex flex-col items-center",
  legend: "relative font-semibold text-[20px]",
  cite: "text-sky-500",
  iconBtn: "p-3 hover:bg-slate-100 rounded-full",
  picture: "relative w-[500px]  overflow-hidden rounded-lg",
  image: "w-full",
  input: "",
};
