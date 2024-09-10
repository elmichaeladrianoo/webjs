const { sendErrorResponse } = require('../utils')
const { pool } = require('./../configuracao/db')

/**
 * Recebe mensagens através de um webhook.
 * @async
 * @function webhookHandler
 * @param {Object} req - O objeto da requisição HTTP.
 * @param {Object} res - O objeto da resposta HTTP.
 * @returns {Promise<void>} - Uma Promise que resolve sem valor ao final da função.
 */
const webhookHandler = async (req, res) => {
  try {
    // Extraindo os parâmetros enviados no corpo da requisição
    // eslint-disable-next-line
    const { sessionWebhook = 'undefined', dataType = 'undefined', data, sessionId } = req.body

    // Verifica o tipo de dado recebido
    // eslint-disable-next-line
    //console.log(`DataType Recebido: ${JSON.stringify(dataType)}`)
    // eslint-disable-next-line
    //console.log(`Session ID: ${sessionId}`)
    // eslint-disable-next-line
    //console.log(`Data Recebida: ${JSON.stringify(data)}`)
    // eslint-disable-next-line
    //console.log(`Data Recebida: ${JSON.stringify(sessionWebhook)}`)
    // eslint-disable-next-line
    // Query para inserir no banco, convertendo 'data' para JSON
    const query = 'INSERT INTO messages (session_id, data_type, data) VALUES ($1, $2, $3)'
    await pool.query(query, [sessionId, dataType, JSON.stringify(data)])
  } catch (error) {
    console.error('Erro no webhookHandler:', error)
    // Envia uma resposta de erro com a mensagem apropriada
    sendErrorResponse(res, 500, error.message)
  }
}

module.exports = {
  webhookHandler
}
