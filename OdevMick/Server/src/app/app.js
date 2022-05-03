import express from 'express';
import cors from 'cors';
import pessoasRouter from './../routes/pessoa.routes';
import animaisRouter from './../routes/animal.routes';
import lotesRouter from './../routes/lote.routes';
import animaisLotesRouter from './../routes/animaisLotes.routes';

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/pessoas",pessoasRouter);
app.use("/animais",animaisRouter);
app.use("/lotes",lotesRouter);
app.use("/animais_lotes",animaisLotesRouter);

app.listen(port,()=>{
  console.log(`App running in ${port}`);
});
