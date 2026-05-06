import { dilemmasStore, listAllDilemmas, sortedByDateDesc, visibleDilemmas } from '../utils/store.js'

export default async (req) => {
  const slug = new URL(req.url).searchParams.get('slug')
  const current = await dilemmasStore().get(slug, { type: 'json' })
  if (!current) return new Response('Dilemma not found', { status: 404 })

  const earlier = visibleDilemmas(await listAllDilemmas()).filter(
    (d) => new Date(d.date) < new Date(current.date),
  )
  const [next] = sortedByDateDesc(earlier)
  return Response.json(next || { end: true })
}

export const config = {
  path: '/api/dilemmas-next',
  method: 'GET',
}
