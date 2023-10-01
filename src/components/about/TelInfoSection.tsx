import React, { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Dialog from "../Dialog";
import Modal from "../Modal";
import { typeText } from "../../unils/functions/typeText";
import { formatTelNumber } from "../../unils/functions/formatTelNumber";
import Input from "../Input";
import { addTelNumber, deleteTelNumber } from "../../firebase/functions/info";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { infoActions } from "../../store/features/infoSlices";
import { Tooltip } from "@mui/material";

import SpinnerLoading from "../loading/SpinnerLoading";
function TelInfoSection() {
  const dispatch = useAppDispatch();
  const numbers = useAppSelector((state) => state.info.number);

  const telRef = useRef<HTMLAnchorElement>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const [deletedNumber, setDeletedNumber] = useState<string>("");
  const [isDeleting, setisDeleting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [telNumber, setTelNumber] = useState<string>("");

  useEffect(() => {
    typeText(telRef, 50);
  }, []);

  const handleAddTelNumber = () => {
    setIsSaving(true);
    if (telNumber.length !== 12) return;

    addTelNumber(telNumber)
      .then(() => {
        setIsOpenModal(false);
        dispatch(infoActions.addNumber(telNumber));
        setTelNumber("");
        setIsOpenAddDialog(false);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleDeleteTelNumber = () => {
    setIsOpenDeleteDialog(false);

    setisDeleting(true);

    deleteTelNumber(deletedNumber)
      .then(() => {
        setIsOpenModal(false);
        dispatch(infoActions.removeNumber(deletedNumber));
        setDeletedNumber("");
      })
      .finally(() => {
        setisDeleting(false);
      });
  };

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
        {numbers.map((number, index) => (
          <li key={index} className={styles.li}>
            <a href={`tel: +998 ${number}`} ref={telRef}>
              {`+998 ${number}`}
            </a>
            {isDeleting && number === deletedNumber ? (
              <SpinnerLoading scale={0.3} />
            ) : (
              <Tooltip title="O'chirish">
                <button
                  onClick={() => {
                    setIsOpenDeleteDialog(true);
                    setDeletedNumber(number);
                  }}
                  className={`${styles.iconBtn} text-red-500`}
                >
                  <DeleteIcon fontSize="small" />
                </button>
              </Tooltip>
            )}
          </li>
        ))}
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
        handleYes={handleDeleteTelNumber}
        isOpenDialog={isOpenDeleteDialog}
        setIsOpenDialog={setIsOpenDeleteDialog}
      >
        <div>
          <p>Haqiqatdan ham telefon raqam qo'shmoqchimsz?</p>
        </div>
      </Dialog>

      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        handeClear={() => setTelNumber("")}
        handleYes={handleAddTelNumber}
        isSaving={isSaving}
      >
        <Input
          placeholder={`eg: ${formatTelNumber("123456789")}`}
          title="Telefon raqam"
          value={telNumber}
          setValue={setTelNumber}
          type="tel"
        />
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
