import  { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import todoRepository from '../repositories/todo.repository';
import DatabaseError from '../models/errors/database.error.model';
// get /todos
// get /todos/:uuid
// post /todos
// put /todos/:uuid
// delete /todos/:uuid


const todosRoute = Router();

todosRoute.get('/todos', async (req: Request, res: Response, next: NextFunction) => {
  //const todos = [{todoName:"Alisson"}];

  console.log(req.headers['authorization']);
  

  const todos = await todoRepository.findAllTodos();

  res.status(StatusCodes.OK).send(todos);
});


todosRoute.post('/todos', async (req: Request, res: Response, next: NextFunction) => {
  
  const newtodo = req.body;

  const id = await todoRepository.create(newtodo)
  
  console.log(id);
  
  res.status(StatusCodes.OK).send(`${id}`);
});

todosRoute.put('/todos/:id', async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  
  const id = req.params.id;  

  const todo = req.body;
  todo.id = id;

  const todo2 = await todoRepository.update(todo);
    
  res.status(StatusCodes.OK).send(todo2);
});

export default todosRoute;

