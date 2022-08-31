import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")
  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")


  
  function handleSubmit(e){
    e.preventDefault() 
    const newTodo={
    id: new Date().getTime(),
    text: todo,
    completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")
  }
  
function deleteTodo(id){

  const updatedTodos = [...todos].filter((todo) => todo.id !== id)
  setTodos(updatedTodos)
}

function toggleComplete(id) {
  const updatedTodos = [...todos].map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed  
    }
    return todo
  })
  setTodos(updatedTodos)
}

function editTodo(id){

  const updatedTodos = [...todos].map((todo) => {
    if (todo.id === id){
      todo.text = editingText
    }
    return todo
  })
  setTodos(updatedTodos)
  setTodoEditing(null)
  setEditingText("")

}

  return (
    <div className="App">
      <form onSubmit={handleSubmit}><h1>To-Do List</h1>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
        <button className="button-todo" type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => <div key={todo.id}>

        {todoEditing === todo.id ? 
        
        (<input 
        type="text"  
        onChange={(e) => setEditingText (e.target.value)}
        value={editingText}
        />) 
        :
        (<div>{todo.text}</div>)}

        <button className="button-delete" onClick={() => deleteTodo(todo.id)}>Delete</button>

          {todoEditing === todo.id ? (<button className="spacing" onClick={() => editTodo(todo.id)}>
            Submit Edits</button>) : (<button className="button-edit" onClick={() => setTodoEditing(todo.id)}
            >Edit</button>)}
            <input type="checkbox" 
          onChange={() => toggleComplete(todo.id)}
          checked={todo.completed} />
          
          
         </div>)}
      </div>
  );
}   

export default App;

