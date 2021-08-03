export const formatTotals = (totals)=> {
  const result = totals.reduce((acc, curr)=> ({
    ...acc,
    [curr.choice]: curr.total
  }), {})
  return result
}

export const getCoverage = (totals)=> {
  const yes = totals['YES'] || 0
  const no = totals['NO'] || 0
  if (yes === 0 && no === 0) return 0
  return 100 * (yes / (yes + no))
}