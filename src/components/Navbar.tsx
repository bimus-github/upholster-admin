/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Outlet, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isClosedSideBar, setIsClosedSideBar] = useState<boolean>(true);

  return (
    <nav className={styles.nav}>
      <header className={styles.header}>
        <strong className="text-[30px] sm:text-[25px]  cursor-pointer">
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
            <MenuOpenIcon fontSize="large" className={styles.icon} />
          ) : (
            <ArrowBackIosIcon fontSize="large" className={styles.icon} />
          )}
        </button>
        <div className="w-full h-[1px] bg-black" />
        <ul className={styles.ul}>
          <a
            href="/"
            className={`${styles.link} ${location.pathname === "/" &&
              "text-sky-600 scale-125 animate-pulse"}`}
          >
            <p className={`${styles.p} ${isClosedSideBar && "opacity-0"}`}>
              HAQIMIZDA
            </p>
            {isClosedSideBar && <ImportContactsIcon className="absolute" />}
          </a>
          <a
            href="/services"
            className={`${styles.link} ${location.pathname === "/services" &&
              "text-sky-600 scale-125 animate-pulse"}`}
          >
            <p className={`${styles.p} ${isClosedSideBar && "opacity-0"}`}>
              HIZMATLAR
            </p>
            {isClosedSideBar && (
              <MiscellaneousServicesIcon className="absolute" />
            )}
          </a>
          <a
            href="/designs"
            className={`${styles.link} ${location.pathname === "/designs" &&
              "text-sky-600 scale-125 animate-pulse"}`}
          >
            <p className={`${styles.p} ${isClosedSideBar && "opacity-0"}`}>
              DIZAYNLAR
            </p>
            {isClosedSideBar && <DirectionsCarIcon className="absolute" />}
          </a>
        </ul>
      </aside>

      <main id="main" className="pl-[60px] pt-[70px] z-0">
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
  ul: "flex flex-col gap-5 py-5 w-full",
  link:
    "relative p-2 w-full text-center hover:bg-opacity-90 font-semibold hover:bg-slate-100 flex justify-center gap-4",
  p: "ease-linear transition-opacity duration-300",
  iconBtn: "hover:bg-slate-100 p-3 rounded-full",
  icon: "text-2xl text-blue-700 animate-ping-sm",
};
