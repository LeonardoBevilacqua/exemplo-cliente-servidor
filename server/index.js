import express, { json } from "express";
import cors from "cors";
import { cachorros } from "./banco-de-dados.js";

const app = express();
const porta = 5000;

app.use(json());
app.use(cors());

app.get("/lista-de-cachorros", function (_req, res) {
  // processamento: pega a lista de cachorros, e uma por uma pega o nome e coloca na lista
  const listaDeCachorros = cachorros.map((cachorro) => cachorro.nome);
  // saida: retorna a lista de nome de cachorros
  res.json(listaDeCachorros);
});

app.listen(porta, () => {
  console.log(`Servidor esta executando na porta ${porta}`);
});
