import Todo from "../models/todo.model";
import db from '../db';
import DatabaseError from '../models/errors/database.error.model';

class TodoRepository {
  async findAllTodos(): Promise<Todo[]>{
    const query = `SELECT id, task, done FROM todos order by id`;

    const result = await db.query<Todo>(query)

    const rows = result.rows;

    return rows || [];
  }

  async create(todo: Todo): Promise<number> {
    const script = `INSERT INTO todos (task, done) VALUES ($1, $2)
      RETURNING id
    `
    const values = [todo.task, todo.done];

    const { rows } = await db.query<{ id: number }>(script, values);

    const [newTodo] = rows;
    
    return newTodo.id;
  } 

  async update(todo: Todo) {
    const script = `UPDATE todos SET task = $1, done = $2
      WHERE id = $3
    `
    const values = [todo.task, todo.done, todo.id];

    await db.query(script, values);

    return {task: todo.task, done: todo.done, id: todo.id}
  }

}

export default new TodoRepository();
