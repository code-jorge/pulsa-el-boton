const connect = require('../utils/connect')
const { parseDate } = require('../utils/date')

const { SUBMIT_CODE } = process.env;

exports.handler = async (event, context)=> {
  const db = await connect()
  const { title, date, type, category, tags, positive, negative, slug, code } = JSON.parse(event.body)
  if (code !== SUBMIT_CODE) return { statusCode: 401 }
  const dilemmaDate = parseDate(date)
  await db.collection("dilemmas").insertOne({
    title,
    type,
    category,
    tags,
    positive,
    negative,
    slug,
    date: dilemmaDate
  })
  return { statusCode: 200 }
}