import express from 'express';

const port = 3000;
const app = express();

app.use(express.json());
app.get("/",(req,res)=>{
  return res.send("Hello world!");
})

app.listen(port,()=>{
  console.log(`App running in ${port}`);
});
