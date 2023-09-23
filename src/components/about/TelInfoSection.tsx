import React, { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Dialog from "../Dialog";
import Modal from "../Modal";
import { typeText } from "../../unils/functions/typeText";
function TelInfoSection() {
  const telRef = useRef<HTMLAnchorElement>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    typeText(telRef, 50);
  }, []);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}> Tel raqamlar</cite>
        <button
          className={styles.iconBtn}
          onClick={() => setIsOpenAddDialog(true)}
        >
          <AddCircleIcon color="primary" />
        </button>
      </legend>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <a href="tel:+998 99 999 99 99" ref={telRef}>
            +998 99 999 99 99
          </a>
          <button
            onClick={() => setIsOpenDeleteDialog(true)}
            className={`${styles.iconBtn} text-red-500`}
          >
            <DeleteIcon />
          </button>
        </li>
      </ul>

      <Dialog
        handleYes={() => setIsOpenModal(true)}
        isOpenDialog={isOpenAddDialog}
        setIsOpenDialog={setIsOpenAddDialog}
      >
        <div>
          <p>Haqiqatdan ham telefon raqam qo'shmoqchimsz?</p>
        </div>
      </Dialog>
      <Dialog
        handleYes={() => setIsOpenModal(true)}
        isOpenDialog={isOpenDeleteDialog}
        setIsOpenDialog={setIsOpenDeleteDialog}
      >
        <div>
          <p>Haqiqatdan ham telefon raqam qo'shmoqchimsz?</p>
        </div>
      </Dialog>

      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div>
          <p>Haqiqatdan ham telefon raqamlarni o'zgartirmoqchimsz?</p>
        </div>
      </Modal>
    </fieldset>
  );
}

export default TelInfoSection;

const styles = {
  fieldset:
    "border w-full p-5 rounded-md border-black flex flex-col items-center",
  legend:
    "relative font-semibold text-[20px] flex gap-2 justify-center items-center",
  cite: "text-sky-500",
  iconBtn: "p-3 hover:bg-slate-100 rounded-full",
  ul: "flex flex-col gap-3 w-full ",
  li:
    "flex items-center justify-between bg-slate-200 pl-2 rounded-md drop-shadow-md",
};
