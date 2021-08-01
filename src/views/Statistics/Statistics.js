import React from 'react'
import { useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import PageContent from '../../layout/PageContent/PageContent'
import { getNextDilemma, getVotes } from '../../utils/api'
import styles from './Statistics.module.css'

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

  const handleClick = ()=> history.push(`/dilema/${nextData.slug}`)

  return (
    <PageContent 
      loading={[isStatsLoading, isNextLoading]} 
      errors={[isStatsError, isNextError]}
    >
      <div className={styles.result}>
        {statsData && statsData.totals.map(({vote, total})=> (
          <p key={vote}>Un total de {total} personas votaron {vote}</p>
        ))}
      </div>
      <button onClick={handleClick}>
        Siguiente
      </button>
    </PageContent>
  )

}

export default Statistics