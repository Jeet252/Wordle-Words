import React, { useEffect, useState, useRef } from "react";
import Chances from "../Components/Chances";
import axios from "axios";
import Instruction from "../Components/Instruction";

function GamePage() {
  const reference = useRef([]);
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
      input: [
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
      ],
    },
    {
      id: 2,
      trialUsed: true,
      input: [
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
      ],
    },
    {
      id: 3,
      trialUsed: true,
      input: [
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
      ],
    },
    {
      id: 4,
      trialUsed: true,
      input: [
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
      ],
    },
    {
      id: 5,
      trialUsed: true,
      input: [
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
      ],
    },
    {
      id: 6,
      trialUsed: true,
      input: [
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
        { value: "", status: "" },
      ],
    },
  ]);

  const handleCheck = (correctLetters, index) => {
    if (correctLetters == 5 || index == 5) {
      let chances = [...chancesData];
      for (let i = 0; i < 6; i++) {
        chances[i].trialUsed = true;
      }
      setChancesData([...chances]);
      setShowWord(!showWord);
    }
  };

  const handleKeyPress = (e, index) => {
    if (/^[^a-zA-Z\s]$/.test(e.key)) {
      e.preventDefault();
    }
    if (e.key == "Backspace") {
      e.preventDefault();
      let newInput = [...chancesData];
      let id = parseInt(e.target.id.slice(1));
      newInput[index].input[id].value = "";
      setChancesData([...newInput]);
      if (id !== 0 && e.target.value === "") {
        setTimeout(() => {
          reference.current[index * 5 + id - 1].focus();
        }, 0);
      }
    }
    if (e.key == "Enter") {
      e.preventDefault();
      if (!chancesData[index].input.some((value) => value.value == "")) {
        let correctLetters = 0;
        for (let i = 0; i < 5; i++) {
          let newInput = [...chancesData];
          if (word.word.includes(chancesData[index].input[i].value)) {
            if (word.word[i] == chancesData[index].input[i].value) {
              newInput[index].input[i].status = "positionPresent";
              setChancesData([...newInput]);
              correctLetters += 1;
            } else {
              newInput[index].input[i].status = "present";
              setChancesData([...newInput]);
            }
          } else {
            newInput[index].input[i].status = "default";
            setChancesData([...newInput]);
          }
        }
        let chances = [...chancesData];
        chances[index] = { ...chances[index], trialUsed: true };
        if (index < 5) {
          chances[index + 1] = { ...chances[index + 1], trialUsed: false };
        }
        if (index < 5)
          setTimeout(() => {
            reference.current[index * 5 + 5].focus();
          }, 0);
        setChancesData(chances);
        handleCheck(correctLetters, index);
      }
    }
  };

  useEffect(() => {
    const date = new Date();
    const timeNow = String(date.getDate()) + "/" + String(date.getHours());
    if (!word || word.time !== timeNow) {
      (async () => {
        try {
          const response = await axios.get(
            "https://apilearning.netlify.app/.netlify/functions/api/wordle-words"
          );
          const wordData = {
            word: [
              ...response.data[Math.floor(Math.random() * (340 - 0 + 1)) + 0],
            ],
            time: String(date.getDate()) + "/" + String(date.getHours()),
          };
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
        {chancesData.map((elem, index) => (
          <div
            className="grid grid-cols-5 gap-2"
            key={elem.id}
            index={index}
            onKeyDown={(e) => handleKeyPress(e, index)}
          >
            <Chances
              inputValue={elem.input}
              reference={reference}
              chancesData={chancesData}
              index={index}
              word={!word ? "loading" : word.word}
              setChancesData={setChancesData}
              setShowWord={setShowWord}
            />
          </div>
        ))}

        <div className="grid grid-cols-5 gap-2">
          {!word ? (
            <h1>Loading</h1>
          ) : (
            word.word.map((_, index) => (
              <input
                key={index}
                className="border border-gray-300 rounded p-2 w-12 text-center focus:outline-none focus:ring focus:ring-blue-300"
                value={showWord ? _ : "?"}
                disabled={true}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default GamePage;
