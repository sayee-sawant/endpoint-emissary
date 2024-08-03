import KeyValue from "./KeyValue";
import "../CSS/HeadersAndParams.css";
export default function HeadersAndParams({
  type = "headers",
  selected,
  setSelected,
}) {
  const handleKeyChange = (keyText, index) => {
    selected[type][index].key = keyText;
    setSelected({ ...selected });
  };
  const handleValueChange = (valueText, index) => {
    selected[type][index].value = valueText;
    setSelected({ ...selected });
  };

  const handleAdd = () => {
    selected[type].push({ key: "", value: "" });
    setSelected({ ...selected });
  };

  const handleDelete = (index) => {
    selected[type] = selected[type].filter((item, idx) => idx !== index);
    setSelected({ ...selected });
  };

  return (
    <div>
      <h3 className="type">{type}</h3>
      <div className="AddParent">
        <button className="Add" onClick={handleAdd}>
          Add
        </button>
      </div>
      {selected[type].map((item, index) => {
        return (
          <KeyValue
            key={`${index}`}
            handleDelete={handleDelete}
            handleKeyChange={handleKeyChange}
            handleValueChange={handleValueChange}
            index={index}
            defaultValue={item}
          />
        );
      })}
    </div>
  );
}
