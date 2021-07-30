export const getTotalDilemmas = ()=> {
  const url = '/api/dilemma-list'
  return fetch(url)
    .then(res=> res.json())
    .then(res=> res.total)
}