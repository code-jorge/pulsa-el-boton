import { dilemmasStore, votesStore } from '../utils/store.js'

export default async (req) => {
  const slug = new URL(req.url).searchParams.get('slug')
  const dilemma = await dilemmasStore().get(slug, { type: 'json' })
  if (!dilemma) return new Response('Dilemma not found', { status: 404 })

  const totals = (await votesStore().get(slug, { type: 'json' })) || {}
  return Response.json({ type: dilemma.type, totals })
}

export const config = {
  path: '/api/votes-get',
  method: 'GET',
}
