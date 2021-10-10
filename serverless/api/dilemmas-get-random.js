const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const now = new Date()
  const total = await db.collection("dilemmas").countDocuments({ date: { $lte: now } })
  const skip = Math.floor(Math.random() * (total-1))
  const [ dilemma ] = await db.collection("dilemmas")
    .find({ date: { $lte: now } })
    .skip(skip)
    .limit(1)
    .toArray()
  return {
    statusCode: 200,
    body: JSON.stringify(dilemma)
  }
}