import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import PageContent from '../../layout/PageContent/PageContent'
import { getDilemmaRandom } from '../../utils/api'

const Random = () => {

  const navigate = useNavigate()

  const { isError, data } = useQuery({
    queryKey: ['dilemma-random'],
    queryFn: getDilemmaRandom,
  })

  useEffect(() => {
    if (data && data.slug) navigate(`/dilema/${data.slug}`)
  }, [data, navigate])

  return (
    <PageContent
      loading={[true]}
      errors={[isError]}
    />
  )

}

export default Random
