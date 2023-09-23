import React, { useEffect, useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Tooltip } from "@mui/material";
import Modal from "../Modal";
import Input from "../Input";
import Dialog from "../Dialog";
import { typeText } from "../../unils/functions/typeText";

const garageImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMyuehKGonIes74bz4xrGZW8EGBqgWq7V7Yg&usqp=CAU";

const image2 =
  "https://www.tearmender.com/content/files/Tear%20Mender%20Web/Images/Blog%20Images/4_Sanding%20it%20down.jpg";

function ServicesSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenChangeDialog, setIsOpenChangeDialog] = useState<boolean>(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    typeText(descriptionRef, 10);
  }, []);

  const handleOpenImages = () => {
    fileInputRef?.current?.click();
  };

  const onAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}>Hismat turlari</cite>
        <Tooltip title="Hismat turni qo'shish">
          <button
            className={styles.iconBtn}
            onClick={() => setIsOpenModal(true)}
          >
            <AddCircleIcon color="primary" />
          </button>
        </Tooltip>
      </legend>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <cite className={styles.cite}>
            <p>Servise name</p>
            <sup>
              <Tooltip title="O'zgartirish">
                <button
                  className={styles.iconBtn}
                  onClick={() => setIsOpenChangeDialog(true)}
                >
                  <EditIcon color="primary" fontSize="small" />
                </button>
              </Tooltip>
            </sup>
            <sup>
              <Tooltip title="O'chirish">
                <button
                  className={`${styles.iconBtn} text-red-500`}
                  onClick={() => setIsOpenDeleteDialog(true)}
                >
                  <DeleteIcon fontSize="small" />
                </button>
              </Tooltip>
            </sup>
          </cite>

          <nav className={styles.nav}>
            <picture className={styles.images}>
              <img className={styles.image} src={garageImage} alt="" />
              <img className={styles.image} src={garageImage} alt="" />
              <img className={styles.image} src={garageImage} alt="" />
            </picture>
            <article ref={descriptionRef} className={styles.article}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </article>
          </nav>
        </li>
      </ul>

      <Dialog
        isOpenDialog={isOpenChangeDialog}
        setIsOpenDialog={setIsOpenChangeDialog}
      >
        Rostanham o'zgartirishni istaysizmi?
      </Dialog>
      <Dialog
        isOpenDialog={isOpenDeleteDialog}
        setIsOpenDialog={setIsOpenDeleteDialog}
      >
        Rostanham o'chirishni istaysizmi?
      </Dialog>

      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <form action="" className="flex flex-col gap-3">
          <Input placeholder="m.u: Oynalarni qoraytirish" title="Sizmat turi" />
          <Input
            placeholder="Bu hizmatga aloqodor qisqacha ma'lumot, masalan: hizmat narxi, ketadigan vaqt, ... "
            title="Qisqacha ma'lumot"
            isTextArea
            height="h-[200px]"
          />

          <span className={styles.span}>
            <input
              ref={fileInputRef}
              type="file"
              name=""
              id=""
              className="hidden"
              onChange={onAddImage}
              accept="image/*"
            />
            <button onClick={handleOpenImages} className={styles.iconBtn}>
              <Tooltip title="Rasm qo'shish">
                <AddCircleIcon color="primary" fontSize="large" />
              </Tooltip>
            </button>

            <picture className={styles.selectedImages}>
              <img src={garageImage} alt="" className={styles.selectedImage} />
              <img src={image2} alt="" className={styles.selectedImage} />
              <img src={garageImage} alt="" className={styles.selectedImage} />
            </picture>
          </span>
        </form>
      </Modal>
    </fieldset>
  );
}

export default ServicesSection;

const styles = {
  fieldset:
    "border w-full p-5 sm:p-3 rounded-md border-black flex flex-col items-center",
  legend:
    "relative font-semibold text-[20px] flex gap-2 justify-center items-center",
  cite: "text-sky-500 flex items-center",
  iconBtn: "p-3 sm:p-1 hover:bg-slate-100 rounded-full",
  ul: "flex flex-col gap-5 sm:gap-3 w-full",
  li:
    "w-full p-2 bg-slate-200 rounded-md drop-shadow-md justify-between cursor-pointer flex flex-col",
  nav: "w-full min-h-[200px] flex justify-around p-4 sm:p-1 gap-5 md:flex-col",
  images: "w-1/2 md:w-full overflow-y-scroll flex gap-2 rounded-md",
  image: " h-[100%] rounded-xl  sm:rounded-md ",
  article:
    " w-1/2 md:w-full p-3 text-justify h-[100%] bg-slate-100 rounded-md sm:text-[12px]",

  span: " flex gap-3 items-center w-full",
  selectedImages: "w-full overflow-y-scroll flex gap-2 rounded-md",
  selectedImage: "rounded-xl h-full",
};
