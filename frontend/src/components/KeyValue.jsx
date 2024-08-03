import React from "react";
import "../CSS/KeyValue.css";
import DeleteIm from "../Images/Delete.jpg";
export default function KeyValue({
  index,
  handleDelete,
  handleKeyChange,
  handleValueChange,
  defaultValue,
}) {
  return (
    <div className="keyVal">
      <div>
        <input
          type="text"
          placeholder="key"
          value={defaultValue.key}
          onChange={(e) => {
            handleKeyChange(e.target.value, index);
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="value"
          value={defaultValue.value}
          onChange={(e) => {
            handleValueChange(e.target.value, index);
          }}
        />
      </div>
      <button
        onClick={() => {
          handleDelete(index);
        }}
      >
        Delete
        {/* <img src={DeleteIm} alt="delete"></img> */}
      </button>
    </div>
  );
}
