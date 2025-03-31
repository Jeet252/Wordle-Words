import axios from "axios";
import React, { useState } from "react";
import { HiLightBulb } from "react-icons/hi2";
import Loader from "./Loader";

export default function HintSection({ arrayOfLetter }) {
  const [hints, setHints] = useState(2);
  const [hintDetails, setHintDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (hints >= 0) {
      setIsLoading(true);
      let word = "";
      for (let index = 0; index < arrayOfLetter.length; index++) {
        const element = arrayOfLetter[index];
        word = word + element;
      }
      const response = await axios.get(
        `https://apilearning.netlify.app/.netlify/functions/api/${word}/${hints}`
      );

      setHintDetails(response.data.word);
      setHints(hints - 1);
      setIsLoading(false);
    }
  };

  return (
    <div className="m-2 flex flex-col justify-center items-center">
      <div
        className={`flex w-18 h-9 mb-1.5 justify-center items-center border-amber-900 border-2 rounded ${
          hints < 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={handleClick}
      >
        <HiLightBulb />
        <span className="font-bold">Hint</span>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <p className={`text-green-500 ${hintDetails === "" ? "hidden" : ""}`}>
          {hintDetails}
        </p>
      )}
    </div>
  );
}
