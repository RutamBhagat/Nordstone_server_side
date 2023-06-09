import React from "react";
import ts from "typescript";

type Props = {
  changeHandler: any;
  numValue: string;
};

export default function Slider({ changeHandler, numValue }: Props) {
  return (
    <input
      type="text"
      onChange={changeHandler}
      value={numValue}
      onKeyPress={(event) => {
        // @ts-ignore
        const value = event.target.value;
        const pattern = /[0-9.]/; // Updated pattern to allow numbers and "."
        const inputChar = String.fromCharCode(event.charCode);

        if (value.includes(".") && inputChar === ".") {
          event.preventDefault();
        }

        if (!pattern.test(inputChar)) {
          event.preventDefault();
        }

        // Remove leading zeros if second character is an integer
        const inputValue = value;
        if (inputValue.length === 1 && inputValue === "0" && inputChar !== ".") {
          // @ts-ignore
          event.target.value = inputChar;
          event.preventDefault();
        }
      }}
      className="w-[150px] px-4 py-2 appearance-none outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
    />
  );
}
