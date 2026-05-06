const { listAllDilemmas, visibleDilemmas } = require('../utils/store')

exports.handler = async () => {
  const all = await listAllDilemmas()
  const total = visibleDilemmas(all).length
  return {
    statusCode: 200,
    body: JSON.stringify({ total }),
  }
}
