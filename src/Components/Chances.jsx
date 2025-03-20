import React, { useRef, useState } from "react";

function Chances({ word, setChancesData, chancesData, index }) {
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
        chances[index + 1] = { ...chances[index + 1], trialUsed: false };
        setChancesData(chances);
      }
    }
  };
  return (
    <div className=" " onKeyDown={handleKeyPress}>
      {inputValue.map((elem, elemIndex) => (
        <input
          key={elemIndex}
          id={elemIndex}
          ref={(el) => (reference.current[elemIndex] = el)}
          className={`w-12 h-12 border border-gray-300 ${
            elem.status == "default"
              ? "bg-gray-500"
              : elem.status == "present"
              ? "bg-amber-500"
              : elem.status == "positionPresent"
              ? "bg-green-500"
              : ""
          } rounded text-center focus:outline-none focus:ring focus:border-blue-300`}
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
