import { dilemmasStore } from '../utils/store.js'

const SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

export default async (req) => {
  const { title, date, type, category, tags, positive, negative, slug, code } = await req.json()
  if (code !== Netlify.env.get('SUBMIT_CODE')) {
    return new Response('Código incorrecto', { status: 401 })
  }
  if (!slug || !SLUG_PATTERN.test(slug)) {
    return new Response('La URL solo puede contener minúsculas, números y guiones', { status: 400 })
  }

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return new Response('Fecha inválida', { status: 400 })
  }

  const store = dilemmasStore()
  const existing = await store.get(slug, { type: 'json' })
  if (existing) return new Response('Ya existe un dilema con esa URL', { status: 409 })

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
