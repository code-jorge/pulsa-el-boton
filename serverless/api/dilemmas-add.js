import { dilemmasStore } from '../utils/store.js'

export default async (req) => {
  const { title, date, type, category, tags, positive, negative, slug, code } = await req.json()
  if (code !== Netlify.env.get('SUBMIT_CODE')) {
    return new Response('Unauthorized', { status: 401 })
  }
  if (!slug) return new Response('Missing slug', { status: 400 })

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return new Response('Invalid date', { status: 400 })
  }

  const store = dilemmasStore()
  const existing = await store.get(slug, { type: 'json' })
  if (existing) return new Response('Dilemma already exists', { status: 409 })

  await store.setJSON(slug, {
    title,
    type,
    category,
    tags,
    positive,
    negative,
    slug,
    date: parsed.toISOString(),
  })
  return new Response(null, { status: 204 })
}

export const config = {
  path: '/api/dilemmas-add',
  method: 'POST',
}
