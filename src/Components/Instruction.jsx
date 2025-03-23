import React from "react";

export default function Instruction({ setInstruction, instruction }) {
  return (
    <div
      className={`fixed inset-0 bg-black/50 ${
        instruction ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">How to Play</h2>
        <p className="text-gray-700 mb-4">
          Guess the 5-letter word in 6 tries. Each guess must be a valid
          5-letter word.
        </p>
        <p className="text-gray-700 mb-4">
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Green: Correct letter, correct spot</li>
          <li>Yellow: Correct letter, wrong spot</li>
          <li>Gray: Incorrect letter</li>
        </ul>
        <button
          onClick={() => setInstruction(false)}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
}
