import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { TiDeleteOutline } from "react-icons/ti";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import EditToDo from "./EditToDo";
const ToDoList = () => {
  const [edit, setEdit] = useState(null);
  const consumer = useContext(AppContext);
  const { todoList } = consumer;

  const CompletedToDo = (id, status) => {
    consumer.moveToComplete(id, status);
  };

  const deleteHandler = id => {
    consumer.deleteTodo(id);
  };
  const editHandler = (e, id) => {
    setEdit(id);
  };
  const editReset = () => {
    setEdit(null);
  };
  return (
    <>
      {todoList.length
        ? todoList.map(todo =>
            edit !== null && edit === todo.id ? (
              <EditToDo key={todo.id} todo={todo} editReset={editReset} />
            ) : (
              <div className="todoWrapper" key={todo.id}>
                <input
                  type="checkbox"
                  id={todo.id}
                  defaultChecked={todo.status}
                  onChange={e => CompletedToDo(todo.id, e.target.checked)}
                />
                <label htmlFor={todo.id}>{todo.name}</label>
                <EditIcon onClick={e => editHandler(e, todo.id)} />
                {/* {edit && <div className="editInputDiv"><input className="editInput" type="text" /></div>} */}
                <DeleteIcon onClick={() => deleteHandler(todo.id)} />
              </div>
            )
          )
        : null}
    </>
  );
};

export default ToDoList;

const DeleteIcon = styled(TiDeleteOutline)`
  color: #b71616;
  font-size: 18px;
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 28px;
`;
const EditIcon = styled(FiEdit)`
  color: #034003;
  font-size: 18px;
  position: absolute;
  right: 50px;
  cursor: pointer;
  font-size: 24px;
`;
