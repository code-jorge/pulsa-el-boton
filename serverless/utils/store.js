import { getStore } from '@netlify/blobs'

export const dilemmasStore = () => getStore({ name: 'dilemmas', consistency: 'strong' })
export const votesStore = () => getStore({ name: 'votes', consistency: 'strong' })

export const listAllDilemmas = async () => {
  const store = dilemmasStore()
  const { blobs } = await store.list()
  const items = await Promise.all(
    blobs.map((blob) => store.get(blob.key, { type: 'json' })),
  )
  return items.filter(Boolean)
}

export const visibleDilemmas = (items, now = new Date()) =>
  items.filter((item) => new Date(item.date) <= now)

export const sortedByDateDesc = (items) =>
  [...items].sort((a, b) => new Date(b.date) - new Date(a.date))
