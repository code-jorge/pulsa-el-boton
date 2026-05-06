const { dilemmasStore } = require('../utils/store')
const { parseDate } = require('../utils/date')

const { SUBMIT_CODE } = process.env

exports.handler = async (event) => {
  const { title, date, type, category, tags, positive, negative, slug, code } = JSON.parse(event.body)
  if (code !== SUBMIT_CODE) return { statusCode: 401 }
  if (!slug) return { statusCode: 400, body: 'Missing slug' }

  const store = dilemmasStore()
  const existing = await store.get(slug, { type: 'json' })
  if (existing) return { statusCode: 409, body: 'Dilemma already exists' }

  const dilemmaDate = parseDate(date)
  await store.setJSON(slug, {
    title,
    type,
    category,
    tags,
    positive,
    negative,
    slug,
    date: dilemmaDate.toISOString(),
  })
  return { statusCode: 200 }
}
