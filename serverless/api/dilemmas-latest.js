import { listAllDilemmas, sortedByDateDesc, visibleDilemmas } from '../utils/store.js'

export default async () => {
  const [dilemma] = sortedByDateDesc(visibleDilemmas(await listAllDilemmas()))
  return Response.json(dilemma || null)
}

export const config = {
  path: '/api/dilemmas-latest',
  method: 'GET',
}
