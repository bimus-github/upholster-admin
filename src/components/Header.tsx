/* eslint-disable jsx-a11y/anchor-is-valid */

import CloseIcon from "@mui/icons-material/Close";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IconButton } from "@mui/material";
import React from "react";
import { useState } from "react";

function Header() {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <strong className={styles.logo}>Admin</strong>

      <nav className={`${styles.nav} sm:hidden`}>
        <a className={styles.a}>HAQIMIZDA</a>
        <a className={styles.a}>HIZMATLAR</a>
        <a className={styles.a}>DIZAYNLAR</a>
        <a className={styles.a}>BOG'LANISH</a>
      </nav>

      <div className={`${styles.a} hidden sm:flex`}>
        <IconButton onClick={() => setOpenSideBar(!openSideBar)}>
          <MenuOpenIcon />
        </IconButton>
      </div>

      <aside
        className={`${styles.aside} hidden sm:${
          openSideBar ? "flex" : "hidden"
        }`}
      >
        <nav className={styles.nav}>
          <IconButton
            onClick={() => setOpenSideBar(!openSideBar)}
            className={styles.a}
          >
            <CloseIcon />
          </IconButton>
          <a className={styles.a}>HAQIMIZDA</a>
          <a className={styles.a}>HIZMATLAR</a>
          <a className={styles.a}>DIZAYNLAR</a>
          <a className={styles.a}>BOG'LANISH</a>
        </nav>
      </aside>
    </header>
  );
}

export default Header;

const styles = {
  header:
    "fixed top-0 left-0 w-full bg-white shadow-md h-16 flex justify-between items-center px-4 bg-opacity-90",
  logo: " text-[24px]",
  nav: "flex gap-5 lg:gap-4 md:gap-3 sm:gap-5 sm:flex-col font-semibold ",
  aside:
    "fixed top-0 right-0 w-[200px] min-h-[100vh] bg-white shadow-md h-16 flex justify-center p-5 items-start px-4 drop-shadow-md",
  a: "hover:opacity-50",
};
