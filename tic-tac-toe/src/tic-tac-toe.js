import React, { useState } from "react";

export default function TicTacToe() {
  const [fields, setFields] = useState(Array(9).fill(null));
  const [gameStatus, setGameStatus] = useState("");

  function FillRandomFieldWith0(fields) { // 'AI response'
    // create a variable to track if we have set a value
    let isSet = false;
    // while we have not set a value
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
      // check all rows
      if (
        fields[i] === fields[i + 3] &&
        fields[i] === fields[i + 6] &&
        fields[i] !== null
      ) {
        return fields[i];
      }
      // check all columns
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

  /* This is a function component that takes two props, value and onClick. The onClick function will be called when the button is clicked. */
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
    // Wait a second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Clear the game status
    setGameStatus("");
    // Clear the fields
    setFields(Array(9).fill(null));
  }

  function handleClick(index) {
    // create a copy of fields array
    let newFields = [...fields];

    // check if the clicked field is not already filled
    if (newFields[index] === null) {
      // fill the clicked field with the "X"
      newFields[index] = "X";
    }
    // update the fields array
    setFields(newFields);

    // check if the game is finished
    const isWin = Win(newFields);

    // if the game is finished
    if (isWin === "X") {
      // set the game status to "You win"
      setGameStatus("You win");
      // reset the game
      resetGame();
    } else {
      // create a list of non-null fields
      let nonNullFields = newFields.filter((field) => field !== null);
      // if the list of non-null fields has 9 elements
      if (nonNullFields.length === 9) {
        // set the game status to "Draw"
        setGameStatus("Draw");
        // reset the game
        resetGame();
      } else {
        // fill a random empty field with the "0"
        newFields = [...FillRandomFieldWith0(newFields)];
        // update the fields array
        setFields(newFields);
        // check if the game is finished
        const isWin = Win(newFields);
        // if the game is finished
        if (isWin === "O") {
          // set the game status to "You lose"
          setGameStatus("You lose");
          // reset the game
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
