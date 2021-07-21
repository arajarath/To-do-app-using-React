import React from "react";
import AddToDo from "./AddToDo";
import ToDoList from "./ToDoList";
import CompletedToDo from "./CompletedToDo";

const ToDo = () => {
  return (
    <div className="container">
      <h1 align="center" style={{ color: '#071d49' }}>React To Do App</h1>
      <AddToDo />
      <div className="listContainer">
        <ToDoList />
        <CompletedToDo />
      </div>
    </div>
  );
};

export default ToDo;
