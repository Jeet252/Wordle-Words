import axios from "axios";
import React, { useState } from "react";
import { HiLightBulb } from "react-icons/hi2";

export default function HintSection({ word }) {
  const [hints, setHints] = useState(-2);
  const [hintDetails, setHintDetails] = useState("");

  const handleClick = async () => {
    console.log(word);
    if (hints >= 0) {
      const response = await axios.get(
        `https://apilearning.netlify.app/.netlify/functions/api/${word}/${hints}`
      );
      console.log(response.data.word);
      setHintDetails(response.data.word);
      setHints(hints - 1);
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
      <p className={`text-green-500 ${hintDetails === "" ? "hidden" : ""}`}>
        {hintDetails}
      </p>
    </div>
  );
}
