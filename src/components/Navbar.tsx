/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { typeText } from "../unils/functions/typeText";

function Navbar() {
  const textRef: React.LegacyRef<HTMLElement> = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isClosedSideBar, setIsClosedSideBar] = useState<boolean>(true);

  useEffect(() => {
    typeText(textRef);
  }, []);

  const handleNavigatePage = (path: string) => {
    navigate(path);
  };

  return (
    <nav className={styles.nav}>
      <header className={styles.header}>
        <strong
          ref={textRef}
          className="text-[30px] sm:text-[25px] cursor-pointer"
        >
          Admin
        </strong>
      </header>

      <aside
        id="sidebar"
        className={`${styles.aside} ${
          isClosedSideBar ? "w-[60px]" : "w-[200px]"
        }`}
      >
        <button
          onClick={() => setIsClosedSideBar(!isClosedSideBar)}
          className={styles.iconBtn}
        >
          {isClosedSideBar ? (
            <Tooltip title="Menuni ochish">
              <MenuOpenIcon fontSize="large" className={styles.icon} />
            </Tooltip>
          ) : (
            <Tooltip title="Menuni yopish">
              <ArrowBackIosIcon fontSize="large" className={styles.icon} />
            </Tooltip>
          )}
        </button>
        <div className="w-full h-[1px] bg-black" />
        <ul className={styles.ul}>
          <a
            onClick={() => handleNavigatePage("/")}
            className={`${styles.link} ${location.pathname === "/" &&
              "text-sky-600 scale-125 animate-pulse"}`}
          >
            <p className={`${styles.p} ${isClosedSideBar && "opacity-0"}`}>
              HAQIMIZDA
            </p>
            {isClosedSideBar && (
              <Tooltip title="Haqimizda">
                <ImportContactsIcon className="absolute" />
              </Tooltip>
            )}
          </a>
          <a
            onClick={() => handleNavigatePage("/services")}
            className={`${styles.link} ${location.pathname === "/services" &&
              "text-sky-600 scale-125 animate-pulse"}`}
          >
            <p className={`${styles.p} ${isClosedSideBar && "opacity-0"}`}>
              XIZMATLAR
            </p>
            {isClosedSideBar && (
              <Tooltip title="Xizmatlar">
                <MiscellaneousServicesIcon className="absolute" />
              </Tooltip>
            )}
          </a>
          <a
            className={`${styles.link} ${location.pathname === "/designs" &&
              "text-sky-600 scale-125 animate-pulse"}`}
            onClick={() => handleNavigatePage("/designs")}
          >
            <p className={`${styles.p} ${isClosedSideBar && "opacity-0"}`}>
              DIZAYNLAR
            </p>
            {isClosedSideBar && (
              <Tooltip title="Dizayn">
                <DirectionsCarIcon className="absolute" />
              </Tooltip>
            )}
          </a>
        </ul>
      </aside>

      <main
        onClick={() => setIsClosedSideBar(true)}
        id="main"
        className="pl-[60px] pt-[70px] z-0"
      >
        <Outlet />
      </main>
    </nav>
  );
}

export default Navbar;

const styles = {
  nav: "relative",
  header:
    "fixed top-0 left-0 right-0 z-10 bg-white drop-shadow-md h-[70px] p-5 flex items-center",
  aside:
    "fixed top-0 left-0 right-0 z-[5] bottom-0 bg-white drop-shadow-md pt-[100px] flex items-center flex-col ease-linear transition-all duration-300",
  ul: "flex flex-col gap-5 py-5 w-[80%]",
  link:
    "relative p-2 w-full text-center hover:bg-opacity-90 font-semibold hover:bg-slate-100 flex justify-center gap-4",
  p: "ease-linear transition-opacity duration-300",
  iconBtn: "hover:bg-slate-100 p-3 rounded-full",
  icon: "text-2xl text-blue-700 animate-ping-sm",
};
