import { useState } from "react";
import "../CSS/ShowResponse.css";
export default function ShowResponse({ response }) {
  const [selectedOption, setSelectedOption] = useState("data");
  return response && response.data ? (
    <div style={{ color: "white" }}>
      <ul className="list">
        <button
          onClick={() => {
            setSelectedOption("data");
          }}
        >
          Data
        </button>
        <button
          onClick={() => {
            setSelectedOption("headers");
          }}
        >
          Headers
        </button>
        <button
          onClick={() => {
            setSelectedOption("cookies");
          }}
        >
          Cookies
        </button>
      </ul>
      {selectedOption === "data" && (
        <div>{JSON.stringify(response.data, null, 2)}</div>
      )}
      {selectedOption === "headers" && (
        <div>{JSON.stringify(response.headers, null, 2)}</div>
      )}
      {selectedOption === "cookies" && <div>No Cookies Found</div>}
    </div>
  ) : (
    <div className="noData">No data</div>
  );
}
