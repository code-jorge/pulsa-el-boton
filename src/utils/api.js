export const getTotalDilemmas = ()=> {
  const url = '/.netlify/functions/dilemma-list'
  return fetch(url)
    .then(res=> res.json())
    .then(res=> res.total)
}