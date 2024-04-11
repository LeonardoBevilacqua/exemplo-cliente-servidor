/**
 * @typedef {Object} ListaDeCachorros
 * @property {string} id
 * @property {string} nome
 */

/**
 * @typedef {Object} Cachorro
 * @property {string} id
 * @property {string} nome
 * @property {string} imagem
 * @property {string[]} caracteristicas
 */

async function buscarListaDeCachorros() {
  // declarando variavel: lista de cachorros
  /** @type {ListaDeCachorros[]} */
  let listaDeCachorros = [];
  // processamento: Buscando lista de cachorros do servidor
  const resultado = await fetch("http://localhost:5000/lista-de-cachorros");
  // processamento: Verificando se a busca deu certo
  if (resultado.status === 200) {
    // processamento: Pega o valor retornado e coloca na variavel
    listaDeCachorros = await resultado.json();
  }

  // saida: retorna a lista de cachorros
  return listaDeCachorros;
}

/**
 * @param {string} id
 */
async function buscarDetalhesDoCachorro(id) {
  // declarando variavel: cachorro
  /** @type {Cachorro} */
  let cachorro = {};
  // processamento: Buscando detalhes do cachorro do servidor
  const resultado = await fetch(
    `http://localhost:5000/cachorro/detalhes/${id}`
  );
  // processamento: Verificando se a busca deu certo
  if (resultado.status === 200) {
    // processamento: Pega o valor retornado e coloca na variavel
    cachorro = await resultado.json();
  }
  // saida: retorna detalhes do cachorro
  return cachorro;
}

async function exibirListaDeCachorros() {
  // declarando constante: lista de cachorros com valor inicial vindo da funcao buscarListaDeCachorros
  const listaDeCachorros = await buscarListaDeCachorros();
  // declarando constante: elemento da lista de cachorros com valor inicial vindo do atributo da pagina pelo seu ID
  const elementoListaDeCachorros =
    document.getElementById("lista-de-cachorros");

  // processamento: pega a lista de cachorros, e uma por uma pega o nome e coloca na lista
  for (let i = 0; i < listaDeCachorros.length; i++) {
    // processamento: usa a função para criar o botão de cachorro
    criarBotaoDeCachorro(listaDeCachorros[i], elementoListaDeCachorros);
  }
}

/**
 * @param {ListaDeCachorros} cachorro
 * @param {HTMLElement } elementoListaDeCachorros
 */
function criarBotaoDeCachorro(cachorro, elementoListaDeCachorros) {
  // declarando contante: elemento cachorro, com valor inicial de um elemento lista
  const elementoCachorro = document.createElement("li");
  // processamento: criar o botão de cachorro, com o nome do cachorro e funcao para exibir os detalhes
  elementoCachorro.innerHTML = `<button onclick="exibirDetalhes('${cachorro.id}')">${cachorro.nome}</button>`;
  // processamento: adiciona o elemento cachorro na lista
  elementoListaDeCachorros.appendChild(elementoCachorro);
}

async function exibirDetalhes(id) {
  // declarando constante: cachorro com valor inicial vindo da funcao buscarDetalhesDoCachorro
  const detalhesDoCachorro = await buscarDetalhesDoCachorro(id);
  // declarando contantes: elementos da pagina para inserir o nome, imagem e caracteristicas
  const elementoNome = document.getElementById("detalhes-nome");
  const elementoImagem = document.getElementById("detalhes-imagem");
  const elementoCaracteristicas = document.getElementById(
    "detalhes-caracteristicas"
  );

  // processamento: pega o nome do cachorro e atualiza na pagina
  elementoNome.innerHTML = detalhesDoCachorro.nome;
  // processamento: pega a imagem do cachorro e atualiza na pagina
  elementoImagem.src = detalhesDoCachorro.imagem;
  elementoImagem.alt = detalhesDoCachorro.nome;
  // processamento: limpa as caracteristicas da pagina
  elementoCaracteristicas.innerHTML = "";
  // processamento: pega a lista de caracteristicas do cachorro e atualiza na pagina
  for (let i = 0; i < detalhesDoCachorro.caracteristicas.length; i++) {
    // declarando constante: caracteristica, com valor inicial de uma caracteristica
    const caracteristica = detalhesDoCachorro.caracteristicas[i];
    // declarando constante: elementoCaracteristica, com valor inicial de um elemento de paragrafo
    const elementoCaracteristica = document.createElement("p");

    // processamento: coloca o texto da caracteristica no paragrafo
    elementoCaracteristica.innerHTML = caracteristica;
    // processamento: adiciona o paragrafo na pagina
    elementoCaracteristicas.appendChild(elementoCaracteristica);
  }
}

exibirListaDeCachorros();
