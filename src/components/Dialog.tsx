import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  handleYes?: () => void;
}

function Dialog(props: DialogProps) {
  const { isOpenDialog, setIsOpenDialog, children, handleYes } = props;

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDialogElement>
  ) => {
    const target = event.target as HTMLDialogElement;
    if (target.classList.contains("dialog-bg")) {
      setIsOpenDialog(false);
    }
  };

  return (
    <dialog
      id="dialog"
      className={`dialog-bg ${styles.dialog} ${
        isOpenDialog ? "flex" : "hidden"
      }`}
      onClick={handleBackgroundClick}
    >
      <main className={styles.main}>
        <div className={styles.div}>{children}</div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              handleYes && handleYes();
              setIsOpenDialog(false);
            }}
            className={styles.btn + " " + styles.btnSave}
          >
            <CheckIcon />
          </button>
          <button
            onClick={() => {
              setIsOpenDialog(false);
            }}
            className={styles.btn + " " + styles.btnClose}
          >
            <CloseIcon />
          </button>
        </div>
      </main>
    </dialog>
  );
}

export default Dialog;

const styles = {
  dialog:
    "w-full min-h-[100vh] fixed top-0 flex-col justify-end items-start z-20 bg-gray-800 bg-opacity-10 p-5",
  main:
    " animate-ping-one-time  bg-white drop-shadow-2xl rounded-lg p-4 flex items-center justify-around gap-2",
  div: "w-full h-full",
  btn:
    "text-center font-semibold p-1 rounded-full transition ease-in-out delay-150 hover:scale-110 duration-300",
  btnSave: "bg-blue-500  hover:bg-blue-300",
  btnClose: "bg-green-500 hover:bg-green-300",
};
