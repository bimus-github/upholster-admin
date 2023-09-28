import React, { useEffect, useRef, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { typeText } from "../../unils/functions/typeText";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import Dialog from "../Dialog";
import Modal from "../Modal";
import Input from "../Input";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addServiceToCar,
  deleteItem,
  updateBeforeImage,
  updateDescription,
  updatePrice,
  updateThenImage,
} from "../../firebase/functions/car";
import { carActions } from "../../store/features/carSlices";
import { Item_Type } from "../../types";

function Car() {
  const navigate = useNavigate();
  const carNameRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const beforeImageRef = useRef<HTMLInputElement>(null);
  const updateBeforeImageRef = useRef<HTMLInputElement>(null);
  const thenImageRef = useRef<HTMLInputElement>(null);
  const updateThenImageRef = useRef<HTMLInputElement>(null);
  const { id }: Readonly<Params<string>> = useParams();

  const dispatch = useAppDispatch();
  const cars = useAppSelector((state) => state.cars);
  const services = useAppSelector((state) => state.service);

  const car = cars.find((item) => item.name === id);

  const [isDialogAddImageOpen, setIsDialogAddImageOpen] = useState<boolean>(
    false
  );
  const [isDialogEditDescription, setIsDialogEditDescription] = useState<
    boolean
  >(false);
  const [isDialogDeleteImage, setIsDialogDeleteImage] = useState<boolean>(
    false
  );
  const [isDialogeDeleteItem, setIsDialogeDeleteItem] = useState<boolean>(
    false
  );
  const [isDialogEditPrice, setIsDialogEditPrice] = useState<boolean>(false);
  const [isAddCarServiceMoadlOpen, setIsAddCarServiceMoadlOpen] = useState<
    boolean
  >(false);
  const [isEditDescriptionModal, setIsEditDescriptionModal] = useState<boolean>(
    false
  );
  const [isEditPriceModal, setIsEditPriceModal] = useState<boolean>(false);
  const [isLoadingBeforeImage, setIsLoadingBeforeImage] = useState<boolean>(
    false
  );
  const [isLoadingThenImage, setIsLoadingThenImage] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeletingBeforeImage, setIsDeletingBeforeImage] = useState<boolean>(
    false
  );
  const [isDeletingThenImage, setIsDeletingThenImage] = useState<boolean>(
    false
  );
  const [isDeletingItem, setIsDeletingItem] = useState<boolean>(false);

  const [selectedService, setSelectedService] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [beforeImage, setBeforeImage] = useState<string>("");
  const [thenImage, setThenImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [item, setItem] = useState<Item_Type>({} as Item_Type);

  const isServiceHave = services.find((item) => item.name === selectedService);

  const carService = car?.services.find(
    (item) => item.name === selectedService
  );

  useEffect(() => {
    typeText(carNameRef);
  }, []);

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDialogElement>
  ) => {
    const target = event.target as HTMLDialogElement;
    if (target.classList.contains("modal-bg")) {
      navigate(-1);
    }
  };

  const handleSelectBeforeImage = ({
    e,
    item,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    item?: Item_Type;
  }) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setIsLoadingBeforeImage(true);

    const storageRef = ref(storage, "images/" + file.name);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a file!");
        getDownloadURL(storageRef).then((url) => {
          setBeforeImage(url);

          if (!item) return;
          if (item) {
            updateBeforeImage({
              beforeImage: url,
              itemId: item.id,
              carName: id!,
              serviceName: selectedService,
            }).then(() => {
              dispatch(
                carActions.updateBeforeImage({
                  beforeImage: url,
                  itemId: item.id,
                  carName: id!,
                  serviceName: selectedService,
                })
              );
            });
          }
        });
      })
      .finally(() => {
        setIsLoadingBeforeImage(false);
      });
  };

  const handleSelectThenImage = ({
    e,
    item,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    item?: Item_Type;
  }) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setIsLoadingThenImage(true);

    const storageRef = ref(storage, "images/" + file.name);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a file!");
        getDownloadURL(storageRef).then((url) => {
          setThenImage(url);
          if (!item) return;
          if (item) {
            updateThenImage({
              thenImage: url,
              itemId: item.id,
              carName: id!,
              serviceName: selectedService,
            }).then(() => {
              dispatch(
                carActions.updateThenImage({
                  thenImage: url,
                  itemId: item.id,
                  carName: id!,
                  serviceName: selectedService,
                })
              );
            });
          }
        });
      })
      .finally(() => {
        setIsLoadingThenImage(false);
      });
  };

  const handleSaveNewItem = () => {
    if (
      !selectedService.length ||
      !price.length ||
      !beforeImage.length ||
      !thenImage.length
    )
      return;

    setIsSaving(true);

    const newService = {
      price: price,
      before: beforeImage,
      description: description,
      then: thenImage,
      id: Math.random().toString(),
    };

    addServiceToCar({
      name: id!,
      service: {
        name: selectedService,
        items: [newService],
      },
    })
      .then(() => {
        dispatch(
          carActions.addServiceToCar({
            name: id!,
            service: {
              name: selectedService,
              items: [newService],
            },
          })
        );
      })
      .finally(() => {
        setIsSaving(false);
        setBeforeImage("");
        setThenImage("");
        setPrice("");
        setDescription("");
        setIsAddCarServiceMoadlOpen(false);
      });
  };

  const handleDeleteBeforeImage = (item: Item_Type) => {
    setIsDeletingBeforeImage(true);

    updateBeforeImage({
      beforeImage: "",
      itemId: item.id,
      carName: id!,
      serviceName: selectedService,
    })
      .then(() => {
        dispatch(
          carActions.updateBeforeImage({
            beforeImage: "",
            itemId: item.id,
            carName: id!,
            serviceName: selectedService,
          })
        );
      })
      .finally(() => {
        setIsDeletingBeforeImage(false);
        setBeforeImage("");
      });
  };

  const handleDeleteThenImage = (item: Item_Type) => {
    setIsDeletingThenImage(true);

    updateThenImage({
      thenImage: "",
      itemId: item.id,
      carName: id!,
      serviceName: selectedService,
    })
      .then(() => {
        dispatch(
          carActions.updateThenImage({
            thenImage: "",
            itemId: item.id,
            carName: id!,
            serviceName: selectedService,
          })
        );
      })
      .finally(() => {
        setIsDeletingThenImage(false);
        setThenImage("");
      });
  };

  const handleEditDescription = () => {
    if (!description.length) return;
    setIsSaving(true);

    updateDescription({
      description: description,
      itemId: item!.id,
      carName: id!,
      serviceName: selectedService,
    })
      .then(() => {
        dispatch(
          carActions.updateDescription({
            description: description,
            itemId: item!.id,
            carName: id!,
            serviceName: selectedService,
          })
        );
      })
      .finally(() => {
        setIsSaving(false);
        setIsEditDescriptionModal(false);
        setDescription("");
      });
  };

  const handleEditPrice = () => {
    if (!price.length) return;
    setIsSaving(true);

    updatePrice({
      price: price,
      itemId: item!.id,
      carName: id!,
      serviceName: selectedService,
    })
      .then(() => {
        dispatch(
          carActions.updatePrice({
            price: price,
            itemId: item!.id,
            carName: id!,
            serviceName: selectedService,
          })
        );
      })
      .finally(() => {
        setIsSaving(false);
        setIsEditPriceModal(false);
        setPrice("");
      });
  };

  const handleDeleteItem = () => {
    if (!item) return;
    setIsDeletingItem(true);
    setIsDialogeDeleteItem(false);

    deleteItem({
      itemId: item.id,
      carName: id!,
      serviceName: selectedService,
    })
      .then(() => {
        dispatch(
          carActions.deleteItem({
            itemId: item.id,
            carName: id!,
            serviceName: selectedService,
          })
        );
      })
      .finally(() => {
        setIsDeletingItem(false);
        setIsDialogeDeleteItem(false);
        setItem({} as Item_Type);
      });
  };

  return (
    <dialog
      onClick={handleBackgroundClick}
      className={`modal-bg ${id?.length ? "flex" : "hidden"} ${styles.dialog}`}
    >
      <main className={styles.main}>
        <header className={styles.head}>
          <picture className={styles.picture}>
            <img className={styles.image} src={car?.image} alt="" />
          </picture>
          <strong className={styles.strong} ref={carNameRef}>
            {car?.name}
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
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          />
          <datalist id="xizmat_turlari">
            {services.map((item) => (
              <option key={item.name} value={item.name} />
            ))}
          </datalist>
        </fieldset>

        <main className={styles.services}>
          {isServiceHave ? (
            <React.Fragment>
              <div className={styles.title}>
                <p className={styles.titleP}>{selectedService}</p>
                <Tooltip title="Qo'shish">
                  <button
                    className={styles.iconBtn}
                    onClick={() => setIsAddCarServiceMoadlOpen(true)}
                  >
                    <AddCircleIcon />
                  </button>
                </Tooltip>
              </div>

              <ul className={styles.ul}>
                {!carService && (
                  <p>Hali bu hazmat turiga oid malumollar yuborilmadi!</p>
                )}
                {carService?.items.map((item, index) => (
                  <li className={styles.li} key={index}>
                    {isDeletingItem ? (
                      <div className="animate-spin inline-block w-[100px] h-[100px] border-t-2 border-l-2 border-black rounded-full" />
                    ) : (
                      <React.Fragment>
                        <span className={styles.view}>
                          <section className={styles.imageSection}>
                            {item.before.length === 0 ? (
                              <React.Fragment>
                                <button
                                  className={modalstyles.btn}
                                  onClick={() =>
                                    updateBeforeImageRef.current?.click()
                                  }
                                >
                                  {isLoadingBeforeImage ? (
                                    <div className="animate-spin inline-block w-4 h-4 border-t-2 border-l-2 border-black rounded-full" />
                                  ) : (
                                    "Dastlabki"
                                  )}
                                </button>
                                <input
                                  type="file"
                                  className="hidden"
                                  ref={updateBeforeImageRef}
                                  onChange={(e) =>
                                    handleSelectBeforeImage({ e, item })
                                  }
                                  accept="image/*"
                                />
                              </React.Fragment>
                            ) : (
                              <picture className="relative">
                                <img
                                  src={item.before}
                                  alt=""
                                  className="h-[200px] md:h-[100px] rounded-md"
                                />
                                <Tooltip title="O'chirish">
                                  <button
                                    className={`${styles.iconBtn} text-red-500 absolute bottom-2`}
                                    onClick={() =>
                                      handleDeleteBeforeImage(item)
                                    }
                                  >
                                    {isDeletingBeforeImage ? (
                                      <div className="animate-spin inline-block w-4 h-4 border-t-2 border-l-2 border-black rounded-full" />
                                    ) : (
                                      <DeleteIcon />
                                    )}
                                  </button>
                                </Tooltip>
                              </picture>
                            )}
                          </section>
                          <section className={styles.imageSection}>
                            {item.then.length === 0 ? (
                              <React.Fragment>
                                <button
                                  className={modalstyles.btn}
                                  onClick={() =>
                                    updateThenImageRef.current?.click()
                                  }
                                >
                                  {isLoadingThenImage ? (
                                    <div className="animate-spin inline-block w-4 h-4 border-t-2 border-l-2 border-black rounded-full" />
                                  ) : (
                                    "Natija"
                                  )}
                                </button>
                                <input
                                  type="file"
                                  className="hidden"
                                  ref={updateThenImageRef}
                                  onChange={(e) =>
                                    handleSelectThenImage({ e, item })
                                  }
                                  accept="image/*"
                                />
                              </React.Fragment>
                            ) : (
                              <picture className="relative">
                                <img
                                  src={item.then}
                                  alt=""
                                  className="h-[200px] md:h-[100px] rounded-md"
                                />
                                <Tooltip title="O'chirish">
                                  <button
                                    className={`${styles.iconBtn} text-red-500 absolute bottom-2`}
                                    onClick={() => handleDeleteThenImage(item)}
                                  >
                                    {isDeletingThenImage ? (
                                      <div className="animate-spin inline-block w-4 h-4 border-t-2 border-l-2 border-black rounded-full" />
                                    ) : (
                                      <DeleteIcon />
                                    )}
                                  </button>
                                </Tooltip>
                              </picture>
                            )}
                          </section>
                        </span>
                        <article className={styles.article}>
                          <p ref={textRef} className="text-justify w-full">
                            {item.description}{" "}
                            <span
                              className={`${styles.iconBtn} text-sky-500 cursor-pointer`}
                            >
                              <Tooltip title="Yangilash">
                                <EditIcon
                                  onClick={() => {
                                    setIsEditDescriptionModal(true);
                                    setItem(item);
                                    setDescription(item.description);
                                  }}
                                />
                              </Tooltip>
                            </span>
                          </p>
                          <span className="flex gap-2">
                            <button className={styles.btn}>{item.price}</button>
                            <span
                              className={`${styles.iconBtn} text-sky-500 cursor-pointer`}
                            >
                              <Tooltip title="O'chirish">
                                <EditIcon
                                  onClick={() => {
                                    setIsEditPriceModal(true);
                                    setPrice(item.price);
                                    setItem(item);
                                  }}
                                />
                              </Tooltip>
                            </span>
                            <Tooltip title="O'chirish">
                              <span
                                className={`${styles.iconBtn} text-red-500 cursor-pointer`}
                                onClick={() => {
                                  setIsDialogeDeleteItem(true);
                                  setItem(item);
                                }}
                              >
                                {isDeletingThenImage ? (
                                  <div className="animate-spin inline-block w-4 h-4 border-t-2 border-l-2 border-black rounded-full" />
                                ) : (
                                  <DeleteIcon />
                                )}
                              </span>
                            </Tooltip>
                          </span>
                        </article>
                      </React.Fragment>
                    )}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ) : (
            <> Hali xizmat turi tanlanmadi</>
          )}
        </main>
      </main>

      {/* Modals */}
      <Modal
        isOpenModal={isAddCarServiceMoadlOpen}
        setIsOpenModal={setIsAddCarServiceMoadlOpen}
        handeClear={() => {
          setSelectedService("");
          setPrice("");
          setDescription("");
          setBeforeImage("");
          setThenImage("");
        }}
        isSaving={isSaving}
        handleYes={handleSaveNewItem}
      >
        <div className={modalstyles.main}>
          <picture className={modalstyles.picture}>
            <section className={modalstyles.section}>
              <input
                type="file"
                className="hidden"
                ref={beforeImageRef}
                accept="image/*"
                onChange={(e) => handleSelectBeforeImage({ e })}
              />
              <button
                className={modalstyles.btn}
                onClick={() => beforeImageRef.current?.click()}
              >
                {isLoadingBeforeImage ? (
                  <div className="animate-spin inline-block w-4 h-4 border-t-2 border-l-2 border-black rounded-full" />
                ) : (
                  "Dastlabki"
                )}
              </button>
              {beforeImage.length !== 0 && (
                <img className={modalstyles.img} src={beforeImage} alt="" />
              )}
            </section>
            <section className={modalstyles.section}>
              <input
                type="file"
                className="hidden"
                ref={thenImageRef}
                accept="image/*"
                onChange={(e) => handleSelectThenImage({ e })}
              />
              <button
                className={modalstyles.btn}
                onClick={() => thenImageRef.current?.click()}
              >
                {isLoadingThenImage ? (
                  <div className="animate-spin inline-block w-4 h-4 border-t-2 border-l-2 border-black rounded-full" />
                ) : (
                  "Natija"
                )}
              </button>
              {thenImage.length !== 0 && (
                <img className={modalstyles.img} src={thenImage} alt="" />
              )}
            </section>
          </picture>
          <Input
            setValue={setPrice}
            type="text"
            value={price}
            placeholder="m.u: 200$"
            title="Narx"
          />
          <Input
            isTextArea
            height="300px"
            setValue={setDescription}
            type="text"
            value={description}
            placeholder="Shu service bo'yicha ma'lumot"
            title="Ma'lumot"
          />
        </div>
      </Modal>

      <Modal
        handleYes={handleEditDescription}
        handeClear={() => setDescription("")}
        isOpenModal={isEditDescriptionModal}
        setIsOpenModal={setIsEditDescriptionModal}
        isSaving={isSaving}
      >
        <Input
          placeholder="Shu servis bo'yicha ma'lumot"
          value={description}
          setValue={setDescription}
          type="text"
          title="Ma'lumot"
          isTextArea
          height="h-[150px]"
        />
      </Modal>

      <Modal
        handleYes={handleEditPrice}
        handeClear={() => setPrice("")}
        isOpenModal={isEditPriceModal}
        setIsOpenModal={setIsEditPriceModal}
        isSaving={isSaving}
      >
        <Input
          placeholder="m.u: 200$"
          value={price}
          setValue={setPrice}
          type="text"
          title="Narx"
        />
      </Modal>

      {/* Dialogs */}
      <Dialog
        isOpenDialog={isDialogeDeleteItem}
        setIsOpenDialog={setIsDialogeDeleteItem}
        handleYes={handleDeleteItem}
      >
        Rostanham o'chirmoqchimisiz?
      </Dialog>

      <Dialog
        isOpenDialog={isDialogAddImageOpen}
        setIsOpenDialog={setIsDialogAddImageOpen}
      >
        Rostanham rasm qo'shmoqchimisiz?
      </Dialog>

      <Dialog
        isOpenDialog={isDialogEditDescription}
        setIsOpenDialog={setIsDialogEditDescription}
      >
        Rostanham ma'lumotni o'zgartirmoqchimisz?
      </Dialog>

      <Dialog
        isOpenDialog={isDialogDeleteImage}
        setIsOpenDialog={setIsDialogDeleteImage}
      >
        Rostanham rasmni o'chirmoqchimisiz?
      </Dialog>

      <Dialog
        isOpenDialog={isDialogEditPrice}
        setIsOpenDialog={setIsDialogEditPrice}
      >
        Rostanham narxni o'zgartirmoqchimisz?
      </Dialog>
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
  picture:
    "relative h-[50px] w-[50px]  rounded-full overflow-hidden flex justify-center items-center",
  image: " h-full absolute",
  strong: "",

  fieldset: "border border-black p-2 rounded-md mx-auto w-[300px] flex",
  legend: "",
  cite: "text-sky-500 font-semibold",
  input: "w-full p-2 focus:outline-none",

  services:
    "  bg-slate-200 w-[900px] lg:w-[600px] md:w-[500px] sm:w-[400px] xs:w-[330px] flex flex-col gap-4 p-2 rounded-md",
  title: "flex gap-2 items-center",
  titleP: "font-bold",
  iconBtn: "hover:bg-slate-100 p-2 rounded-full",

  ul: "flex flex-col gap-2 h-[350px] overflow-y-auto",
  li:
    "flex md:flex-col gap-3 bg-slate-100 p-2 rounded-md drop-shadow-md justify-center items-center",
  article: "w-1/2 md:w-full flex flex-col justify-between gap-2",
  btn: "w-[200px] md:w-full mx-auto rounded-md bg-sky-400 hover:bg-sky-300 p-2",

  view: "w-1/2 flex gap-2 overflow-y-auto",
  imageSection: "w-1/2 md:w-full flex justify-center items-center",
};

const modalstyles = {
  main: " flex flex-col gap-4 items-center",
  picture: "flex w-full gap-2",
  section: "w-1/2 flex flex-col gap-2",
  btn: "w-full mx-auto rounded-md bg-sky-400 hover:bg-sky-300 p-2",
  img: "h-[200px] rounded-md",
};
