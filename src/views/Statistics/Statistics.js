import React from 'react'
import { useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import PageContent from '../../layout/PageContent/PageContent'
import { getNextDilemma, getVotes } from '../../utils/api'
import styles from './Statistics.module.css'
import { formatTotals, getCoverage } from './utils'

const Statistics = ()=> {

  const { slug } = useParams()
  const history = useHistory()

  const { 
    isLoading: isStatsLoading, 
    isError: isStatsError, 
    data: statsData 
  } = useQuery([ 'statistics', slug ], ()=> getVotes(slug))

  const { 
    isLoading: isNextLoading, 
    isError: isNextError, 
    data: nextData 
  } = useQuery([ 'dilemma', slug ], ()=> getNextDilemma(slug))


  const StatisticsShowClassic = ({ totals })=> (
    <div className={styles.classic}>
      <p className={styles.positive}>
        Un total de {totals.YES || '0'} personas pulsaron el botón
      </p>
      <div 
        className={styles.bar} 
        style={{ background: `linear-gradient(90deg, var(--color-main) 0%, var(--color-main) ${getCoverage(totals)}%, white ${getCoverage(totals)}% )`}}
      >
        <p className={styles.barTotal}>{Math.round(getCoverage(totals))}%</p>
      </div>
      <p className={styles.negative}>
        Un total de {totals.NO || '0'} personas no pulsaron el botón
      </p>
    </div>
  )

  const StatisticsShow = ({ type, totals })=> {
    if (type === 'classic') return <StatisticsShowClassic totals={formatTotals(totals)} />
    return null
  }

  const handleClick = ()=> {
    if (nextData.end) history.push(`/final`)
    else history.push(`/dilema/${nextData.slug}`)
  }

  return (
    <PageContent 
      loading={[isStatsLoading, isNextLoading]} 
      errors={[isStatsError, isNextError]}
    >
      <div className={styles.result}>
        {statsData && (
          <StatisticsShow 
            type={statsData.type} 
            totals={statsData.totals} 
          />
        )}
        <button className={styles.button} onClick={handleClick}>
          Siguiente
        </button>
      </div>
    </PageContent>
  )

}

export default Statistics