const connect = require('../utils/connect')

exports.handler = async (event, context)=> {
  const db = await connect()
  const { choice, dilemma } = JSON.parse(event.body)
  const ip = event.headers['x-nf-client-connection-ip']
  await db.collection("votes").insertOne({
    choice, 
    dilemma,
    ip,
    date: new Date()
  })
  return { statusCode: 200 }
}