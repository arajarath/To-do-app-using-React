import React, { useContext, useState } from "react";
import { FiSave } from "react-icons/fi";
import styled from "styled-components";
import { AppContext } from "../AppContext";
const EditToDo = ({ todo, editReset }) => {
  const [edited, setEdited] = useState(todo.name);
  const consumer = useContext(AppContext);

  const saveHandler = todo => {
    editReset();
    todo.name = edited;
    consumer.saveEdited(todo);
  };
  const changeHandler = e => {
    if (e.target.value !== "" && e.target.value.trim() !== "") {
      setEdited(e.target.value);
    }
  };
  return (
    <div className="editInputDiv">
      <input
        className="editInput"
        defaultValue={edited}
        onChange={e => changeHandler(e)}
        type="text"
        onKeyUp={e => e.key === "Enter" && saveHandler(todo)}
      />
      <SaveIcon onClick={() => saveHandler(todo)} />
    </div>
  );
};

export default EditToDo;

const SaveIcon = styled(FiSave)`
  vertical-align: middle;
  color: #034003;
  cursor: pointer;
  font-size: 22px;
`;
