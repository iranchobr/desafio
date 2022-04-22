import express from 'express';
import pessoasRouter from './../routes/pessoa.routes';
const port = 3000;
const app = express();

app.use(express.json());
app.use(pessoasRouter);

app.listen(port,()=>{
  console.log(`App running in ${port}`);
});
