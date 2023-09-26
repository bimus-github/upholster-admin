import React, { useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Tooltip } from "@mui/material";
import Modal from "../Modal";
import Input from "../Input";
import Dialog from "../Dialog";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import SpinnerLoading from "../loading/SpinnerLoading";
import { addService, removeService } from "../../firebase/functions/service";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { serviceAction } from "../../store/features/serviceSlices";

function ServicesSection() {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.service);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenChangeDialog, setIsOpenChangeDialog] = useState<boolean>(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [serviceName, setServiceName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deletedService, setDeletedService] = useState<string>("");

  const handleOpenImages = () => {
    fileInputRef?.current?.click();
  };

  const onAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;

    setIsUploadingImage(true);
    const storageRef = ref(storage, "images/" + file.name);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a file!");
      })
      .catch((error) => {
        console.log(error);
        setIsUploadingImage(false);
      })
      .finally(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            setSelectedImages((prev) => [...prev, url]);
          })
          .catch((error) => {
            console.log(error);
            setIsUploadingImage(false);
          })
          .finally(() => {
            setIsUploadingImage(false);
          });
      });
  };

  const handleAddService = () => {
    if (!serviceName) return;
    if (!description) return;

    setIsSaving(true);

    addService({
      name: serviceName,
      description: description,
      images: selectedImages,
    })
      .catch((error) => {
        setIsSaving(false);
      })
      .then(() => {
        dispatch(
          serviceAction.addService({
            name: serviceName,
            description: description,
            images: selectedImages,
          })
        );

        setIsOpenModal(false);
        setIsOpenChangeDialog(false);
        setIsOpenDeleteDialog(false);
        setIsSaving(false);
      })
      .finally(() => {
        setIsSaving(false);
        setSelectedImages([]);
        setServiceName("");
        setDescription("");
      });
  };

  const handleDeleteService = () => {
    setIsDeleting(true);

    removeService(deletedService)
      .catch((error) => {
        console.log(error);
        setIsDeleting(false);
      })
      .then(() => {
        dispatch(serviceAction.removeService({ name: deletedService }));
        setIsDeleting(false);
        setIsOpenDeleteDialog(false);
      })
      .finally(() => {
        setIsDeleting(false);
      });
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
        {!services.length && <p>Hismat mavjud emas</p>}
        {services.map((service, index) => (
          <React.Fragment key={index}>
            {isDeleting && service.name === deletedService ? (
              <li className={styles.li}>
                <SpinnerLoading />
              </li>
            ) : (
              <li className={styles.li}>
                <cite className={styles.cite}>
                  <p>{service.name}</p>
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
                        onClick={() => {
                          setIsOpenDeleteDialog(true);
                          setDeletedService(service.name);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                    </Tooltip>
                  </sup>
                </cite>

                <nav className={styles.nav}>
                  <picture className={styles.images}>
                    {service.images.map((image, index) => (
                      <img
                        key={index}
                        className={styles.image}
                        src={image}
                        alt=""
                      />
                    ))}
                  </picture>
                  <article className={styles.article}>
                    {service.description}
                  </article>
                </nav>
              </li>
            )}
          </React.Fragment>
        ))}
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
        handleYes={handleDeleteService}
      >
        Rostanham o'chirishni istaysizmi?
      </Dialog>

      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isSaving={isSaving}
        handleYes={handleAddService}
        handeClear={() => {
          setServiceName("");
          setDescription("");
          setSelectedImages([]);
        }}
      >
        <div className="flex flex-col gap-3">
          <Input
            placeholder="m.u: Oynalarni qoraytirish"
            title="Sizmat turi"
            value={serviceName}
            setValue={setServiceName}
          />
          <Input
            placeholder="Bu xizmatga aloqodor qisqacha ma'lumot, masalan: xizmat narxi, ketadigan vaqt, ... "
            title="Qisqacha ma'lumot"
            isTextArea
            height="h-[200px]"
            value={description}
            setValue={setDescription}
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
              {isUploadingImage ? (
                <SpinnerLoading scale={0.4} />
              ) : (
                <Tooltip title="Rasm qo'shish">
                  <AddCircleIcon color="primary" fontSize="large" />
                </Tooltip>
              )}
            </button>

            <picture className={styles.selectedImages}>
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[100px] relative overflow-hidden rounded-md"
                >
                  <img src={image} alt="" className={styles.selectedImage} />
                </div>
              ))}
            </picture>
          </span>
        </div>
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
  images: "w-1/2 md:w-full overflow-y-scroll flex gap-2 rounded-md h-[250px]",
  image: " h-[100%] rounded-xl  sm:rounded-md ",
  article:
    " w-1/2 md:w-full p-3 text-justify h-[100%] bg-slate-100 rounded-md sm:text-[12px]",

  span: " flex gap-3 items-center w-full ",
  selectedImages: "w-full overflow-y-scroll flex gap-2 rounded-md",
  selectedImage: "absolute h-full",
};
