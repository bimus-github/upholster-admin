import React from "react";

interface DialogProps {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  handleYes?: () => void;
}

function Dialog(props: DialogProps) {
  const { isOpenDialog, setIsOpenDialog, children, handleYes } = props;

  return (
    <dialog
      id="dialog"
      className={`${styles.dialog} ${isOpenDialog ? "flex" : "hidden"}`}
    >
      <main className={styles.main}>
        <h1 className={styles.h1}>Are you sure?</h1>
        <div className={styles.div}>{children}</div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              handleYes && handleYes();
              setIsOpenDialog(false);
            }}
            className={styles.btn + " " + styles.btnSave}
          >
            <span>Ha</span>
          </button>
          <button
            onClick={() => {
              setIsOpenDialog(false);
            }}
            className={styles.btn + " " + styles.btnClose}
          >
            Yo'q
          </button>
        </div>
      </main>
    </dialog>
  );
}

export default Dialog;

const styles = {
  dialog:
    "w-full min-h-[100vh] fixed top-0 flex-col justify-center items-center z-20 bg-gray-800 bg-opacity-30",
  main:
    " animate-ping-one-time w-[400px] md:w-[350px] sm:w-[300px] min-h-[200px] bg-white drop-shadow-2xl rounded-lg p-5 flex flex-col items-center justify-around",
  h1: "font-semibold text-[20px] sm:text-[18px] animate-spin-speed-one-time",
  div: "w-full h-full p-2",
  btn:
    " w-[100px] text-center font-semibold px-4 py-1 rounded-md transition ease-in-out delay-150 hover:scale-110 duration-300",
  btnSave: "bg-blue-500  hover:bg-blue-300",
  btnClose: "bg-green-500 hover:bg-green-300",
  span: " text-white duration-100 delay-100",
};
