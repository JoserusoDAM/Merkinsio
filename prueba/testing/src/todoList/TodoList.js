import React, { useState } from 'react'

export default function TodoList() {

  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])

  const textHandler = (e) => {
    setText(e.target.value)
  }

  const insertTodo = () => {
    setTodos([...todos, text])
  }

  const deleteTodo = (todoIndex) => {
    setTodos(todos.filter((todos, index) => index !== todoIndex));
  }


  const listItems = todos.map((todo, index) => {
    return (
      <div>
        <li key={index}>{todo}</li>
        <button onClick={() => {deleteTodo(index)}}>Click para borrar</button>
      </div>
      )
    }
  )

  return (
    <div className="App">
      <input value={text} onChange={textHandler}></input>
      <p>{text}</p>
      <button onClick={insertTodo}> Añadir elemento</button>
      
      <ul>{listItems}</ul>
    </div>
  );
}