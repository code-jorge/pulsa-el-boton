const { dilemmasStore } = require('../utils/store')

exports.handler = async (event) => {
  const { slug } = event.queryStringParameters || {}
  const dilemma = await dilemmasStore().get(slug, { type: 'json' })
  if (!dilemma || new Date(dilemma.date) > new Date()) {
    return { statusCode: 404, body: 'Dilemma not found' }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(dilemma),
  }
}
