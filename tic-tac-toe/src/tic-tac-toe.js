import React, { useState } from "react";

export default function TicTacToe() {
  const [fields, setFields] = useState(() => {
    let newFields = Array(9).fill(null);
    if (Math.floor(Math.random() * 2) === 0) {
      newFields = AiResponse(newFields);
    }
    return newFields;
  });
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

  function Win(inputFields) {
    for (let i = 0; i < 3; i++) {
      // check all columns
      if (
        inputFields[i] === inputFields[i + 3] &&
        inputFields[i] === inputFields[i + 6] &&
        inputFields[i] !== null
      ) {
        return inputFields[i];
      }
      // check all rows
      if (
        inputFields[i * 3] === inputFields[i * 3 + 1] &&
        inputFields[i * 3] === inputFields[i * 3 + 2] &&
        inputFields[i * 3] !== null
      ) {
        return inputFields[i * 3];
      }
    }
    // check both diagonals
    if (
      inputFields[0] === inputFields[4] &&
      inputFields[0] === inputFields[8] &&
      inputFields[0] !== null
    ) {
      return inputFields[0];
    }
    if (
      inputFields[2] === inputFields[4] &&
      inputFields[2] === inputFields[6] &&
      inputFields[2] !== null
    ) {
      return inputFields[2];
    }

    const nonNullFields = inputFields.filter((field) => field !== null);
    if (nonNullFields.length === 9) {
      return "Draw";
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
    let newFields = Array(9).fill(null);
    if (Math.floor(Math.random() * 2) === 0) {
      newFields = AiResponse(newFields);
    }
    setFields(newFields);
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
    } else if (Win(newFields) === "Draw") {
      setGameStatus("Draw🤝");
      resetGame();
    } else {
      // fill a random empty field with the "0"
      newFields = [...AiResponse(newFields)];
      setFields(newFields);
      if (Win(newFields) === "O") {
        setGameStatus("You lose😔");
        resetGame();
      } else if (Win(newFields) === "Draw") {
        setGameStatus("Draw🤝");
        resetGame();
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
