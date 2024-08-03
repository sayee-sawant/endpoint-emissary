import { useState } from "react";
import Modal from "react-modal";
import "../CSS/AddReq.css";
import "../CSS/ShowRequests.css";

import HomePage from "../pages/HomePage";
// import { Link } from "react-router-dom";

export default function AddReq({ singleRequestData, title = "AddReq" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReq = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className={singleRequestData ? "" : "buttons"}>
        <button
          className={singleRequestData ? "edit-btn" : "btn btn-primary  AddReq"}
          onClick={handleAddReq}
        >
          {title}
        </button>
      </div>
      {/* <div className="modal"> */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Input Modal"
        className="modal"
      >
        <HomePage singleRequestData={singleRequestData} />
        {/* <div className="inputData">
          <div className="title1">Enter Information</div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div> */}
      </Modal>
      {/* </div> */}
    </div>
  );
}
