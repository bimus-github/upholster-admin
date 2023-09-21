import {
  GarageImageSection,
  LocationInfoSection,
  TelInfoSection,
} from "../components";

function About() {
  return (
    <section className={styles.main}>
      {/*garage image section */}
      <GarageImageSection />

      {/*garage tel info section */}
      <TelInfoSection />

      {/*garage location info section */}
      <LocationInfoSection />
    </section>
  );
}

export default About;

const styles = {
  main: "min-h-[100vh] flex flex-col p-10 items-center gap-10",
};
