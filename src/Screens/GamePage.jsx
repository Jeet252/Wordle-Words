import React, { useEffect, useState } from "react";
import Chances from "../Components/Chances";
import axios from "axios";
import Instruction from "../Components/Instruction";

function GamePage() {
  const [word, setWord] = useState(() => {
    const storedWord = localStorage.getItem("WORD");
    return storedWord ? JSON.parse(storedWord) : undefined; // Parse the stored string into an object
  });
  const [instruction, setInstruction] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [chancesData, setChancesData] = useState([
    {
      id: 1,
      trialUsed: false,
    },
    {
      id: 2,
      trialUsed: true,
    },
    {
      id: 3,
      trialUsed: true,
    },
    {
      id: 4,
      trialUsed: true,
    },
    {
      id: 5,
      trialUsed: true,
    },
    {
      id: 6,
      trialUsed: true,
    },
  ]);

  useEffect(() => {
    const date = new Date();
    const timeNow = String(date.getDate()) + "/" + String(date.getHours());
    if (!word || word.time !== timeNow) {
      console.log(word);
      (async () => {
        try {
          const response = await axios.get(
            "https://apilearning.netlify.app/.netlify/functions/api/wordle-words"
          );
          const wordData = {
            word: response.data[Math.floor(Math.random() * (340 - 0 + 1)) + 0],
            time: String(date.getDate()) + "/" + String(date.getHours()),
          };
          console.log("Word Data:", wordData);
          setWord(wordData);
          localStorage.setItem("WORD", JSON.stringify(wordData));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <button
          onClick={() => setInstruction(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        >
          Instructions
        </button>
        <Instruction
          setInstruction={setInstruction}
          instruction={instruction}
        />
        <div className={`grid`}>
          {chancesData.map((elem, index) => (
            <Chances
              key={elem.id}
              index={index}
              chancesData={chancesData}
              word={word.word}
              setChancesData={setChancesData}
              setShowWord={setShowWord}
            />
          ))}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Array.from(word.word).map((_, index) => (
            <input
              key={index}
              className="border border-gray-300 rounded p-2 w-12 text-center focus:outline-none focus:ring focus:ring-blue-300"
              value={showWord ? _ : "?"}
              disabled={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default GamePage;
