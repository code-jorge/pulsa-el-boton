export const getTotalDilemmas = ()=> {
  const url = '/api/dilemmas-count'
  return fetch(url)
    .then(res=> res.json())
    .then(({ total })=> total)
}

export const getLatestDilemma = ()=> {
  const url = '/api/dilemmas-latest'
  return fetch(url)
    .then(res=> res.json())
    .then(({ dilemma })=> dilemma)
}