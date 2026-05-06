const { votesStore } = require('../utils/store')

exports.handler = async (event) => {
  const { choice, dilemma } = JSON.parse(event.body)
  if (!choice || !dilemma) return { statusCode: 400 }

  const store = votesStore()
  const tally = (await store.get(dilemma, { type: 'json' })) || {}
  tally[choice] = (tally[choice] || 0) + 1
  await store.setJSON(dilemma, tally)
  return { statusCode: 200 }
}
