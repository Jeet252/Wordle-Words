import React, { useRef, useState } from "react";

function Chances({ word, setChancesData, chancesData, index, setShowWord }) {
  const [inputValue, setInputValue] = useState([
    { value: "", status: "" },
    { value: "", status: "" },
    { value: "", status: "" },
    { value: "", status: "" },
    { value: "", status: "" },
  ]);
  const reference = useRef([]);

  const handleChange = (e) => {
    let newinput = [...inputValue];
    let id = parseInt(e.target.id);

    newinput[id].value = e.target.value.toUpperCase();
    setInputValue(newinput);
    if (id < 4) {
      reference.current[id + 1].focus();
    }
  };
  const matchWord = () => {};
  const handleKeyPress = (e) => {
    if (e.key == "Backspace") {
      e.preventDefault();
      let newInput = [...inputValue];
      let id = parseInt(e.target.id);
      newInput[id].value = "";
      setInputValue([...newInput]);
      if (id !== 0) {
        setTimeout(() => {
          reference.current[id - 1].focus();
        }, 0);
      }
    }
    if (e.key == "Enter") {
      e.preventDefault();
      if (!inputValue.some((value) => value.value == "")) {
        for (let i = 0; i < 5; i++) {
          let newInput = [...inputValue];
          if (word.includes(inputValue[i].value)) {
            if (word[i] == inputValue[i].value) {
              newInput[i].status = "positionPresent";
              setInputValue([...newInput]);
            } else {
              newInput[i].status = "present";
              setInputValue([...newInput]);
            }
          } else {
            newInput[i].status = "default";
            setInputValue([...newInput]);
          }
        }
        let chances = [...chancesData];
        chances[index] = { ...chances[index], trialUsed: true };
        if (index < 5) {
          chances[index + 1] = { ...chances[index + 1], trialUsed: false };
        }
        setChancesData(chances);
      }
    }
  };
  return (
    <div className="grid grid-cols-5 gap-2 " onKeyDown={handleKeyPress}>
      {inputValue.map((elem, elemIndex) => (
        <input
          key={elemIndex}
          id={elemIndex}
          ref={(el) => (reference.current[elemIndex] = el)}
          className={`border text-center border-gray-300 rounded p-4 shadow-sm focus:outline-none focus:ring focus:ring-blue-300 ${
            elem.status == "default"
              ? "bg-gray-200"
              : elem.status == "present"
              ? "bg-yellow-200"
              : elem.status == "positionPresent"
              ? "bg-green-200"
              : ""
          }  `}
          type="text"
          maxLength={1}
          value={elem.value}
          onChange={handleChange}
          autoComplete="off"
          disabled={chancesData[index].trialUsed}
        />
      ))}
    </div>
  );
}

export default Chances;
