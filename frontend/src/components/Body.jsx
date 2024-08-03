import "../CSS/Body.css";
export default function Body({ selected, setSelected }) {
  return (
    <div>
      <h3>Body</h3>
      <div className="bodyData">
        <textarea
          name="body"
          id="body"
          cols="30"
          rows="10"
          value={selected.body}
          onChange={(e) => {
            selected.body = e.target.value;
            setSelected({ ...selected });
          }}
        ></textarea>
      </div>
    </div>
  );
}
