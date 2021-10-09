export const processDilemmaPages = (dilemmaPages)=> {
  const { pages } = dilemmaPages
  if (!pages) return []
  return pages.reduce((acc, curr)=> [...acc, ...curr], [])
}