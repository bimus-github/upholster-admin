import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "../Dialog";
function TelInfoSection() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}> Tel raqamlar</cite>
        <button className={styles.iconBtn}>
          <EditIcon color="primary" />
        </button>
      </legend>

      <ul className={styles.ul}>
        <a href="tel:+998 99 999 99 99">+998 99 999 99 99</a>
        <a href="tel:+998 99 999 99 99">+998 99 999 99 99</a>
      </ul>

      <Dialog isOpenDialog={isOpenModal} setIsOpenDialog={setIsOpenModal}>
        <p>Hello</p>
      </Dialog>
    </fieldset>
  );
}

export default TelInfoSection;

const styles = {
  fieldset:
    "border w-full p-5 rounded-md border-black flex flex-col items-center",
  legend: "relative font-semibold text-[20px]",
  cite: "text-sky-500",
  iconBtn: "p-3 hover:bg-slate-100 rounded-full",
  ul: "flex flex-col gap-3 w-full ",
};
