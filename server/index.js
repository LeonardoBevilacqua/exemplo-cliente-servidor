import express, { json } from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(json());
app.use(cors());

app.get('/', (_req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
