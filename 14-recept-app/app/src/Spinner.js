import React from "react";

export default function Spinner() {
  return (
    <div className="w-100 m-auto text-center pt-5 mt-5">
      <div
        className="spinner-border text-success"
        style={{
          width: 100,
          height: 100
        }}
      ></div>
    </div>
  )
}