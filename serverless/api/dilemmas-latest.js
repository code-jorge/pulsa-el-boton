const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const [ dilemma ] = await db.collection("dilemmas").find({}).sort({ _id: -1 }).limit(1).toArray()
  return {
    statusCode: 200,
    body: JSON.stringify({ dilemma })
  }
}