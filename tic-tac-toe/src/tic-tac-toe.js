import React, { useState } from "react";

export default function TicTacToe() {
  const [fields, setFields] = useState(Array(9).fill(null));
  const [gameStatus, setGameStatus] = useState("");

  function ChooseRandomField(fields) {
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
      if (
        fields[i] === fields[i + 3] &&
        fields[i] === fields[i + 6] &&
        fields[i] !== null
      ) {
        return fields[i];
      }
      if (
        fields[i * 3] === fields[i * 3 + 1] &&
        fields[i * 3] === fields[i * 3 + 2] &&
        fields[i * 3] !== null
      ) {
        return fields[i * 3];
      }
    }
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

  function handleClick(index) {
    let newFields = [...fields];

    if (newFields[index] === null) {
      newFields[index] = "X";
    }

    const isWin = Win(newFields);

    if (isWin === "X") {
      setGameStatus("You win");
      setFields(Array(9).fill(null));
    } else {
      let nonNullFields = newFields.filter((field) => field !== null);
      if (nonNullFields.length === 9) {
        setGameStatus("Draw");
        setFields(Array(9).fill(null));
      } else {
        newFields = [...ChooseRandomField(newFields)];
        const isWin = Win(newFields);
        if (isWin === "O") {
          setGameStatus("You lose");
          setFields(Array(9).fill(null));
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
