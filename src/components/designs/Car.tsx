import React, { useEffect } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { typeText } from "../../unils/functions/typeText";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";

const damas =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ732b4s6iTlVg2XPePnCRawVLejqsiEy4Ge7HTL7hqhg&s";

function Car() {
  const navigate = useNavigate();
  const carNameRef = React.useRef<HTMLElement>(null);
  const textRef = React.useRef<HTMLParagraphElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { id }: Readonly<Params<string>> = useParams();
  console.log(id);

  useEffect(() => {
    typeText(carNameRef);
    typeText(textRef, 10);
  }, []);
  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDialogElement>
  ) => {
    const target = event.target as HTMLDialogElement;
    if (target.classList.contains("modal-bg")) {
      navigate(-1);
    }
  };

  const onAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  const handleOpenImage = () => {
    fileInputRef?.current?.click();
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
          <strong className={styles.strong} ref={carNameRef}>
            Damas
          </strong>
        </header>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>
            <cite className={styles.cite}>Xizmat turi</cite>
          </legend>
          <input
            className={styles.input}
            type="text"
            list="xizmat_turlari"
            defaultValue={"1"}
          />
          <datalist id="xizmat_turlari">
            <option value="1" />
            <option value="2" />
            <option value="3" />
          </datalist>
        </fieldset>

        <main className={styles.services}>
          <div className={styles.title}>
            <p className={styles.titleP}>Xizmat Turi</p>
            <Tooltip title="Qo'shish">
              <button className={styles.iconBtn}>
                <AddCircleIcon />
              </button>
            </Tooltip>
          </div>

          <ul className={styles.ul}>
            <li className={styles.li}>
              <picture className={styles.pictures}>
                <picture className="h-full min-w-[200px] relative">
                  <img src={damas} alt="" className="h-full w-full absolute" />
                  <Tooltip title="O'chirish">
                    <button
                      className={`${styles.iconBtn} text-red-500 absolute right-2 bottom-2`}
                    >
                      <DeleteIcon />
                    </button>
                  </Tooltip>
                </picture>
                <span className="h-full p-2 flex justify-center">
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={onAddImage}
                  />
                  <Tooltip title="Qo'shish">
                    <button
                      className={styles.iconBtn}
                      onClick={handleOpenImage}
                    >
                      <AddCircleIcon />
                    </button>
                  </Tooltip>
                </span>
              </picture>
              <article className={styles.article}>
                <p ref={textRef} className="text-justify w-full">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
                  officiis facere exercitationem. Voluptatibus dolor officiis
                  vero quo corrupti! Laborum sapiente cupiditate temporibus
                  accusantium cum. Doloribus molestias esse laborum maxime
                  accusantium.
                </p>
                <button className={styles.btn}>200$</button>
              </article>
            </li>
          </ul>
        </main>
      </main>
    </dialog>
  );
}

export default Car;

const styles = {
  dialog:
    "w-full min-h-[100vh] fixed top-0 flex-col justify-center items-center z-20 bg-gray-800 bg-opacity-30",
  main:
    "animate-ping-one-time min-w-[400px] md:min-w-[350px] sm:min-w-[300px] min-h-[200px] bg-white drop-shadow-2xl rounded-lg p-5 flex flex-col gap-4 items-start justify-start",

  head: "flex relative gap-2 items-center",
  picture: "relative h-[50px] w-[50px]  rounded-full overflow-hidden",
  image: "w-full h-full absolute",
  strong: "",

  fieldset: "border border-black p-2 rounded-md mx-auto w-[300px]",
  legend: "",
  cite: "text-sky-500 font-semibold",
  input: "w-full p-2 focus:outline-none",

  services:
    "  bg-slate-200 w-[900px] lg:w-[600px] md:w-[500px] sm:w-[400px] xs:w-[330px] flex flex-col gap-4 p-2 rounded-md",
  title: "flex gap-2 items-center",
  titleP: "font-bold",
  iconBtn: "hover:bg-slate-100 p-2 rounded-full",

  ul: "flex flex-col gap-2 h-[350px] overflow-y-auto",
  li: "flex md:flex-col gap-5 bg-slate-100 p-2 rounded-md drop-shadow-md ",
  pictures:
    "w-[400px] md:w-full h-[200px] overflow-x-auto flex gap-2 bg-slate-200",
  serviceImage: "h-full rounded-md",
  article: "w-full md:w-full flex flex-col justify-between gap-2",
  btn: "w-[300px] md:w-full mx-auto rounded-md bg-sky-400 hover:bg-sky-300 p-2",
};
