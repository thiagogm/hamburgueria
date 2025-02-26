/**
 * Arquivo de Conexão com o Banco de Dados MongoDB
 *
 * Este arquivo é responsável por estabelecer a conexão com o
 * banco de dados MongoDB Atlas e gerenciar a conexão.
 */

// Importa o módulo mongoose para interação com o MongoDB
const mongoose = require('mongoose');

// Importa o módulo dotenv para carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Obtém a URL de conexão com o banco de dados do arquivo .env
const url = process.env.DATABASE_URL;

// Variável para controlar se já estamos conectados ou não
let conectado = false;

/**
 * Função assíncrona para conectar ao banco de dados MongoDB.
 */
const conectar = async () => {
  // Verifica se já estamos conectados para evitar múltiplas conexões
  if (!conectado) {
    try {
      // Tenta conectar ao MongoDB usando a URL fornecida
      await mongoose.connect(url);
      conectado = true; // Define a variável como true indicando que a conexão foi bem-sucedida
      console.log('MongoDB Conectado');
    } catch (error) {
      // Caso ocorra um erro na conexão, exibe o erro no console
      console.error('Erro ao conectar com o MongoDB:', error);
      throw error; // Lança o erro novamente para ser tratado por quem chamou a função
    }
  }
};

/**
 * Função assíncrona para desconectar do banco de dados MongoDB.
 */
const desconectar = async () => {
  // Verifica se estamos conectados antes de tentar desconectar
  if (conectado) {
    try {
      // Tenta desconectar do MongoDB
      await mongoose.disconnect();
      conectado = false; // Define a variável como false indicando que estamos desconectados
      console.log('MongoDB Desconectado');
    } catch (error) {
      // Caso ocorra um erro na desconexão, exibe o erro no console
      console.error('Erro ao desconectar do MongoDB:', error);
      throw error; // Lança o erro novamente para ser tratado por quem chamou a função
    }
  }
};

// Exporta as funções conectar e desconectar para serem usadas em outros arquivos
module.exports = { conectar, desconectar };
