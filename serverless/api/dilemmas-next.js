const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const { slug } = event.queryStringParameters
  const now = new Date()
  const dilemma = await db.collection("dilemmas").findOne({ slug, date: { $lte: now } })
  const next_dilemma = await db.collection("dilemmas")
    .find({ date: { $lt: dilemma.date } })
    .sort({ date: -1 })
    .limit(1)
    .toArray()
  const next = next_dilemma.length === 0 ? '' : next_dilemma[0]
  if (!next) return { 
    statusCode: 200, 
    body: JSON.stringify({ end: true })
  }
  return {
    statusCode: 200,
    body: JSON.stringify(next)
  }
}