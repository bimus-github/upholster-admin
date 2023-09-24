import React from "react";
import { Cars } from "../components";
import { Outlet } from "react-router-dom";

function Designs() {
  return (
    <section className={styles.main}>
      {/* Cars section */}
      <Cars />

      <Outlet />
    </section>
  );
}

export default Designs;

const styles = {
  main: "min-h-[100vh] flex flex-col p-10 sm:p-5 items-center gap-10",
};
