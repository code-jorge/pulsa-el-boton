const { dilemmasStore, votesStore } = require('../utils/store')

exports.handler = async (event) => {
  const { slug } = event.queryStringParameters || {}
  const dilemma = await dilemmasStore().get(slug, { type: 'json' })
  if (!dilemma) return { statusCode: 404, body: 'Dilemma not found' }

  const totals = (await votesStore().get(slug, { type: 'json' })) || {}
  return {
    statusCode: 200,
    body: JSON.stringify({
      type: dilemma.type,
      totals,
    }),
  }
}
