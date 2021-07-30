const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const total = await db.collection("dilemmas").countDocuments()
  return {
    statusCode: 200,
    body: JSON.stringify({ total })
  }
}