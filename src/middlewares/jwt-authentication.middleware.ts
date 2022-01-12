import  { Router, Request, Response, NextFunction } from 'express';

import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';

import JWT from 'jsonwebtoken';

async function jwtAuthenticationMidleware(req: Request, res: Response, next: NextFunction) {

  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader){
      throw new ForbiddenError('Credenciais não informadas')
    }
    // } else {
    //   throw new ForbiddenError('Credenciais OK informadas')
    // }
    
    const [authenticationType, token] = authorizationHeader.split(' ');

    if ( authenticationType !== 'Bearer' || !token ){
      console.log("Tipo de autenticacao inválido");
      console.log(authenticationType);
      
      throw new ForbiddenError('Tipo de autenticacao inválido');
    }

    try {
      const tokenPayload = JWT.verify(token, "my_secret_key");

      if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        throw new ForbiddenError('Token inválido 1');
      }

      const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username
      }

      req.user = user;
      next(); 
    } catch (error) {
      throw new ForbiddenError('Token inválido 2');
    }    

  } catch (error) {
    next(error);
  }

}

export default jwtAuthenticationMidleware;