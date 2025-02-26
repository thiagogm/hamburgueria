/**
 * Arquivo de Modelo de Dados (Schema) para Lanches (Snacks)
 *
 * Este arquivo define a estrutura dos dados que serão armazenados
 * na coleção de lanches (snacks) do banco de dados MongoDB.
 */

// Importa as funções Schema e model do módulo mongoose
const { Schema, model } = require('mongoose');

// Define o Schema (a estrutura) para os documentos de lanche
const snackSchema = new Schema(
  {
    // Campo para o nome do lanche (obrigatório)
    name: {
      type: String,       // Tipo de dado: string (texto)
      required: true,  // Este campo é obrigatório
    },
    // Campo para a descrição do lanche (obrigatório)
    description: {
      type: String,       // Tipo de dado: string (texto)
      required: true,  // Este campo é obrigatório
    },
    // Campo para o preço do lanche (obrigatório)
    price: {
      type: String,       // Tipo de dado: string (texto) - poderia ser Number também, dependendo da precisão desejada
      required: true,  // Este campo é obrigatório
    },
    // Campo para o caminho da imagem do lanche (obrigatório)
    image: {
      type: String,       // Tipo de dado: string (texto) - o caminho do arquivo da imagem
      required: true,  // Este campo é obrigatório
    },
  },
  { versionKey: false } // Desabilita o campo "__v" (controle de versão do documento)
);

// Cria e exporta o modelo de dados "Snacks" baseado no snackSchema
// O primeiro parâmetro ('Snacks') é o nome do modelo e da coleção no banco de dados.
module.exports = model('Snacks', snackSchema);


