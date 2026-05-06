const { listAllDilemmas, sortedByDateDesc, visibleDilemmas } = require('../utils/store')

exports.handler = async () => {
  const all = await listAllDilemmas()
  const [dilemma] = sortedByDateDesc(visibleDilemmas(all))
  return {
    statusCode: 200,
    body: JSON.stringify(dilemma || null),
  }
}
