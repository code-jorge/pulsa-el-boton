const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const { slug } = event.queryStringParameters
  const dilemma = await db.collection("dilemmas").findOne({ slug })
  const next_dilemma = await db.collection("dilemmas").find({ _id: { $lt: dilemma._id } }).limit(1).toArray()
  const next = next_dilemma.length === 0 ? '' : next_dilemma[0]
  return {
    statusCode: 200,
    body: JSON.stringify({ dilemma, next })
  }
}