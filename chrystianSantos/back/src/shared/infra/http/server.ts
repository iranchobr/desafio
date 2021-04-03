import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
// import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';
import routes from './routes/index';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(errors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});
app.listen(3333, () => {
  console.log('Aplicacao rodando na porta 3333');
});
