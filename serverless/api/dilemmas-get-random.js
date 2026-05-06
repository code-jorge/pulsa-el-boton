import { listAllDilemmas, visibleDilemmas } from '../utils/store.js'

export default async () => {
  const visible = visibleDilemmas(await listAllDilemmas())
  if (visible.length === 0) return Response.json(null)
  return Response.json(visible[Math.floor(Math.random() * visible.length)])
}

export const config = {
  path: '/api/dilemmas-get-random',
  method: 'GET',
}
