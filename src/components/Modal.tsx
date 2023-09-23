import React from "react";

interface ModalProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  handleYes?: () => void;
}

function Modal(props: ModalProps) {
  const { isOpenModal, setIsOpenModal, children, handleYes } = props;

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDialogElement>
  ) => {
    const target = event.target as HTMLDialogElement;
    if (target.classList.contains("modal-bg")) {
      setIsOpenModal(false);
    }
  };
  return (
    <dialog
      id="dialog"
      className={`modal-bg ${styles.dialog} ${isOpenModal ? "flex" : "hidden"}`}
      onClick={handleBackgroundClick}
    >
      <main className={styles.main}>
        <h1 className={styles.h1}>Modal</h1>
        <div className={styles.div}>{children}</div>
        <div className="flex gap-3 sm:flex-col w-full">
          <button
            onClick={() => {
              handleYes && handleYes();
              setIsOpenModal(false);
            }}
            className={styles.btn + " " + styles.btnSave}
          >
            Saqlash
          </button>
          <button
            onClick={() => {}}
            className={styles.btn + " " + styles.btnCleare}
          >
            Tozalash
          </button>
          <button
            onClick={() => {
              setIsOpenModal(false);
            }}
            className={styles.btn + " " + styles.btnClose}
          >
            Yopish
          </button>
        </div>
      </main>
    </dialog>
  );
}

export default Modal;

const styles = {
  dialog:
    "w-full min-h-[100vh] fixed top-0 flex-col justify-center items-center z-20 bg-gray-800 bg-opacity-30",
  main:
    "animate-ping-one-time w-[400px] md:w-[350px] sm:w-[300px] min-h-[200px] bg-white drop-shadow-2xl rounded-lg p-5 flex flex-col gap-4 items-center justify-around",
  h1: "font-semibold text-[20px] sm:text-[18px] animate-spin-speed-one-time ",
  div: "w-full h-full p-2",
  btn:
    " w-[100px] sm:w-full text-center font-semibold px-4 py-1 rounded-md transition ease-in-out delay-150 hover:scale-110  duration-300 drop-shadow-md",

  btnSave: "bg-blue-500  hover:bg-blue-300",
  btnClose: "bg-green-500 hover:bg-green-300",
  btnCleare: "bg-red-500 hover:bg-red-300",
  span: " text-white duration-100 delay-100",
};
