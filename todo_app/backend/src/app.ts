import express, { NextFunction, Request, Response } from "express";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

const app = express();
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

const start = async (): Promise<void> => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.error(error);
    //process.exit(1);
  }
};

void start();

class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<number>;
  declare content: string;
}

Todo.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING(140), allowNull: false },
  },
  { sequelize, underscored: true, timestamps: false, modelName: "todo" }
);

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.name);
  response.status(400).send({ error: error.message });
  next(error);
};

app.post("/todos", async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body as Todo, { fields: ["content"] });
    console.log("Added", todo);
    res.json(todo);
  } catch (error: unknown) {
    next(error);
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  try {
    await Todo.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (error: unknown) {
    next(error);
  }
});

app.get("/todos", async (_req, res, next) => {
  try {
    res.json(await Todo.findAll());
  } catch (error: unknown) {
    next(error);
  }
});

app.use(errorHandler);

export default app;
