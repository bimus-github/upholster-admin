import React, { useEffect } from "react";
import { Cars, ImageLoading } from "../components";
import { Outlet } from "react-router-dom";
import { getCars } from "../firebase/functions/car";
import { useAppDispatch } from "../store/hooks";
import { carActions } from "../store/features/carSlices";
import { getServices } from "../firebase/functions/service";
import { serviceAction } from "../store/features/serviceSlices";

function Designs() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCars().then((data) => {
      data && dispatch(carActions.setCars(data));
    });

    getServices()
      .then((data) => {
        data && dispatch(serviceAction.setServices(data));
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
