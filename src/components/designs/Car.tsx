import React from "react";
import { Params, useNavigate, useParams } from "react-router-dom";

const damas =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ732b4s6iTlVg2XPePnCRawVLejqsiEy4Ge7HTL7hqhg&s";

function Car() {
  const navigate = useNavigate();
  const { id }: Readonly<Params<string>> = useParams();

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDialogElement>
  ) => {
    const target = event.target as HTMLDialogElement;
    if (target.classList.contains("modal-bg")) {
      navigate(-1);
    }
  };

  return (
    <dialog
      onClick={handleBackgroundClick}
      className={`modal-bg ${id?.length ? "flex" : "hidden"} ${styles.dialog}`}
    >
      <main className={styles.main}>
        <header className={styles.head}>
          <picture className={styles.picture}>
            <img className={styles.image} src={damas} alt="" />
          </picture>
          <strong className={styles.strong}>Damas</strong>
        </header>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>
            <cite className={styles.cite}>Hizmat turi</cite>
          </legend>
          <input
            className={styles.input}
            type="text"
            list="hizmat_turlari"
            defaultValue={"1"}
          />
          <datalist id="hizmat_turlari">
            <option value="1" />
            <option value="2" />
            <option value="3" />
          </datalist>
        </fieldset>
      </main>
    </dialog>
  );
}

export default Car;

const styles = {
  dialog:
    "w-full min-h-[100vh] fixed top-0 flex-col justify-center items-center z-20 bg-gray-800 bg-opacity-30",
  main:
    "animate-ping-one-time w-[400px] md:w-[350px] sm:w-[300px] min-h-[200px] bg-white drop-shadow-2xl rounded-lg p-5 flex flex-col gap-4 items-start justify-start",

  head: "flex relative gap-2 items-center",
  picture: "relative h-[50px] w-[50px] rounded-full overflow-hidden",
  image: "w-full h-full absolute",
  strong: "",

  fieldset: "border border-black p-2 rounded-md text-center",
  legend: "",
  input: "",
  cite: "",
};
