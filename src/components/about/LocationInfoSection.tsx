/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "../Dialog";
import Modal from "../Modal";
import Input from "../Input";
import { typeText } from "../../unils/functions/typeText";
import { addAddress, deleteAddress } from "../../firebase/functions/info";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { infoActions } from "../../store/features/infoSlices";
import { Tooltip } from "@mui/material";
import SpinnerLoading from "../loading/SpinnerLoading";

function LocationInfoSection() {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.info.address);
  const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [addressName, setAddressName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [deletedAddress, setDeletedAddress] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleAddAddress = () => {
    if (!addressName) return;
    if (!address) return;
    setIsSaving(true);

    addAddress({
      name: addressName,
      url: address,
    })
      .then(() => {
        setIsOpenModal(false);
        setIsOpenAddDialog(false);
        dispatch(
          infoActions.addAddress({
            name: addressName,
            url: address,
          })
        );
        setAddressName("");
        setAddress("");
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleDeleteAddress = () => {
    setIsDeleting(true);
    setIsOpenDeleteDialog(false);

    deleteAddress(deletedAddress)
      .then(() => {
        setIsOpenModal(false);
        dispatch(infoActions.removeAddress(deletedAddress));
        setDeletedAddress("");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}>Elektron Manzillar</cite>
        <button
          className={styles.iconBtn}
          onClick={() => setIsOpenAddDialog(true)}
        >
          <AddCircleIcon color="primary" />
        </button>
      </legend>
      <ul className={styles.ul}>
        {addresses.map((address, index) => (
          <React.Fragment key={index}>
            {address.url.length === 0 ? (
              <p key={index}>Hali manzil mavjud emas</p>
            ) : (
              <li key={index} className={styles.li}>
                <a href={`${address.url}`}>{address.name}</a>
                {isDeleting && address.url === deletedAddress ? (
                  <SpinnerLoading scale={0.3} />
                ) : (
                  <Tooltip title="O'chirish">
                    <button
                      onClick={() => {
                        setIsOpenDeleteDialog(true);
                        setDeletedAddress(address.url);
                      }}
                      className={`${styles.iconBtn} text-red-500`}
                    >
                      <DeleteIcon />
                    </button>
                  </Tooltip>
                )}
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>

      <Dialog
        handleYes={() => setIsOpenModal(true)}
        isOpenDialog={isOpenAddDialog}
        setIsOpenDialog={setIsOpenAddDialog}
      >
        <div>
          <p>Haqiqatdan ham manzilni o'zgartirmoqchimsz?</p>
        </div>
      </Dialog>

      <Dialog
        handleYes={handleDeleteAddress}
        isOpenDialog={isOpenDeleteDialog}
        setIsOpenDialog={setIsOpenDeleteDialog}
      >
        <div>
          <p>Haqiqatdan ham manzilni o'chirmoqchimsz?</p>
        </div>
      </Dialog>

      <Modal
        handleYes={handleAddAddress}
        handeClear={() => {
          setAddressName("");
          setAddress("");
        }}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isSaving={isSaving}
      >
        <Input
          title="Ism"
          placeholder="m.u: Telegram"
          value={addressName}
          setValue={setAddressName}
        />
        <Input
          title="Manzil"
          placeholder="m.u: t.me/muhammad_amin_sherzod_aliy"
          value={address}
          setValue={setAddress}
        />
      </Modal>
    </fieldset>
  );
}

export default LocationInfoSection;

const styles = {
  fieldset:
    "border w-full p-5 rounded-md border-black flex flex-col items-center",
  legend:
    "relative font-semibold text-[20px] flex gap-2 justify-center items-center",
  cite: "text-sky-500",
  iconBtn: "p-3 hover:bg-slate-100 rounded-full",
  ul: "flex flex-col gap-3 w-full ",
  li:
    "flex items-center justify-between bg-slate-200 pl-2 rounded-md drop-shadow-md",
};
