import  { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";

const statusRoute = Router();

statusRoute.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(StatusCodes.OK); //.send({ foo: 'sucesso total tudo ok'});
});

export default statusRoute;