import React, { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "../Dialog";
import ImageLoading from "../ImageLoading";

export const garageImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMyuehKGonIes74bz4xrGZW8EGBqgWq7V7Yg&usqp=CAU";

function GarageImageSection() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}> Garaj Ko'rinishi</cite>
        <button className={styles.iconBtn} onClick={() => setIsOpenModal(true)}>
          <EditIcon color="primary" />
        </button>
      </legend>

      <picture className={styles.picture}>
        {/* <img src={garageImage} alt="garage_image" className={styles.image} /> */}
        <ImageLoading />
      </picture>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        name="image"
        accept="image/*"
        id="garage image"
      />
      <Dialog
        handleYes={onClick}
        isOpenDialog={isOpenModal}
        setIsOpenDialog={setIsOpenModal}
      >
        <div>
          <p>Rostan ham garaj rasmini o'zgartirmoqchimisz?</p>
        </div>
      </Dialog>
    </fieldset>
  );
}

export default GarageImageSection;

const styles = {
  fieldset:
    "border w-full p-5 rounded-md border-black flex flex-col items-center",
  legend:
    "relative font-semibold text-[20px] flex gap-2 justify-center items-center",
  cite: "text-sky-500 ",
  iconBtn: "p-3 hover:bg-slate-100 rounded-full",
  picture:
    "relative w-[500px] md:w-[400px] sm:w-[350px] xs:w-[250px]  overflow-hidden rounded-lg",
  image: "w-full ",
};
