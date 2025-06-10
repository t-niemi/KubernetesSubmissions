//import { useState, useEffect } from "react";
import { useEffect, useState, type SyntheticEvent } from "react";
import "./App.css";
import axios, { AxiosError } from "axios";
//import apiClient from "./utils/apiClient";

interface Todo {
  id: number;
  content: string;
}

function App() {
  const [todos, setTodos] = useState([] as Todo[]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get<Todo[]>("/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, []);

  const addTodo = (event: SyntheticEvent) => {
    event.preventDefault();
    const todo = {
      id: todos.length + 1,
      content: newTodo,
    };
    axios
      .post<Todo>("/todos", todo)
      .then((response) => {
        setTodos(todos.concat(response.data));
        setNewTodo("");
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  };

  const handleTodoChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNewTodo(event.currentTarget.value.substring(0, 140));
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
