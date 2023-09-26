import { useEffect, useState } from "react";
import {
  GarageImageSection,
  ImageLoading,
  LocationInfoSection,
  TelInfoSection,
} from "../components";
import {
  getAddress,
  getGarageImage,
  getTelNumbers,
} from "../firebase/functions/info";
import { useAppDispatch } from "../store/hooks";
import { infoActions } from "../store/features/infoSlices";

function About() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getGarageImage().then((url) => {
      if (url) dispatch(infoActions.setGarageImage(url.url));
    });

    getTelNumbers().then((data) => {
      if (data) dispatch(infoActions.setNumbers(data.number));
    });

    getAddress()
      .then((data) => {
        if (data) dispatch(infoActions.setAddress(data.address));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <ImageLoading />
      </div>
    );

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
