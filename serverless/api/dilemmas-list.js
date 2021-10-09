const connect = require('../utils/connect')

const PAGE_SIZE = 60

exports.handler = async (event, context)=> {
  const db = await connect()
  const { page } = event.queryStringParameters
  const now = new Date()
  const data = await db.collection("dilemmas").find({ date: { $lte: now } }).limit(PAGE_SIZE).skip(PAGE_SIZE*(page-1))
  return {
    statusCode: 200,
    body: JSON.stringify({ dilemmas: data })
  }
}