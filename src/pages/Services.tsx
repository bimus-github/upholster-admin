import React, { useEffect } from "react";
import { ImageLoading, ServicesSection } from "../components";
import { getServices } from "../firebase/functions/service";
import { useAppDispatch } from "../store/hooks";
import { serviceAction } from "../store/features/serviceSlices";

function Services() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    getServices()
      .then((data) => {
        if (data) dispatch(serviceAction.setServices(data));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <ImageLoading />
      </div>
    );
  }
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
