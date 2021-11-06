export const getTotalDilemmas = ()=> {
  const url = '/api/dilemmas-count'
  return fetch(url)
    .then(res=> res.json())
    .then(({ total })=> total)
}

export const getDilemmasList = (page)=> {
  const url = `/api/dilemmas-list?page=${page}`
  return fetch(url).then(res=> res.json())
}

export const getDilemma = (slug)=> {
  const url = `/api/dilemmas-get?slug=${slug}`
  return fetch(url).then(res=> res.json())
}

export const getDilemmaRandom = ()=> {
  const url = `/api/dilemmas-get-random`
  return fetch(url).then(res=> res.json())
}

export const getNextDilemma = (slug)=> {
  const url = `/api/dilemmas-next?slug=${slug}`
  return fetch(url).then(res=> res.json())
}

export const getLatestDilemma = ()=> {
  const url = '/api/dilemmas-latest'
  return fetch(url).then(res=> res.json())
}

export const getVotes = (slug)=> {
  const url = `/api/votes-get?slug=${slug}`
  return fetch(url).then(res=> res.json())
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
}

export const addDilemma = (dilemma)=> {
  const url = '/api/dilemmas-add'
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dilemma)
  })
}