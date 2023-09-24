import React from "react";

const ImageLoading = () => {
  return (
    <div
      className={styles.main}
      style={{
        perspective: "200px",
      }}
    >
      <div className={styles.card} />
      <div
        className={styles.card}
        style={{
          animationDelay: "1s",
        }}
      />
    </div>
  );
};

export default ImageLoading;

const styles = {
  main: "w-[100px] h-[100px]",
  card:
    "absolute w-[50px] h-[50px] bg-sky-200 animate-flip-load origin-bottom-right ",
};
