const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const now = new Date()
  const [ dilemma ] = await db.collection("dilemmas")
    .find({ date: { $lte: now } })
    .sort({ date: -1 })
    .limit(1)
    .toArray()
  return {
    statusCode: 200,
    body: JSON.stringify(dilemma)
  }
}