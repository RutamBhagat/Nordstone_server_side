"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Slider from "../components/Slider";

export default function page() {
  const [result, setResult] = useState("0");
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  const [operation, setOperation] = useState("+");

  //   const calculate = async () => {
  //     try {
  //       const response = await axios.post("/api/calculator/evaluate", {
  //         equation: `${num1}${operation}${num2}`,
  //       });
  //       setResult(response.data.result);
  //     } catch (error) {
  //       setResult("ERROR SENDING DATA TO SERVER");
  //     }
  //   };

  const calculate = async () => {
    try {
      const response = await axios.post("/api/calculator/simpleEvaluate", {
        equation: `${num1}${operation}${num2}`,
      });
      setResult(response.data.result);
    } catch (error) {
      setResult("ERROR SENDING DATA TO SERVER");
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center gap-10 p-10">
      <div className="text-xl w-full max-w-xl rounded-xl bg-gray-900">
        <div className="flex flex-col justify-center items-center min-h-[600px] w-full">
          <div className="border border-t-0 border-l-0 border-r-0 border-b-2 border-gray-600 w-[500px]">
            <div className="flex justify-between items-center gap-10 m-5">
              <label className="text-gray-600">Number {num1}</label>
              <Slider
                numValue={num1}
                changeHandler={(e: any) => {
                  let value = e.target.value;
                  setNum1(value);
                }}
              />
            </div>
            <div className="flex justify-between items-center gap-10 m-5">
              <label className="text-gray-600">Operation</label>
              <div className="inline-block">
                <div className="relative w-[150px] max-w-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <select
                    onChange={(e) => {
                      const selectedOperation = e.target.value;
                      setOperation(selectedOperation);
                    }}
                    className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  >
                    <option value="+">+</option>
                    <option value="-">&ndash;</option>
                    <option value="*">&times;</option>
                    <option value="/">&divide;</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-10 m-5">
              <label className="text-gray-600">Number {num2}</label>
              <Slider
                numValue={num2}
                changeHandler={(e: any) => {
                  let value = e.target.value;
                  setNum2(value);
                }}
              />
            </div>
          </div>
          <div className="w-[500px]">
            <div className="flex justify-between items-center gap-10 m-5">
              <h1 className="text-gray-300 text-2xl pl-10">{result}</h1>
              <button
                onClick={calculate}
                className="w-[150px] px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Link
        href="/calculator"
        className="fixed right-5 bottom-5 px-3 py-3 text-indigo-600 bg-indigo-50 rounded-lg duration-150 hover:bg-indigo-100 active:bg-indigo-200"
      >
        <img className="w-8" src="https://img.icons8.com/nolan/64/calculator--v1.png" alt="calculator--v1" />
      </Link>
    </div>
  );
}
