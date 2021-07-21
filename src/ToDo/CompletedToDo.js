import React, { useContext, useState } from "react";
import { AppContext } from '../AppContext'
import { TiDeleteOutline } from 'react-icons/ti';
import { FiEdit } from 'react-icons/fi';
import styled from 'styled-components';
import EditToDo from "./EditToDo";
const CompletedToDo = () => {

  const [editedId, setEditedId] = useState(null)

  const consumer = useContext(AppContext)
  const { completedList } = consumer

  const changeHandler = (id, status) => {
    consumer.removeFromCompl(id, status)
  }

  const deleteHandler = (id) => {
    consumer.deleteCompletedTodo(id)
  }

  const editHandler = (id) => {
    setEditedId(id)
  }
  const editReset = () => {
    setEditedId(null)
  }
  return (
    <div>
      {completedList?.length > 0 && <h3 style={{ color: '#034003' }}>Completed To do's.</h3>}
      {completedList?.length > 0 ? completedList.map((todo) =>
        editedId !== null && editedId === todo.id ? (<EditToDo todo={todo} editReset={editReset} />) :
          (
            <div className="todoWrapper" key={todo.id}>
              <input type="checkbox"
                id={todo.id}
                value={todo.status}
                defaultChecked={todo.status}
                onChange={(e) => changeHandler(todo.id, e.target.checked)} />
              <EditIcon onClick={() => editHandler(todo.id)} />
              <DeleteIcon onClick={() => deleteHandler(todo.id)} />
              <label htmlFor={todo.id}>{todo.name}</label>
            </div>
          )
      ) : null}
    </div>
  );
};

export default CompletedToDo;

const DeleteIcon = styled(TiDeleteOutline)`
  color: #b71616;
  font-size: 18px;
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 28px;
`
const EditIcon = styled(FiEdit)`
  color: #034003;
  font-size: 18px;
  position: absolute;
  right: 50px;
  cursor: pointer;
  font-size: 24px;
  `