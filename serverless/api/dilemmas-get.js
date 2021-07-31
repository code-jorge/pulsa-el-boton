const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const { slug } = event.queryStringParameters
  const dilemma = await db.collection("dilemmas").findOne({ slug })
  return {
    statusCode: 200,
    body: JSON.stringify(dilemma)
  }
}