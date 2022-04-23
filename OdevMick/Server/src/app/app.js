import express from 'express';
import pessoasRouter from './../routes/pessoa.routes';
import animaisRouter from './../routes/animal.routes';

const port = 3000;
const app = express();

app.use(express.json());
app.use("/pessoas",pessoasRouter);
app.use("/animais",animaisRouter);

app.listen(port,()=>{
  console.log(`App running in ${port}`);
});
