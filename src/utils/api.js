export const getTotalDilemmas = ()=> {
  const url = '/api/dilemmas-count'
  return fetch(url)
    .then(res=> res.json())
    .then(({ total })=> total)
}

export const getDilemma = (slug)=> {
  const url = `/api/dilemmas-get?slug=${slug}`
  return fetch(url)
    .then(res=> res.json())
}

export const getLatestDilemma = ()=> {
  const url = '/api/dilemmas-latest'
  return fetch(url)
    .then(res=> res.json())
}

export const addVote = ({ choice, dilemma })=> {
  const url = '/api/votes-add'
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ choice, dilemma })
  })
    .then(res=> res.json())
}