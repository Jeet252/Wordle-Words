import React, { useEffect, useState } from "react";
import Chances from "../Components/Chances";
import axios from "axios";

function GamePage() {
  const [word, setWord] = useState();
  // const wordExist = localStorage.getItem('word')
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
    (async () => {
      try {
        const response = await axios.get(
          "https://api.frontendexpert.io/api/fe/wordle-words"
        );
        console.log(response.data);
        console.log(Math.floor(Math.random() * (340 - 0 + 1)) + 0);
      } catch (error) {}
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className={`grid`}>
          {chancesData.map((elem, index) => (
            <Chances
              key={elem.id}
              index={index}
              chancesData={chancesData}
              word={word}
              setChancesData={setChancesData}
            />
          ))}
        </div>

        <div className="flex space-x-2 mt-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 border border-gray-400 rounded flex items-center justify-center text-xl font-bold"
            >
              ?
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GamePage;
