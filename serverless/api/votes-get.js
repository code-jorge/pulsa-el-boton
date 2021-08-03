const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const { slug } = event.queryStringParameters
  const dilemma = await db.collection("dilemmas").findOne({ slug })
  const vote_choices = await db.collection("votes").distinct("choice", { dilemma: dilemma._id.toHexString() })
  const vote_totals = vote_choices.map(async choice=> ({
    choice,
    total: await db.collection("votes").countDocuments({ choice, dilemma: dilemma._id.toHexString() })
  }))
  const totals = await Promise.all(vote_totals)
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      type: dilemma.type, 
      totals 
    })
  }
}