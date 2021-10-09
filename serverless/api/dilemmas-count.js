const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const now = new Date()
  const total = await db.collection("dilemmas").countDocuments({ date: { $lte: now } })
  return {
    statusCode: 200,
    body: JSON.stringify({ total })
  }
}