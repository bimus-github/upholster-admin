import React from "react";

interface SpinnerLoadingProps {
  scale?: number;
}
function SpinnerLoading(props: SpinnerLoadingProps) {
  const { scale } = props;
  return (
    <div
      className={`${styles.spinners}`}
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <div className={`${styles.spinner} ${styles.top}`} />
      <div className={`${styles.spinner} ${styles.bottom}`} />
    </div>
  );
}

export default SpinnerLoading;

const styles = {
  spinners: "w-[100px] h-[100px] relative bg-slate-200",
  spinner:
    "box-border absolute w-full h-full border-solid border-transparent border-8 rounded-full",
  bottom: "border-t-gray-900  animate-spinner-one",
  top: "border-b-gray-900 animate-spinner-two",
};
