const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const now = new Date()
  const { slug } = event.queryStringParameters
  const dilemma = await db.collection("dilemmas").findOne({ slug, date: { $lte: now } })
  return {
    statusCode: 200,
    body: JSON.stringify(dilemma)
  }
}