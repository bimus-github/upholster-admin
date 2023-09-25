import { useEffect } from "react";
import {
  GarageImageSection,
  LocationInfoSection,
  TelInfoSection,
} from "../components";
import { getGarageImage, getTelNumbers } from "../firebase/functions/info";
import { useAppDispatch } from "../store/hooks";
import { infoActions } from "../store/features/infoSlices";

function About() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getGarageImage()
      .then((url) => {
        if (url) dispatch(infoActions.setGarageImage(url.url));
      })
      .finally(() => {});
  }, [dispatch]);

  useEffect(() => {
    getTelNumbers().then((data) => {
      if (data) dispatch(infoActions.setNumbers(data.number));
    });
  }, [dispatch]);
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
  main: "min-h-[100vh] flex flex-col p-10 sm:p-5 items-center gap-10",
};
