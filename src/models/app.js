/**
 * Arquivo Principal do Aplicativo - Lógica de Negócios
 *
 * Este arquivo contém a lógica principal do aplicativo, incluindo
 * funções para realizar operações CRUD (Create, Read, Update, Delete)
 * na coleção de lanches do banco de dados.
 */

// Importa as funções de conexão e desconexão do módulo database.js
const { conectar, desconectar } = require('./database/database.js');

// Importa o modelo de dados Snacks do arquivo Snacks.js
const Snacks = require('./models/Snacks.js');

// Importa o módulo string-similarity para realizar comparações de strings (semelhança)
const stringSimilarity = require('string-similarity');

/**
 * Função assíncrona para criar um novo lanche no banco de dados.
 * @param {string} name - O nome do lanche.
 * @param {string} description - A descrição do lanche.
 * @param {string} price - O preço do lanche.
 * @param {string} image - O caminho da imagem do lanche.
 */
const criarSnack = async (name, description, price, image) => {
  try {
    // Cria uma nova instância do modelo Snacks com os dados fornecidos
    const newSnack = new Snacks({ name, description, price, image });
    // Salva o novo lanche no banco de dados
    await newSnack.save();
    console.log(`Snack ${name} adicionado com sucesso!`);
  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro no console
    console.error('Erro ao adicionar snack:', error);
  }
};

/**
 * Função assíncrona para listar todos os lanches cadastrados.
 */
const listarSnacks = async () => {
  try {
    // Busca todos os lanches no banco de dados
    const snacks = await Snacks.find();
    // Verifica se há lanches cadastrados
    if (snacks.length === 0) {
      console.log('Nenhum snack cadastrado.');
      return;
    }
    // Exibe a lista de lanches no console
    console.log('\nLista de Snacks:');
    snacks.forEach((snack) => {
      console.log(`Nome: ${snack.name}, Descrição: ${snack.description}, Preço: ${snack.price}, Imagem: ${snack.image}`);
    });
  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro no console
    console.error('Erro ao listar snacks:', error);
  }
};

/**
 * Função assíncrona para buscar um lanche pelo nome (com similaridade).
 * @param {string} name - O nome (ou parte do nome) do lanche a ser buscado.
 */
const buscarSnackPorNome = async (name) => {
  try {
    // Busca lanches cujo nome contenha o termo pesquisado (ignorando maiúsculas/minúsculas)
    const snacks = await Snacks.find({ name: new RegExp(name, 'i') });
    // Verifica se algum lanche foi encontrado
    if (snacks.length === 0) {
      console.log('Snack não encontrado.');
      return;
    }

    // Cria uma lista com os nomes dos lanches encontrados
    const snackNames = snacks.map((snack) => snack.name);
    // Encontra a melhor correspondência (maior similaridade) usando stringSimilarity
    const match = stringSimilarity.findBestMatch(name, snackNames);
    // Encontra o lanche correspondente à melhor similaridade
    const bestMatchSnack = snacks.find((snack) => snack.name === match.bestMatch.target);

    // Exibe os dados do lanche encontrado
    console.log('\nSnack encontrado:');
    console.log(`Nome: ${bestMatchSnack.name}, Descrição: ${bestMatchSnack.description}, Preço: ${bestMatchSnack.price}, Imagem: ${bestMatchSnack.image}`);
  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro no console
    console.error('Erro ao buscar snack:', error);
  }
};

/**
 * Função assíncrona para atualizar os dados de um lanche existente.
 * @param {string} name - O nome do lanche a ser atualizado.
 * @param {string} newDescription - A nova descrição do lanche (opcional).
 * @param {string} newPrice - O novo preço do lanche (opcional).
 * @param {string} newImage - O novo caminho da imagem do lanche (opcional).
 */
