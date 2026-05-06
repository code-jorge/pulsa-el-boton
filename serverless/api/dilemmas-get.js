import { dilemmasStore } from '../utils/store.js'

export default async (req) => {
  const slug = new URL(req.url).searchParams.get('slug')
  const dilemma = await dilemmasStore().get(slug, { type: 'json' })
  if (!dilemma || new Date(dilemma.date) > new Date()) {
    return new Response('Dilemma not found', { status: 404 })
  }
  return Response.json(dilemma)
}

export const config = {
  path: '/api/dilemmas-get',
  method: 'GET',
}
