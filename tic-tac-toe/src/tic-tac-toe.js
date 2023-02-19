import React, { useState } from "react";

export default function TicTacToe() {
  const [fields, setFields] = useState(Array(9).fill(null));
  const [gameStatus, setGameStatus] = useState("");

  function AiResponse(fields) {
    let isSet = false;
    while (!isSet) {
      // get a random index between 0 and 8
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

  function Field({ value, onClick }) {
    return (
      <button
        style={{
          width: "100px",
          height: "100px",
          fontSize: "50px",
          margin: "10px",
        }}
        onClick={onClick}
      >
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
    let newFields = [...fields];

    if (newFields[index] === null) {
      newFields[index] = "X";
    }
    setFields(newFields);

    if (Win(newFields) === "X") {
      setGameStatus("You win");
      resetGame();
    } else {
      // create a list of non-null fields
      let nonNullFields = newFields.filter((field) => field !== null);
      if (nonNullFields.length === 9) {
        setGameStatus("Draw");
        resetGame();
      } else {
        // fill a random empty field with the "0"
        newFields = [...AiResponse(newFields)];
        setFields(newFields);
        if (Win(newFields) === "O") {
          setGameStatus("You lose");
          resetGame();
        }
      }
    }
  }

  return (
    <>
      <Field value={fields[0]} onClick={() => handleClick(0)} />
      <Field value={fields[1]} onClick={() => handleClick(1)} />
      <Field value={fields[2]} onClick={() => handleClick(2)} />
      <br />
      <Field value={fields[3]} onClick={() => handleClick(3)} />
      <Field value={fields[4]} onClick={() => handleClick(4)} />
      <Field value={fields[5]} onClick={() => handleClick(5)} />
      <br />
      <Field value={fields[6]} onClick={() => handleClick(6)} />
      <Field value={fields[7]} onClick={() => handleClick(7)} />
      <Field value={fields[8]} onClick={() => handleClick(8)} />
      <br />
      <>{gameStatus}</>
    </>
  );
}
