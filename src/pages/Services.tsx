import React from "react";
import { ServicesSection } from "../components";

function Services() {
  return (
    <section className={styles.main}>
      {/* hismat turlari */}
      <ServicesSection />
    </section>
  );
}

export default Services;

const styles = {
  main: "min-h-[100vh] flex flex-col p-10 items-center gap-10",
};
