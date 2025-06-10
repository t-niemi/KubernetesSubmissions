import express, { NextFunction, Request, Response } from "express";

const app = express();
app.use(express.json());

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.name);

  if (error.name === "SyntaxError") {
    response.status(400).send({ error: error.message });
  }
  next(error);
};

const todos: Todo[] = [
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

interface Todo {
  id: number;
  content: string;
}
export type NewTodo = Omit<Todo, "id">;

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseContent = (content: unknown): string => {
  if (!isString(content)) {
    throw new Error("Incorrect or missing content");
  }
  return content;
};

const toNewTodo = (object: unknown) => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("content" in object) {
    const newEntry: NewTodo = {
      content: parseContent(object.content),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const addTodo = (entry: NewTodo) => {
  const max = todos.reduce((acc, cur) => {
    return Math.max(acc, cur.id);
  }, Number.NEGATIVE_INFINITY);

  const newTodo = {
    id: max + 1,
    ...entry,
  };

  todos.push(newTodo);
  return newTodo;
};

app.post("/todos", (req, res) => {
  try {
    const newTodo = toNewTodo(req.body);
    res.json(addTodo(newTodo));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.get("/todos", (_req, res: Response<Todo[]>) => {
  res.send(todos);
});

app.use(errorHandler);

export default app;
