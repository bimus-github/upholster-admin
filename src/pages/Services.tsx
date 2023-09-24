import React from "react";
import { ServicesSection } from "../components";

function Services() {
  return (
    <section className={styles.main}>
      {/* types of services section */}
      <ServicesSection />
    </section>
  );
}

export default Services;

const styles = {
  main: "min-h-[100vh] flex flex-col p-10 sm:p-5 items-center gap-10",
};
