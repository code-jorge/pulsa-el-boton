import { votesStore } from '../utils/store.js'

export default async (req) => {
  const { choice, dilemma } = await req.json()
  if (!choice || !dilemma) return new Response('Bad request', { status: 400 })

  const store = votesStore()
  const tally = (await store.get(dilemma, { type: 'json' })) || {}
  tally[choice] = (tally[choice] || 0) + 1
  await store.setJSON(dilemma, tally)
  return new Response(null, { status: 204 })
}

export const config = {
  path: '/api/votes-add',
  method: 'POST',
}
