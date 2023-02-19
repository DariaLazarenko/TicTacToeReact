import React, { useState } from "react";

export default function TicTacToe() {
  const [fields, setFields] = useState(Array(9).fill(null));
  const [gameStatus, setGameStatus] = useState("");

  function AiResponse(fields) {
    let isSet = false;
    while (!isSet) {
      const randomIndex = Math.floor(Math.random() * 9);
      if (fields[randomIndex] === null) {
        fields[randomIndex] = "O";
        isSet = true;
      }
    }
    return fields;
  }

  function Win(fields) {
    for (let i = 0; i < 3; i++) {
      // check all columns
      if (
        fields[i] === fields[i + 3] &&
        fields[i] === fields[i + 6] &&
        fields[i] !== null
      ) {
        return fields[i];
      }
      // check all rows
      if (
        fields[i * 3] === fields[i * 3 + 1] &&
        fields[i * 3] === fields[i * 3 + 2] &&
        fields[i * 3] !== null
      ) {
        return fields[i * 3];
      }
    }
    // check both diagonals
    if (
      fields[0] === fields[4] &&
      fields[0] === fields[8] &&
      fields[0] !== null
    ) {
      return fields[0];
    }
    if (
      fields[2] === fields[4] &&
      fields[2] === fields[6] &&
      fields[2] !== null
    ) {
      return fields[2];
    }
    // if we get here, no one has won
    return "";
  }

  function Field({ value, onFieldClick }) {
    return (
      <button className="btn-field" onClick={onFieldClick}>
        {value}
      </button>
    );
  }

  async function resetGame() {
    // Timer that waits a second before continuing code execution
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setGameStatus("");
    setFields(Array(9).fill(null));
  }

  function handleClick(index) {
    if (fields[index] != null) {
      return;
    }

    let newFields = [...fields];

    if (newFields[index] === null) {
      newFields[index] = "X";
    }
    setFields(newFields);

    if (Win(newFields) === "X") {
      setGameStatus("You win🥳");
      resetGame();
    } else {
      // create a list of non-null fields
      let nonNullFields = newFields.filter((field) => field !== null);
      if (nonNullFields.length === 9) {
        setGameStatus("Draw🤝");
        resetGame();
      } else {
        // fill a random empty field with the "0"
        newFields = [...AiResponse(newFields)];
        setFields(newFields);
        if (Win(newFields) === "O") {
          setGameStatus("You lose🥳");
          resetGame();
        }
      }
    }
  }

  return (
    <>
      <h1>TicTacToe!</h1>
      <div className="btn-container">
        <Field value={fields[0]} onFieldClick={() => handleClick(0)} />
        <Field value={fields[1]} onFieldClick={() => handleClick(1)} />
        <Field value={fields[2]} onFieldClick={() => handleClick(2)} />
      </div>
      <div className="btn-container">
        <Field value={fields[3]} onFieldClick={() => handleClick(3)} />
        <Field value={fields[4]} onFieldClick={() => handleClick(4)} />
        <Field value={fields[5]} onFieldClick={() => handleClick(5)} />
      </div>
      <div className="btn-container">
        <Field value={fields[6]} onFieldClick={() => handleClick(6)} />
        <Field value={fields[7]} onFieldClick={() => handleClick(7)} />
        <Field value={fields[8]} onFieldClick={() => handleClick(8)} />
      </div>
      <h2>{gameStatus}</h2>
    </>
  );
}
