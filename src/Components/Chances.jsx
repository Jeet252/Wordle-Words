import React from "react";

function Chances({ setChancesData, reference, chancesData, index }) {
  const handleChange = (e) => {
    let newInput = [...chancesData];
    let id = parseInt(e.target.id.slice(1));
    newInput[index].input[id].value = e.target.value.toUpperCase();
    setChancesData([...newInput]);
    if (id < 4) {
      reference.current[index * 5 + id + 1].focus();
    }
  };

  return (
    <>
      {chancesData[index].input.map((elem, elemIndex) => (
        <input
          key={elemIndex}
          id={String(index) + String(elemIndex)}
          ref={(el) => (reference.current[index * 5 + elemIndex] = el)}
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
    </>
  );
}

export default Chances;
