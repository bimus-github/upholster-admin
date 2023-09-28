import React, { useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Modal from "../Modal";
import Input from "../Input";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { addCar, deleteCar, updateCarName } from "../../firebase/functions/car";
import { carActions } from "../../store/features/carSlices";
import Dialog from "../Dialog";

function Cars() {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state) => state.cars);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState<boolean>(
    false
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditNameDialogOpen, setIsEditNameDialogOpen] = useState<boolean>(
    false
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [carName, setCarName] = useState<string>("");
  const [newCarName, setNewCarName] = useState<string>("");
  const [carImage, setCarImage] = useState<string>("");
  const [deletedCar, setDeletedCar] = useState<string>("");

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setIsUploadingImage(true);

    const storageRef = ref(storage, "images/" + file.name);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a file!");

        getDownloadURL(storageRef).then((url) => {
          setCarImage(url);
        });
      })
      .finally(() => {
        setIsUploadingImage(false);
      });
  };

  const handleSaveCar = () => {
    if (carName.length === 0) return;
    if (carImage.length === 0) return;
    setIsSaving(true);

    addCar({
      name: carName,
      image: carImage,
      services: [],
    })
      .then(() => {
        setIsAddModalOpen(false);
        dispatch(
          carActions.addCar({ name: carName, image: carImage, services: [] })
        );
      })
      .finally(() => {
        setCarImage("");
        setCarName("");
        setIsSaving(false);
      });
  };

  const handleDeleteCar = () => {
    setIsDeleting(true);
    setIsDeleteDialogOpen(false);

    deleteCar(deletedCar)
      .then(() => {
        dispatch(carActions.deleteCar({ name: deletedCar }));
      })
      .finally(() => {
        setIsDeleting(false);
        setDeletedCar("");
      });
  };

  const handleUpdateCarName = () => {
    if (newCarName.length === 0) return;
    setIsSaving(true);

    if (newCarName === carName) return;

    updateCarName(carName, newCarName)
      .then(() => {
        dispatch(
          carActions.updateCarName({ name: carName, newName: newCarName })
        );
      })
      .finally(() => {
        setIsSaving(false);
        setNewCarName("");
        setCarName("");
        setIsEditNameModalOpen(false);
        setIsEditNameDialogOpen(false);
      });
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}>Mashinalar</cite>
        <Tooltip title="Qo'shish">
          <button
            className={`${styles.iconBtn}  ${styles.addIcon}`}
            onClick={() => setIsAddModalOpen(true)}
          >
            <AddCircleIcon />
          </button>
        </Tooltip>
      </legend>

      <ul className={styles.ul}>
        {cars.length === 0 && <p>Mashinalar mavjud emas</p>}
        {cars.map((car, index) => (
          <li className={styles.li} key={index}>
            <div className={styles.div}>
              <picture className={styles.picture}>
                <img src={car.image} alt="car_image" className={styles.image} />
              </picture>
              <strong
                className="text-sky-500 cursor-pointer"
                onClick={() => navigate(`/designs/${car.name}`)}
              >
                {car.newName ? car.newName : car.name}
              </strong>
            </div>

            <div className={styles.div}>
              <Tooltip title="O'zgartirish">
                <button
                  className={`${styles.iconBtn}  ${styles.editIcon}`}
                  onClick={() => {
                    setIsEditNameDialogOpen(true);
                    setCarName(car.name);
                    setNewCarName(car.newName ? car.newName : car.name);
                  }}
                >
                  <EditIcon />
                </button>
              </Tooltip>
              {isDeleting && car.name === deletedCar ? (
                <div className=" animate-spin inline-block w-8 h-8 border-t-4 border-black rounded-full" />
              ) : (
                <Tooltip title="O'chirish">
                  <button
                    className={`${styles.iconBtn} ${styles.deleteIcon}`}
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                      setDeletedCar(car.name);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </Tooltip>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Dialogs */}
      <Dialog
        isOpenDialog={isDeleteDialogOpen}
        setIsOpenDialog={setIsDeleteDialogOpen}
        handleYes={handleDeleteCar}
      >
        Rostanham o'chitmoqchi missiz?
      </Dialog>

      <Dialog
        handleYes={() => setIsEditNameModalOpen(true)}
        isOpenDialog={isEditNameDialogOpen}
        setIsOpenDialog={setIsEditNameDialogOpen}
      >
        Rostanham nomni o'zgartirish holaysizmi?
      </Dialog>

      {/* Modals */}
      <Modal
        isSaving={isSaving}
        isOpenModal={isAddModalOpen}
        setIsOpenModal={setIsAddModalOpen}
        handeClear={() => {
          setCarImage("");
          setCarName("");
        }}
        handleYes={handleSaveCar}
      >
        <div className={modalstyles.main}>
          <Input
            placeholder="m.u: Damas"
            value={carName}
            setValue={setCarName}
            type="text"
            title="Mashina nomi"
          />

          <div className={modalstyles.imageDiv}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUploadImage}
              className="hidden"
            />
            <Tooltip title="Rasm yuklash">
              <button
                className={`${styles.iconBtn} ${styles.addIcon}`}
                onClick={() => fileInputRef?.current?.click()}
              >
                {isUploadingImage ? (
                  <div className="animate-spin inline-block w-8 h-8 border-t-4 border-black rounded-full" />
                ) : (
                  <AddCircleIcon />
                )}
              </button>
            </Tooltip>

            {carImage.length !== 0 && (
              <picture className={modalstyles.picture}>
                <img className={modalstyles.image} src={carImage} alt="" />
              </picture>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        handleYes={handleUpdateCarName}
        handeClear={() => setCarName("")}
        isOpenModal={isEditNameModalOpen}
        setIsOpenModal={setIsEditNameModalOpen}
        isSaving={isSaving}
      >
        <Input
          setValue={setNewCarName}
          placeholder="m.u: Damas"
          value={newCarName}
          type="text"
          title="Mashina nomi"
        />
      </Modal>
    </fieldset>
  );
}

export default Cars;

const styles = {
  fieldset:
    "border w-full p-5 rounded-md border-black flex flex-col items-center",
  legend:
    "relative font-semibold text-[20px] flex gap-2 justify-center items-center",
  cite: "text-sky-500 ",
  ul: "flex flex-col gap-5 sm:gap-3 w-full",
  li:
    " flex justify-between  items-center bg-slate-200 rounded-lg p-4 drop-shadow-md",
  div: "flex items-center gap-2",
  picture: "relative h-[50px] w-[50px] rounded-full overflow-hidden",
  image: "absolute h-full w-full",
  iconBtn: "p-3 hover:bg-slate-100 rounded-full",
  addIcon: "text-sky-500",
  editIcon: "text-blue-500",
  deleteIcon: "text-red-500",
};

const modalstyles = {
  main: "w-full h-full flex flex-col justify-center items-center gap-4",

  imageDiv: "flex gap-2 items-center justify-center",
  picture:
    " w-[100px] h-[100px] rounded-full overflow-hidden relative flex justify-center items-center",
  image: " absolute h-full",
};
