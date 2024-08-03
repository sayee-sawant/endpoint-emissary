// import "../CSS/HomePage.css";
import "../CSS/ReqUrl.css";
export default function ReqUrl({ selected, setSelected, handleSendApi }) {
  return (
    <div className="reqData">
      <div>
        <select
          defaultValue={selected.method}
          onChange={(e) => {
            selected.method = e.target.value;
            setSelected({ ...selected });
          }}
        >
          <option className="get" value="get">
            GET
          </option>
          <option className="post" value="post">
            POST
          </option>
          <option className="delete" value="delete">
            DELETE
          </option>
        </select>
      </div>
      <div>
        <input
          className="url"
          placeholder="enter url "
          type="text"
          value={selected.url}
          onChange={(e) => {
            selected.url = e.target.value;
            setSelected({ ...selected });
          }}
        />
      </div>
      <div>
        <button className="Send" onClick={handleSendApi}>
          Send ▶
        </button>
      </div>
    </div>
  );
}
