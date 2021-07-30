import React from 'react'
import Error from '../../components/Error/Error'
import Loading from '../../components/Loading/Loading'

const PageContent = ({ loading=[], errors=[], children })=> {
  if (errors.includes(true)) return <Error />
  if (loading.includes(true)) return <Loading />
  return children
}

export default PageContent