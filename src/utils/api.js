export const getTotalDilemmas = ()=> {
  const url = '/api/dilemmas-list'
  return fetch(url)
    .then(res=> res.json())
    .then(res=> res.total)
}