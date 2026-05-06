const { getStore } = require('@netlify/blobs')

const dilemmasStore = () => getStore({ name: 'dilemmas', consistency: 'strong' })
const votesStore = () => getStore({ name: 'votes', consistency: 'strong' })

const listAllDilemmas = async () => {
  const store = dilemmasStore()
  const { blobs } = await store.list()
  const items = await Promise.all(
    blobs.map((blob) => store.get(blob.key, { type: 'json' }))
  )
  return items.filter(Boolean)
}

const visibleDilemmas = (items, now = new Date()) =>
  items.filter((item) => new Date(item.date) <= now)

const sortedByDateDesc = (items) =>
  [...items].sort((a, b) => new Date(b.date) - new Date(a.date))

module.exports = {
  dilemmasStore,
  votesStore,
  listAllDilemmas,
  visibleDilemmas,
  sortedByDateDesc,
}
