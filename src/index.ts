import express, {Request, Response, NextFunction} from 'express';
import cors from "cors";
import todosRoute from './routes/todos.route';
import statusRoute from './routes/status.route';
//import authorizationRoute from './routes/authorization.route';

//import errorHanlder from './middlewares/error-handler.middleware';


const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true}))


app.use(statusRoute);
app.use(todosRoute);




//app.use(errorHanlder);


app.listen(3000, () => {
  console.log('Aplicação executando na porta 3000!');
});