const atualizarSnack = async (name, newDescription, newPrice, newImage) => {
  try {
    // Busca o lanche pelo nome (insensível a maiúsculas/minúsculas)
    const snack = await Snacks.findOne({ name: new RegExp(name, 'i') });
    // Se o lanche não for encontrado, exibe a mensagem e retorna
    if (!snack) {
      console.log('Snack não encontrado.');
      return;
    }

    // Atualiza os campos do lanche com os novos valores (se fornecidos)
    snack.description = newDescription || snack.description; // Se newDescription for fornecido, usa ele, senão mantém o valor atual
    snack.price = newPrice || snack.price; // Se newPrice for fornecido, usa ele, senão mantém o valor atual
    snack.image = newImage || snack.image; // Se newImage for fornecido, usa ele, senão mantém o valor atual

    // Salva as alterações no banco de dados
    await snack.save();
    console.log(`Snack ${snack.name} atualizado com sucesso!`);
  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro no console
    console.error('Erro ao atualizar snack:', error);
  }
};

/**
 * Função assíncrona para deletar um lanche do banco de dados pelo nome.
 * @param {string} name - O nome do lanche a ser deletado.
 */
const deletarSnack = async (name) => {
  try {
    // Busca e deleta o lanche pelo nome (insensível a maiúsculas/minúsculas)
    const snack = await Snacks.findOneAndDelete({ name: new RegExp(name, 'i') });
    // Se o lanche não for encontrado, exibe a mensagem e retorna
    if (!snack) {
      console.log('Snack não encontrado.');
      return;
    }
    // Exibe a mensagem de sucesso
    console.log(`Snack ${snack.name} deletado com sucesso!`);
  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro no console
    console.error('Erro ao deletar snack:', error);
  }
};

/**
 * Função principal (assíncrona) que executa as operações do aplicativo.
 */
const main = async () => {
  try {
    // Conecta ao banco de dados
    await conectar();

    // Criando Snacks (exemplos)
    await criarSnack('Hamburguer Simples', 'Pão, carne, queijo', 'R$ 10,00', './img/snack1.jpg');
    await criarSnack('Hamburguer Duplo', 'Pão, duas carnes, queijo', 'R$ 15,00', './img/snack2.jpg');
    await criarSnack('Hamburguer Triplo', 'Pão, três carnes, queijo', 'R$ 20,00', './img/snack3.jpg');
    await criarSnack('X-Salada', 'Pão, carne, queijo, alface, tomate', 'R$ 12,00', './img/snack4.jpg');
    await criarSnack('X-Bacon', 'Pão, carne, queijo, bacon', 'R$ 14,00', './img/snack5.jpg');
    await criarSnack('X-Tudo', 'Pão, carne, queijo, bacon, alface, tomate, ovo', 'R$ 18,00', './img/snack6.jpg');
    await criarSnack('Porção de Fritas Pequena', 'Fritas', 'R$ 8,00', './img/snack7.jpg');
    await criarSnack('Porção de Fritas Média', 'Fritas', 'R$ 12,00', './img/snack8.jpg');
    await criarSnack('Porção de Fritas Grande', 'Fritas', 'R$ 16,00', './img/snack9.jpg');

    // Listando Snacks
    await listarSnacks();

    // Buscando Snack por Nome
    await buscarSnackPorNome('Hamburguer Duplo');
    await buscarSnackPorNome('X-tudo');
    await buscarSnackPorNome('pizza'); //Teste para verificar a menssagem de não encontrado

    //Atualizando snack
    await atualizarSnack('Hamburguer Simples', 'Pão, carne, queijo especial', 'R$ 12,00', './img/snack10.jpg')
    await atualizarSnack('X-Bacon', 'Pão, carne, queijo, bacon, molho especial', 'R$ 16,00', './img/snack11.jpg')
    await atualizarSnack('Hamburguer especial', 'Pão, carne, queijo especial', 'R$ 12,00', './img/snack10.jpg') // Teste para verificar a menssagem de não encontrado.

    //Deletando snack
    await deletarSnack('Hamburguer Triplo')
    await deletarSnack('Pastel') // Teste para verificar a menssagem de não encontrado.

  } catch (error) {
    // Se ocorrer um erro, exibe a mensagem de erro no console
    console.error('Erro na execução principal:', error);
  } finally {
    // Desconecta do banco de dados (independente de erro ou sucesso)
    await desconectar();
  }
};

// Chama a função principal para iniciar a execução do aplicativo
main();
