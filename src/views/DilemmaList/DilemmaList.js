import React from 'react'
import { useQuery } from 'react-query'
import PageContent from '../../layout/PageContent/PageContent'
import { getTotalDilemmas } from '../../utils/api'

const DilemmaList = ()=> {

  const { isLoading, isError, data } = useQuery('dilemmas-total', getTotalDilemmas)

  return (
    <PageContent loading={[isLoading]} errors={[isError]}>
      Total dilemas: {data}
    </PageContent>
  )

}

export default DilemmaList