import React from "react";

interface InputProps {
  title: string;
  placeholder: string;
  type?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}
function Input({
  title,
  placeholder,
  type = "text",
  value,
  setValue,
}: InputProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <cite className={styles.cite}> {title}*</cite>
      </legend>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        className="w-full focus:outline-none"
        type={type}
      />
    </fieldset>
  );
}

export default Input;

const styles = {
  fieldset:
    "border w-full px-3 py-2 rounded-md border-black flex flex-col items-center",
  legend: "relative font-semibold text-[20px]",
  cite: "text-sky-500 text-[16px]",
};
