import { listAllDilemmas, visibleDilemmas } from '../utils/store.js'

export default async () => {
  const all = await listAllDilemmas()
  return Response.json({ total: visibleDilemmas(all).length })
}

export const config = {
  path: '/api/dilemmas-count',
  method: 'GET',
}
