import React from "react";

interface InputProps {
  title: string;
  placeholder: string;
  type?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  isTextArea?: boolean;
  height?: string;
}
function Input({
  title,
  placeholder,
  type = "text",
  value,
  setValue,
  isTextArea = false,
  height,
}: InputProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}> {title}*</cite>
      </legend>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          className={`w-full focus:outline-none ${height}`}
        />
      ) : (
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          className={`w-full focus:outline-none ${height}`}
          type={type}
          autoComplete="off"
        />
      )}
    </fieldset>
  );
}

export default Input;

const styles = {
  fieldset:
    "border w-full px-3 py-2 rounded-md border-black flex flex-col items-center shadow-md",
  legend: "relative font-semibold text-[20px]",
  cite: "text-sky-500 text-[16px]",
};
