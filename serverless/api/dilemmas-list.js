const { listAllDilemmas, sortedByDateDesc, visibleDilemmas } = require('../utils/store')

const PAGE_SIZE = 60

exports.handler = async (event) => {
  const page = Number(event.queryStringParameters?.page || 1)
  const all = await listAllDilemmas()
  const ordered = sortedByDateDesc(visibleDilemmas(all))
  const start = PAGE_SIZE * (page - 1)
  const dilemmas = ordered.slice(start, start + PAGE_SIZE)
  return {
    statusCode: 200,
    body: JSON.stringify({ dilemmas }),
  }
}
