const { dilemmasStore, listAllDilemmas, sortedByDateDesc, visibleDilemmas } = require('../utils/store')

exports.handler = async (event) => {
  const { slug } = event.queryStringParameters || {}
  const current = await dilemmasStore().get(slug, { type: 'json' })
  if (!current) return { statusCode: 404, body: 'Dilemma not found' }

  const all = await listAllDilemmas()
  const earlier = visibleDilemmas(all).filter(
    (d) => new Date(d.date) < new Date(current.date)
  )
  const [next] = sortedByDateDesc(earlier)
  if (!next) {
    return {
      statusCode: 200,
      body: JSON.stringify({ end: true }),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(next),
  }
}
