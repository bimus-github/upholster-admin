import React from "react";

interface DialogProps {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function Dialog(props: DialogProps) {
  const { isOpenDialog, setIsOpenDialog, children } = props;

  return (
    <dialog
      id="dialog"
      // onClick={() => setIsOpenDialog(false)}
      className={`${styles.dialog} ${isOpenDialog ? "flex" : "hidden"}`}
    >
      <main className={styles.main}>
        <h1 className={styles.h1}>Are you sure?</h1>
        <div className={styles.div}>{children}</div>
        <div className="flex gap-3">
          <button onClick={() => setIsOpenDialog(false)} className={styles.btn}>
            <span>Yes</span>
          </button>
          <button
            onClick={() => {
              setIsOpenDialog(false);
              console.log("close");
            }}
            className={styles.btn}
          >
            Close
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
    "min-w-[400px] min-h-[200px] bg-white drop-shadow-2xl rounded-lg p-5 flex flex-col items-center justify-around",
  h1: "font-semibold text-[20px]",
  div: "w-full h-full p-2",
  btn:
    " w-[100px] text-center font-semibold px-4 py-1 rounded-md transition ease-in-out delay-150 bg-blue-500 hover:scale-110 hover:bg-blue-300 duration-300",
  span: " text-white duration-100 delay-100",
};
