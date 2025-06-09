//import { useState, useEffect } from "react";
import { useState, type SyntheticEvent } from "react";
import "./App.css";
//import apiClient from "./utils/apiClient";

const TODOS = [
  {
    id: 1,
    content: "Learn JavaScript",
  },
  {
    id: 2,
    content: "Learn React",
  },
  {
    id: 3,
    content: "Build a project",
  },
];

function App() {
  const [todos, setTodos] = useState(TODOS);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (event: SyntheticEvent) => {
    event.preventDefault();
    const todo = {
      id: todos.length + 1,
      content: newTodo,
    };
    setTodos(todos.concat(todo));
    setNewTodo("");
  };

  const handleTodoChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewTodo(event.currentTarget.value.substring(0, 10));
  };

  return (
    <>
      <div>
        <h1>Todo App</h1>
        <div>
          <img src="/api/img" alt="a random image" width="600" height="600" />
        </div>
        <div className="left">
          <div>
            <form onSubmit={addTodo}>
              <input value={newTodo} onChange={handleTodoChange} />
              <button type="submit">Create todo</button>
            </form>
          </div>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
        </div>
        <div>DevOps with Kubernetes 2025</div>
      </div>
    </>
  );
}

export default App;
