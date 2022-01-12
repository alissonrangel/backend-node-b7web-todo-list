import  { Router, Request, Response, NextFunction } from 'express';

import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';

async function basicAuthenticationMidleware(req: Request, res: Response, next: NextFunction) {

  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader){
      throw new ForbiddenError('Credenciais não informadas')
    }
    
    const [authenticationType, token] = authorizationHeader.split(' ');

    if ( authenticationType !== 'Basic' || !token ){
      console.log("Tipo de autenticacao inválido");
      console.log(authenticationType);
      
      throw new ForbiddenError('Tipo de autenticacao inválido');
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

    console.log("Token content: " + tokenContent);
    
    const [username, password] = tokenContent.split(':');

    if (!username || !password) {
      throw new ForbiddenError('Credenciais não preenchidas')
    }

    const user = await userRepository.findUserByUsernameAndPassword(username, password);

    if (!user) {
      throw new ForbiddenError('usuário ou senha inválidos!');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }

}

export default basicAuthenticationMidleware;