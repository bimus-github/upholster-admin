/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "../components";

export const garageImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMyuehKGonIes74bz4xrGZW8EGBqgWq7V7Yg&usqp=CAU";

function About() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

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

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <cite className={styles.cite}> Tel raqamlar</cite>
          <button className={styles.iconBtn}>
            <EditIcon color="primary" />
          </button>
        </legend>

        <ul className="flex flex-col gap-3 w-full ">
          <a href="tel:+998 99 999 99 99">+998 99 999 99 99</a>
          <a href="tel:+998 99 999 99 99">+998 99 999 99 99</a>
        </ul>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <cite className={styles.cite}> Manzil</cite>
          <button className={styles.iconBtn}>
            <EditIcon color="primary" />
          </button>
        </legend>
        <ul className="flex flex-col gap-3 w-full">
          <a href="">tg:@car_service</a>
          <a href="">location: Center</a>
        </ul>
      </fieldset>

      <Dialog isOpenDialog={isOpenModal} setIsOpenDialog={setIsOpenModal}>
        <p>Hello</p>
      </Dialog>
    </section>
  );
}

export default About;

const styles = {
  main: "min-h-[100vh] flex flex-col p-10 items-center gap-10",
  fieldset:
    "border w-full p-5 rounded-md border-black flex flex-col items-center",
  legend: "relative font-semibold text-[20px]",
  cite: "text-sky-500",
  iconBtn: "p-3 hover:bg-slate-100 rounded-full",
  picture: "relative w-[500px]  overflow-hidden rounded-lg",
  image: "w-full",
  input: "",
};
