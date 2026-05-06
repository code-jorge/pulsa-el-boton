import { listAllDilemmas, sortedByDateDesc, visibleDilemmas } from '../utils/store.js'

const PAGE_SIZE = 60

export default async (req) => {
  const page = Number(new URL(req.url).searchParams.get('page') || 1)
  const ordered = sortedByDateDesc(visibleDilemmas(await listAllDilemmas()))
  const start = PAGE_SIZE * (page - 1)
  return Response.json({ dilemmas: ordered.slice(start, start + PAGE_SIZE) })
}

export const config = {
  path: '/api/dilemmas-list',
  method: 'GET',
}
