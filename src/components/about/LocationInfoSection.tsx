/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "../Dialog";

function LocationInfoSection() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}> Manzil</cite>
        <button className={styles.iconBtn}>
          <EditIcon color="primary" />
        </button>
      </legend>
      <ul className={styles.ul}>
        <a href="">tg:@car_service</a>
        <a href="">location: Center</a>
      </ul>

      <Dialog isOpenDialog={isOpenModal} setIsOpenDialog={setIsOpenModal}>
        <p>Hello</p>
      </Dialog>
    </fieldset>
  );
}

export default LocationInfoSection;

const styles = {
  fieldset:
    "border w-full p-5 rounded-md border-black flex flex-col items-center",
  legend: "relative font-semibold text-[20px]",
  cite: "text-sky-500",
  iconBtn: "p-3 hover:bg-slate-100 rounded-full",
  ul: "flex flex-col gap-3 w-full ",
};
