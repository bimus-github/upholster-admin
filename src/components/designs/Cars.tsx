import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const damas =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ732b4s6iTlVg2XPePnCRawVLejqsiEy4Ge7HTL7hqhg&s";

function Cars() {
  const navigate = useNavigate();
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}>Mashinalar</cite>
        <Tooltip title="Qo'shish">
          <button className={`${styles.iconBtn}  ${styles.addIcon}`}>
            <AddCircleIcon />
          </button>
        </Tooltip>
      </legend>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <div className={styles.div}>
            <picture className={styles.picture}>
              <img src={damas} alt="" className={styles.image} />
            </picture>
            <strong
              className="text-sky-500 cursor-pointer"
              onClick={() => navigate("/designs/1")}
            >
              Damas
            </strong>
          </div>

          <div className={styles.div}>
            <Tooltip title="O'zgartirish">
              <button className={`${styles.iconBtn}  ${styles.editIcon}`}>
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip title="O'chirish">
              <button className={`${styles.iconBtn} ${styles.deleteIcon}`}>
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        </li>
        <li className={styles.li}>
          <div className={styles.div}>
            <picture className={styles.picture}>
              <img src={damas} alt="" className={styles.image} />
            </picture>
            <strong>Damas</strong>
          </div>

          <div className={styles.div}>
            <Tooltip title="O'zgartirish">
              <button className={`${styles.iconBtn}  ${styles.editIcon}`}>
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip title="O'chirish">
              <button className={`${styles.iconBtn} ${styles.deleteIcon}`}>
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        </li>
      </ul>
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
