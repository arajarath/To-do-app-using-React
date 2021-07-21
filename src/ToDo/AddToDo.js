import React, { useContext, useState } from "react";
import { AppContext } from '../AppContext'


const AddToDo = () => {

    const consumer = useContext(AppContext)

    const [todo, setTodo] = useState('')
    const [error, setError] = useState(false)

    const addTask = (e) => {
        e.preventDefault()
        if (todo !== '' && todo.trim() !== '') {
            consumer.addToDo(todo, false)
        } else {
            setError(true)
        }

        setTodo("")
    }

    const inputChange = (e) => {
        const inputVal = e.target.value;
        setTodo(inputVal)
        if (inputVal.length > 0) {
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <form onSubmit={addTask}>
                <input className="inputTodo" type="text"
                    value={todo} onChange={inputChange}
                    placeholder="Enter to do here" />
                <button className="btn" type="submit">Add To Do</button>
                {!error ? '' : <div style={{ color: "#b71616", fontSize: "12px", padding: '5px' }}>Enter anything in your To do list, it should not be empty or space....</div>}
            </form>
        </div>
    );
};

export default AddToDo;
