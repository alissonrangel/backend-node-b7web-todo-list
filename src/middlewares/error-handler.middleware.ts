import  { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";

import DatabaseError from '../models/errors/database.error.model';
import ForbiddenError from '../models/errors/forbidden.error.model';

function errorHanlder(error:any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof DatabaseError) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  } else if (error instanceof ForbiddenError) {
    console.log(error.message);
    
    res.sendStatus(StatusCodes.FORBIDDEN);
  } else {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default errorHanlder;