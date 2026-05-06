const { listAllDilemmas, visibleDilemmas } = require('../utils/store')

exports.handler = async () => {
  const all = await listAllDilemmas()
  const visible = visibleDilemmas(all)
  if (visible.length === 0) {
    return { statusCode: 200, body: JSON.stringify(null) }
  }
  const dilemma = visible[Math.floor(Math.random() * visible.length)]
  return {
    statusCode: 200,
    body: JSON.stringify(dilemma),
  }
}
