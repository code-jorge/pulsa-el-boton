const request = async (url, options) => {
  const res = await fetch(url, options)
  if (!res.ok) {
    const message = await res.text().catch(() => '')
    throw new Error(message || `Request failed with status ${res.status}`)
  }
  return res
}

const requestJSON = (url, options) => request(url, options).then(res => res.json())

export const getTotalDilemmas = () =>
  requestJSON('/api/dilemmas-count').then(({ total }) => total)

export const getDilemmasList = (page) =>
  requestJSON(`/api/dilemmas-list?page=${page}`)

export const getDilemma = (slug) =>
  requestJSON(`/api/dilemmas-get?slug=${encodeURIComponent(slug)}`)

export const getDilemmaRandom = () =>
  requestJSON('/api/dilemmas-get-random')

export const getNextDilemma = (slug) =>
  requestJSON(`/api/dilemmas-next?slug=${encodeURIComponent(slug)}`)

export const getLatestDilemma = () =>
  requestJSON('/api/dilemmas-latest')

export const getVotes = (slug) =>
  requestJSON(`/api/votes-get?slug=${encodeURIComponent(slug)}`)

export const addVote = ({ choice, dilemma }) =>
  request('/api/votes-add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ choice, dilemma }),
  })

export const addDilemma = (dilemma) =>
  request('/api/dilemmas-add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dilemma),
  })
