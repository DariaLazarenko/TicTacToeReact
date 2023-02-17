import React, { useState } from "react";

export default function TicTacToe() {
  return (
    <>
      <Field />
      <Field />
      <Field />
      <br />
      <Field />
      <Field />
      <Field />
      <br />
      <Field />
      <Field />
      <Field />
    </>
  );
}

function Field() {
  const [field, setField] = useState("");
  return (
    <button
      className="field"
      style={{
        width: "100px",
        height: "100px",
        fontSize: "50px",
        margin: "10px",
      }}
      onClick={() => {
        setField(field === "" ? "X" : "");
      }}
    >
      {field}
    </button>
  );
}
