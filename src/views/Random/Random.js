

import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router'
import PageContent from '../../layout/PageContent/PageContent'
import { getDilemmaRandom } from '../../utils/api'

const Random = ()=> {

  const history = useHistory()

  const { isError, data } = useQuery([ 'dilemma-random' ], ()=> getDilemmaRandom())

  useEffect(()=> {
    if (data && data.slug) history.push(`/dilema/${data.slug}`)
  }, [data, history])

  return (
    <PageContent 
      loading={[true]} 
      errors={[isError]}
    />
  )

}

export default Random