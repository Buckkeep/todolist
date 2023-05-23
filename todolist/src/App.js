import React, { useState, useRef, useEffect } from 'react'; // useRef for handling user input, useEffect allows saving in local cache
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'; // allows allocation of random ids

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]) //obj destructuring
  const todoNameRef = useRef()

  useEffect (() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos.length === 0) setTodos(prevTodos => [...prevTodos, ...storedTodos]) // sets to the items in local storage
  }, []) // called only once

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) // anytime todos changes, list will be saved in local memory

  // toggles between complete and incomplete 
  function toggleTodo(id) {
    const newTodos = [...todos] // create copy through spread operator
    const todo = newTodos.find(todo => todo.id === id) //find an id same as argument
    todo.complete = !todo.complete // reset to the opposite
    setTodos(newTodos)
  }


  function handleAddTodo(e) {  // event property -- add a todo to previous items
    const name = todoNameRef.current.value
    if (name === '') return  // avoids adding empty item
    // console.log(name)  -- Commented out, only for checking
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null // sets box back to empty
  }

  return (
    <>
    <div>{todos.filter(todo => !todo.complete).length} Tasks Left</div>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Task</button>
   {/*  <button>Clear Completed Tasks</button> */}
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  ) 
}

export default App;
