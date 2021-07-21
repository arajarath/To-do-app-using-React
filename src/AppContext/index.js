import React, { useState, useEffect } from "react";

export const AppContext = React.createContext();


const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  // set the Todo from local storage on firrstime load
  useEffect(() => {
    const todoFromLocalstore = localStorage.getItem("todoList");
    if (JSON.parse(todoFromLocalstore)) {
      setTodoList(JSON.parse(todoFromLocalstore))
    } else {
      setTodoList([])
    }
  }, []);

  // Fetch the completed list from local storage 

  useEffect(() => {
    const completedFromStorage = localStorage.getItem('completedTodoList');
    if (JSON.parse(completedFromStorage)) {
      setCompletedList(JSON.parse(completedFromStorage))
    } else {
      setCompletedList([])
    }
  }, [completedList.length])

  // Add To do

  const addToDo = (todoName, status) => {
    const newTodo = {
      id: Math.floor(Math.random() * 100),
      name: todoName,
      status: status
    }
    const updateTodoList = [...todoList, newTodo]
    setTodoList(updateTodoList)
    localStorage.setItem("todoList", JSON.stringify(updateTodoList))
  }

  // Move the selected todo to completed List

  const moveToComplete = (id, status) => {
    const findEle = todoList.find((todo) => todo.id === id)
    findEle.status = status;
    const filterRemainingEle = todoList.filter((todo) => todo.id !== id)
    setTodoList(filterRemainingEle)
    localStorage.setItem("todoList", JSON.stringify(filterRemainingEle))

    const updateNewCompList = [...completedList, findEle]
    setCompletedList(updateNewCompList)
    localStorage.setItem("completedTodoList", JSON.stringify(updateNewCompList))
  }

  // Remove from completed list 

  const removeFromCompl = (id, status) => {
    const findEle = completedList.find(todo => todo.id === id)
    findEle.status = false;
    const filterRemainingEle = completedList.filter(todo => todo.id !== id)
    setCompletedList(filterRemainingEle)
    localStorage.setItem("completedTodoList", JSON.stringify(filterRemainingEle))
    const updateNewTodoList = [...todoList, findEle]
    setTodoList(updateNewTodoList)
    localStorage.setItem("todoList", JSON.stringify(updateNewTodoList))
  }

  // Delete To do

  const deleteTodo = (id) => {
    const filterEle = todoList.filter(todo => todo.id !== id)
    const updateTodo = [...filterEle]
    setTodoList(updateTodo)
    localStorage.setItem("todoList", JSON.stringify(updateTodo))
  }

  // Delete completed to do item

  const deleteCompletedTodo = (id) => {
    const filterEle = completedList.filter(todo => todo.id !== id);
    const updateNewCompList = [...filterEle];
    setCompletedList(updateNewCompList)
    localStorage.setItem('completedTodoList', JSON.stringify(updateNewCompList))
  }

  // Save Edited item 

  const saveEdited = (todo) => {
    // const temp = todoList
    // setTodoList(temp.map(item => item.id === todo.id ? todo : item))
    localStorage.setItem("todoList", JSON.stringify(todoList))
    localStorage.setItem("completedTodoList", JSON.stringify(completedList))
  }


  return (
    <AppContext.Provider
      value={{ todoList, addToDo, moveToComplete, completedList, removeFromCompl, deleteTodo, deleteCompletedTodo, saveEdited }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
