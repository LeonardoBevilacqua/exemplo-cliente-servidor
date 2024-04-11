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

app.get("/cachorro/detalhes/:id", function (req, res) {
  // entrada: Pega o id passado pela url e coloca em uma constante
  const id = req.params.id;
  /** @type {Cachorro} */
  let cachorro = {};

  // processamento: pega a lista de cachorros, e busca pelo item onde o id seja igual ao passado na url
  for (let i = 0; i < cachorros.length; i++) {
    if (cachorros[i].id === id) {
      cachorro = cachorros[i];
    }
  }

  // saida: retorna os detalhes do cachorro, caso foi encontrado
  res.json(cachorro);
});

app.listen(porta, () => {
  console.log(`Servidor esta executando na porta ${porta}`);
});
